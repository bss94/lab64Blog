import React from 'react';
import {Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const PostItem = () => {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">created on TIME</Card.Subtitle>
        <Card.Title>Card Title</Card.Title>
       <NavLink to='/dddd' className="btn btn-primary">Read more...</NavLink>
      </Card.Body>
    </Card>
  );
};

export default PostItem;