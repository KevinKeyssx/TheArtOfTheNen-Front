<script lang="ts">
    import { onMount }  from 'svelte';
    import { goto }     from '$app/navigation';

        import {
        Chart,
        RadarController,
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    }                   from 'chart.js';
    import { toPng }    from 'html-to-image';

    import type { NEN_TYPES }   from '$lib/data/nen-data';
    import PulseButton          from '$lib/components/buttons/pulse-button.svelte';
    import ShareButton          from '$lib/components/buttons/share-button.svelte';
    import AuraButton           from '$lib/components/buttons/aura-button.svelte';
    import NenCard              from '$lib/components/cards/nen-card.svelte';
    import RepeatIcon           from '$lib/components/icons/RepeatIcon.svelte';


    Chart.register(
        RadarController,
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );

    type NenType = ( typeof NEN_TYPES )[keyof typeof NEN_TYPES];


    type Result = {
        primary         : NenType;
        secondary       : NenType;
        scores          : Record<string, number>;
        sortedScores    : [string, number][];
    };

    let { result, onRestart }: { result: Result; onRestart: () => void } = $props();
    let showShareDialog = $state( false );
    let copySuccess     = $state( false );

    // Generar el texto para compartir (usando $derived para evitar warnings)
    const shareText     = $derived( `¡Acabo de descubrir mi tipo de Nen! Soy ${result.primary.name} con ${result.secondary.name} secundario. 🔥✨⚡ ¿Cuál es el tuyo?` );
    const shareUrl      = typeof window !== 'undefined' ? window.location.href : '';

    // Funciones para compartir en diferentes plataformas
    function shareOnTwitter() {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent( shareText )}&url=${encodeURIComponent( shareUrl )}`;
        window.open( url, '_blank', 'width=600,height=400' );
    }

    function shareOnFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent( shareUrl )}&quote=${encodeURIComponent( shareText )}`;
        window.open( url, '_blank', 'width=600,height=400' );
    }

    function shareOnWhatsApp() {
        const url = `https://wa.me/?text=${encodeURIComponent( `${shareText} ${shareUrl}` )}`;
        window.open( url, '_blank' );
    }

    function shareOnLinkedIn() {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent( shareUrl )}`;
        window.open( url, '_blank', 'width=600,height=400' );
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText( `${shareText} ${shareUrl}` );
            copySuccess = true;
            setTimeout(() => copySuccess = false, 2000 );
        } catch ( err ) {
            console.error( 'Error al copiar:', err );
        }
    }

    function toggleShareDialog() {
        // showShareDialog = !showShareDialog;
        shareAsImage();
    }

    const colorClasses: Record<string, string> = {
        'nen-int'   : 'bg-nen-int',
        'nen-tra'   : 'bg-nen-tra',
        'nen-mat'   : 'bg-nen-mat',
        'nen-esp'   : 'bg-nen-esp',
        'nen-man'   : 'bg-nen-man',
        'nen-emi'   : 'bg-nen-emi'
    };


    const textColorClasses: Record<string, string> = {
        'nen-int'   : 'text-nen-int',
        'nen-tra'   : 'text-nen-tra',
        'nen-mat'   : 'text-nen-mat',
        'nen-esp'   : 'text-nen-esp',
        'nen-man'   : 'text-nen-man',
        'nen-emi'   : 'text-nen-emi'
    };


    const borderColorClasses: Record<string, string> = {
        'nen-int'   : 'border-nen-int/50',
        'nen-tra'   : 'border-nen-tra/50',
        'nen-mat'   : 'border-nen-mat/50',
        'nen-esp'   : 'border-nen-esp/50',
        'nen-man'   : 'border-nen-man/50',
        'nen-emi'   : 'border-nen-emi/50'
    };

    let chartCanvas = $state<HTMLCanvasElement>();
    let chartInstance: Chart | null = null;

    onMount(() => {
        // Chart initialization
        // Pequeño timeout para asegurar que el canvas tenga dimensiones correctas antes de renderizar
        setTimeout(() => {
            if ( chartCanvas ) {
                // Orden estándar del hexágono: INT -> TRA -> MAT -> ESP -> MAN -> EMI
                const labels = [ 'Intensificación', 'Transmutación', 'Materialización', 'Especialización', 'Manipulación', 'Emisión' ];
                const dataOrder = [ 'INT', 'TRA', 'MAT', 'ESP', 'MAN', 'EMI' ];
                const data = dataOrder.map( code => result.scores[code] || 0 );

                // Determinar colores basados en el tipo principal
                const primaryColorClass = result.primary.color; // ej: 'nen-int'
                // Mapa rápido de colores hexadecimales para el gráfico (ya que chart.js no usa clases tailwind directamente)
                const colorMap: Record<string, string> = {
                    'nen-int': '#facc15', // yellow-400
                    'nen-tra': '#a855f7', // purple-500
                    'nen-mat': '#3b82f6', // blue-500
                    'nen-esp': '#ec4899', // pink-500
                    'nen-man': '#22c55e', // green-500
                    'nen-emi': '#f97316'  // orange-500
                };

                // Array de colores correspondiente al orden de los datos
                const pointColors = [
                    colorMap['nen-int'], // Intensificación
                    colorMap['nen-tra'], // Transmutación
                    colorMap['nen-mat'], // Materialización
                    colorMap['nen-esp'], // Especialización
                    colorMap['nen-man'], // Manipulación
                    colorMap['nen-emi']  // Emisión
                ];

                const mainColor = colorMap[primaryColorClass] || '#ffffff';

                chartInstance = new Chart(chartCanvas, {
                    type: 'radar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Afinidad de Aura',
                            data: data,
                            fill: true,
                            backgroundColor: `${mainColor}33`, // 20% opacity del tipo principal
                            borderColor: mainColor,
                            borderWidth: 2,
                            // Puntos multicolores
                            pointBackgroundColor: pointColors, 
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: pointColors,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                min: 0,
                                max: 7, // Fijamos el máximo en 7 para que la escala sea absoluta y correcta
                                beginAtZero: true,
                                angleLines: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                    circular: false // Líneas rectas (hexagonal) para ser fiel al diagrama original de Nen
                                },
                                pointLabels: {
                                    // Etiquetas multicolores usando callback para evitar error de tipos
                                    color: (context) => pointColors[context.index],
                                    font: {
                                        size: 13,
                                        family: "'Arial', sans-serif",
                                        weight: 'bold'
                                    },
                                    backdropPadding: 10
                                },
                                ticks: {
                                    display: false,
                                    backdropColor: 'transparent'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            padding: 10,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return `Puntos: ${context.raw}`;
                                }
                            }
                        }
                        }
                    }
                });
            }
        }, 100);

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    });




    async function shareAsImage() {
        const elementToCapture = document.getElementById('hatsu-share-card');

        if (!elementToCapture) {
            console.error("No se encontró el elemento");
            return;
        }

        try {
            // TRUCO: A veces las fuentes tardan en cargar y la imagen sale con texto Times New Roman.
            // Esperamos un micro-segundo o aseguramos carga.
            
            // 1. Generar la imagen usando html-to-image
            // filter: ignora elementos que no quieras en la foto (como botones de control si los hubiera)
            const dataUrl = await toPng(elementToCapture, { 
                cacheBust: true,
                backgroundColor: '#0c0e12', // Forzamos un color de fondo por si acaso es transparente
                style: {
                    transform: 'scale(1)', // Asegura que no se deforme
                }
            });

            // 2. Usar Web Share API
            if (navigator.share) {
                const blob = await (await fetch(dataUrl)).blob();
                const file = new File([blob], `mi-hatsu-${result.primary.name}.png`, { type: 'image/png' });

                try {
                    await navigator.share({
                        title: 'Mi Habilidad Nen',
                        text: `Soy un usuario de ${result.primary.name} en Hunter x Hunter. ¡Descubre tu tipo!`,
                        files: [file]
                    });
                } catch (shareError) {
                    console.log('Compartir cancelado');
                }
            } else {
                // Fallback Escritorio
                const link = document.createElement('a');
                link.download = `mi-hatsu-${result.primary.name}.png`;
                link.href = dataUrl;
                link.click();
            }

        } catch (error) {
            console.error('Error generando la imagen:', error);
            alert("No pudimos generar la imagen. Intenta tomar una captura de pantalla.");
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center px-4 py-10 relative">
    <!-- Large background glow -->
    <div 
        class="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-0 blur-3xl animate-fade-in {colorClasses[result.primary.color]}/20"
        style="animation-delay: 800ms; animation-fill-mode: both;"
    ></div>

    <div  class="max-w-4xl mx-auto w-full relative z-10 space-y-6">
        <!-- !HTML2Canvas -->
        <div id="hatsu-share-card" class="space-y-6  px-18 py-4">

        <div class="text-center opacity-0 animate-fade-in-up" style="animation-delay: 200ms; animation-fill-mode: both;">
            <h1 class="text-2xl sm:text-3xl font-bold text-foreground mb-2">Tu Tipo de Nen ha sido Revelado</h1>

            <!-- <p class="text-muted-foreground">Basado en tus respuestas, este es tu perfil de aura</p> -->
        </div>

        <!-- Primary Type -->
        <!-- <div class="opacity-0 animate-reveal" style="animation-delay: 800ms; animation-fill-mode: both;"> -->
        <div>
            <NenCard borderColor={result.primary.color} showGlow={true}>
                <div class="flex items-center justify-center gap-2 mb-4">
                    <span class="px-3 py-1 text-sm font-medium rounded-full {colorClasses[result.primary.color]}/20 {textColorClasses[result.primary.color]}">
                        Tipo Principal
                    </span>
                </div>

                <!-- <div class="flex flex-col items-center mb-6"> -->
                    <!-- <div class="w-24 h-24 rounded-full {colorClasses[result.primary.color]}/30 flex items-center justify-center mb-4 relative">
                        <div class="absolute inset-0 rounded-full {colorClasses[result.primary.color]}/20 aura-pulse"></div>
                        <div class="w-16 h-16 rounded-full {colorClasses[result.primary.color]} aura-pulse"></div>
                    </div> -->

                    <!-- <h2 class="text-3xl text-center mb-4 sm:text-4xl font-bold {textColorClasses[result.primary.color]} mb-2"> -->
                    <h2 class="text-3xl text-center mb-4 sm:text-4xl font-bold">
                        {result.primary.name}
                    </h2>
                    <!-- <p class="text-sm text-muted-foreground">{result.primary.fullName}</p> -->
                <!-- </div> -->

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
                    {result.primary.test.action}
                </p>

                <p class="text-center text-zinc-400 max-w-xl mx-auto mb-4 text-[13px]">
                    { result.primary.test.description }
                </p>

                <p class="text-center text-zinc-300 max-w-xl mx-auto mb-4">
                    {result.primary.longDescription}
                </p>

                <div class="flex flex-wrap justify-center gap-2">
                    {#each result.primary.characters as character}
                        <span class="px-3 py-1 text-sm rounded-full {colorClasses[result.primary.color]}/10 {textColorClasses[result.primary.color]} border {borderColorClasses[result.primary.color]}">
                            {character}
                        </span>
                    {/each}
                </div>
            </NenCard>
        </div>

        <!-- Secondary Type -->
        <!-- <div class="opacity-0 animate-fade-in-up" style="animation-delay: 1500ms; animation-fill-mode: both;"> -->
            <NenCard borderColor={result.secondary.color} showGlow={true}>
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
                            {result.secondary.name}
                        </h3>

                        <p class="text-sm text-muted-foreground">{result.secondary.description}</p>
                    </div>
                </div>
            </NenCard>
        <!-- </div> -->

        <!-- Score Breakdown (Radar Chart) -->


        <!-- <div class="opacity-0 animate-fade-in-up" style="animation-delay: 2200ms; animation-fill-mode: both;"> -->
            <NenCard borderColor={result.primary.color} showGlow={false}>
                <!-- <div> -->
                <!-- <div class="p-6 rounded-xl border border-border relative overflow-hidden backdrop-blur-sm" style="background: linear-gradient( 135deg, hsl( var( --card ) )95, hsl( var( --card ) ) );">   -->
                    <!-- <h3 class="text-lg font-bold text-foreground mb-4 relative z-10 text-center">Distribución de tu Aura</h3> -->

                    <div class="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center">
                        <canvas bind:this={chartCanvas}></canvas>
                    </div>

                    <!-- Leyenda opcional o detalles adicionales si se desea, por ahora solo el gráfico es suficiente y muy visual -->
                <!-- </div> -->
            <!-- </div> -->
            </NenCard>
           
        <!-- </div> -->

       
        </div>

        <!-- Actions -->
        <div class="opacity-0 animate-fade-in-up" style="animation-delay: 2800ms; animation-fill-mode: both;">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 flex-wrap">
                <!-- Botón de repetir -->
                <PulseButton text="Repetir el Test" onClick={onRestart} >
                    <RepeatIcon />
                </PulseButton>

                <!-- Botón de invocar habilidad -->
                <AuraButton
                    text="Invocar mi Habilidad Especial"
                    onclick={() => goto(`/invoke?primary=${result.primary.code}&secondary=${result.secondary.code}`)}
                    primaryColor={result.primary.color}
                />

                <!-- Botón de Compartir -->
                <ShareButton onClick={() => toggleShareDialog()} text="Compartir Resultado" />
            </div>
        </div>
    </div>
</div>

<!-- Diálogo de Compartir -->
{#if showShareDialog}
    <div 
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        onclick={toggleShareDialog}
        onkeydown={( e ) => e.key === 'Escape' && toggleShareDialog()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-dialog-title"
        tabindex="-1"
    >
        <div 
            class="bg-card/50 border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in"
            onclick={( e ) => e.stopPropagation()}
            onkeydown={( e ) => e.stopPropagation()}
            role="presentation"
        >
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <h3 id="share-dialog-title" class="text-xl font-bold text-foreground">Compartir Resultado</h3>
                <button
                    onclick={toggleShareDialog}
                    class="w-8 h-8 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center"
                    aria-label="Cerrar"
                >
                    <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Preview del mensaje -->
            <div class="mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
                <p class="text-sm text-muted-foreground mb-2">Vista previa:</p>
                <p class="text-foreground text-sm">{shareText}</p>
            </div>

            <!-- Opciones de compartir -->
            <div class="space-y-3 mb-6">
                <!-- Twitter -->
                <button
                    onclick={shareOnTwitter}
                    class="w-full p-4 rounded-lg border border-border hover:bg-secondary/50 transition-all hover:scale-[1.02] flex items-center gap-3 group"
                >
                    <div class="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center group-hover:bg-[#1DA1F2]/20 transition-colors">
                        <svg class="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </div>
                    <div class="flex-1 text-left">
                        <p class="font-medium text-foreground">Twitter / X</p>
                        <p class="text-xs text-muted-foreground">Compartir en Twitter</p>
                    </div>
                    <svg class="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>

                <!-- Facebook -->
                <button
                    onclick={shareOnFacebook}
                    class="w-full p-4 rounded-lg border border-border hover:bg-secondary/50 transition-all hover:scale-[1.02] flex items-center gap-3 group"
                >
                    <div class="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-[#1877F2]/20 transition-colors">
                        <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </div>
                    <div class="flex-1 text-left">
                        <p class="font-medium text-foreground">Facebook</p>
                        <p class="text-xs text-muted-foreground">Compartir en Facebook</p>
                    </div>
                    <svg class="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>

                <!-- WhatsApp -->
                <button
                    onclick={shareOnWhatsApp}
                    class="w-full p-4 rounded-lg border border-border hover:bg-secondary/50 transition-all hover:scale-[1.02] flex items-center gap-3 group"
                >
                    <div class="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                        <svg class="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </div>
                    <div class="flex-1 text-left">
                        <p class="font-medium text-foreground">WhatsApp</p>
                        <p class="text-xs text-muted-foreground">Compartir en WhatsApp</p>
                    </div>
                    <svg class="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>

                <!-- LinkedIn -->
                <button
                    onclick={shareOnLinkedIn}
                    class="w-full p-4 rounded-lg border border-border hover:bg-secondary/50 transition-all hover:scale-[1.02] flex items-center gap-3 group"
                >
                    <div class="w-10 h-10 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                        <svg class="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </div>
                    <div class="flex-1 text-left">
                        <p class="font-medium text-foreground">LinkedIn</p>
                        <p class="text-xs text-muted-foreground">Compartir en LinkedIn</p>
                    </div>
                    <svg class="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>

            <!-- Copiar al portapapeles -->
            <button
                onclick={copyToClipboard}
                class="w-full p-4 rounded-lg border-2 border-dashed border-border hover:bg-secondary/50 transition-all hover:scale-[1.02] flex items-center gap-3 group"
            >
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {#if copySuccess}
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    {:else}
                        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                    {/if}
                </div>
                <div class="flex-1 text-left">
                    <p class="font-medium text-foreground">
                        {copySuccess ? '¡Copiado!' : 'Copiar enlace'}
                    </p>
                    <p class="text-xs text-muted-foreground">
                        {copySuccess ? 'Enlace copiado al portapapeles' : 'Copiar al portapapeles'}
                    </p>
                </div>
            </button>
        </div>
    </div>
{/if}
