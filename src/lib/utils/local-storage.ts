import LZString from 'lz-string';


export const LOCAL_STORAGE_KEYS = {
    NEN_QUIZ_RESULT     : 'nenQuizResult',
    NEN_HATSU_RESULT    : 'hatsuResult',
    NEN_HATSU_SELECTED  : 'selectedTags',
    NEN_HATSU_IDEA      : 'userIdea',
};


export function getLocalStorage( key: string ) {
    if ( typeof window === 'undefined' ) return null;

    const value = localStorage.getItem( key );

    if ( !value ) return null;

    return JSON.parse( LZString.decompress( value ) );
}


export function setLocalStorage( key: string, value: any ) {
    if ( typeof window === 'undefined' ) return;

    localStorage.setItem( key, LZString.compress( JSON.stringify( value )));
}


export function removeLocalStorage( key: string ) {
    if ( typeof window === 'undefined' ) return;

    localStorage.removeItem( key );
}


export function clearLocalStorage() {
    if ( typeof window === 'undefined' ) return;

    removeLocalStorage( LOCAL_STORAGE_KEYS.NEN_QUIZ_RESULT );
    removeLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_RESULT );
    removeLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_SELECTED );
    removeLocalStorage( LOCAL_STORAGE_KEYS.NEN_HATSU_IDEA );
}
