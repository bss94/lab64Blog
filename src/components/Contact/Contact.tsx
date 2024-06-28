import React from 'react';
import {Card} from 'react-bootstrap';

interface Props {
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
}

const Contact: React.FC<Props> = ({
  firstName,
  secondName,
  email,
  phone,
}) => {
  return (
    <Card style={{width: '18rem'}} className="mx-2 my-2">
      <Card.Body>
        <Card.Title>{firstName} {secondName}</Card.Title>
        <Card.Text>
          email: {email}<br/>
          телефон: {phone}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Contact;