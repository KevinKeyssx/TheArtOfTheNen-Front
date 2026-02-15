<script lang="ts">
    import {
        borderColorClasses,
        colorClasses,
        glowClasses,
        textColorClasses
    }                           from '$lib/utils/nen-colors';
    import type { NEN_TYPES }   from '$lib/data/nen-data';


    type NenType = (typeof NEN_TYPES)[keyof typeof NEN_TYPES];


    let { nenType }: { nenType: NenType } = $props();


    let expanded = $state( false );
</script>

<div 
    class       = "group relative p-6 rounded-xl bg-card border transition-all duration-300 hover:scale-[1.02] cursor-pointer {borderColorClasses[nenType.color]} {expanded ? glowClasses[nenType.color] : ''}"
    role        = "button"
    tabindex    = "0"
    onclick     = {() => expanded = !expanded }
    onkeydown   = {( e ) => e.key === 'Enter' && ( expanded = !expanded )}
>
    <!-- Glow effect on hover -->
    <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 {glowClasses[nenType.color]}" style="filter: blur(20px);"></div>

    <div class="relative z-10">
        <!-- Header -->
        <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-full {colorClasses[nenType.color]}/20 flex items-center justify-center shrink-0">
                <div class="w-6 h-6 rounded-full {colorClasses[nenType.color]} aura-pulse"></div>
            </div>

            <div class="flex-1">
                <h3 class="text-lg md:text-xl font-bold {textColorClasses[nenType.color]}">
                    { nenType.name }
                </h3>

                <p class="text-sm text-muted-foreground">
                    { nenType.fullName }
                </p>
            </div>

            <svg 
                class="w-5 h-5 text-muted-foreground transition-transform duration-300 {expanded ? 'rotate-180' : ''}" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>

        <!-- Short description -->
        <p class="text-sm text-muted-foreground mb-4">
            { nenType.description }
        </p>

        <!-- Expanded content -->
        {#if expanded}
            <div class="space-y-4 animate-fade-in-up">
                <div>
                    <h4 class="text-sm font-semibold text-foreground mb-2">Descripción</h4>

                    <p class="text-sm text-muted-foreground">
                        { nenType.longDescription }
                    </p>
                </div>

                <div>
                    <h4 class="text-sm font-semibold text-foreground mb-2">Características</h4>

                    <ul class="space-y-1">
                        {#each nenType.characteristics as char}
                            <li class="flex items-start gap-2 text-sm text-muted-foreground">
                                <span class="w-1.5 h-1.5 rounded-full {colorClasses[nenType.color]} mt-1.5 shrink-0"></span>

                                { char }
                            </li>
                        {/each}
                    </ul>
                </div>

                <div>
                    <h4 class="text-sm font-semibold text-foreground mb-2">Habilidades</h4>

                    <p class="text-sm text-muted-foreground">
                        { nenType.abilities }
                    </p>
                </div>

                <div>
                    <h4 class="text-sm font-semibold text-foreground mb-2">Personajes</h4>

                    <div class="flex flex-wrap gap-2">
                        {#each nenType.characters as character}
                            <span class="px-2 py-1 text-xs rounded-full {colorClasses[nenType.color]}/10 {textColorClasses[nenType.color]} border {borderColorClasses[nenType.color]}">
                                { character }
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
