import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], string[]>({
      query: (idList) => {
        const params = new URLSearchParams();

        idList.forEach((id) => {
          params.append("userId", id);
        });

        return {
          url: `posts?` + params.toString(),
        };
      },
    }),
    getPostComments: builder.query<Comment[], string>({
      query: (id) => `posts/${id}/comments`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostCommentsQuery } = postsApi;
