export interface Description {
    description: string;
    timePeriod: string;
}

export interface Mood {
    mood: string;
    timePeriod: string;
}

export interface AllEntries {
    descriptions: Description[];
    moods: Mood[];
}