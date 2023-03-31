import axios from "axios";
import { Post, User, Comment } from "./models";

type ID = string | number;

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getPostsByUserId = async (idList: ID[]) => {
  const params = new URLSearchParams();

  idList.forEach((id) => {
    params.append("userId", `${id}`);
  });

  const { data } = await axiosInstance.get<Post[]>("posts", {
    params,
  });

  return data;
};

export const getPostComments = async (postId: ID) => {
  const { data } = await axiosInstance.get<Comment[]>(
    `posts/${postId}/comments`
  );

  return data;
};

export const getUsers = async () => {
  const { data } = await axiosInstance.get<User[]>(`users`);

  return data;
};
