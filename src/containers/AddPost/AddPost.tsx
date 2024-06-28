import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form, Spinner} from 'react-bootstrap';
import {ApiPost, PostMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {enqueueSnackbar} from 'notistack';

const initialState = {
  title: '',
  body: '',
  date: ''
};

const AddPost = () => {
  const navigate = useNavigate();
  const [postMutation, setPostMutation] = useState<PostMutation>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const {id} = useParams();


  const fetchEditPost = useCallback(async () => {
    setIsFetching(true);
    const response = await axiosApi<ApiPost>(`/posts/${id}.json`);
    const postResponse = response.data;
    if (postResponse !== null) {
      setPostMutation(response.data);
    }
    setIsFetching(false);
  }, [id]);
  useEffect(() => {
    if (id !== undefined) {
      void fetchEditPost();
    }
  }, [id, fetchEditPost]);


  const changeField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;
    setPostMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    const postData = {
      ...postMutation,
      date: postMutation.date === '' ? new Date() : postMutation.date,
    };
    try {
      if (id !== undefined) {
        await axiosApi.put(`/posts/${id}.json`, postData);
      } else {
        await axiosApi.post('/posts.json', postData);
      }
      enqueueSnackbar('Posted', {variant: 'success'});
    } catch (e) {
      enqueueSnackbar('Something Wrong', {variant: 'error'});
    } finally {
      setIsLoading(false);
      setPostMutation(initialState);
    }
    navigate('/');
  };

  let submitBtn = (<>Save</>);
  if (isLoading) {
    submitBtn = (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </>
    );
  }

  return isFetching ?
    <div className="text-center mt-3">
      <Spinner className="mt-3" animation="border" variant="primary"/>
    </div>
    :
    (
      <Form onSubmit={onFormSubmit} className="mt-3">
        <Form.Text muted><h1>{id ? 'Edit Post' : 'Create post'}</h1></Form.Text>

        <Form.Group className="mb-3"
                    controlId="title"
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={postMutation.title}
            onChange={changeField}
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="body"
        >
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="body"
            value={postMutation.body}
            onChange={changeField}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary"
                  type="submit"
                  disabled={isLoading}
          >
            {submitBtn}
          </Button>
        </div>
      </Form>
    );
};

export default AddPost;