import { Flex, Image } from '@chakra-ui/core';
import React from 'react';

import silverStar from '../assets/stars/silver_star.svg';

interface Props {
  level: number;
}

export default function StarBox({ level }: Props): JSX.Element {
  return (
    <Flex justify="center" height="3rem" width="6rem" flexWrap="wrap">
      {Array(level)
        .fill(0)
        .map((_, i) => (
          <Image
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            height="1.5rem"
            width="1.5rem"
            mx="0.1rem"
            src={silverStar}
          />
        ))}
    </Flex>
  );
}
