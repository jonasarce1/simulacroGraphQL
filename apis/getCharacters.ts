import { Character } from "../types.ts";
import { getEpisodes } from "./getEpisodes.ts";

type ApiCharacter = { //Tipo de dato segun lo que devuelve la API
    id: number;
    name: string;
    episode: string[]; 
}

export const getCharacters = async (ids: Array<string>): Promise<Character[]> => {
    const BASE_URL = "https://rickandmortyapi.com/api";
    const url = `${BASE_URL}/character`;

    const data = await fetch(url);

    if (data.status !== 200) {
        throw new Error("No se ha podido obtener información sobre los personajes en la API");
    }

    const json = await data.json();

    //aqui hago todo, filtro los personajes y luego cojo los ids de los episodios de cada uno para llamar a la funcion que me devuelve los episodios
    //asi solo tengo que hacer una llamada a la API para los personajes y una para todos los episodios de cada personaje (una por personaje)
    const characters: Array<Character> = json.results.map((character: ApiCharacter) => {
        if (ids.includes(character.id.toString())) { //Solo tengo en cuenta los ids que me pasan por parametro
            return {
                id: character.id,
                name: character.name,
                episode: getEpisodes(character.episode.map((episode: string) => { //Obtengo los ids de los episodios que estan al final de la url tras el ultimo / y llamo a la funcion que me devuelve los episodios
                    const episodeSplitted = episode.split("/");
                    return episodeSplitted[episodeSplitted.length - 1];
                }))
            }
        }
    }).filter((character: Character | null) => character !== null); // Filtra los personajes nulos (si no pongo esto aparecen nulls)

    return characters;
};
