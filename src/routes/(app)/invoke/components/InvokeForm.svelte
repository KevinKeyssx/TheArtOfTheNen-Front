<script lang="ts">
    import { onMount } from 'svelte';

    import {
        borderColorClasses,
        colorClasses,
        textColorClasses
    }                                   from "$lib/utils/nen-colors";
    import AuraButton                   from "$lib/components/buttons/aura-button.svelte";
    import { getFallbackHatsu }         from "$lib/data/hatsu-data";
    import { playSound, SOUND_FILES }   from "$lib/utils/player";


    let {
        primary,
        secondary,
        pageState       = $bindable(),
        loading         = $bindable(),
        hatsuResult     = $bindable(),
        errorMessage    = $bindable()
    } = $props();


    let selectedTags = $state<string[]>([]);
    let userIdea     = $state('');
    let retryCount   = $state(0);

    // Cargar datos al montar el componente
    onMount(() => {
        const savedIdea = localStorage.getItem( 'userIdea' );
        const savedTags = localStorage.getItem( 'selectedTags' );

        if ( savedIdea ) userIdea       = savedIdea;
        if ( savedTags ) selectedTags   = JSON.parse( savedTags );
    });

    // Guardar cambios en localStorage
    $effect(() => {
        if ( typeof window !== 'undefined' ) {
            localStorage.setItem( 'userIdea', userIdea );
            localStorage.setItem( 'selectedTags', JSON.stringify( selectedTags ));
        }
    });


    function toggleTag( tagId: string ): void {
        selectedTags = selectedTags.includes( tagId )
            ? selectedTags.filter( t => t !== tagId )
            : [...selectedTags, tagId];

        if ( selectedTags.includes( tagId )) {
            playSound( SOUND_FILES.SELECTED, 0.1 );
        }
    }


    const combatTags = [
        { id: 'melee',      label: '🗡️ Combate cuerpo a cuerpo' },
        { id: 'ranged',     label: '🏹 Ataques a distancia' },
        { id: 'defense',    label: '🛡️ Defensa y proteccion' },
        { id: 'stealth',    label: '👁️ Sigilo y espionaje' },
        { id: 'support',    label: '❤️ Soporte y curacion' },
        { id: 'trap',       label: '💣 Trampas y emboscadas' },
        { id: 'summon',     label: '🧟 Invocaciones' },
        { id: 'area',       label: '🌪️ Control de area' },
        { id: 'speed',      label: '⚡ Velocidad y agilidad' },
        { id: 'mental',     label: '🧠 Control mental' },
    ];


    async function generateAbility(): Promise<void> {
        if ( !primary || !secondary ) return;

        loading         = true;
        pageState       = 'invoking';
        retryCount      = 0;
        // loadingMessage  = 'Canalizando tu Aura...';

        try {
            // 1. Obtener las etiquetas seleccionadas
            const combatPreference = selectedTags
                .map( tagId => combatTags.find( t => t.id === tagId )?.label )
                .filter( Boolean )
                .join( ', ' );

            // 2. Crear un resumen de personalidad basado en los tipos
            const personalitySummary = `Tipo primario: ${primary.name} (${primary.description}). ` +
                `Tipo secundario: ${secondary.name} (${secondary.description}).`;

            // 3. Preparar los datos para enviar al API
            const requestData = {
                primaryType         : primary.name,
                secondaryType       : secondary.name,
                personalitySummary  : personalitySummary,
                combatPreference    : combatPreference || 'Sin preferencia específica',
                userInputIdea       : userIdea || 'Sorpréndeme con algo único',
            };

            // Función auxiliar para intentar generar con la API
            const tryGenerateWithAPI = async (): Promise<boolean> => {
                try {
                    const response = await fetch( '/api/generate-hatsu', {
                        method  : 'POST',
                        headers : { 'Content-Type': 'application/json' },
                        body    : JSON.stringify( requestData )
                    });

                    if ( response.ok ) {
                        hatsuResult = await response.json();
                        return true;
                    } else {
                        // const errorData = await response.json();
                        return false;
                    }
                } catch ( error ) {
                    return false;
                }
            };

            // PRIMER INTENTO
            let success = await tryGenerateWithAPI();

            // SEGUNDO INTENTO (si el primero falló)
            if ( !success ) {
                retryCount = 1;
                errorMessage = 'Tu flujo de aura es inestable en este momento. Los maestros de la asociación están analizando tu perfil, ten paciencia.';

                // Esperar un momento antes del segundo intento
                await new Promise( resolve => setTimeout( resolve, 3000 ));

                success = await tryGenerateWithAPI();
            }

            // FALLBACK HARDCODEADO (si ambos intentos fallaron)
            if ( !success ) {
                retryCount  = 2;
                hatsuResult = getFallbackHatsu( primary.name );
                success     = true;
            }

            // Si tenemos resultado (ya sea de API o fallback), mostrar
            if ( success && hatsuResult ) {
                // Cambiar al estado revelado con animaciones escalonadas
                setTimeout(() => {
                    pageState = 'revealed';
                }, 3000 );
            } else {
                // Si aún así no hay resultado, volver al formulario
                pageState = 'form';
            }
        } catch ( error ) {
            console.error('Error generating ability:', error);
            pageState = 'form';
            errorMessage = 'Error al generar tu Hatsu. Intenta de nuevo.';
        } finally {
            loading = false;
        }
    }
</script>


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
                vamos a descubrir cual sería tu Hatsu único.
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

            <div class="flex flex-wrap gap-x-3 gap-y-2">
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
                            { tag.label }
                        </span>
                    </button>
                {/each}
            </div>
        </div>

        <!-- Textarea for ideas -->
        <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.3s;">
            <label for="idea" class="block text-sm font-medium text-foreground mb-3">
                Tienes alguna idea de habilidad, estilo o reglas en mente? (Opcional)
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
        <div class="text-center animate-fade-in-up flex justify-center" style="animation-delay: 0.4s;">
            <AuraButton
                text            = "Invocar mi Habilidad Especial"
                onclick         = { generateAbility }
                primaryColor    = { primary.color }
            />
        </div>
    </div>
</div>
