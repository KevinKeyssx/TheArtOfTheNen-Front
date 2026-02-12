<script lang="ts">
    import { playSound, SOUND_FILES } from '$lib/utils/player';


    let {
        questions,
        isSoundEffectMuted = false,
        onComplete
    } = $props();


    let currentQuestionIndex    = $state(0);
    let selectedOption          = $state<string | null>(null);
    let isTransitioning         = $state(false);
    let answers                 = $state<string[]>([]);


    const currentQuestion       = $derived( questions[ currentQuestionIndex ] );
    const progress              = $derived((( currentQuestionIndex ) / questions.length ) * 100 );
    const progressAfterAnswer   = $derived((( currentQuestionIndex + 1 ) / questions.length ) * 100 );


    function selectAnswer( value: string ) {
        if ( isTransitioning ) return;

        // Reproducir sonido de selección si no está muteado
        if ( !isSoundEffectMuted ) {
            playSound( SOUND_FILES.SELECTED, 0.1 );
        }

        selectedOption  = value;
        isTransitioning = true;

        setTimeout(() => {
            const updatedAnswers = [...answers, value];
            answers = updatedAnswers;

            if ( currentQuestionIndex < questions.length - 1 ) {
                currentQuestionIndex++;
                selectedOption  = null;
                isTransitioning = false;
            } else {
                onComplete( updatedAnswers );
            }
        }, 600);
    }
</script>

<div class="min-h-screen flex flex-col pt-20 pb-8 px-4">
    <!-- Progress bar -->
    <div class="max-w-2xl mx-auto w-full mb-8 mt-12 xl:mt-0 animate-fade-in-down">
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
                <div class="">
                    <h2 class="text-xl sm:text-2xl font-bold text-amber-500 mb-8 text-center text-balance drop-shadow-lg animate-zoom-in">
                        { currentQuestion.question }
                    </h2>

                    <div class="space-y-3 ">
                        {#each currentQuestion.options as option, index}
                        {@const isSelected = selectedOption === option.value}
                        <button
                            onclick={() => selectAnswer(option.value)}
                            disabled={isTransitioning}
                            class="w-full p-4 text-left rounded-xl border-2 transition-all animate-fade-in-up animate-delay-[{index * 0.5}s]
                            {isSelected 
                                ? 'bg-amber-600/20 border-amber-400 scale-[1.02] shadow-lg shadow-amber-500/40'
                                : 'bg-amber-900/10 border-amber-700/30 hover:border-amber-500/60 hover:bg-amber-800/20 backdrop-blur-sm'
                            }
                            {isTransitioning && !isSelected ? 'opacity-50' : ''}
                            disabled:cursor-not-allowed"
                        >
                            <div class="flex items-start gap-3">
                                <span class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold shrink-0 
                                    {isSelected ? 'bg-amber-500 text-white border-amber-300' : 'text-amber-300 border-amber-600'}">
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