<script lang="ts">
    import { getRandomQuestions, calculateNenResult }   from '$lib/data/nen-data';
    import QuizResult                                   from '$lib/components/quiz-result.svelte';


    let audio               : HTMLAudioElement | null = null;
    let isSoundEffectMuted  = $state( false );

    type QuizState = 'intro' | 'quiz' | 'calculating' | 'result';

    // Mapeo de estados a archivos de sonido
    const stateSounds: Partial<Record<QuizState, string>> = {
        calculating : '/sounds/loading.wav',
        result      : '/sounds/celebrate.wav'
    };

    // Reproducir sonido según el estado del quiz
    $effect(() => {
        const soundFile = stateSounds[ quizState ];

        if ( soundFile && ( quizState !== 'result' || result )) {
            audio?.pause();
            audio           = new Audio( soundFile );
            audio.volume    = 0.3;
            audio.play().catch( err => console.error( 'Error al reproducir sonido:', err ));
        }
    });

    // Funcion para mezclar array (Fisher-Yates shuffle)
    function shuffleArray<T>( array: T[] ): T[] {
        const shuffled = [ ...array ];

        for ( let i = shuffled.length - 1; i > 0; i-- ) {
            const j = Math.floor( Math.random() * ( i + 1 ));
            [ shuffled[ i ], shuffled[ j ]] = [ shuffled[ j ], shuffled[ i ]];
        }

        return shuffled;
    }

    // Obtener preguntas con opciones ya shuffleadas
    function getQuestionsWithShuffledOptions() {
        const randomQuestions = getRandomQuestions(7);

        return randomQuestions.map( q => ({
            ...q,
            options: shuffleArray( q.options )
        }));
    }


    let quizState               = $state< QuizState>('intro' );
    let questions               = $state( getQuestionsWithShuffledOptions() );
    let currentQuestionIndex    = $state(0);
    let answers                 = $state<string[]>( [] );
    let result                  = $state<ReturnType<typeof calculateNenResult> | null>( null );
    let selectedOption          = $state<string | null>( null );
    let isTransitioning         = $state( false );


    const currentQuestion       = $derived( questions[ currentQuestionIndex ] );
    const progress              = $derived((( currentQuestionIndex ) / questions.length ) * 100 );
    const progressAfterAnswer   = $derived((( currentQuestionIndex + 1 ) / questions.length ) * 100 );


    function startQuiz() {
        questions               = getQuestionsWithShuffledOptions();
        currentQuestionIndex    = 0;
        answers                 = [];
        result                  = null;
        quizState               = 'quiz';
    }


    function selectAnswer( value: string ) {
        if ( isTransitioning ) return;

        // Reproducir sonido de selección si no está muteado
        if ( !isSoundEffectMuted ) {
            const audio     = new Audio( '/sounds/selected.wav' );
            audio.volume    = 0.1; // Volumen al 10%
            audio.play().catch( err => console.error( 'Error al reproducir sonido:', err ));
        }

        selectedOption  = value;
        isTransitioning = true;

        setTimeout(() => {
            answers = [...answers, value];

            if ( currentQuestionIndex < questions.length - 1 ) {
                currentQuestionIndex++;
                selectedOption  = null;
                isTransitioning = false;
            } else {
                quizState       = 'calculating';

                // Dramatic calculation delay
                setTimeout(() => {
                    result          = calculateNenResult( answers );
                    quizState       = 'result';
                    isTransitioning = false;
                }, 3000);
            }
        }, 600);
    }


    function restartQuiz() {
        quizState       = 'intro';
        selectedOption  = null;
        isTransitioning = false;
    }
</script>


<svelte:head>
    <title>Descubre tu Tipo de Nen - Hunter x Hunter</title>
    <meta name="description" content="Responde este quiz de personalidad y descubre cual seria tu tipo de Nen si fueras un usuario en Hunter x Hunter." />
</svelte:head>


<div class="min-h-screen bg-background relative overflow-hidden">

    <!-- Intro State -->
    {#if quizState === 'intro'}
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-2xl mx-auto text-center animate-fade-in-up">
                <!-- Aura animation -->
                <div class="relative w-32 h-32 mx-auto mb-8">
                    <div class="absolute inset-0 rounded-full bg-primary/20 aura-pulse"></div>
                    <div class="absolute inset-4 rounded-full bg-primary/30 aura-pulse" style="animation-delay: 0.3s;"></div>
                    <div class="absolute inset-8 rounded-full bg-primary/40 aura-pulse" style="animation-delay: 0.6s;"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-4xl font-bold text-primary">?</span>
                    </div>
                </div>

                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Descubre tu Tipo de <span class="text-primary">Nen</span>
                </h1>

                <p class="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                    Responde 7 preguntas sobre tu personalidad y descubre cual seria tu tipo de aura 
                    en el mundo de Hunter x Hunter.
                </p>

                <div class="bg-amber-500/10 backdrop-blur-sm rounded-lg p-4 mt-4 mb-4 flex items-center gap-2 mx-auto max-w-lg border border-amber-600/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle text-amber-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                    <span class="text-sm text-amber-200">Se reproducirá un sonido de fondo para ayudarte a concentrarte. No dudes en apagarlo si lo deseas.</span>
                </div>

                <div class="space-y-4">
                    <button 
                        onclick={startQuiz}
                        class="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all hover:scale-105"
                    >
                        Comenzar el Test
                    </button>

                    <p class="text-sm text-muted-foreground">
                        El test toma aproximadamente 2-3 minutos
                    </p>
                </div>
            </div>
        </div>
    {/if}

    <!-- Quiz State -->
    {#if quizState === 'quiz'}
        <div class="min-h-screen flex flex-col pt-20 pb-8 px-4">
            <!-- Progress bar -->
            <div class="max-w-2xl mx-auto w-full mb-8">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-muted-foreground">Pregunta {currentQuestionIndex + 1} de {questions.length}</span>

                    <span class="text-sm text-primary font-medium">{Math.round(selectedOption ? progressAfterAnswer : progress)}%</span>
                </div>

                <div class="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                        class="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                        style="width: {selectedOption ? progressAfterAnswer : progress}%;"
                    ></div>
                </div>
            </div>

            <!-- Question -->
            <div class="flex-1 flex items-center justify-center">
                <div class="max-w-2xl mx-auto w-full">
                    {#key currentQuestionIndex}
                        <div class="animate-fade-in-up">
                            <h2 class="text-xl sm:text-2xl font-bold text-white mb-8 text-center text-balance drop-shadow-lg">
                                {currentQuestion.question}
                            </h2>

                            <div class="space-y-3">
                                {#each currentQuestion.options as option, index}
                                {@const isSelected = selectedOption === option.value}
                                <button
                                    onclick={() => selectAnswer(option.value)}
                                    disabled={isTransitioning}
                                    class="w-full p-4 text-left rounded-xl border-2 transition-all duration-300 
                                    {isSelected 
                                        ? 'bg-purple-600/20 border-purple-400 scale-[1.02] shadow-lg shadow-purple-500/40'
                                        : 'bg-purple-900/10 border-purple-700/30 hover:border-purple-500/60 hover:bg-purple-800/20 backdrop-blur-sm'
                                    }
                                    {isTransitioning && !isSelected ? 'opacity-50' : ''}
                                    disabled:cursor-not-allowed"
                                    style="animation-delay: {index * 0.05}s;"
                                >
                                    <div class="flex items-start gap-3">
                                        <span class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold shrink-0 
                                            {isSelected ? 'bg-purple-500 text-white border-purple-300' : 'text-purple-300 border-purple-600'}">
                                            {String.fromCharCode(65 + index)}
                                        </span>

                                        <span class="text-white font-medium">{option.text}</span>
                                    </div>
                                </button>
                                {/each}
                            </div>
                        </div>
                    {/key}
                </div>
            </div>
        </div>
    {/if}

    <!-- Calculating State -->
    {#if quizState === 'calculating'}
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="text-center">
                <!-- Animated hexagon -->
                <div class="relative w-48 h-48 mx-auto mb-8">
                    <svg class="w-full h-full animate-spin" style="animation-duration: 3s;" viewBox="0 0 200 200">
                        <polygon 
                        points="100,10 180,55 180,145 100,190 20,145 20,55" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        stroke-width="2"
                        />
                        <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="hsl(45 100% 50%)" />
                            <stop offset="20%" stop-color="hsl(280 80% 60%)" />
                            <stop offset="40%" stop-color="hsl(200 90% 55%)" />
                            <stop offset="60%" stop-color="hsl(330 85% 55%)" />
                            <stop offset="80%" stop-color="hsl(140 70% 45%)" />
                            <stop offset="100%" stop-color="hsl(25 95% 55%)" />
                        </linearGradient>
                        </defs>
                    </svg>

                    <!-- Inner pulsing circles -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-24 h-24 rounded-full bg-primary/20 aura-pulse"></div>
                    </div>

                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full bg-primary/30 aura-pulse" style="animation-delay: 0.3s;"></div>
                    </div>

                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-8 h-8 rounded-full bg-primary/50 aura-pulse" style="animation-delay: 0.6s;"></div>
                    </div>
                </div>

                <video 
                    src="/videos/aura_test.mp4" 
                    autoplay 
                    loop 
                    muted 
                    playsinline
                    class="rounded-lg shadow-lg mx-auto mb-6 max-w-xs w-full"
                >
                    Tu navegador no soporta videos.
                </video>

                <h2 class="text-2xl font-bold text-foreground mb-2">Farmeando tu Aura...</h2>

                <p class="text-muted-foreground">Determinando tu tipo de Nen</p>

                <!-- Loading dots -->
                <div class="flex items-center justify-center gap-2 mt-6">
                    {#each [0, 1, 2] as i}
                        <div 
                        class="w-3 h-3 rounded-full bg-primary"
                        style="animation: aura-pulse 1s ease-in-out infinite; animation-delay: {i * 0.2}s;"
                        ></div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}

    <!-- Result State -->
    {#if quizState === 'result' && result}
        <QuizResult {result} onRestart={restartQuiz} />
    {/if}
</div>
