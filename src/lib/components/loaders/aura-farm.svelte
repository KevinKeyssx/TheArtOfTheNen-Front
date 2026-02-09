<script lang="ts">
    let { 
        primaryColor = undefined,
        secondaryColor = undefined,
        size = 1
    } = $props();

    const defaultColorOne = '#ffbf48';
    const defaultColorTwo = '#be4a1d';

    const autoMode = $derived( primaryColor === undefined || secondaryColor === undefined );
    const colorOne = $derived( autoMode ? defaultColorOne : primaryColor );
    const colorTwo = $derived( autoMode ? defaultColorTwo : ( secondaryColor || primaryColor ));
</script>

<div class="loader-wrapper">
    <div
        class="loader {autoMode ? 'auto-colorize' : ''}"
        style="
            --color-one: {colorOne};
            --color-two: {colorTwo};
            --size: {size};
        "
    >
        <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
                <mask id="clipping">
                    <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                    <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                    <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                </mask>
            </defs>
        </svg>

        <div class="box"></div>
    </div>
</div>

<style>
    /* From Uiverse.io by andrew-manzyk */ 
    .loader-wrapper {
        display           : flex;
        align-items       : center;
        justify-content   : center;
        width             : 100%;
        height            : 100%;
    }

    .loader {
        --color-three     : color-mix( in srgb, var( --color-one ) 50%, transparent );
        --color-four      : color-mix( in srgb, var( --color-two ) 50%, transparent );
        --color-five      : color-mix( in srgb, var( --color-one ) 25%, transparent );
        --time-animation  : 2s;
        position          : relative;
        border-radius     : 50%;
        transform         : scale( var( --size ));
        box-shadow        :
            0 0 25px 0 var( --color-three ),
            0 0 50px 0 var( --color-four );
    }

    /* Modo automático: anima los colores */
    .loader.auto-colorize {
        animation         : colorize calc( var( --time-animation ) * 3 ) ease-in-out infinite;
    }

    .loader::before {
        content           : "";
        position          : absolute;
        top               : 0;
        left              : 0;
        width             : 100px;
        height            : 100px;
        border-radius     : 50%;
        border-top        : solid 1px var( --color-one );
        border-bottom     : solid 1px var( --color-two );
        background        : linear-gradient( 180deg, var( --color-five ), var( --color-four ));
        box-shadow        :
            inset 0 10px 10px 0 var( --color-three ),
            inset 0 -10px 10px 0 var( --color-four );
    }

    .loader .box {
        width             : 100px;
        height            : 100px;
        background        : linear-gradient(
            180deg,
            var( --color-one ) 30%,
            var( --color-two ) 70%
        );
        mask              : url( #clipping );
        -webkit-mask      : url( #clipping );
    }

    .loader svg {
        position          : absolute;
    }

    .loader svg :global(#clipping) {
        filter            : contrast( 15 );
        animation         : roundness calc( var( --time-animation ) / 2 ) linear infinite;
    }

    .loader svg :global(#clipping polygon) {
        filter            : blur( 7px );
    }

    .loader svg :global(#clipping polygon:nth-child(1)) {
        transform-origin  : 75% 25%;
        transform         : rotate( 90deg );
    }

    .loader svg :global(#clipping polygon:nth-child(2)) {
        transform-origin  : 50% 50%;
        animation         : rotation var( --time-animation ) linear infinite reverse;
    }

    .loader svg :global(#clipping polygon:nth-child(3)) {
        transform-origin  : 50% 60%;
        animation         : rotation var( --time-animation ) linear infinite;
        animation-delay   : calc( var( --time-animation ) / -3 );
    }

    .loader svg :global(#clipping polygon:nth-child(4)) {
        transform-origin  : 40% 40%;
        animation         : rotation var( --time-animation ) linear infinite reverse;
    }

    .loader svg :global(#clipping polygon:nth-child(5)) {
        transform-origin  : 40% 40%;
        animation         : rotation var( --time-animation ) linear infinite reverse;
        animation-delay   : calc( var( --time-animation ) / -2 );
    }

    .loader svg :global(#clipping polygon:nth-child(6)) {
        transform-origin  : 60% 40%;
        animation         : rotation var( --time-animation ) linear infinite;
    }

    .loader svg :global(#clipping polygon:nth-child(7)) {
        transform-origin  : 60% 40%;
        animation         : rotation var( --time-animation ) linear infinite;
        animation-delay   : calc( var( --time-animation ) / -1.5 );
    }

    @keyframes rotation {
        0% {
            transform     : rotate( 0deg );
        }
        100% {
            transform     : rotate( 360deg );
        }
    }

    @keyframes roundness {
        0% {
            filter        : contrast( 15 );
        }
        20% {
            filter        : contrast( 3 );
        }
        40% {
            filter        : contrast( 3 );
        }
        60% {
            filter        : contrast( 15 );
        }
        100% {
            filter        : contrast( 15 );
        }
    }

    @keyframes colorize {
        0% {
            filter        : hue-rotate( 0deg );
        }
        20% {
            filter        : hue-rotate( -30deg );
        }
        40% {
            filter        : hue-rotate( -60deg );
        }
        60% {
            filter        : hue-rotate( -90deg );
        }
        80% {
            filter        : hue-rotate( -45deg );
        }
        100% {
            filter        : hue-rotate( 0deg );
        }
    }
</style>