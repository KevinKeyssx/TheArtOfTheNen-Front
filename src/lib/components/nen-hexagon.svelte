<script lang="ts">
  import { NEN_TYPES } from '$lib/data/nen-data';
  
  const types = [
    { code: 'INT', angle: -90 },
    { code: 'TRA', angle: -30 },
    { code: 'MAT', angle: 30 },
    { code: 'ESP', angle: 90 },
    { code: 'MAN', angle: 150 },
    { code: 'EMI', angle: 210 }
  ];
  
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
</script>

<div class="relative w-64 h-64 mx-auto">
  <!-- Center glow -->
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="w-16 h-16 rounded-full bg-primary/30 blur-xl aura-pulse"></div>
  </div>
  
  <!-- Hexagon lines -->
  <svg class="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
    <polygon 
      points="100,20 170,55 170,125 100,160 30,125 30,55" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1" 
      class="text-border"
    />
    <!-- Inner lines connecting to center -->
    {#each types as type, i}
      {@const x = 100 + 70 * Math.cos((type.angle * Math.PI) / 180)}
      {@const y = 100 + 70 * Math.sin((type.angle * Math.PI) / 180)}
      <line x1="100" y1="100" x2={x} y2={y} stroke="currentColor" stroke-width="0.5" class="text-border/50" />
    {/each}
  </svg>
  
  <!-- Type nodes -->
  {#each types as type}
    {@const nenType = NEN_TYPES[type.code as keyof typeof NEN_TYPES]}
    {@const radius = 90}
    {@const x = 50 + (radius / 2) * Math.cos((type.angle * Math.PI) / 180)}
    {@const y = 50 + (radius / 2) * Math.sin((type.angle * Math.PI) / 180)}
    
    <div 
      class="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center group cursor-pointer"
      style="left: {x}%; top: {y}%;"
    >
      <div class="w-4 h-4 rounded-full {colorClasses[nenType.color]} opacity-80 group-hover:opacity-100 transition-all group-hover:scale-125 aura-pulse"></div>
      <span class="text-xs font-medium {textColorClasses[nenType.color]} mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
        {nenType.name.slice(0, 3)}
      </span>
    </div>
  {/each}
  
  <!-- Center node -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/50 flex items-center justify-center">
    <div class="w-4 h-4 rounded-full bg-primary aura-pulse"></div>
  </div>
</div>
