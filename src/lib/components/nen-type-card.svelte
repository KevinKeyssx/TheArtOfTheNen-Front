<script lang="ts">
  import type { NEN_TYPES } from '$lib/data/nen-data';
  
  type NenType = (typeof NEN_TYPES)[keyof typeof NEN_TYPES];
  
  let { nenType }: { nenType: NenType } = $props();
  
  let expanded = $state(false);
  
  const glowClasses: Record<string, string> = {
    'nen-int': 'glow-nen-int',
    'nen-tra': 'glow-nen-tra',
    'nen-mat': 'glow-nen-mat',
    'nen-esp': 'glow-nen-esp',
    'nen-man': 'glow-nen-man',
    'nen-emi': 'glow-nen-emi'
  };
  
  const colorClasses: Record<string, string> = {
    'nen-int': 'bg-nen-int',
    'nen-tra': 'bg-nen-tra',
    'nen-mat': 'bg-nen-mat',
    'nen-esp': 'bg-nen-esp',
    'nen-man': 'bg-nen-man',
    'nen-emi': 'bg-nen-emi'
  };
  
  const textColorClasses: Record<string, string> = {
    'nen-int': 'text-nen-int',
    'nen-tra': 'text-nen-tra',
    'nen-mat': 'text-nen-mat',
    'nen-esp': 'text-nen-esp',
    'nen-man': 'text-nen-man',
    'nen-emi': 'text-nen-emi'
  };
  
  const borderColorClasses: Record<string, string> = {
    'nen-int': 'border-nen-int/30',
    'nen-tra': 'border-nen-tra/30',
    'nen-mat': 'border-nen-mat/30',
    'nen-esp': 'border-nen-esp/30',
    'nen-man': 'border-nen-man/30',
    'nen-emi': 'border-nen-emi/30'
  };
</script>

<div 
  class="group relative p-6 rounded-xl bg-card border transition-all duration-300 hover:scale-[1.02] cursor-pointer {borderColorClasses[nenType.color]} {expanded ? glowClasses[nenType.color] : ''}"
  role="button"
  tabindex="0"
  onclick={() => expanded = !expanded}
  onkeydown={(e) => e.key === 'Enter' && (expanded = !expanded)}
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
        <h3 class="text-xl font-bold {textColorClasses[nenType.color]}">{nenType.name}</h3>
        <p class="text-sm text-muted-foreground">{nenType.fullName}</p>
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
      {nenType.description}
    </p>
    
    <!-- Expanded content -->
    {#if expanded}
      <div class="space-y-4 animate-fade-in-up">
        <div>
          <h4 class="text-sm font-semibold text-foreground mb-2">Descripcion</h4>
          <p class="text-sm text-muted-foreground">{nenType.longDescription}</p>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold text-foreground mb-2">Caracteristicas</h4>
          <ul class="space-y-1">
            {#each nenType.characteristics as char}
              <li class="flex items-start gap-2 text-sm text-muted-foreground">
                <span class="w-1.5 h-1.5 rounded-full {colorClasses[nenType.color]} mt-1.5 shrink-0"></span>
                {char}
              </li>
            {/each}
          </ul>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold text-foreground mb-2">Habilidades</h4>
          <p class="text-sm text-muted-foreground">{nenType.abilities}</p>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold text-foreground mb-2">Personajes</h4>
          <div class="flex flex-wrap gap-2">
            {#each nenType.characters as character}
              <span class="px-2 py-1 text-xs rounded-full {colorClasses[nenType.color]}/10 {textColorClasses[nenType.color]} border {borderColorClasses[nenType.color]}">
                {character}
              </span>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
