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

// Quiz Questions
export const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "Te encuentras ante un problema difícil que nadie ha podido resolver. ¿Cómo lo abordas?",
        options: [
            { text: "Me lanzo de cabeza a intentarlo una y otra vez hasta que funcione.", value: "INT" },
            { text: "Analizo todas las reglas, busco patrones y diseño un plan paso a paso.", value: "MAT" },
            { text: "Busco la manera más astuta o tramposa de saltarme el problema.", value: "TRA" },
            { text: "Me frustro rápido si no sale, pero sigo intentándolo con rabia.", value: "EMI" },
            { text: "Organizo a otros o reestructuro el sistema para que el problema se resuelva solo.", value: "MAN" },
            { text: "Confío en mi instinto; usualmente la solución llega a mí de la nada.", value: "ESP" }
        ]
    },
    {
        id: 2,
        question: "Estás en una discusión acalorada con un amigo. ¿Cuál es tu postura?",
        options: [
            { text: "Digo lo que siento sin filtros, aunque duela. La honestidad es primero.", value: "INT" },
            { text: "Me mantengo callado observando, cuidando no decir algo que me comprometa.", value: "MAT" },
            { text: "Cambio mi opinion a mitad de la discusion solo para confundirlo o molestarlo.", value: "TRA" },
            { text: "Grito y exploto rápido, pero se me pasa el enojo igual de rápido.", value: "EMI" },
            { text: "Discuto con argumentos lógicos hasta que acepte que tengo razón.", value: "MAN" },
            { text: "No me importa mucho su opinion, tengo mi propia verdad.", value: "ESP" }
        ]
    },
    {
        id: 3,
        question: "Si pudieras elegir un rol en un equipo de trabajo o videojuego. ¿Cuál serías?",
        options: [
            { text: "El líder de vanguardia o el 'tanque' que protege a todos.", value: "INT" },
            { text: "El estratega que gestiona el inventario y vigila los riesgos.", value: "MAT" },
            { text: "El 'comodín' que hace lo que quiere y sorprende al enemigo.", value: "TRA" },
            { text: "El artillero que ataca desde lejos y cubre mucho terreno.", value: "EMI" },
            { text: "El capitán que da las órdenes y coordina los movimientos de todos.", value: "MAN" },
            { text: "El lobo solitario que aparece solo en el momento crítico.", value: "ESP" }
        ]
    },
    {
        id: 4,
        question: "¿Qué es lo que más valoras en tu vida diaria?",
        options: [
            { text: "La fuerza de voluntad y cumplir mis objetivos.", value: "INT" },
            { text: "La seguridad, la estabilidad y tener todo bajo control.", value: "MAT" },
            { text: "La diversión, el cambio y que nada sea aburrido.", value: "TRA" },
            { text: "Mis emociones y la lealtad de mis amigos cercanos.", value: "EMI" },
            { text: "El orden, la lógica y que las cosas se hagan 'como se debe'.", value: "MAN" },
            { text: "Mi independencia y mi carisma personal.", value: "ESP" }
        ]
    },
    {
        id: 5,
        question: "Tienes que guardar un secreto importante. ¿Qué haces?",
        options: [
            { text: "Soy terrible mintiendo, probablemente se me escape o se me note.", value: "INT" },
            { text: "Me pongo muy tenso y nervioso si alguien se acerca a la verdad.", value: "MAT" },
            { text: "Invento una mentira tan elaborada que incluso yo me la creo.", value: "TRA" },
            { text: "Si me presionan, probablemente me enoje y termine soltándolo.", value: "EMI" },
            { text: "Desvío la atención con argumentos lógicos para que nadie pregunte.", value: "MAN" },
            { text: "Nadie sabrá nunca lo que estoy pensando, soy una tumba.", value: "ESP" }
        ]
    },
    {
        id: 6,
        question: "¿Cómo reaccionas ante las reglas establecidas?",
        options: [
            { text: "Las sigo si son justas, pero si no, las rompo para hacer lo correcto.", value: "INT" },
            { text: "Las estudio a fondo para no cometer errores.", value: "MAT" },
            { text: "Las reglas son sugerencias; las uso o rompo según me convenga.", value: "TRA" },
            { text: "Me molestan las reglas complicadas, prefiero lo simple.", value: "EMI" },
            { text: "Las reglas son necesarias para mantener el orden y deben respetarse.", value: "MAN" },
            { text: "Las reglas no aplican a mí de la misma forma que a los demás.", value: "ESP" }
        ]
    },
    {
        id: 7,
        question: "¿Cuál consideras que es tu mayor defecto?",
        options: [
            { text: "Soy ingenuo y a veces actúo sin pensar.", value: "INT" },
            { text: "Soy demasiado preocupado y neurótico con los detalles.", value: "MAT" },
            { text: "Soy caprichoso y a veces mentiroso.", value: "TRA" },
            { text: "Soy impaciente y tengo mal genio.", value: "EMI" },
            { text: "Soy terco y quiero controlar las situaciones.", value: "MAN" },
            { text: "Soy distante y a veces nadie me entiende.", value: "ESP" }
        ]
    },
    {
        id: 8,
        question: "Estás planeando unas vacaciones con amigos. ¿Cuál es tu rol?",
        options: [
            { text: "No planeo nada, solo llevo mi maleta y espero divertirme.", value: "INT" },
            { text: "Hago una lista detallada de todo lo que hay que llevar por si acaso.", value: "MAT" },
            { text: "Cambio el destino a última hora porque me aburrí del plan original.", value: "TRA" },
            { text: "Me estreso si tardamos mucho en salir, quiero llegar ya.", value: "EMI" },
            { text: "Organizo el itinerario y asigno tareas a cada uno.", value: "MAN" },
            { text: "Probablemente me separe del grupo para explorar algo raro yo solo.", value: "ESP" }
        ]
    },
    {
        id: 9,
        question: "Si tuvieras que pelear, ¿cuál sería tu estilo ideal?",
        options: [
            { text: "Cuerpo a cuerpo, golpes directos y sencillos.", value: "INT" },
            { text: "Usando trampas o armas que he preparado con anticipación.", value: "MAT" },
            { text: "Engañando al oponente y atacando cuando no mira.", value: "TRA" },
            { text: "Lanzando cosas desde lejos para no ensuciarme.", value: "EMI" },
            { text: "Usando el entorno o a otras personas a mi favor.", value: "MAN" },
            { text: "Usando una habilidad rara que nadie entiende hasta que es tarde.", value: "ESP" }
        ]
    },
    {
        id: 10,
        question: "Descubres que alguien te ha traicionado. ¿Cómo reaccionas?",
        options: [
            { text: "Me siento herido, pero voy directamente a preguntarle por qué.", value: "INT" },
            { text: "Me pongo paranoico y analizo cada interacción pasada.", value: "MAT" },
            { text: "No me sorprende, yo también traicionaría si fuera necesario.", value: "TRA" },
            { text: "Exploto en ira inmediatamente y hago un escándalo.", value: "EMI" },
            { text: "Planeo fríamente cómo devolverle el golpe más tarde.", value: "MAN" },
            { text: "Simplemente lo borro de mi vida, no merece mi tiempo.", value: "ESP" }
        ]
    },
    {
        id: 11,
        question: "¿Cómo es tu relación con el dinero?",
        options: [
            { text: "Gasto rápido, a menudo invitando a otros. El dinero va y viene.", value: "INT" },
            { text: "Tengo un presupuesto estricto y ahorro para emergencias.", value: "MAT" },
            { text: "Lo gasto en caprichos o apuestas, me gusta el riesgo.", value: "TRA" },
            { text: "Hago compras impulsivas cuando estoy emocionado.", value: "EMI" },
            { text: "Lo invierto y administro cuidadosamente para el futuro.", value: "MAN" },
            { text: "Gasto en cosas extranas o coleccionables que solo yo valoro.", value: "ESP" }
        ]
    },
    {
        id: 12,
        question: "Tienes que limpiar tu casa/habitación. ¿Cómo lo haces?",
        options: [
            { text: "Lo hago todo de una vez con mucha energía hasta terminar.", value: "INT" },
            { text: "Limpio esquina por esquina asegurándome que nada falte.", value: "MAT" },
            { text: "Escondo el desorden en un cajón y finjo que está limpio.", value: "TRA" },
            { text: "Me quejo todo el tiempo mientras lo hago rápido.", value: "EMI" },
            { text: "Creo un sistema eficiente para no tener que limpiar tanto después.", value: "MAN" },
            { text: "Pago a alguien o simplemente no lo hago hasta que sea urgente.", value: "ESP" }
        ]
    },
    {
        id: 13,
        question: "¿Qué tipo de mascota preferirías tener?",
        options: [
            { text: "Un perro leal y activo que juegue conmigo.", value: "INT" },
            { text: "Un animal que requiera cuidados específicos y detallados.", value: "MAT" },
            { text: "Un gato, porque hace lo que quiere y es impredecible.", value: "TRA" },
            { text: "Un loro ruidoso o algo que se note mucho.", value: "EMI" },
            { text: "Una mascota muy bien entrenada que obedezca comandos.", value: "MAN" },
            { text: "Algo exótico (serpiente, araña) o ninguna mascota.", value: "ESP" }
        ]
    },
    {
        id: 14,
        question: "En un proyecto grupal, alguien no está haciendo su parte. ¿Qué haces?",
        options: [
            { text: "Hago su parte yo mismo para no complicarnos.", value: "INT" },
            { text: "Me preocupo de que eso afecte mi nota y reviso todo mil veces.", value: "MAT" },
            { text: "Le hago una broma o lo engano para que trabaje.", value: "TRA" },
            { text: "Le grito y le digo que es un irresponsable.", value: "EMI" },
            { text: "Le exijo que cumpla su función o lo saco del grupo.", value: "MAN" },
            { text: "Ignoro el drama y me enfoco solo en mi parte.", value: "ESP" }
        ]
    },
    {
        id: 15,
        question: "¿Qué te motiva más a seguir adelante?",
        options: [
            { text: "El deseo de ser más fuerte y proteger a los míos.", value: "INT" },
            { text: "El miedo a fallar o perder lo que tengo.", value: "MAT" },
            { text: "La búsqueda de cosas interesantes y divertidas.", value: "TRA" },
            { text: "Mis pasiones y mis sentimientos del momento.", value: "EMI" },
            { text: "El deseo de poner orden y tener éxito.", value: "MAN" },
            { text: "La curiosidad pura o un propósito que solo yo entiendo.", value: "ESP" }
        ]
    },
    {
        id: 16,
        question: "Te hacen una fiesta sorpresa. ¿Cómo reaccionas?",
        options: [
            { text: "¡Me encanta! Me río y disfruto al máximo.", value: "INT" },
            { text: "Me siento incómodo, no me gusta que alteren mi rutina.", value: "MAT" },
            { text: "Finjo estar sorprendido, pero ya lo sospechaba.", value: "TRA" },
            { text: "Me emociono exageradamente y abrazo a todos.", value: "EMI" },
            { text: "Me molesta no haber sabido para prepararme, pero lo acepto.", value: "MAN" },
            { text: "Probablemente no asista a mi propia fiesta.", value: "ESP" }
        ]
    },
    {
        id: 17,
        question: "Si tuvieras un superpoder. ¿Cuál elegirías?",
        options: [
            { text: "Superfuerza o invulnerabilidad.", value: "INT" },
            { text: "Crear objetos de la nada.", value: "MAT" },
            { text: "Cambiar de forma o invisibilidad.", value: "TRA" },
            { text: "Lanzar rayos de energia.", value: "EMI" },
            { text: "Control mental o telequinesis.", value: "MAN" },
            { text: "Ver el futuro o leer mentes.", value: "ESP" }
        ]
    },
    {
        id: 18,
        question: "¿Qué cualidad detestas más en otras personas?",
        options: [
            { text: "La mentira y la debilidad de carácter.", value: "INT" },
            { text: "La irresponsabilidad y el desorden.", value: "MAT" },
            { text: "La gente aburrida y demasiado seria.", value: "TRA" },
            { text: "La lentitud y la indecisión.", value: "EMI" },
            { text: "La desobediencia y la falta de lógica.", value: "MAN" },
            { text: "La gente que sigue al rebaño sin pensar.", value: "ESP" }
        ]
    },
    {
        id: 19,
        question: "Estás jugando un videojuego y pierdes. ¿Qué haces?",
        options: [
            { text: "Le doy a 'Reintentar' inmediatamente.", value: "INT" },
            { text: "Reviso qué hice mal y ajusto mi equipamiento.", value: "MAT" },
            { text: "Busco un glitch o truco para ganar fácil.", value: "TRA" },
            { text: "Golpeo el escritorio o grito.", value: "EMI" },
            { text: "Busco una guía o estrategia óptima en internet.", value: "MAN" },
            { text: "Me aburro y cambio de juego.", value: "ESP" }
        ]
    },
    {
        id: 20,
        question: "¿Cómo describirían tus amigos tu personalidad?",
        options: [
            { text: "Sencillo, directo y confiable.", value: "INT" },
            { text: "Nervioso, serio y detallista.", value: "MAT" },
            { text: "Mentiroso, bromista y voluble.", value: "TRA" },
            { text: "Impaciente, ruidoso, pero leal.", value: "EMI" },
            { text: "Lógico, argumentativo y líder.", value: "MAN" },
            { text: "Carismático, raro e independiente.", value: "ESP" }
        ]
    },
    {
        id: 21,
        question: "Tienes que comprar un regalo para alguien. ¿Qué eliges?",
        options: [
            { text: "Algo grande y útil que le sirva siempre.", value: "INT" },
            { text: "Algo que mencionó específicamente hace meses.", value: "MAT" },
            { text: "Un regalo de broma o algo inesperado.", value: "TRA" },
            { text: "Una tarjeta de regalo, rápido y efectivo.", value: "EMI" },
            { text: "Algo práctico que realmente necesite en su vida.", value: "MAN" },
            { text: "Algo hecho a mano o muy difícil de conseguir.", value: "ESP" }
        ]
    }
];

// Function to get random questions
export function getRandomQuestions( count: number = 7 ) {
    const shuffled = [...QUIZ_QUESTIONS].sort( () => 0.5 - Math.random() );
    return shuffled.slice( 0, count );
}

// Resolve secondary type using hexagon neighbors + ESP exception
function resolveSecondaryType( primaryType: string, scores: Record<string, number> ): string {
    const neighbors = NEN_TYPES[primaryType as keyof typeof NEN_TYPES].neighbors;
    const scoreA    = scores[neighbors[0]] || 0;
    const scoreB    = scores[neighbors[1]] || 0;

    // If one neighbor scores higher, pick it (unless it's ESP)
    if ( scoreA > scoreB ) {
        // If the winner is ESP, it can't be secondary -> pick the other
        if ( neighbors[0] === 'ESP' ) return neighbors[1];
        return neighbors[0];
    }

    if ( scoreB > scoreA ) {
        if ( neighbors[1] === 'ESP' ) return neighbors[0];
        return neighbors[1];
    }

    // TIE or both zero: ESP can never be secondary, prefer the other neighbor
    if ( neighbors[0] === 'ESP' ) return neighbors[1];
    if ( neighbors[1] === 'ESP' ) return neighbors[0];

    // Neither is ESP and they're tied: pick first by default
    return neighbors[0];
}

// Function to calculate Nen type result
export function calculateNenResult( answers: string[] ) {
    const scores: Record<string, number> = {
        INT: 0,
        TRA: 0,
        MAT: 0,
        ESP: 0,
        MAN: 0,
        EMI: 0
    };

    // Count scores
    answers.forEach( answer => {
        if ( scores[answer] !== undefined ) {
            scores[answer]++;
        }
    });

    // Sort by score descending
    const sortedScores  = Object.entries( scores ).sort(( a, b ) => b[1] - a[1] );
    const primaryType   = sortedScores[0][0];

    // Resolve secondary type using hexagon neighbor logic + ESP exception
    const secondaryType = resolveSecondaryType( primaryType, scores );

    return {
        primary     : NEN_TYPES[primaryType as keyof typeof NEN_TYPES],
        secondary   : NEN_TYPES[secondaryType as keyof typeof NEN_TYPES],
        scores,
        sortedScores
    };
}
