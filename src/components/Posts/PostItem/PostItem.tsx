import React from 'react';
import {Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

interface Props{
  title:string;
  date:string;
  id:string
}
const PostItem:React.FC<Props> = ({title,date,id}) => {
  const dateFormat = (date: string): string => {
    const formatToUtc: Date = new Date(date);
    return [
      formatToUtc.getDate(),
      formatToUtc.getMonth() + 1,
      formatToUtc.getFullYear()].join('/') + ' ' + [
      formatToUtc.getHours(),
      formatToUtc.getMinutes(),
      formatToUtc.getSeconds()].join(':');
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">created on {dateFormat(date)}</Card.Subtitle>
        <Card.Title>{title}</Card.Title>
       <NavLink to={`/post/${id}`} className="btn btn-primary">Read more...</NavLink>
        <NavLink to={`/post/${id}/edit`} className="btn btn-primary">Edit.</NavLink>
      </Card.Body>
    </Card>
  );
};

export default PostItem;