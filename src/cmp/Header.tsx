import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from './ui/Container';

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    color: inherit;
    text-decoration: unset;
  }
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 1rem;

  li:nth-child(n + 2) {
    margin-left: 0.4rem;

    a {
      padding: 0.4rem 0.8rem;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Nav>
        <Link to="/">
          <h1>App</h1>
        </Link>

        <List>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/counter">Counter</Link>
          </li>
        </List>
      </Nav>
    </Container>
  );
};

export default Header;
