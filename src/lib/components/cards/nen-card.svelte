<script lang="ts">
    let {
        borderColor         = 'nen-int',
        showGlow            = false,
        showAura            = false,
        animate             = 'animate-zoom-in',
        duration            = 'animate-duration-1000',
        delay               = 'animate-delay-0',
        class: className    = '',
        children
    }: {
        borderColor?    : string;
        showGlow?       : boolean;
        showAura?       : boolean;
        class?          : string;
        animate?        : string;
        duration?       : string;
        delay?          : string;
        children?       : any;
    } = $props();


    const borderColorClasses: Record<string, string> = {
        'nen-int'   : 'border-nen-int/50',
        'nen-tra'   : 'border-nen-tra/50',
        'nen-mat'   : 'border-nen-mat/50',
        'nen-esp'   : 'border-nen-esp/50',
        'nen-man'   : 'border-nen-man/50',
        'nen-emi'   : 'border-nen-emi/50'
    };


    const glowClasses: Record<string, string> = {
        'nen-int'   : 'glow-nen-int',
        'nen-tra'   : 'glow-nen-tra',
        'nen-mat'   : 'glow-nen-mat',
        'nen-esp'   : 'glow-nen-esp',
        'nen-man'   : 'glow-nen-man',
        'nen-emi'   : 'glow-nen-emi'
    };


    // const bgClasses: Record<string, string> = {
    //     'nen-int'   : 'bg-nen-int',
    //     'nen-tra'   : 'bg-nen-tra',
    //     'nen-mat'   : 'bg-nen-mat',
    //     'nen-esp'   : 'bg-nen-esp',
    //     'nen-man'   : 'bg-nen-man',
    //     'nen-emi'   : 'bg-nen-emi'
    // };


    const nenColorVars: Record<string, string> = {
        'nen-int'   : 'hsl(45 100% 50%)',
        'nen-tra'   : 'hsl(280 80% 60%)',
        'nen-mat'   : 'hsl(200 90% 55%)',
        'nen-esp'   : 'hsl(330 85% 55%)',
        'nen-man'   : 'hsl(140 70% 45%)',
        'nen-emi'   : 'hsl(25 95% 55%)'
    };


    const currentColor = $derived( nenColorVars[borderColor] || nenColorVars['nen-int'] );
</script>

<div 
    class="p-8 rounded-2xl border {borderColorClasses[borderColor]} {showGlow ? glowClasses[borderColor] : ''} relative overflow-hidden backdrop-blur-xs {animate} {duration} {delay} {className}"
    style="background: linear-gradient( 135deg, {currentColor}03, {currentColor}08, {currentColor}03 );"
>
    {#if showGlow}
        <!-- Animated gradient overlay -->
        <div class="absolute inset-0 opacity-30" style="background: radial-gradient( circle at 50% 50%, {currentColor}20 0%, transparent 70% );"></div>
        
        <!-- Subtle pattern -->
        <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient( circle at 2px 2px, {currentColor} 1px, transparent 0 ); background-size: 32px 32px;"></div>
    {/if}

    {#if showAura}
        <div 
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0"
            style="
                background: radial-gradient(circle, {currentColor} 0%, transparent 70%);
                opacity: 0.25;
                filter: blur(60px);
                animation: fade-in 1s ease-out 0.2s backwards;
            "
        ></div>
    {/if}

    <div class="relative z-10">
        {@render children?.()}
    </div>
</div>
