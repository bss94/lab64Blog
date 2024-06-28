import React, {useCallback, useEffect, useState} from 'react';
import {ApiContacts, ContactData} from '../../types';
import axiosApi from '../../axiosApi';
import {Col, Spinner} from 'react-bootstrap';
import Contact from '../../components/Contact/Contact';

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = useCallback(async () => {

    setIsLoading(true);
    const response = await axiosApi.get<ApiContacts | null>('/contacts.json');
    const contactResponse = response.data;
    if (contactResponse !== null) {
      const contacts: ContactData[] = Object.keys(contactResponse).map((id: string) => {
        return {
          ...contactResponse[id],
          id,
        };
      });
      console.log(contacts);
      setContacts(contacts);
    } else {
      setContacts([]);
    }
    setIsLoading(false);

  }, []);

  useEffect(() => {
    void fetchContacts();
  }, [fetchContacts]);

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner className="mt-3" animation="border" variant="primary"/>
        </div>
      )}
      <Col/>
      <Col sm={10}>
        <h2 className="mt-5 text-center">Contact us</h2>
        <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">
          {contacts.map(el => {
            return <Contact firstName={el.name} secondName={el.secondname} email={el.email} phone={el.phone}
                            key={el.id}/>;
          })}
        </div>

      </Col>
      <Col/>


    </>
  );
};

export default Contacts;