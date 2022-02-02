import React, { useState } from "react";
import { TEMP_POSTS } from "../../../../constants/posts";
import { Post } from "../atoms/post";


export const PostsList = () => {
  const [posts, setPosts] = useState(TEMP_POSTS)

  return (
    <>
    {posts.map(post => <Post key={post._id} post={post}/>)}
    </>
  )
}

