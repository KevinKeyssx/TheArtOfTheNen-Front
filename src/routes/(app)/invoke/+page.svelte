<script lang="ts">
    import { onMount } from 'svelte';
    import { NEN_TYPES } from '$lib/data/nen-data';

    // type NenType = (typeof NEN_TYPES)[keyof typeof NEN_TYPES];
    type PageState = 'form' | 'invoking' | 'revealed';

    // Get types from URL
    let primaryCode = $state('INT');
    let secondaryCode = $state('EMI');

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        primaryCode = params.get('primary') || 'INT';
        secondaryCode = params.get('secondary') || 'EMI';
    });

    const primary = $derived(NEN_TYPES[primaryCode as keyof typeof NEN_TYPES] || NEN_TYPES.INT);
    const secondary = $derived(NEN_TYPES[secondaryCode as keyof typeof NEN_TYPES] || NEN_TYPES.EMI);

    let pageState = $state<PageState>('form');
    let userIdea = $state('');
    let selectedTags = $state<string[]>([]);

    const combatTags = [
        { id: 'melee', label: 'Combate cuerpo a cuerpo', icon: '&#9876;' },
        { id: 'ranged', label: 'Ataques a distancia', icon: '&#127919;' },
        { id: 'defense', label: 'Defensa y proteccion', icon: '&#128737;' },
        { id: 'stealth', label: 'Sigilo y espionaje', icon: '&#128065;' },
        { id: 'support', label: 'Soporte y curacion', icon: '&#10084;' },
        { id: 'trap', label: 'Trampas y emboscadas', icon: '&#9881;' },
        { id: 'summon', label: 'Invocaciones', icon: '&#128126;' },
        { id: 'area', label: 'Control de area', icon: '&#127758;' },
        { id: 'speed', label: 'Velocidad y agilidad', icon: '&#9889;' },
        { id: 'mental', label: 'Control mental', icon: '&#129504;' },
    ];

    function toggleTag(tagId: string) {
        if (selectedTags.includes(tagId)) {
        selectedTags = selectedTags.filter(t => t !== tagId);
        } else if (selectedTags.length < 3) {
        selectedTags = [...selectedTags, tagId];
        }
    }

    const colorClasses: Record<string, string> = {
        'nen-int': 'bg-nen-int',
        'nen-tra': 'bg-nen-tra',
        'nen-mat': 'bg-nen-mat',
        'nen-esp': 'bg-nen-esp',
        'nen-man': 'bg-nen-man',
        'nen-emi': 'bg-nen-emi'
    };

    const textColorClasses: Record<string, string> = {
        'nen-int': 'text-nen-int',
        'nen-tra': 'text-nen-tra',
        'nen-mat': 'text-nen-mat',
        'nen-esp': 'text-nen-esp',
        'nen-man': 'text-nen-man',
        'nen-emi': 'text-nen-emi'
    };

    const borderColorClasses: Record<string, string> = {
        'nen-int': 'border-nen-int/50',
        'nen-tra': 'border-nen-tra/50',
        'nen-mat': 'border-nen-mat/50',
        'nen-esp': 'border-nen-esp/50',
        'nen-man': 'border-nen-man/50',
        'nen-emi': 'border-nen-emi/50'
    };

    const glowClasses: Record<string, string> = {
        'nen-int': 'glow-nen-int',
        'nen-tra': 'glow-nen-tra',
        'nen-mat': 'glow-nen-mat',
        'nen-esp': 'glow-nen-esp',
        'nen-man': 'glow-nen-man',
        'nen-emi': 'glow-nen-emi'
    };

    const nenColorVars: Record<string, string> = {
        'nen-int': 'hsl(45 100% 50%)',
        'nen-tra': 'hsl(280 80% 60%)',
        'nen-mat': 'hsl(200 90% 55%)',
        'nen-esp': 'hsl(330 85% 55%)',
        'nen-man': 'hsl(140 70% 45%)',
        'nen-emi': 'hsl(25 95% 55%)'
    };

    // Ability generation data per nen type
    const abilityNames: Record<string, string[]> = {
        INT: ['Puno del Titan', 'Aura Inquebrantable', 'Rafaga del Coloso', 'Impacto Primordial'],
        TRA: ['Hilo de Caos', 'Metamorfosis Arcana', 'Espejismo Letal', 'Tormenta Ilusoria'],
        MAT: ['Forja del Vacio', 'Arsenal Espectral', 'Cadena del Destino', 'Armadura Eterea'],
        ESP: ['Ojo del Abismo', 'Dominio Absoluto', 'Singularidad Nen', 'Presagio Carmesi'],
        MAN: ['Titiritero Sombra', 'Red de Obediencia', 'Marioneta Imperial', 'Voluntad Dominante'],
        EMI: ['Canon de Aura', 'Estrella Fugaz', 'Disparo del Fenix', 'Impulso Devastador']
    };

    const abilityDescriptions: Record<string, string[]> = {
        INT: [
        'Tu aura se concentra en tu cuerpo hasta alcanzar una densidad extrema. Cada golpe que asestas con tus punos o piernas lleva la fuerza de cien guerreros. Al activar esta habilidad, tu piel brilla con un resplandor dorado y el suelo se agrieta bajo tus pies. Los enemigos que te rodean sienten una presion aplastante solo por estar cerca de ti.',
        'Tu defensa es legendaria. Al mantener un flujo constante de aura reforzada, puedes recibir ataques devastadores sin retroceder un solo paso. Tu cuerpo se convierte en una fortaleza viviente, y cuanto mas dano recibes, mas fuerte se vuelve tu contraataque.',
        'Canalizas toda tu energia vital en un unico punto de contacto. El impacto genera una onda expansiva capaz de destruir estructuras enteras. Esta tecnica requiere una concentracion absoluta y un compromiso total, pero su poder es incomparable.'
        ],
        TRA: [
        'Tu aura se transforma en una sustancia eterea que cambia de forma a tu voluntad. Puedes crear hilos invisibles que cortan el acero, convertir tu energia en electricidad que paraliza al contacto, o generar un veneno sutil que debilita gradualmente a tus enemigos.',
        'Dominas el arte del engano a nivel molecular. Tu aura puede imitar cualquier sustancia: fuego que no quema, hielo que no enfria, veneno que cura. Tus oponentes nunca saben que esperar y cada ataque tuyo es una sorpresa letal.',
        'Generas una tormenta de aura transmutada que envuelve el campo de batalla. Las particulas de tu energia cambian constantemente entre estados, creando un caos controlado que solo tu puedes navegar.'
        ],
        MAT: [
        'Creas objetos solidos a partir de la nada, materializando armas, escudos y herramientas con propiedades unicas. Cada objeto que generas lleva una condicion especial que multiplica su poder. Tu arsenal es ilimitado y cada pieza es una obra maestra de precision.',
        'Tu mente es tu mejor arma. Puedes materializar cadenas irrompibles, libros que registran la verdad absoluta, o jaulas que encierran incluso el aura mas poderosa. Cada creacion tiene reglas estrictas, pero dentro de esas reglas, tu poder es absoluto.',
        'Forjas una armadura eterea que se adapta a cada situacion. Puede crecer espinas contra atacantes cuerpo a cuerpo, generar un campo de fuerza contra proyectiles, o volverse invisible para infiltraciones. La armadura evoluciona contigo.'
        ],
        ESP: [
        'Tu habilidad desafia toda clasificacion conocida del Nen. Puedes copiar temporalmente la habilidad de cualquier usuario que hayas visto en accion, pero la usas de una forma completamente diferente y personal. Los maestros del Nen debaten si tu poder es un don o una maldicion.',
        'Tienes la capacidad unica de ver el "flujo del destino" de las personas. Puedes predecir sus proximos movimientos, sus intenciones ocultas y sus debilidades mas profundas. Esta vision va mas alla del Gyo; es una percepcion sobrenatural que solo los Especialistas mas dotados poseen.',
        'Tu aura genera un dominio personal donde las reglas normales del Nen dejan de aplicar. Dentro de tu territorio, puedes alterar la naturaleza misma de como funciona el aura, dandote una ventaja absoluta contra cualquier oponente.'
        ],
        MAN: [
        'Puedes tomar el control de cualquier objeto o ser vivo que haya sido marcado por tu aura. Tu dominio es silencioso e invisible; tus objetivos no saben que estan siendo controlados hasta que es demasiado tarde. Puedes coordinar decenas de marionetas simultaneamente con precision militar.',
        'Tejes una red invisible de comandos de aura que se activan con condiciones especificas. Puedes programar acciones complejas en objetos o personas, creando un sistema autonomo de defensa y ataque que funciona incluso mientras duermes.',
        'Tu manipulacion alcanza el nivel mas alto: el control de la voluntad. Con un simple toque, puedes implantar sugestiones, alterar recuerdos o hacer que tus aliados temporalmente superen sus limites naturales.'
        ],
        EMI: [
        'Lanzas esferas de aura concentrada a velocidades increibles. Cada proyectil lleva una carga devastadora que explota al contacto, creando crateres del tamano de casas. Puedes controlar la trayectoria de tus disparos incluso despues de lanzarlos, haciendo imposible esquivarlos.',
        'Liberas tu aura como una estrella fugaz que atraviesa cualquier defensa. Tu ataque principal viaja a la velocidad del sonido y deja un rastro luminoso que ciega a tus enemigos. La intensidad emocional que sientes amplifica exponencialmente su poder.',
        'Tu aura se proyecta como un ave fenix que renace con cada ataque. Cada vez que tu proyectil es destruido, se regenera con el doble de fuerza. Tu impulsividad y tus emociones son el combustible perfecto para esta habilidad imparable.'
        ]
    };

    // Conditions / Vows
    const vows: Record<string, string[]> = {
        INT: [
        'Solo puede activarse cuando decides proteger a alguien importante.',
        'Requiere que te mantengas de pie sin retroceder durante el combate.',
        'Cada uso acorta tu expectativa de vida en proporcion al dano infligido.'
        ],
        TRA: [
        'La transmutacion dura solo mientras mantengas una mentira activa.',
        'Debes tocar al oponente al menos una vez antes de revelar tu verdadero poder.',
        'Cambias de forma aleatoriamente si pierdes la concentracion.'
        ],
        MAT: [
        'Cada objeto materializado requiere una condicion especifica para existir.',
        'No puedes crear mas de tres objetos simultaneamente sin riesgo mortal.',
        'Los objetos desaparecen si alguien descubre su debilidad oculta.'
        ],
        ESP: [
        'Tu habilidad solo funciona durante luna llena o en momentos de gran estres emocional.',
        'Cada uso borra un recuerdo aleatorio de tu pasado.',
        'No puedes usar la misma manifestacion dos veces contra el mismo oponente.'
        ],
        MAN: [
        'Solo puedes controlar a quienes han aceptado voluntariamente tu autoridad.',
        'Si tu objetivo resiste tu control, sufres el doble del dano que intentabas infligir.',
        'Debes mantener contacto visual constante con tus marionetas activas.'
        ],
        EMI: [
        'Tu poder aumenta proporcionalmente a la distancia de tu hogar.',
        'Cada disparo consume una emocion intensa; sin pasion, no hay poder.',
        'Si fallas tres ataques consecutivos, pierdes toda tu aura temporalmente.'
        ]
    };

    let abilityResult = $state<{
        name: string;
        description: string;
        vow: string;
        secondaryBonus: string;
    } | null>(null);

    // Invoking animation states
    let invokeParticles = $state<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
    let showRevealPhase = $state(0); // 0: none, 1: name, 2: description, 3: vow, 4: secondary, 5: full

    function generateAbility() {
        const names = abilityNames[primaryCode] || abilityNames.INT;
        const descs = abilityDescriptions[primaryCode] || abilityDescriptions.INT;
        const vowList = vows[primaryCode] || vows.INT;

        const name = names[Math.floor(Math.random() * names.length)];
        const description = descs[Math.floor(Math.random() * descs.length)];
        const vow = vowList[Math.floor(Math.random() * vowList.length)];

        const secondaryBonuses: Record<string, string> = {
        INT: 'Tu afinidad secundaria con la Intensificacion te permite reforzar fisicamente cualquier habilidad, haciendola mas resistente y duradera en combate prolongado.',
        TRA: 'Tu afinidad secundaria con la Transmutacion te permite modificar las propiedades de tu habilidad principal, anadiendole un elemento sorpresa que confunde a tus enemigos.',
        MAT: 'Tu afinidad secundaria con la Materializacion te permite crear un objeto fisico que potencia tu habilidad principal, dandole forma tangible y condiciones adicionales.',
        ESP: 'Tu afinidad secundaria con la Especializacion anade un componente unico e irrepetible a tu habilidad, algo que ningun otro usuario de Nen podra replicar jamas.',
        MAN: 'Tu afinidad secundaria con la Manipulacion te permite dirigir tu habilidad con precision quirurgica, controlando su trayectoria y comportamiento como si tuviera voluntad propia.',
        EMI: 'Tu afinidad secundaria con la Emision te permite proyectar tu habilidad a grandes distancias, eliminando la necesidad de estar cerca de tu objetivo.'
        };

        abilityResult = {
        name,
        description,
        vow,
        secondaryBonus: secondaryBonuses[secondaryCode] || secondaryBonuses.INT
        };

        pageState = 'invoking';

        // Generate particles for animation
        const particles = [];
        for (let i = 0; i < 40; i++) {
        particles.push({
            id: i,
            x: 50 + (Math.random() - 0.5) * 60,
            y: 50 + (Math.random() - 0.5) * 40,
            size: Math.random() * 8 + 3,
            delay: Math.random() * 1.5
        });
        }
        invokeParticles = particles;

        // Staggered reveal
        setTimeout(() => { pageState = 'revealed'; showRevealPhase = 1; }, 2500);
        setTimeout(() => showRevealPhase = 2, 3200);
        setTimeout(() => showRevealPhase = 3, 4500);
        setTimeout(() => showRevealPhase = 4, 5500);
        setTimeout(() => showRevealPhase = 5, 6500);
    }
    </script>

    <svelte:head>
    <title>Invocar Habilidad Especial - Hunter x Hunter Nen</title>
    <meta name="description" content="Descubre cual seria tu habilidad especial Nen basada en tu tipo de aura." />
    </svelte:head>

    <div class="min-h-screen bg-background relative overflow-hidden">

    <!-- FORM STATE -->
    {#if pageState === 'form'}
        <div class="min-h-screen flex items-center justify-center px-4 py-20">
        <div class="max-w-2xl mx-auto w-full">
            <div class="text-center mb-10 animate-fade-in-up">
            <!-- Animated aura icon -->
            <div class="relative w-24 h-24 mx-auto mb-6">
                <div class="absolute inset-0 rounded-full {colorClasses[primary.color]}/20 aura-pulse"></div>
                <div class="absolute inset-3 rounded-full {colorClasses[primary.color]}/30 aura-pulse" style="animation-delay: 0.3s;"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-10 h-10 {textColorClasses[primary.color]}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                </div>
            </div>

            <h1 class="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-balance">
                Invoca tu <span class="{textColorClasses[primary.color]}">Habilidad Especial</span>
            </h1>
            <p class="text-muted-foreground max-w-lg mx-auto">
                Basado en tu tipo principal <span class="{textColorClasses[primary.color]} font-medium">{primary.name}</span>
                y tu secundario <span class="{textColorClasses[secondary.color]} font-medium">{secondary.name}</span>,
                vamos a descubrir cual seria tu Hatsu unico.
            </p>
            </div>

            <!-- Type indicators -->
            <div class="flex items-center justify-center gap-4 mb-8 animate-fade-in-up" style="animation-delay: 0.1s;">
            <div class="flex items-center gap-2 px-4 py-2 rounded-full {colorClasses[primary.color]}/10 border {borderColorClasses[primary.color]}">
                <div class="w-3 h-3 rounded-full {colorClasses[primary.color]} aura-pulse"></div>
                <span class="{textColorClasses[primary.color]} text-sm font-medium">{primary.name}</span>
            </div>
            <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <div class="flex items-center gap-2 px-4 py-2 rounded-full {colorClasses[secondary.color]}/10 border {borderColorClasses[secondary.color]}">
                <div class="w-3 h-3 rounded-full {colorClasses[secondary.color]} aura-pulse"></div>
                <span class="{textColorClasses[secondary.color]} text-sm font-medium">{secondary.name}</span>
            </div>
            </div>

            <!-- Combat style tags -->
            <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.2s;">
                <span class="block text-sm font-medium text-foreground mb-3">
                    Elige hasta 3 estilos de combate que te atraigan
                </span>

                <div class="flex flex-wrap gap-2">
                    {#each combatTags as tag}
                    {@const isSelected = selectedTags.includes(tag.id)}
                    <button
                        onclick={() => toggleTag(tag.id)}
                        class="px-3 py-2 rounded-lg text-sm border transition-all duration-300
                        {isSelected
                            ? colorClasses[primary.color] + '/20 ' + borderColorClasses[primary.color] + ' ' + textColorClasses[primary.color] + ' scale-105'
                            : 'bg-card border-border text-muted-foreground hover:border-muted-foreground/50'
                        }
                        {!isSelected && selectedTags.length >= 3 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}"
                        disabled={!isSelected && selectedTags.length >= 3}
                    >
                        <span class="flex items-center gap-1.5">
                            <span>{@html tag.icon}</span>

                            {tag.label}
                        </span>
                    </button>
                    {/each}
                </div>
            </div>

            <!-- Textarea for ideas -->
            <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.3s;">
                <label for="idea" class="block text-sm font-medium text-foreground mb-3">
                    Tienes alguna idea de habilidad en mente? (Opcional)
                </label>
                <textarea
                    id="idea"
                    bind:value={userIdea}
                    placeholder="Ejemplo: Me gustaria una habilidad que me permita controlar las sombras, o algo relacionado con el fuego y la velocidad..."
                    rows={4}
                    class="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                ></textarea>
            </div>

            <!-- Submit button -->
            <div class="text-center animate-fade-in-up" style="animation-delay: 0.4s;">
                <button
                    onclick={generateAbility}
                    class="group relative px-8 py-4 rounded-xl font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 border {borderColorClasses[primary.color]} {glowClasses[primary.color]}"
                    style="background: linear-gradient(135deg, {nenColorVars[primary.color]}22, {nenColorVars[secondary.color]}22);"
                >
                    <span class="relative z-10 {textColorClasses[primary.color]} flex items-center gap-3">
                        <svg class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Invocar mi Habilidad Especial
                        </span>
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="background: linear-gradient(135deg, {nenColorVars[primary.color]}33, {nenColorVars[secondary.color]}33);"></div>
                </button>
            </div>
        </div>
        </div>
    {/if}

    <!-- INVOKING STATE -->
    {#if pageState === 'invoking'}
        <div class="min-h-screen flex items-center justify-center px-4">
        <div class="text-center relative">
            <!-- Rising particles -->
            <div class="fixed inset-0 pointer-events-none overflow-hidden">
            {#each invokeParticles as particle}
                <div
                class="absolute rounded-full {colorClasses[primary.color]}/60 animate-rise-particle"
                style="
                    left: {particle.x}%;
                    top: {particle.y}%;
                    width: {particle.size}px;
                    height: {particle.size}px;
                    animation-delay: {particle.delay}s;
                    animation-duration: {2 + Math.random()}s;
                "
                ></div>
            {/each}
            </div>

            <!-- Central energy orb -->
            <div class="relative w-48 h-48 mx-auto mb-8">
            <!-- Outer ring spinning -->
            <div class="absolute inset-0 animate-spin-slow">
                <svg class="w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke={nenColorVars[primary.color]} stroke-width="1" stroke-dasharray="10 20" opacity="0.5" />
                <circle cx="100" cy="100" r="80" fill="none" stroke={nenColorVars[secondary.color]} stroke-width="1" stroke-dasharray="15 15" opacity="0.3" />
                </svg>
            </div>

            <!-- Inner pulsing orb -->
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-32 h-32 rounded-full {colorClasses[primary.color]}/20 aura-pulse"></div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-24 h-24 rounded-full {colorClasses[primary.color]}/30 aura-pulse" style="animation-delay: 0.2s;"></div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full {colorClasses[primary.color]}/50 aura-pulse" style="animation-delay: 0.4s;"></div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-8 h-8 rounded-full {colorClasses[primary.color]} aura-pulse" style="animation-delay: 0.6s;"></div>
            </div>
            </div>

            <h2 class="text-2xl font-bold text-foreground mb-2">Canalizando tu Aura...</h2>
            <p class="{textColorClasses[primary.color]} text-lg">Tu Hatsu esta tomando forma</p>

            <!-- Loading dots -->
            <div class="flex items-center justify-center gap-2 mt-6">
            {#each [0, 1, 2, 3, 4] as i}
                <div
                class="w-2 h-2 rounded-full {colorClasses[primary.color]}"
                style="animation: aura-pulse 1s ease-in-out infinite; animation-delay: {i * 0.15}s;"
                ></div>
            {/each}
            </div>
        </div>
        </div>
    {/if}

    <!-- REVEALED STATE -->
    {#if pageState === 'revealed' && abilityResult}
        <div class="min-h-screen flex items-center justify-center px-4 py-20">
        <!-- Background glow -->
        <div
            class="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl transition-opacity duration-1000 {colorClasses[primary.color]}"
        ></div>

        <div class="max-w-3xl mx-auto w-full relative z-10">
            <!-- Phase 1: Ability Name -->
            {#if showRevealPhase >= 1}
            <div class="text-center mb-10 animate-energy-charge">
                <p class="text-sm {textColorClasses[primary.color]} mb-4 tracking-widest uppercase">Tu Hatsu ha sido revelado</p>

                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold {textColorClasses[primary.color]} mb-3" style="text-shadow: 0 0 40px {nenColorVars[primary.color]}, 0 0 80px {nenColorVars[primary.color]}40;">
                {abilityResult.name}
                </h1>

                <div class="flex items-center justify-center gap-3 mt-4">
                <span class="px-3 py-1 text-xs rounded-full {colorClasses[primary.color]}/20 {textColorClasses[primary.color]} border {borderColorClasses[primary.color]}">
                    {primary.name}
                </span>
                <span class="text-muted-foreground">+</span>
                <span class="px-3 py-1 text-xs rounded-full {colorClasses[secondary.color]}/20 {textColorClasses[secondary.color]} border {borderColorClasses[secondary.color]}">
                    {secondary.name}
                </span>
                </div>
            </div>
            {/if}

            <!-- Phase 2: Description -->
            {#if showRevealPhase >= 2}
            <div class="mb-8 animate-fade-in-up">
                <div class="p-6 rounded-2xl bg-card border {borderColorClasses[primary.color]} relative overflow-hidden">
                <div class="absolute inset-0 {colorClasses[primary.color]}/5"></div>
                <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-4">
                    <div class="w-1 h-6 rounded-full {colorClasses[primary.color]}"></div>
                    <h3 class="text-lg font-bold text-foreground">Descripcion de la Habilidad</h3>
                    </div>
                    <p class="text-foreground/90 leading-relaxed text-base">
                    {abilityResult.description}
                    </p>
                </div>
                </div>
            </div>
            {/if}

            <!-- Phase 3: Vow/Condition -->
            {#if showRevealPhase >= 3}
            <div class="mb-8 animate-fade-in-up">
                <div class="p-6 rounded-2xl bg-card border border-destructive/30 relative overflow-hidden">
                <div class="absolute inset-0 bg-destructive/5"></div>
                <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-4">
                    <div class="w-1 h-6 rounded-full bg-destructive"></div>
                    <h3 class="text-lg font-bold text-foreground">Juramento y Restriccion</h3>
                    </div>
                    <p class="text-foreground/90 leading-relaxed">
                    <span class="text-destructive font-medium">Condicion: </span>
                    {abilityResult.vow}
                    </p>
                    <p class="text-sm text-muted-foreground mt-3">
                    En el mundo del Nen, las restricciones mas severas otorgan el mayor poder. Tu juramento es el precio de tu fuerza.
                    </p>
                </div>
                </div>
            </div>
            {/if}

            <!-- Phase 4: Secondary Bonus -->
            {#if showRevealPhase >= 4}
            <div class="mb-8 animate-fade-in-up">
                <div class="p-6 rounded-2xl bg-card border {borderColorClasses[secondary.color]} relative overflow-hidden">
                <div class="absolute inset-0 {colorClasses[secondary.color]}/5"></div>
                <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-4">
                    <div class="w-1 h-6 rounded-full {colorClasses[secondary.color]}"></div>
                    <h3 class="text-lg font-bold text-foreground">Bonus de Afinidad: <span class="{textColorClasses[secondary.color]}">{secondary.name}</span></h3>
                    </div>
                    <p class="text-foreground/90 leading-relaxed">
                    {abilityResult.secondaryBonus}
                    </p>
                </div>
                </div>
            </div>
            {/if}

            <!-- Phase 5: Actions -->
            {#if showRevealPhase >= 5}
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
                <button
                onclick={() => { pageState = 'form'; showRevealPhase = 0; abilityResult = null; invokeParticles = []; selectedTags = []; userIdea = ''; }}
                class="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-all hover:scale-105"
                >
                Invocar otra Habilidad
                </button>
                <a
                href="/quiz"
                class="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-all hover:scale-105"
                >
                Repetir el Test
                </a>
                <a
                href="/"
                class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105"
                >
                Explorar mas sobre el Nen
                </a>
            </div>
            {/if}
        </div>
        </div>
    {/if}
</div>
