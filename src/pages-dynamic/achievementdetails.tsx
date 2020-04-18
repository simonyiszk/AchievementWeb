import { Flex } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';

interface Props extends RouteComponentProps {
  id?: string;
}

export default function ShowAchievementPage({ id }: Props): JSX.Element {
  useEffect(() => {
    console.log(id);
  });
  return (
    <Layout>
      <Flex>Hello World from achievement page</Flex>
    </Layout>
  );
}
