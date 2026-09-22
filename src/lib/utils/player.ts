export const SOUND_FILES = {
    SELECTED    : '/sounds/selected.webm',
    CALCULATING : '/sounds/loading.webm',
    RESULT      : '/sounds/celebrate.webm',
    BACKGROUND  : '/sounds/background.mp3',
    INVOKE      : '/sounds/invoke/invoke-*.ogg',
}


export function playSound(
    soundFile   : string,
    volume      : number
) {
    const audio     = new Audio( soundFile );
    audio.volume    = volume;
    audio.play()
        .catch( err => console.error( 'Error al reproducir sonido:', err ));
}
