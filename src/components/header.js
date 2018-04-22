import React from 'react';
import Link from 'gatsby-link';

import avatar from '../images/avatar-2013.png';

import styled from 'styled-components';

const HeaderWrapper = styled.header`
  margin: 0 auto;
`;

const HeaderEl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 1.2em;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 10px;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & > * + * {
    margin-left: 10px;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    background-color: black;
    color: white;
  }
`;

const PrettyHr = styled.hr`
  max-width: 750px;

  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0));
`;

const Navigation = () => (
  <NavList>
    {
      [
        {title: 'Вячеслав Матюхин', link: '/'},
        {title: 'Блог', link: '/blog'},
        {title: 'Коучинг', link: '/coaching'},
        {title: 'Обо мне', link: '/about'},
      ].map(e => (
        <li key={e.link}><Link to={e.link}>{e.title}</Link></li>
      ))
    }
  </NavList>
);

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderEl>
      <img src={avatar} alt="аватарка" />
      <Navigation />
    </HeaderEl>
    <PrettyHr />
  </HeaderWrapper>
);

export default Header;
