<script lang="ts">
    import Aura                 from '$lib/components/Aura.svelte';
    import Navigation           from './components/Navigation.svelte';
    import BasicTechniques      from './components/BasicTechniques.svelte';
    import NenTypes             from './components/NenTypes.svelte';
    import AdvancedTechniques   from './components/AdvancedTechniques.svelte';
    import CTA                  from './components/CTA.svelte';
    import Hero                 from './components/Hero.svelte';
    import Footer               from './components/Footer.svelte';


    function scrollToSection( id: string ): void {
        const element = document.getElementById( id );

        if ( element ) {
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
    <Navigation { scrollToSection } />

    <!-- Hero Section -->
    <Hero { scrollToSection } />

    <!-- Nen Types Section -->
    <NenTypes />

    <!-- Basic Techniques Section -->
    <BasicTechniques />

    <!-- Advanced Techniques Section -->
    <AdvancedTechniques />

    <!-- CTA Section -->
    <CTA />

    <!-- Footer -->
    <Footer />
</div>
