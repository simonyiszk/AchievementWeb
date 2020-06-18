import { Flex } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';

interface Props extends RouteComponentProps {
  id?: string;
}

export default function ManageGroupPage({ id }: Props): JSX.Element {
  useEffect(() => {
    console.log(id);
  });
  return (
    <Layout>
      <Flex>Hello World from manage page</Flex>
    </Layout>
  );
}
