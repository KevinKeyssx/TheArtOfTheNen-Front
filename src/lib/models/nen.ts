import type { NEN_TYPES } from "$lib/data/nen-data";


export type NenType = ( typeof NEN_TYPES )[keyof typeof NEN_TYPES];


export interface NenResult {
    primary         : NenType;
    secondary       : NenType;
    scores          : Record<string, number>;
    sortedScores    : [string, number][];
}
