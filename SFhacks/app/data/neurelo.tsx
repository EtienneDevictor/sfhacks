import { ObjectId } from "mongodb";
import {
  GlobalApiService,
  StoryApiService,
  AvatarApiService,
  ReadingLevel,
} from "neurelo-sdk";

function id() {
  return new ObjectId().toHexString();
}
export const fetchAvatars = async () => {
  try {
    const res = await AvatarApiService.findAvatar(undefined);
    return { data: res.data?.data || [], error: undefined };
  } catch (error) {
    return { data: [], error: error };
  }
};

export const fetchGlobal = async () => {
  try {
    const response = await GlobalApiService.findGlobal({ reading_level: true });
    return { data: response.data?.data || [], error: undefined };
  } catch (error) {
    return { data: [], error: error };
  }
};

export const fetchReadingLevel = async () => {
  const data = await fetchGlobal();
  return data.data[0]?.reading_level;
};

export const updateReadingLevel = async (newLevel: ReadingLevel) => {
  const data = await fetchGlobal();
  const res = await GlobalApiService.updateGlobalById(
    data.data[0]?.id || "failed",
    {
      reading_level: newLevel,
    },
  );
};
