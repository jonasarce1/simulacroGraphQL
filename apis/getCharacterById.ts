import { Character } from "../types.ts";
import { getEpisodes } from "./getEpisodes.ts";

export const getCharacterById = async(id:string) => {
    const BASE_URL = "https://rickandmortyapi.com/api";
    const url = `${BASE_URL}/character/${id}`;

    const data = await fetch(url);

    if(data.status != 200){
        throw new Error("No se ha podido obtener informacion sobre el personaje en la API");
    }

    const json = await data.json();

    const episodeId = json.episode.map((episode:string) => { //Obtengo los ids de los episodios que estan al final de la url tras el ultimo /
        const episodeSplitted = episode.split("/");
        return episodeSplitted[episodeSplitted.length - 1];
    });

    const character:Character = {
        id: json.id,
        name: json.name,
        episode: await getEpisodes(episodeId) //Llamo a la funcion que me devuelve los episodios
    }

    return character;
}