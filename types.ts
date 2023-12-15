export type Character = {
    id: string,
    name: string,
    episode: Episode[]
};

export type Episode = {
    id: string,
    name: string,
    characters: Character[]
};