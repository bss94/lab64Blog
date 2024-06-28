import React from 'react';
import {Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {dateFormat} from '../../../constants';

interface Props {
  title: string;
  date: string;
  id: string;
}

const PostItem: React.FC<Props> = ({title, date, id}) => {


  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">created on {dateFormat(date)}</Card.Subtitle>
        <Card.Title>{title}</Card.Title>
        <NavLink to={`/post/${id}`} className="btn btn-primary">Read more...</NavLink>
      </Card.Body>
    </Card>
  );
};

export default PostItem;