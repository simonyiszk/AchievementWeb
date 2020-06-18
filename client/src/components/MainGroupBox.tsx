import { Flex, Image } from '@chakra-ui/core';
import { Link } from 'gatsby';
import React from 'react';

interface Group {
  id: number;
  name: string;
  img: string;
}

interface Props {
  group: Group;
}

export default function MainGroupBox({ group }: Props): JSX.Element {
  return (
    <Flex m={4}>
      <Link to={`/group/${group.id}`}>
        <Flex
          justify="center"
          alignItems="center"
          p={4}
          height="10rem"
          width="15rem"
          border="solid 1px rgba(0, 0, 0, 0.05)"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        >
          <Image height="100%" src={group.img} />
        </Flex>
      </Link>
    </Flex>
  );
}
