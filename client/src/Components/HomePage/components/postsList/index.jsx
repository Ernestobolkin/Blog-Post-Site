import React, { useContext } from "react";
import { Post } from "../atoms/post";
import { PostsContext } from "../../../../App/context/context";

export const PostsList = ({ getData }) => {
  const { postsData } = useContext(PostsContext);

  return (
    <>
      {postsData !== null &&
        postsData.map((post) => (
          <Post getData={getData} key={post._id} post={post} />
        )).reverse()}
    </>
  );
};
