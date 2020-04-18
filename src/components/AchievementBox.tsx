import { Flex, Image } from '@chakra-ui/core';
import { Link } from 'gatsby';
import React from 'react';

import img from '../assets/groups/schdesign.svg';

interface Achievement {
  id: number;
  title: string;
  category: 'szakmai' | 'kozossegi';
  level: number;
}

interface Props {
  achievement: Achievement;
}

export default function AchievementBox({ achievement }: Props): JSX.Element {
  return (
    <Flex m={4} flexDirection="column">
      <Link to={`/achievement/${achievement.id}`}>
        <Flex
          justify="center"
          alignItems="center"
          p={4}
          height="10rem"
          width="10rem"
          borderRadius="10rem"
          border="solid 1px rgba(0, 0, 0, 0.05)"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        >
          <Image height="100%" src={img} />
        </Flex>
      </Link>
      <Flex justify="center" mt={2}>
        {achievement.title}
      </Flex>
    </Flex>
  );
}
