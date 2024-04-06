const { ObjectId } = require("mongodb");
const { AvatarApiService } = require("neurelo-sdk");
// import { ObjectId } from "mongodb";
// import { AvatarApiService } from "neurelo-sdk";

const addAvatar = async () => {
  try {
    const res = await AvatarApiService.createOneAvatar({
      id: ObjectId.generate().toString(),
      image_source: "https://example.com/image.jpg",
      name: "John Doe",
      skills: "skill1, skill2",
      traits: "trait1,",
      pronouns: "they_them",
      dislikes: "dislike1,",
      strengths: "strength1,",
    });
    console.log(res.data.data);
  } catch (error) {
    console.log(error);
  }
};
addAvatar();
