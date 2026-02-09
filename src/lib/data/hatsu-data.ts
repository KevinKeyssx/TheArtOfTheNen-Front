const NEN_FALLBACKS = [
    // --- INTENSIFICADOR (ENHANCER) ---
    {
        name: "Impacto Terrestre",
        kanji_name: "大地の一撃 (Daichi no Ichigeki)",
        type: "Intensificador",
        description: "Concentra el aura en los puños para aumentar la densidad ósea y muscular al golpear el suelo.",
        combat_style: "Cuerpo a cuerpo defensivo",
        conditions_and_vows: ["Solo se activa si el usuario mantiene ambos pies en el suelo", "Requiere una postura de meditación previa"],
        usage_example: "El usuario golpea el suelo creando una onda expansiva que desestabiliza al oponente."
    },
    {
        name: "Celeridad de Mercurio",
        kanji_name: "水銀の速さ (Suigin no Hayasa)",
        type: "Intensificador",
        description: "Intensifica la regeneración celular y la respuesta nerviosa para alcanzar velocidades sobrehumanas.",
        combat_style: "Velocidad extrema y contraataque",
        conditions_and_vows: ["El efecto dura un máximo de 30 segundos", "Causa fatiga muscular extrema tras su uso"],
        usage_example: "Esquiva proyectiles a quemarropa moviéndose antes de que el sonido llegue a sus oídos."
    },

    // --- TRANSMUTADOR (TRANSMUTER) ---
    {
        name: "Hilos de Plasma",
        kanji_name: "プラズマの糸 (Purazuma no Ito)",
        type: "Transmutador",
        description: "Cambia las propiedades del aura para que se comporte como seda extremadamente caliente y cortante.",
        combat_style: "Control de área y cortes precisos",
        conditions_and_vows: ["El usuario debe ser inmune al calor", "Los hilos se disuelven si tocan agua"],
        usage_example: "Crea una red invisible que incinera cualquier objeto que intente atravesar el perímetro."
    },
    {
        name: "Neblina de Mercurio",
        kanji_name: "水銀の霧 (Suigin no Kiri)",
        type: "Transmutador",
        description: "El aura adquiere la densidad y toxicidad del mercurio líquido en estado gaseoso.",
        combat_style: "Guerra de desgaste y sigilo",
        conditions_and_vows: ["Requiere contener la respiración durante el despliegue", "No puede usarse en lugares con viento fuerte"],
        usage_example: "Envuelve al enemigo en una nube que ralentiza sus movimientos y lo envenena lentamente."
    },

    // --- CONJURADOR (CONJURER) ---
    {
        name: "Cadenas del Juicio Silente",
        kanji_name: "沈黙の鎖 (Chinmoku no Kusari)",
        type: "Conjurador",
        description: "Materializa cadenas translúcidas que drenan el aura de quien tocan.",
        combat_style: "Captura y neutralización",
        conditions_and_vows: ["Solo pueden atrapar a un objetivo a la vez", "Si la cadena se rompe, el usuario pierde el uso del Nen por 24 horas"],
        usage_example: "Lanza la cadena desde las sombras para inmovilizar a un oponente desprevenido."
    },
    {
        name: "Grimorio de los Mil Ecos",
        kanji_name: "千の残響の魔導書 (Sen no Zankyō no Madōsho)",
        type: "Conjurador",
        description: "Conjura un libro que puede almacenar y replicar sonidos ambientales como proyectiles físicos.",
        combat_style: "Ataque a distancia y confusión",
        conditions_and_vows: ["El sonido debe haber sido escuchado en los últimos 10 minutos", "El libro debe permanecer abierto"],
        usage_example: "Libera el sonido de una explosión grabada previamente para generar una onda de choque real."
    },

    // --- EMISOR (EMITTER) ---
    {
        name: "Pulso del Vacío",
        kanji_name: "真空の脈動 (Shinkū no Myakudō)",
        type: "Emisor",
        description: "Dispara esferas de aura comprimida que explotan al contacto visual del usuario.",
        combat_style: "Bombardeo de largo alcance",
        conditions_and_vows: ["Debe marcar al objetivo con la mano derecha primero", "La potencia depende de la distancia (a más lejos, más fuerte)"],
        usage_example: "Lanza una esfera que queda suspendida en el aire y detona justo cuando el enemigo pasa cerca."
    },
    {
        name: "Centinela Espectral",
        kanji_name: "幽霊の番人 (Yūrei no Bannin)",
        type: "Emisor",
        description: "Emite una fracción de aura que toma forma humana para actuar de forma independiente.",
        combat_style: "Apoyo táctico y distracción",
        conditions_and_vows: ["El centinela no puede alejarse más de 50 metros", "El daño recibido por el centinela se refleja en el usuario"],
        usage_example: "Envía al centinela a flanquear al enemigo mientras el usuario se mantiene a cubierto."
    },

    // --- MANIPULADOR (MANIPULATOR) ---
    {
        name: "Aguja de Comandos",
        kanji_name: "指令の針 (Shirei no Hari)",
        type: "Manipulador",
        description: "Controla el sistema nervioso de cualquier ser vivo insertando pequeñas agujas de aura.",
        combat_style: "Control mental directo",
        conditions_and_vows: ["Requiere contacto directo con la nuca", "El control se pierde si el objetivo sufre un dolor extremo"],
        usage_example: "Convierte a un guardia en un aliado temporal para abrir una puerta asegurada."
    },
    {
        name: "Arquitecto de Sombras",
        kanji_name: "影の建築家 (Kage no Kenchikuka)",
        type: "Manipulador",
        description: "Manipula objetos inanimados de madera para que cambien de forma y estructura.",
        combat_style: "Manipulación del entorno",
        conditions_and_vows: ["Solo funciona con madera natural, no procesada", "El usuario debe tocar el objeto constantemente"],
        usage_example: "Transforma las raíces de un árbol en una jaula instantánea para atrapar al rival."
    },

    // --- ESPECIALISTA (SPECIALIST) ---
    {
        name: "Ojo del Destino",
        kanji_name: "運命の目 (Unmei no Me)",
        type: "Especialista",
        description: "Permite ver los eventos que ocurrirán en los próximos 3 segundos de forma constante.",
        combat_style: "Predicción y evasión perfecta",
        conditions_and_vows: ["Consume una gran cantidad de aura por segundo", "El usuario queda ciego por 1 minuto tras desactivarlo"],
        usage_example: "Esquiva un ataque que aún no ha comenzado basándose en la visión del futuro inmediato."
    },
    {
        name: "Ladrón de Conceptos",
        kanji_name: "概念の泥棒 (Gainen no Dorobō)",
        type: "Especialista",
        description: "Roba temporalmente un sentido (vista, oído, etc.) del oponente y lo añade al suyo.",
        combat_style: "Debilitamiento extremo",
        conditions_and_vows: ["Debe explicar su habilidad al oponente", "Solo puede robar un sentido a la vez"],
        usage_example: "Deja al enemigo en absoluta oscuridad mientras el usuario adquiere una visión nocturna perfecta."
    }
];

// Mapeo de tipos de Nen en español a inglés
const NEN_TYPE_MAP: Record<string, string> = {
    'Intensificador' : 'Enhancement',
    'Transmutador'   : 'Transmutation',
    'Conjurador'     : 'Conjuration',
    'Emisor'         : 'Emission',
    'Manipulador'    : 'Manipulation',
    'Especialista'   : 'Specialization'
};

// Función para obtener un fallback aleatorio según el tipo de Nen
export function getFallbackHatsu( nenType: string ): any {
    // Convertir el tipo de Nen del inglés al español si es necesario
    const spanishType = Object.keys( NEN_TYPE_MAP ).find( 
        key => NEN_TYPE_MAP[key] === nenType 
    ) || nenType;

    // Filtrar los fallbacks por tipo
    const fallbacksForType = NEN_FALLBACKS.filter( f => f.type === spanishType );

    // Si no hay fallbacks para ese tipo, devolver uno aleatorio
    if ( fallbacksForType.length === 0 ) {
        const randomIndex = Math.floor( Math.random() * NEN_FALLBACKS.length );
        return NEN_FALLBACKS[randomIndex];
    }

    // Seleccionar uno aleatorio de los 2 disponibles para ese tipo
    const randomIndex = Math.floor( Math.random() * fallbacksForType.length );
    return fallbacksForType[randomIndex];
}

export { NEN_FALLBACKS };