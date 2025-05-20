import { grafbase } from "../graphql";
import { MusicTypes } from "../interfaces";
import { ALL_MUSIC_TYPES_QUERY } from "../queries/music-types/allMusicTypes";

export async function getAllMusicTypes() {
  const res = await grafbase.request<MusicTypes>(ALL_MUSIC_TYPES_QUERY);
  return {
    genres: res.musicTypes.map((genre) => genre.name),
  };
}
