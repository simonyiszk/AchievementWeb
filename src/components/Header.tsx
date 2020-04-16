import { Box, Image } from '@chakra-ui/core';
import React from 'react';

import logoSmall from '../assets/simonyi_white_small.svg';
import logo from '../assets/simonyi_white_white.svg';

export default function Header(): JSX.Element {
  return (
    <Box p={1} backgroundColor="simonyi">
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
    </Box>
  );
}
