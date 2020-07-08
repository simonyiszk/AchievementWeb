import { BoxProps, Flex, Image } from '@chakra-ui/core';
import React from 'react';

import img from '../images/levelup.svg';

interface Achievement {
  id: number;
  title: string;
  category: 'szakmai' | 'kozossegi';
  level: number;
}

interface Props extends BoxProps {
  onClick: () => void;
}

export default function LevelupIcon({ onClick, ...props }: Props): JSX.Element {
  return (
    <Flex
      {...props}
      position="relative"
      justify="center"
      alignItems="center"
      height="7rem"
      width="7rem"
      borderRadius="7rem"
      border="solid 1px rgba(0, 0, 0, 0.05)"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      cursor="pointer"
      onClick={onClick}
    >
      <Image height="100%" src={img} />
    </Flex>
  );
}
