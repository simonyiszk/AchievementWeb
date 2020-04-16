import { Flex } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import MainGroupBox from '../components/MainGroupBox';
import consts from '../data/consts.yml';
import data from '../data/groups.yml';

interface GroupData {
  name: string;
  img: string;
}
interface GroupIds {
  [key: string]: number;
}
interface GroupFetchData {
  id: number;
  name: string;
}

export default function IndexPage(): JSX.Element {
  const [groupIds, setGroupIds] = useState<GroupIds>({});

  useEffect(() => {
    fetch(`${consts.root_url}/groups`, {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        const newGroupIds = res.reduce(
          (acc: GroupIds, curr: GroupFetchData) => {
            acc[curr.name] = curr.id;
            return acc;
          },
          {},
        );
        setGroupIds(newGroupIds);
      })
      .catch((err) => console.log('error', err));
  }, []);

  const handleClick = (name: string): void => {
    console.log(groupIds[name]);
  };

  return (
    <Layout>
      <Flex flexWrap="wrap" justify="center">
        {data.map((group: GroupData) => (
          <MainGroupBox key={group.name} group={group} onClick={handleClick} />
        ))}
      </Flex>
    </Layout>
  );
}
