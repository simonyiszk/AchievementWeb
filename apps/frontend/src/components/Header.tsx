import { Box, Image, Link as ChakraLink } from '@chakra-ui/core';
import { Link } from 'gatsby';
import React from 'react';

import consts from '../data/consts.yml';
import { isLoggedIn, logout } from '../services/auth';

import logoSmall from '../images/simonyi_white_small.svg';
import logo from '../images/simonyi_white_white.svg';

export default function Header(): JSX.Element {
  return (
    <Box p={1} backgroundColor="simonyi">
      <Link to="/">
        <Image
          display={['none', null, 'block']}
          height="3rem"
          m={-2}
          src={logo}
          alt="Logo"
        />
        <Image
          display={['block', null, 'none']}
          height="3rem"
          m={1}
          src={logoSmall}
          alt="Logo"
        />
      </Link>
      <Box>
        {!isLoggedIn() && (
          <ChakraLink href={`${consts.root_url}/login`}>LOGIN</ChakraLink>
        )}
        {isLoggedIn() && (
          <Link to="/" onClick={(e) => logout()}>
            LOGOUT
          </Link>
        )}
      </Box>
    </Box>
  );
}
