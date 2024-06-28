import React, {useState} from 'react';
import {Button, Form, Spinner} from 'react-bootstrap';
import {PostMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {enqueueSnackbar} from 'notistack';

const initialState = {
  title: '',
  body: '',
};

const AddPost = () => {
  const navigate=useNavigate()
  const [postMutation, setPostMutation] = useState<PostMutation>(initialState);
  const [isLoading,setIsLoading]=useState(false);
  const {id}=useParams()

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
    const postData={
      ...postMutation,
      date: new Date(),
    }
    try{
      await axiosApi.post('/posts.json',postData)
      enqueueSnackbar('Posted',{variant:'success'})
    }catch (e){
      enqueueSnackbar('Something Wrong',{variant:'error'})
    }finally {
      setIsLoading(false);

    }
    navigate('/')
  };

  let submitBtn=(<>Save</>);
  if(isLoading){
    submitBtn=(
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
   )
  }

  return (
    <Form onSubmit={onFormSubmit} className="mt-3">
      <Form.Text muted ><h1>{id?'Edit Post' :'Create post'}</h1></Form.Text>

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