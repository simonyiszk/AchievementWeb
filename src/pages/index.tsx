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
  const [groupIds, setGroupIds] = useState<GroupIds>({});

  useEffect(() => {
    const newGroupIds = data.reduce((acc: GroupIds, curr: GroupData) => {
      acc[curr.name] = curr.id;
      return acc;
    }, {});
    setGroupIds(newGroupIds);
  }, []);

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
