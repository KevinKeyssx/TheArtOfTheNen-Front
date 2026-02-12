export const COMBAT_TAGS = [
    // --- FÍSICOS / DIRECTOS ---
    { 
        id: 'melee', 
        label: '🗡️ Combate cuerpo a cuerpo', 
        forbiddenTypes: ['MAN', 'ESP'], 
        compatibleTypes: ['INT', 'TRA', 'EMI', 'MAT'] 
    },
    { 
        id: 'speed', 
        label: '⚡ Velocidad y agilidad', 
        forbiddenTypes: [], 
        compatibleTypes: ['INT', 'TRA', 'EMI', 'MAT', 'MAN', 'ESP'] 
    },
    { 
        id: 'defense', 
        label: '🛡️ Defensa y protección', 
        forbiddenTypes: [], 
        compatibleTypes: ['INT', 'TRA', 'EMI', 'MAT', 'MAN', 'ESP'] 
    },
    
    // --- DISTANCIA / ENERGÍA ---
    { 
        id: 'ranged', 
        label: '🏹 Ataques a distancia', 
        forbiddenTypes: ['INT'], 
        compatibleTypes: ['EMI', 'TRA', 'ESP'] 
    },
    { 
        id: 'area', 
        label: '🌪️ Control de área', 
        forbiddenTypes: ['INT'], 
        compatibleTypes: ['EMI', 'TRA', 'MAN'] 
    },
    { 
        id: 'support', 
        label: '❤️ Soporte y curación', 
        forbiddenTypes: ['TRA', 'MAT'], 
        compatibleTypes: ['INT', 'EMI', 'ESP'] 
    },

    // --- TÁCTICOS / COMPLEJOS ---
    { 
        id: 'weaponmaster', 
        label: '⚔️ Invocación de armas/objetos', 
        forbiddenTypes: ['INT', 'EMI'], 
        compatibleTypes: ['MAT', 'TRA', 'MAN'] 
    },
    { 
        id: 'elements', 
        label: '🔥 Transmutación elemental (Fuego, Rayo, etc.)', 
        forbiddenTypes: ['MAN', 'EMI'], 
        compatibleTypes: ['TRA', 'MAT', 'INT'] 
    },
    { 
        id: 'stealth', 
        label: '👁️ Sigilo y espionaje', 
        forbiddenTypes: ['INT'], 
        compatibleTypes: ['TRA', 'MAT', 'MAN', 'ESP'] 
    },
    { 
        id: 'trap', 
        label: '💣 Trampas y emboscadas', 
        forbiddenTypes: ['INT'], 
        compatibleTypes: ['MAN', 'MAT', 'TRA'] 
    },
    { 
        id: 'summon', 
        label: '🧟 Invocaciones (Bestias de Nen)', 
        forbiddenTypes: ['INT', 'TRA'], 
        compatibleTypes: ['EMI', 'MAT', 'MAN'] 
    },
    { 
        id: 'mental', 
        label: '🧠 Control mental y manipulación', 
        forbiddenTypes: ['INT', 'TRA', 'EMI'], 
        compatibleTypes: ['MAN', 'ESP'] 
    },
    { 
        id: 'utility', 
        label: '🛠️ Utilidad no ofensiva (Rastreo, Información)', 
        forbiddenTypes: [], 
        compatibleTypes: ['MAN', 'MAT', 'ESP', 'TRA', 'EMI', 'INT'] 
    },
    { 
        id: 'curse', 
        label: '🧿 Maldiciones y restricciones (Debuff)', 
        forbiddenTypes: ['INT', 'EMI'], 
        compatibleTypes: ['MAT', 'MAN', 'ESP'] 
    },
    { 
        id: 'spatial', 
        label: '🌀 Manipulación del espacio/tiempo', 
        forbiddenTypes: ['INT', 'TRA', 'EMI'], 
        compatibleTypes: ['ESP', 'MAT'] 
    }
];
