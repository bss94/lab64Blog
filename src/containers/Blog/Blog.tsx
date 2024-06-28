import React, {useCallback, useEffect, useState} from 'react';
import {Col, Row, Spinner} from 'react-bootstrap';
import PostList from '../../components/Posts/PostList/PostList';
import axiosApi from '../../axiosApi';
import {ApiPosts, Post} from '../../types';

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPosts = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);
  return (
    <Row>
      <Col/>
      <Col sm={10}>

        {posts.length === 0 && !isLoading && (
          <h2 className="mt-5 text-center">not posted yet</h2>
        )}
        {isLoading && (
          <Spinner className="mt-3" animation="border" variant="primary"/>
        )}
        <PostList posts={posts}/>
      </Col>
      <Col/>
    </Row>
  );
};

export default Blog;