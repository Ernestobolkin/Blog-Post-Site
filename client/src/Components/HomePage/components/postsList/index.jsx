import React, { useContext } from "react";
import { Post } from "../atoms/post";
import { PostsContext } from "../../../../App/context/context";

export const PostsList = () => {
  const { postsData } = useContext(PostsContext);
  return (
    <>
      {postsData !== null &&
        postsData.map((post) => <Post key={post._id} post={post} />).reverse()}
    </>
  );
};
