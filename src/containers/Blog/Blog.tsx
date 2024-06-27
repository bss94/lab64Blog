import React from 'react';
import {Col, Row} from 'react-bootstrap';
import PostList from '../../components/Posts/PostList/PostList';

const Blog = () => {
  return (
    <Row>
      <Col/>
      <Col sm={10}>
        <PostList/>
      </Col>
      <Col/>
    </Row>
  );
};

export default Blog;