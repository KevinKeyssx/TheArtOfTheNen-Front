<script lang="ts">
    import { goto } from '$app/navigation';

    import { toPng } from 'html-to-image';

    import {
        colorClasses,
        textColorClasses,
        borderColorClasses
    }                           from '$lib/utils/nen-colors';
    import PulseButton          from '$lib/components/buttons/pulse-button.svelte';
    import ShareButton          from '$lib/components/buttons/share-button.svelte';
    import AuraButton           from '$lib/components/buttons/aura-button.svelte';
    import NenCard              from '$lib/components/cards/nen-card.svelte';
    import RepeatIcon           from '$lib/components/icons/RepeatIcon.svelte';
    import Graphic              from '$lib/components/quiz/result/Graphic.svelte';
    import Share                from '$lib/components/quiz/result/Share.svelte';
    import type { NenResult }   from '$lib/models/nen';


    let { result, onRestart }: { result: NenResult; onRestart: () => void } = $props();
    let showShareDialog = $state( false );
    let generatedImage  = $state<string | null>( null );


    const shareCardId = 'hatsu-share-card';


    function toggleShareDialog() {
        if ( showShareDialog ) {
            showShareDialog = false;
        } else {
            if ( !generatedImage ) {
                shareAsImage();
            } else {
                showShareDialog = true;
            }
        }
    }


    async function shareAsImage() {
        const elementToCapture = document.getElementById( shareCardId );

        if ( !elementToCapture ) {
            console.error( "No se encontró el elemento" );
            return;
        }

        try {
            // Aseguramos carga de fuentes o estilos
            await new Promise( resolve => setTimeout( resolve, 100 ));

            const dataUrl = await toPng(elementToCapture, { 
                cacheBust       : true,
                backgroundColor : '#0c0e12',
                pixelRatio      : 2, // Mejor calidad
                style           : {
                    transform: 'scale(1)',
                }
            });

            generatedImage  = dataUrl;
            showShareDialog = true;
        } catch ( error ) {
            console.error('Error generando la imagen:', error);
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center  relative">
    <!-- Large background glow -->
    <div  class="max-w-4xl mx-auto w-full relative">
        <!-- !HTMLToImage -->
        <div id={ shareCardId } class="px-18 space-y-6 pt-12 pb-6">
            <div class="text-center opacity-0 animate-fade-in-up" style="animation-delay: 200ms; animation-fill-mode: both;">
                <h1 class="text-2xl sm:text-3xl font-bold text-foreground mb-2">Tu Tipo de Nen ha sido Revelado</h1>
                <!-- <p class="text-muted-foreground">Basado en tus respuestas, este es tu perfil de aura</p> -->
            </div>

            <NenCard
                borderColor = { result.primary.color }
                showGlow    = { true }
                showAura    = { true }
            >
                <div class="flex items-center justify-center gap-2 mb-2">
                    <span class="px-3 py-1 text-sm font-medium rounded-full {colorClasses[result.primary.color]}/50 {textColorClasses[result.primary.color]}">
                        Tipo Principal
                    </span>
                </div>

                <h2 class="text-3xl text-center mb-4 sm:text-4xl font-bold {textColorClasses[result.primary.color]}">
                    { result.primary.name }
                </h2>

                <video 
                    src="/videos/{result.primary.name}.mp4" 
                    autoplay 
                    loop 
                    muted 
                    playsinline
                    class="rounded-lg shadow-lg mx-auto mb-6 max-w-xs w-full"
                >
                    Tu navegador no soporta videos.
                </video>

                <p class="text-center text-zinc-200 max-w-xl mx-auto mb-2">
                    { result.primary.test.action }
                </p>

                <p class="text-center text-zinc-400 max-w-xl mx-auto mb-4 text-[13px]">
                    { result.primary.test.description }
                </p>

                <p class="text-center text-zinc-300 max-w-xl mx-auto mb-4">
                    { result.primary.longDescription }
                </p>

                <div class="flex flex-wrap justify-center gap-2">
                    {#each result.primary.characters as character}
                        <span class="px-3 py-1 text-sm rounded-full {colorClasses[result.primary.color]}/10 {textColorClasses[result.primary.color]} border {borderColorClasses[result.primary.color]}">
                            { character }
                        </span>
                    {/each}
                </div>
            </NenCard>

            <!-- Secondary Type -->
            <NenCard
                borderColor = { result.secondary.color }
                showGlow    = { false }
                class       = "animate-delay-1000"
                showAura    = { true }
            >
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-full {colorClasses[result.secondary.color]}/20 flex items-center justify-center shrink-0">
                        <div class="w-10 h-10 rounded-full {colorClasses[result.secondary.color]} aura-pulse"></div>
                    </div>

                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 text-xs font-medium rounded-full {colorClasses[result.secondary.color]}/20 {textColorClasses[result.secondary.color]}">
                                Tipo Secundario
                            </span>
                        </div>

                        <h3 class="text-xl font-bold {textColorClasses[result.secondary.color]}">
                            { result.secondary.name }
                        </h3>

                        <p class="text-sm text-muted-foreground">{ result.secondary.description }</p>
                    </div>
                </div>
            </NenCard>

            <!-- Score Breakdown (Radar Chart) -->
            <Graphic {result} />
        </div>

        <!-- Actions -->
        <div class="animate-zoom-in animate-duration-1000 animate-delay-3000 mb-10">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-0 flex-wrap">
                <!-- Botón de repetir -->
                <PulseButton text="Repetir el Test" onClick={onRestart} >
                    <RepeatIcon />
                </PulseButton>

                <!-- Botón de invocar habilidad -->
                <AuraButton
                    text            = "Invocar mi Habilidad Especial"
                    onclick         = {() => goto(`/invoke?primary=${result.primary.code}&secondary=${result.secondary.code}`)}
                    primaryColor    = { result.primary.color }
                />

                <!-- Botón de Compartir -->
                <ShareButton onClick={() => toggleShareDialog()} text="Compartir Resultado" />
            </div>
        </div>
    </div>
</div>

<Share
    { result }
    { generatedImage }
    onclick={ toggleShareDialog }
    { showShareDialog }
/>
