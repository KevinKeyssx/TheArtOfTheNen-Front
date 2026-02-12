// Nen Types and Compatibility
export const NEN_TYPES = {
    INT: {
        code            : "INT",
        name            : "Intensificación",
        fullName        : "Intensificación (Kyoka)",
        neighbors       : ["TRA", "EMI"],
        color           : "nen-int",
        description     : "Equilibrado y fuerte, compatible con la creatividad y la impulsividad.",
        longDescription : "Los usuarios de Intensificación pueden usar su aura para fortalecer su cuerpo y objetos. Son conocidos por su naturalidad, determinación y simplicidad. Tienden a ser personas directas y honestas que prefieren resolver los problemas de frente.",
        characteristics : [
            "Naturaleza simple y directa",
            "Gran determinación y fuerza de voluntad",
            "Honestidad, a veces brutal",
            "Personalidad equilibrada",
            "Tendencia a actuar sin pensar demasiado"
        ],
        characters: ["Gon Freecss", "Wing", "Palm Siberia"],
        abilities: "Fortalecen su cuerpo y objetos que tocan. Sus habilidades son simples pero extremadamente poderosas.",
        test : {
            action: "¡El agua se ha desbordado!",
            description: "La cantidad de agua en el vaso aumenta repentinamente hasta desbordarse. Esto indica un aura con capacidad de potenciar y fortalecer cosas."
        }
    },
    TRA: {
        code: "TRA",
        name          : "Transmutación",
        fullName      : "Transmutación (Henka)",
        neighbors: ["INT", "MAT"],
        color: "nen-tra",
        description: "Mentiroso y voluble, oscila entre la fuerza bruta y el apego a los objetos.",
        longDescription : "Los transmutadores pueden cambiar las propiedades de su aura para imitar otras sustancias. Son conocidos por ser impredecibles, caprichosos y a menudo mentirosos. Les encanta sorprender a los demás.",
        characteristics: [
            "Personalidad caprichosa e impredecible",
            "Tendencia a mentir o exagerar",
            "Creatividad excepcional",
            "Humor peculiar",
            "Disfrutan confundiendo a otros"
        ],
        characters: ["Killua Zoldyck", "Hisoka Morow", "Biscuit Krueger", "Machi"],
        abilities: "Transforman su aura en diferentes sustancias (electricidad, goma, hilos, etc.).",
        test : {
            action: "¡El sabor del agua ha cambiado!",
            description: "El agua cambia su sabor (generalmente a dulce o salado). Visualmente se manifiesta con brillos y cristales, indicando la capacidad de alterar las propiedades del aura."
        }
    },
    MAT: {
        code: "MAT",
        name          : "Materialización",
        fullName      : "Materialización (Gugenka)",
        neighbors: ["TRA", "ESP"],
        color: "nen-mat",
        description: "Nervioso y detallista, cercano a la mentira y al carisma independiente.",
        longDescription : "Los materializadores pueden crear objetos físicos a partir de su aura. Son personas muy detallistas, nerviosas y a menudo obsesivas con la perfección. Tienden a planificar todo cuidadosamente.",
        characteristics: [
            "Extremadamente detallistas",
            "Personalidad nerviosa o ansiosa",
            "Tendencia al perfeccionismo",
            "Apego a objetos materiales",
            "Planificadores meticulosos"
        ],
        characters: ["Kurapika", "Shizuku", "Kite", "Kortopi"],
        abilities       : "Crean objetos físicos con propiedades especiales a partir de su aura.",
        test: {
            action: "¡Aparecen impurezas!",
            description: "Pequeñas partículas, cristales o impurezas se materializan dentro del agua. Esto revela la capacidad de crear objetos físicos a partir del aura."
        }
    },
    ESP: {
        code: "ESP",
        name          : "Especialización",
        fullName      : "Especialización (Tokushitsu)",
        neighbors: ["MAT", "MAN"],
        color: "nen-esp",
        description: "Carismatico e individualista, rodeado por los que quieren controlar o crear.",
        longDescription : "Los especialistas tienen habilidades únicas que no encajan en ninguna otra categoría. Son individualistas, carismáticos y a menudo se sienten diferentes a los demás. Sus poderes son los más impredecibles.",
        characteristics: [
            "Fuerte individualismo",
            "Carisma natural",
            "Sentimiento de ser 'diferente'",
            "Habilidades únicas e irrepetibles",
            "Difícil de predecir"
        ],
        characters: ["Chrollo Lucilfer", "Neferpitou", "Meruem", "Pakunoda"],
        abilities       : "Poseen habilidades únicas que desafían la clasificación normal del Nen.",
        test: {
            action: "¡La hoja se ha secado!",
            description: "Ocurre un cambio inusual, como que la hoja se marchite, se seque o se desintegre. Esto denota un aura única que no encaja en las otras categorías."
        }
    },
    MAN: {
        code: "MAN",
        name          : "Manipulación",
        fullName      : "Manipulación (Sosa)",
        neighbors: ["ESP", "EMI"],
        color: "nen-man",
        description: "Logico y controlador, flanqueado por la individualidad y la impulsividad.",
        longDescription : "Los manipuladores pueden controlar seres vivos u objetos con su aura. Son personas lógicas, argumentativas y les gusta tener el control de las situaciones. Tienden a ser líderes naturales.",
        characteristics: [
            "Pensamiento lógico y analítico",
            "Deseo de control",
            "Capacidad de liderazgo",
            "Terquedad cuando creen tener razón",
            "Buenos estrategas"
        ],
        characters: ["Illumi Zoldyck", "Shalnark", "Morel", "Zushi"],
        abilities: "Controlan objetos, animales o personas usando su aura como medio.",
        test : {
            action: "¡La hoja se ha movido!",
            description: "La hoja comienza a moverse o girar sobre la superficie del agua, demostrando la habilidad de verter aura en objetos para controlarlos."
        }
    },
    EMI: {
        code: "EMI",
        name          : "Emisión",
        fullName      : "Emisión (Houshutsu)",
        neighbors: ["MAN", "INT"],
        color: "nen-emi",
        description: "Impaciente y emocional, entre el control logico y la fuerza pura.",
        longDescription : "Los emisores pueden proyectar su aura lejos de su cuerpo. Son personas impulsivas, emocionales y a menudo impacientes. Actúan primero y piensan después, pero su lealtad es inquebrantable.",
        characteristics: [
            "Impulsividad e impaciencia",
            "Emociones intensas",
            "Lealtad feroz",
            "Temperamento explosivo",
            "Acción sobre reflexión"
        ],
        characters: ["Leorio Paradinight", "Franklin", "Razor", "Pokkle"],
        abilities: "Proyectan su aura a distancia, creando ataques de largo alcance.",
        test : {
            action: "¡El color del agua ha cambiado!",
            description: "El agua cambia drásticamente de color (ej. a naranja oscuro o morado), señalando la capacidad de proyectar y separar el aura del cuerpo."
        }
    }
    };

// Basic Nen Techniques
export const BASIC_NEN_TECHNIQUES = [
    {
        name: "Ten",
        japaneseName: "Enfocar",
        description     : "La técnica más básica del Nen. Permite al usuario mantener su aura dentro de su cuerpo, evitando que se escape. Es esencial para la supervivencia de cualquier usuario de Nen.",
        effects: [
            "Mantiene el aura contenida en el cuerpo",
            "Ralentiza el envejecimiento",
            "Proporciona protección básica",
            "Es la base de todas las demás técnicas"
        ],
        example         : "Todo usuario de Nen debe dominar Ten antes de avanzar. Wing lo enseñó a Gon y Killua como su primera lección."
    },
    {
        name: "Zetsu",
        japaneseName: "Suprimir",
        description     : "Cierra completamente todos los poros de aura, suprimiendo toda emanación de Nen. El usuario se vuelve indetectable, pero también vulnerable.",
        effects: [
            "Oculta completamente la presencia del usuario",
            "Permite recuperar aura más rápidamente",
            "Ideal para sigilo y rastreo",
            "Deja al usuario completamente vulnerable"
        ],
        example: "Killua usa Zetsu frecuentemente para moverse sin ser detectado, una habilidad perfeccionada por su entrenamiento como asesino."
    },
    {
        name: "Ren",
        japaneseName: "Refinar",
        description     : "Permite al usuario producir más aura de lo normal y mantenerla alrededor del cuerpo. Aumenta drásticamente la fuerza y resistencia.",
        effects: [
            "Incrementa dramáticamente el poder ofensivo",
            "Mejora la defensa",
            "Puede intimidar a oponentes más débiles",
            "Consume energía rápidamente"
        ],
        example: "La batalla entre Gon y Hisoka en el Heaven's Arena mostro el poder aterrador del Ren de Hisoka."
    },
    {
        name: "Hatsu",
        japaneseName: "Liberar",
        description     : "La expresión personal del aura de cada usuario. Es la técnica que permite crear habilidades únicas basadas en el tipo de Nen del usuario.",
        effects: [
            "Permite crear habilidades personalizadas",
            "Refleja la personalidad del usuario",
            "Es única para cada persona",
            "Puede evolucionar con el tiempo"
        ],
        example: "El Jajanken de Gon, el Godspeed de Killua y las Cadenas de Kurapika son ejemplos de Hatsu."
    }
];

// Advanced Nen Techniques
export const ADVANCED_NEN_TECHNIQUES = [
    {
        name: "Gyo",
        japaneseName: "Concentrar",
        description     : "Una aplicación avanzada de Ren donde el usuario concentra su aura en una parte específica del cuerpo, aumentando dramáticamente sus capacidades.",
        effects: [
            "Concentra aura en un punto específico",
            "Usado en los ojos permite ver aura oculta",
            "Aumenta poder en la zona concentrada",
            "Debilita la defensa en otras áreas"
        ],
        example         : "Gyo en los ojos es crucial para detectar trampas de Nen y ver ataques ocultos como el Bungee Gum de Hisoka."
    },
    {
        name: "In",
        japaneseName: "Ocultar",
        description     : "Una forma avanzada de Zetsu que oculta el aura del usuario mientras aún la usa. Permite esconder ataques y habilidades de otros usuarios de Nen.",
        effects: [
            "Oculta el aura mientras se usa",
            "Permite ataques sorpresa",
            "Solo detectable con Gyo",
            "Requiere gran control"
        ],
        example         : "Hisoka usa In para ocultar su Bungee Gum, haciendo sus ataques prácticamente invisibles."
    },
    {
        name: "En",
        japaneseName: "Circulo",
        description     : "Expande el aura en un radio alrededor del usuario, creando un campo de detección. Cualquier cosa que entre en el En es detectada.",
        effects: [
            "Crea un campo de detección esférica",
            "Detecta todo dentro del rango",
            "El tamaño varía según el usuario",
            "Consume mucha energía mantenerlo"
        ],
        example         : "Nobunaga puede mantener un En de 4 metros, mientras que Neferpitou podía extenderlo por varios kilómetros."
    },
    {
        name: "Shu",
        japaneseName: "Envolver",
        description: "Permite al usuario envolver un objeto con su aura, extendiendo las propiedades del Ten al objeto. El objeto se fortalece y puede usarse como arma.",
        effects: [
            "Fortalece objetos con aura",
            "Permite usar objetos como armas Nen",
            "El objeto gana resistencia",
            "Base para técnicas de armas"
        ],
        example         : "Wing demostró Shu fortaleciendo una hoja de papel hasta hacerla capaz de cortar."
    },
    {
        name: "Ko",
        japaneseName: "Endurecer",
        description     : "Concentra absolutamente toda el aura del usuario en un solo punto, usando Ten, Zetsu, Ren, Hatsu y Gyo simultáneamente. Es el golpe más poderoso posible.",
        effects: [
            "Concentra TODO el aura en un punto",
            "Golpe devastadoramente poderoso",
            "Deja el resto del cuerpo sin defensa",
            "Muy arriesgado de usar"
        ],
        example         : "El 'Jajanken: Piedra' de Gon es esencialmente un Ko extremadamente poderoso en su puño."
    },
    {
        name: "Ken",
        japaneseName: "Fortalecer",
        description     : "Una versión defensiva de Ren. Mantiene un flujo constante de aura alrededor de todo el cuerpo para protección equilibrada durante el combate.",
        effects: [
            "Defensa equilibrada en todo el cuerpo",
            "Mantiene protección constante",
            "Menos poderoso que Ko, pero más seguro",
            "Consume energía sostenidamente"
        ],
        example: "Los combatientes experimentados mantienen Ken durante todo el combate como defensa base."
    },
    {
        name: "Ryu",
        japaneseName: "Flujo",
        description     : "La técnica más avanzada, permite redistribuir el aura instantáneamente entre diferentes partes del cuerpo según las necesidades del combate.",
        effects: [
            "Redistribución instantánea de aura",
            "Adaptación rápida en combate",
            "Combina ataque y defensa fluidamente",
            "Requiere maestría absoluta"
        ],
        example         : "Biscuit enseñó Ryu a Gon y Killua, mostrándoles cómo cambiar rápidamente entre 70-30 y 50-50 de distribución."
    }
];
