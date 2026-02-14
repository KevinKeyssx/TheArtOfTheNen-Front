<script lang="ts">
  type Technique = {
    name: string;
    japaneseName: string;
    description: string;
    effects: string[];
    example: string;
  };
  
  let { technique, isBasic }: { technique: Technique; isBasic: boolean } = $props();
  
  let expanded = $state(false);
</script>

<div 
  class="group relative p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-[0_0_25px_rgba(234,179,8,0.3),0_0_50px_rgba(234,179,8,0.15)] {expanded ? 'glow-nen-int' : ''}"
  role="button"
  tabindex="0"
  onclick={() => expanded = !expanded}
  onkeydown={(e) => e.key === 'Enter' && (expanded = !expanded)}
>
  
  <div class="relative z-10">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <span class="text-primary font-bold text-lg">{technique.name.charAt(0)}</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-foreground">{technique.name}</h3>
          <p class="text-xs text-muted-foreground">{technique.japaneseName}</p>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 text-xs rounded-full {isBasic ? 'bg-nen-int/20 text-nen-int' : 'bg-nen-tra/20 text-nen-tra'}">
          {isBasic ? 'Basica' : 'Avanzada'}
        </span>
        <svg 
          class="w-5 h-5 text-muted-foreground transition-transform duration-300 {expanded ? 'rotate-180' : ''}" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
    
    <!-- Description -->
    <p class="text-sm text-muted-foreground">
      {technique.description}
    </p>
    
    <!-- Expanded content -->
    {#if expanded}
      <div class="mt-4 space-y-4 animate-fade-in-up">
        <div>
          <h4 class="text-sm font-semibold text-foreground mb-2">Efectos</h4>
          <ul class="space-y-1">
            {#each technique.effects as effect}
              <li class="flex items-start gap-2 text-sm text-muted-foreground">
                <svg class="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {effect}
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="p-4 rounded-lg bg-secondary/50 border border-border">
          <h4 class="text-sm font-semibold text-foreground mb-2">Ejemplo</h4>
          <p class="text-sm text-muted-foreground italic">"{technique.example}"</p>
        </div>
      </div>
    {/if}
  </div>
</div>
