import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Spinner} from 'react-bootstrap';
import axiosApi from '../../axiosApi';
import {ApiAbout} from '../../types';
import {NavLink} from 'react-router-dom';

const initial = {
  aboutProject: '',
  period: '',
  subtitle: '',
  textBody: '',
  title: ''
};

const About = () => {
  const [about, setAbout] = useState<ApiAbout>(initial);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAbout = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiAbout | null>('/about.json');
    const aboutResponse = response.data;
    if (aboutResponse !== null) {
      setAbout(aboutResponse);
    } else {
      setAbout(initial);
    }
    setIsLoading(false);

  }, []);

  useEffect(() => {
    void fetchAbout();
  }, [fetchAbout]);

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner className="mt-3" animation="border" variant="primary"/>
        </div>
      )}
      <Col/>
      <Col sm={10}>
        <h1 className="mt-3">{about.title}</h1>
        <h3 className="mt-5">{about.subtitle}</h3>
        <h5 className="mt-4">{about.aboutProject}</h5>
        <p className="mt-4 fs-5">{about.textBody}</p>
        <p className="mt-5 fs-6 text-muted mb-5">{about.period}</p>
        <NavLink to={'/contacts'} className="nav-link mt-5 text-center"><Button className="btn-primary">Contact
          us</Button></NavLink>
      </Col>
      <Col/>
    </>
  );
};

export default About;