import { Flex } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import MainGroupBox from '../components/MainGroupBox';
import data from '../data/groups.yml';

interface GroupData {
  id: number;
  name: string;
  img: string;
}
interface GroupIds {
  [key: string]: number;
}

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <Flex flexWrap="wrap" justify="center">
        {data.map((group: GroupData) => (
          <MainGroupBox key={group.name} group={group} />
        ))}
      </Flex>
    </Layout>
  );
}
