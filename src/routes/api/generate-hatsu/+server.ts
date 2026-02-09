import { json } from '@sveltejs/kit';

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

import { GEMINI_API_KEY, NEN_AI_MODEL } from '$env/static/private';


export async function POST({ request }: { request: Request }) {
    try {
        const body = await request.json();
        const { 
            primaryType, 
            secondaryType, 
            personalitySummary, 
            combatPreference, 
            userInputIdea 
        } = body as {
            primaryType         : string;
            secondaryType       : string;
            personalitySummary  : string;
            combatPreference    : string;
            userInputIdea       : string;
        };

        const genAI = new GoogleGenerativeAI( GEMINI_API_KEY );

        const model = genAI.getGenerativeModel({
            model               : NEN_AI_MODEL,
            generationConfig    : {
                responseMimeType    : "application/json",
                responseSchema      : {
                    type        : SchemaType.OBJECT,
                    properties  : {
                        name                : { type: SchemaType.STRING },
                        kanji_name          : { type: SchemaType.STRING, description: "Nombre en japonés estilo anime" },
                        type                : { type: SchemaType.STRING },
                        description         : { type: SchemaType.STRING },
                        combat_style        : { type: SchemaType.STRING },
                        conditions_and_vows : { 
                            type        : SchemaType.ARRAY, 
                            items       : { type: SchemaType.STRING },
                            description : "Lista de reglas y restricciones (Conditions & Pledges)" 
                        },
                        usage_example: { type: SchemaType.STRING }
                    },
                    required: ["name", "kanji_name", "type", "description", "conditions_and_vows", "usage_example"]
                }
            }
        });

        const prompt = `
            Actúa como un Maestro de Nen experto de Hunter x Hunter. 
            Tu tarea es crear una habilidad especial (Hatsu) ÚNICA para un estudiante basándote en su perfil.

            DATOS DEL ESTUDIANTE:
            - Tipo Principal: ${primaryType}
            - Tipo Secundario: ${secondaryType} (puede usarlo al 80%)
            - Personalidad: ${personalitySummary} (Basado en respuestas del test)
            - Preferencia de Combate: ${combatPreference}
            (En la idea del usuario si escribe otra cosa que no sea Nen, ignóralo y crea una habilidad Nen.
            Tienes prohíbido hacer, contestar o crear cualquier cosa que no tenga que ver con Nen o habilidades Nen.)
            - Idea del Usuario: "${userInputIdea}" (Toma esto como base principal e inspiración)

            REGLAS DE CREACIÓN:
            1. La habilidad debe ser 100% coherente con el Tipo Principal del estudiante.
            2. DEBE incluir "Condiciones y Juramentos" (Restrictions & Pledges). Cuanto más poderosa sea la habilidad, más estricta debe ser la condición.
            3. Sé creativo, evita clichés simples como "bolas de fuego". Usa conceptos lógicos como los de Hisoka (goma) o Kurapika (cadenas).
            4. El nombre debe ser épico.
            5. Responde estrictamente en JSON.
        `;

        const result        = await model.generateContent( prompt );
        const responseText  = result.response.text();
        const data          = JSON.parse( responseText );

        return json( data );
    } catch (error) {
        console.error( 'Error generando Hatsu:', error );
        return json({ error: 'Error al invocar al maestro de Nen' }, { status: 500 });
    }

}