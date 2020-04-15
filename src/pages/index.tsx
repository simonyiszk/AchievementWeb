import { Flex } from '@chakra-ui/core';
import React from 'react';

import { Layout } from '../components/Layout';
import MainGroupBox from '../components/MainGroupBox';
import data from '../data/groups.yml';

interface Group {
  name: string;
  img: string;
}

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <Flex flexWrap="wrap" justify="center">
        {data.map((group: Group) => (
          <MainGroupBox key={group.name} group={group} />
        ))}
      </Flex>
    </Layout>
  );
}
