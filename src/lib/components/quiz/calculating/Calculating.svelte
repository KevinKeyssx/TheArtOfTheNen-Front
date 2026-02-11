<script lang="ts">
    import AuraFarm from "$lib/components/loaders/aura-farm.svelte";
</script>


<div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
        <!-- Animated hexagon -->
        <div class="relative w-48 h-48 mx-auto mb-8">
            <AuraFarm
                size={1.5}
            />
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
