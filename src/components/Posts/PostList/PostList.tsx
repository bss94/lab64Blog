import React from 'react';
import PostItem from '../PostItem/PostItem';
import {Post} from '../../../types';

interface Props{
  posts:Post[];
}
const PostList:React.FC<Props> = ({posts}) => {
  return (
    <>
      {posts.map((post)=>{
        return  <PostItem title={post.title} key={post.id} id={post.id} date={post.date}/>
      })}


    </>
  );
};

export default PostList;