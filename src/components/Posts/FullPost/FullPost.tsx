import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../../axiosApi';
import {ApiPost, Post} from '../../../types';
import {Button, Col, Row, Spinner} from 'react-bootstrap';
import {dateFormat} from '../../../constants';

const FullPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

  const fetchFullPost = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiPost | null>(`/posts/${id}.json`);
    if (response.data) {
      setPost(response.data);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      void fetchFullPost();
    }
  }, [id, fetchFullPost]);
  const deletePost = async () => {
    await axiosApi.delete(`/posts/${id}.json`);
    navigate('/');
  };
  return isLoading ?
    <div className="text-center mt-3">
      <Spinner className="mt-3" animation="border" variant="primary"/>
    </div>
    :
    post !== undefined && (
      <>
        <h1 className="mt-3 text-muted">Post:</h1>
        <div className="mt-3 border p-3">
          <h6 className="mt-4 border-bottom border-dark text-end p-2">Created on: {dateFormat(post.date)}</h6>
          <h3 className="mt-3 mb-3">Title: {post.title}</h3>
          <p className="mb-5"><span className="fw-medium">Message</span>: {post.body}</p>
        </div>
        <div className="d-flex align-items-center justify-content-end mt-3">
          <Button className="btn-danger mx-3" onClick={deletePost}>Delete</Button>
          <NavLink to={`/post/${id}/edit`} className="btn btn-primary">Edit</NavLink>
        </div>
      </>
    );
};

export default FullPost;