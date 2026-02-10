<script lang="ts">
    import {
        NEN_TYPES,
        BASIC_NEN_TECHNIQUES,
        ADVANCED_NEN_TECHNIQUES
    }                       from '$lib/data/nen-data';
    import NenHexagon       from '$lib/components/nen-hexagon.svelte';
    import NenTypeCard      from '$lib/components/nen-type-card.svelte';
    import TechniqueCard    from '$lib/components/technique-card.svelte';
    import Aura             from '$lib/components/Aura.svelte';
    import PulseButton      from '$lib/components/buttons/pulse-button.svelte';
    import MagicButton      from '$lib/components/buttons/MagicButton.svelte';


    const nenTypesArray = Object.values(NEN_TYPES);


    function scrollToSection(id: string) {
        const element = document.getElementById(id);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<svelte:head>
    <title>Nen Encyclopedia - Hunter x Hunter</title>
    <meta name="description" content="Aprende todo sobre el sistema Nen de Hunter x Hunter: tipos de aura, tecnicas basicas y avanzadas, y descubre tu tipo de Nen." />
</svelte:head>

<div class="min-h-screen bg-background relative overflow-hidden">
    <Aura />
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-primary aura-pulse"></div>
            </div>
            <span class="text-lg font-bold text-foreground">NEN</span>
            </div>
            
            <div class="hidden md:flex items-center gap-6">
            <button onclick={() => scrollToSection('tipos')} class="text-sm text-muted-foreground hover:text-primary transition-colors">
                Tipos de Nen
            </button>
            <button onclick={() => scrollToSection('basicas')} class="text-sm text-muted-foreground hover:text-primary transition-colors">
                Tecnicas Basicas
            </button>
            <button onclick={() => scrollToSection('avanzadas')} class="text-sm text-muted-foreground hover:text-primary transition-colors">
                Tecnicas Avanzadas
            </button>
            <a href="/quiz" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Descubre tu Nen
            </a>
            </div>
            
            <a href="/quiz" class="md:hidden px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
            Quiz
            </a>
        </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center justify-center pt-16 relative">
        <div class="absolute inset-0 flex items-center justify-center opacity-10">
        <div class="w-[600px] h-[600px] rounded-full border border-primary/50 aura-pulse"></div>
        <div class="absolute w-[400px] h-[400px] rounded-full border border-primary/30 aura-pulse" style="animation-delay: 0.5s;"></div>
        <div class="absolute w-[200px] h-[200px] rounded-full border border-primary/20 aura-pulse" style="animation-delay: 1s;"></div>
        </div>
        
        <div class="text-center px-4 relative z-10">
        <div class="mb-8">
            <NenHexagon />
        </div>
        
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            El Arte del <span class="text-primary">Nen</span>
        </h1>
        <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Explora el complejo sistema de energia vital del universo de Hunter x Hunter. 
            Descubre los tipos de aura, domina las tecnicas y encuentra tu verdadero poder interior.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PulseButton
                text="Explorar el Nen"
                onClick={() => scrollToSection('tipos')}
            />

            <MagicButton />
        </div>
        </div>
        
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        </div>
    </section>

    <!-- Nen Types Section -->
    <section id="tipos" class="py-20 px-4 relative">
        <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">Los 6 Tipos de Nen</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
            Cada usuario de Nen nace con una afinidad natural hacia uno de los seis tipos. 
            Tu personalidad determina tu tipo de aura.
            </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each nenTypesArray as nenType, index}
            <div class="animate-fade-in-up" style="animation-delay: {index * 0.1}s;">
                <NenTypeCard {nenType} />
            </div>
            {/each}
        </div>
        </div>
    </section>

    <!-- Basic Techniques Section -->
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

    <!-- Advanced Techniques Section -->
    <section id="avanzadas" class="py-20 px-4 relative">
        <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">Tecnicas Avanzadas</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
            Aplicaciones complejas del Nen que requieren dominio de las tecnicas basicas. 
            Estas habilidades distinguen a los usuarios expertos de los novatos.
            </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each ADVANCED_NEN_TECHNIQUES as technique, index}
            <div class="animate-fade-in-up" style="animation-delay: {index * 0.1}s;">
                <TechniqueCard {technique} isBasic={false} />
            </div>
            {/each}
        </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 relative">
        <div class="max-w-3xl mx-auto text-center">
        <div class="p-8 sm:p-12 rounded-2xl bg-card border border-border relative overflow-hidden">
            <div class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5"></div>
            
            <div class="relative z-10">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <div class="w-8 h-8 rounded-full bg-primary aura-pulse"></div>
            </div>
            
            <h2 class="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Descubre tu Tipo de Nen
            </h2>
            <p class="text-muted-foreground mb-8 max-w-lg mx-auto">
                Responde nuestro cuestionario de personalidad y descubre cual seria tu tipo de aura 
                si fueras un usuario de Nen en el mundo de Hunter x Hunter.
            </p>
            
            <a 
                href="/quiz" 
                class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 text-lg"
            >
                Comenzar el Test
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
            </a>
            </div>
        </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 border-t border-border">
        <div class="max-w-7xl mx-auto text-center">
        <p class="text-sm text-muted-foreground">
            Contenido basado en el manga y anime Hunter x Hunter de Yoshihiro Togashi.
            Este es un proyecto de fans sin fines de lucro.
        </p>
        </div>
    </footer>
</div>
