import { GraphQLError } from "graphql";
import { Character } from "../types.ts";
import { getCharacterById } from "../apis/getCharacterById.ts";
import { getCharacters } from "../apis/getCharacters.ts";

export const Query = {
    character: async(_:unknown, args: {id: string}): Promise<Character> => {
        try{
            return await getCharacterById(args.id);
        }catch(error){
            throw new GraphQLError(error.message, {
                extensions: {code: "INTERNAL_SERVER_ERROR"},
            });
        }
    },

    charactersByIds: async(_:unknown, args: {ids: string[]}): Promise<Character[]> => {
        try{
            return await getCharacters(args.ids);
        }catch(error){
            throw new GraphQLError(error.message, {
                extensions: {code: "INTERNAL_SERVER_ERROR"},
            });
        }
    },
}