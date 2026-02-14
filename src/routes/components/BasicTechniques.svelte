<script lang="ts">
    import { BASIC_NEN_TECHNIQUES } from '$lib/data/nen-data';
    import TechniqueCard            from '$lib/components/cards/technique-card.svelte';
</script> 


<section id="basicas" class="py-20 px-4 bg-card/50 relative">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">Tecnicas Basicas</h2>

            <p class="text-muted-foreground max-w-2xl mx-auto">
                Las cuatro tecnicas fundamentales que todo usuario de Nen debe dominar. 
                Son la base sobre la cual se construyen todas las habilidades avanzadas.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each BASIC_NEN_TECHNIQUES as technique, index}
                <div class="animate-fade-in-up" style="animation-delay: {index * 0.15}s;">
                    <TechniqueCard {technique} isBasic={true} />
                </div>
            {/each}
        </div>
    </div>
</section>
