import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from "./logo.png";
import Nav from "./Nav";

const Header = () => {
    return (
        <MainHeader>
            <Link to='/' >
                <img src={logo} alt='' />
            </Link>
            <Nav />
        </MainHeader>
    )
}

const MainHeader = styled.header` 
padding: 2rem 4.8rem;
 
 
 background-color:${({ theme }) => theme.colors.bg};
 display:flex;
 justify-content: space-between;
 align-items: center;
 position: relative;
.logo{
 height: 5rem;
}
img{
    height: 5rem;
}
 @media (max-width:${({ theme }) => theme.media.mobile}) {
    padding: 0 1rem;
}

`;

export default Header;

