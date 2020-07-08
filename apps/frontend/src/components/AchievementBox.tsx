import { Box, BoxProps, Flex, Image } from '@chakra-ui/core';
import { Link } from 'gatsby';
import React from 'react';

import img from 'images/groups/schdesign.svg';
import StarBox from './StarBox';

interface Achievement {
  id: number;
  title: string;
  category: 'szakmai' | 'kozossegi';
  level: number;
}

interface Props extends BoxProps {
  achievement: Achievement;
  withText?: boolean;
}

const generateLevel = (): number => {
  return Math.floor(Math.random() * 5) + 1; // TODO: Delete this
};

export default function AchievementBox({
  achievement,
  withText = true,
  ...props
}: Props): JSX.Element {
  return (
    <Flex {...props} flexDirection="column">
      <Link to={`/achievement/${achievement.id}`}>
        <Flex
          position="relative"
          justify="center"
          alignItems="center"
          p={4}
          height="7rem"
          width="7rem"
          borderRadius="7rem"
          border="solid 1px rgba(0, 0, 0, 0.05)"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        >
          <Image height="100%" src={img} />
          <Box position="absolute" bottom="-0.5rem">
            <StarBox level={generateLevel()} />
          </Box>
        </Flex>
      </Link>
      {withText && (
        <Flex justify="center" mt={2}>
          {achievement.title}
        </Flex>
      )}
    </Flex>
  );
}
