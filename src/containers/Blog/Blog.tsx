import React, {useCallback, useEffect, useState} from 'react';
import {Col, Spinner} from 'react-bootstrap';
import PostList from '../../components/Posts/PostList/PostList';
import axiosApi from '../../axiosApi';
import {ApiPosts, Post} from '../../types';
import {Outlet, useLocation} from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useLocation();

  const fetchPosts = useCallback(async () => {
    if (route.pathname === '/' || posts.length === 0) {
      setIsLoading(true);
      const response = await axiosApi.get<ApiPosts | null>('/posts.json');
      const postsResponse = response.data;
      if (postsResponse !== null) {
        const posts: Post[] = Object.keys(postsResponse).map((id: string) => {
          return {
            ...postsResponse[id],
            id,
          };
        });
        setPosts(posts);
      } else {
        setPosts([]);
      }
      setIsLoading(false);
    }
  }, [posts.length, route.pathname]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const content = (
    <>
      {posts.length === 0 && !isLoading && (
        <h2 className="mt-5 text-center">not posted yet</h2>
      )}
      {posts.length > 0 && !isLoading && (
        <h1 className="mt-3">All posts</h1>
      )}
      {isLoading && (
        <Spinner className="mt-3" animation="border" variant="primary"/>
      )}
      <PostList posts={posts}/>
    </>
  );

  return route.pathname === '/' ? (
    <>
      <Col/>
      <Col sm={10}>
        {content}
      </Col>
      <Col/>
    </>
  ) : (
    <>
      <Col/>
      <Col sm={5}>
        {content}
      </Col>
      <Col sm={5}>
        <Outlet/>
      </Col>
      <Col/>
    </>
  );
};

export default Blog;