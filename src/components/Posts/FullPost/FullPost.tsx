import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axiosApi from '../../../axiosApi';
import {ApiPost, Post} from '../../../types';

const FullPost = () => {
 const {id}=useParams();
console.log(id)
 const [post,setPost]=useState<Post>()

 const fetchFullPost = useCallback(async ()=>{
  const response= await axiosApi.get<ApiPost|null>(`/posts/${id}.json`);
  console.log(response.data)
  if(response.data){
    setPost(response.data)
  }
 },[id])

  useEffect( ()=>{
    if(id!==undefined){
      console.log("id ne undef")
      void fetchFullPost()
    }
  },[id,fetchFullPost])


  return post!==undefined && (
    <>
      <h5>{post.date}</h5>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

export default FullPost;