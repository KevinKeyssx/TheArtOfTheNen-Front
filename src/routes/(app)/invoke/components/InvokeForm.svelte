<script lang="ts">
    import { onMount } from 'svelte';

    import {
        borderColorClasses,
        colorClasses,
        nenColorVars,
        textColorClasses
    }                                   from "$lib/utils/nen-colors";
    import {
        getLocalStorage,
        setLocalStorage,
        LOCAL_STORAGE_KEYS
    }                                   from '$lib/utils/local-storage';
    import AuraButton                   from "$lib/components/buttons/aura-button.svelte";
    import { getFallbackHatsu }         from "$lib/data/hatsu-data";
    import { playSound, SOUND_FILES }   from "$lib/utils/player";
    import { COMBAT_TAGS }              from '$lib/data/combat-data';


    let {
        primary,
        secondary,
        pageState       = $bindable(),
        loading         = $bindable(),
        hatsuResult     = $bindable(),
        errorMessage    = $bindable()
    } = $props();


    let selectedTags = $state<string[]>( [] );
    let userIdea     = $state( '' );
    let retryCount   = $state( 0 );

    // Cargar datos al montar el componente
    onMount(() => {
        const savedIdea = getLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_IDEA );
        const savedTags = getLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_SELECTED );

        if ( savedIdea ) userIdea       = savedIdea;
        if ( savedTags ) selectedTags   = savedTags;
    });

    // Guardar cambios en localStorage
    $effect(() => {
        setLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_IDEA, userIdea );
        setLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_SELECTED, selectedTags );
    });

    // Helper: Determinar si un tag está bloqueado
    const isTagDisabled = ( tag: typeof COMBAT_TAGS[0] ): boolean => {
        const isForbiddenByPrimary  = tag.forbiddenTypes.includes( primary.code );
        const isSavedBySecondary    = tag.compatibleTypes.includes( secondary.code );

        // Se bloquea solo si el primario lo prohíbe Y el secundario no lo salva
        return isForbiddenByPrimary && !isSavedBySecondary;
    };

    // Helper: Determinar si un tag fue "salvado" por el tipo secundario
    const isTagSavedBySecondary = ( tag: typeof COMBAT_TAGS[0] ): boolean => {
        const isForbiddenByPrimary  = tag.forbiddenTypes.includes( primary.code );
        const isSavedBySecondary    = tag.compatibleTypes.includes( secondary.code );

        return isForbiddenByPrimary && isSavedBySecondary;
    };

    // Contar cuántos tags "salvados" están seleccionados
    const getSavedTagsCount = (): number => {
        return selectedTags.filter( tagId => {
            const tag = COMBAT_TAGS.find( t => t.id === tagId );
            return tag && isTagSavedBySecondary( tag );
        }).length;
    };

    // Validar si se puede seleccionar un tag
    const canSelectTag = ( tagId: string ): boolean => {
        const tag = COMBAT_TAGS.find( t => t.id === tagId );
        if ( !tag ) return false;

        // Si ya está seleccionado, siempre se puede deseleccionar
        if ( selectedTags.includes( tagId )) return true;

        // Si está bloqueado, no se puede seleccionar
        if ( isTagDisabled( tag )) return false;

        // Si ya hay 3 tags seleccionados, no se puede agregar más
        if ( selectedTags.length >= 3 ) return false;

        // Si es un tag "salvado" y ya hay 2 salvados, no se puede agregar
        if ( isTagSavedBySecondary( tag ) && getSavedTagsCount() >= 2 ) return false;

        return true;
    };


    function toggleTag( tagId: string ): void {
        if ( !canSelectTag( tagId )) return;

        if ( selectedTags.includes( tagId )) {
            selectedTags = selectedTags.filter( id => id !== tagId );
        } else {
            selectedTags    = [ ...selectedTags, tagId ];
            playSound( SOUND_FILES.SELECTED, 0.1 );
        }
    }


    async function generateAbility(): Promise<void> {
        if ( !primary || !secondary ) return;

        loading         = true;
        pageState       = 'invoking';
        retryCount      = 0;
        // loadingMessage  = 'Canalizando tu Aura...';

        try {
            // 1. Obtener las etiquetas seleccionadas
            const combatPreference = selectedTags
                .map( tagId => COMBAT_TAGS.find( t => t.id === tagId )?.label )
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
                selectedTags        : selectedTags
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

            <div class="flex flex-wrap gap-x-3 gap-y-2 mb-3">
                {#each COMBAT_TAGS as tag}
                    {@const isSelected = selectedTags.includes(tag.id)}
                    {@const isDisabled = isTagDisabled(tag)}
                    {@const isSaved = isTagSavedBySecondary(tag)}
                    {@const canSelect = canSelectTag(tag.id)}
                    {@const borderColor = isSaved ? nenColorVars[secondary.color] : nenColorVars[primary.color]}

                    <div class="relative group">
                        <button
                            onclick={() => toggleTag(tag.id)}
                            style={!isSelected && !isDisabled ? `border-color: ${borderColor}66;` : ''}
                            class="px-3 py-2 rounded-lg text-sm border-2 transition-all duration-300 relative
                            {isSelected
                                ? (isSaved 
                                    ? colorClasses[secondary.color] + '/20 ' + borderColorClasses[secondary.color] + ' ' + textColorClasses[secondary.color] + ' scale-105'
                                    : colorClasses[primary.color] + '/20 ' + borderColorClasses[primary.color] + ' ' + textColorClasses[primary.color] + ' scale-105')
                                : (isDisabled
                                    ? 'bg-card/50 border-border/30 text-muted-foreground/30 cursor-not-allowed opacity-40'
                                    : 'bg-card text-muted-foreground cursor-pointer hover:brightness-125')
                            }
                            {!canSelect && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}"
                            disabled={isDisabled || (!canSelect && !isSelected)}
                        >
                            <span class="flex items-center gap-1.5">
                                {#if isSaved && isSelected}
                                    <span class="text-xs">⭐</span>
                                {/if}

                                { tag.label }
                            </span>
                        </button>

                        <!-- Tooltip -->
                        {#if isDisabled}
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-900 text-zinc-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-zinc-700">
                                ❌ No compatible con tu tipo de Nen
                            </div>
                        {:else if isSaved}
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-900 text-amber-400 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-amber-700/50">
                                ⭐ Disponible gracias a {secondary.name} (Mayor dificultad)
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- Warning for 2 saved tags selected -->
            {#if getSavedTagsCount() >= 2}
                <div class="flex items-start gap-2 p-3 rounded-lg bg-amber-950/30 border border-amber-700/50 text-amber-200 text-sm">
                    <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>

                    <p>
                        <strong>Advertencia:</strong> Has seleccionado 2 estilos heredados por tu tipo secundario. 
                        No podrás agregar un tercer estilo de este tipo. Solo estilos compatibles con <span class="{textColorClasses[primary.color]} font-semibold">{primary.name}</span> estarán disponibles.
                    </p>
                </div>
            {/if}
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
