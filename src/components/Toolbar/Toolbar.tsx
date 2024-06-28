import React from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';

const Toolbar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" >
      <Container>
        <NavLink className="navbar-brand" to="/">
          MyBlog
        </NavLink>

        <Nav className="ms-auto">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/add-post">Add Post</NavLink>
          <NavLink className="nav-link" to="/about">About</NavLink>
          <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default Toolbar;