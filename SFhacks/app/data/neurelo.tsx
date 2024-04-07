'use server'

import {
  GlobalApiService,
  StoryApiService,
  AvatarApiService,
  ReadingLevel,
  Avatar,
} from "neurelo-sdk";

import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'


export const getSignedUploadUrl = async (filepath : string) => {
    const client = new S3Client({ region: "us-west-1" });
    const Bucket = 'sfhacksbucketstoryteller'
    return createPresignedPost(client, {
      Bucket,
      Key: filepath,
      Expires: 600,
    })
}


export const fetchAvatars = async () => {
  try {
    const res = await AvatarApiService.findAvatar(undefined);
    return { data: res.data?.data || [], error: undefined };
  } catch (error) {
    return { data: [] as Avatar[], error: error };
  }
};

export const fetchAvatar = async (name: string) => {

  try {
    const res = await AvatarApiService.findAvatarByName(name)
    return { data: res.data?.data, error: undefined };
  } catch (error) {
    return { data: {} as Avatar, error: error}
  }
}

export const createAvatar = async (avatar: Avatar) => {
  try {
    const res = await AvatarApiService.createOneAvatar( { pronouns: avatar.pronouns || "",
    weaknesses: avatar.weaknesses || "",
    strengths: avatar.strengths || "",
    skills: avatar.skills || "",
    dislikes: avatar.dislikes || "",
    likes: avatar.likes || "",
    name: avatar.name || "",
    image_source: avatar.image_source || "" });
  } catch (error) {
    return { data: undefined, error: error};
  }
}

export const updateAvatar = async (avatar: Avatar, name : string) => {
  console.log("update called again")
  console.log(avatar)
  try {
    const res = await AvatarApiService.updateAvatarByName(name || "Steven", { pronouns: avatar.pronouns || "",
    weaknesses: avatar.weaknesses || "",
    strengths: avatar.strengths || "",
    skills: avatar.skills || "",
    dislikes: avatar.dislikes || "",
    likes: avatar.likes || "",
    name: avatar.name || "",
    image_source: avatar.image_source || "" })
  } catch (error) {
    return { data: undefined, error: error};
  }
}

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

export const fetchContentRestrictions = async () => {
  const data = await fetchGlobal();
  return data.data[0]?.content_restrictions;
};
const neverShow = ["gore", "cruel violence"];
export const updateContentRestrictions = async (restrictions: string[]) => {
  const data = await fetchGlobal();
  const res = await GlobalApiService.updateGlobalById(
    data.data[0]?.id || "failed",
    {
      content_restrictions: neverShow.concat(restrictions),
    },
  );
};
