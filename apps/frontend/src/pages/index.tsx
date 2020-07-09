import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Layout } from '../components/Layout';
import MainGroupBox from '../components/MainGroupBox';
import data from '../data/groups.yml';

interface GroupData {
  id: number;
  name: string;
  shortname: string;
}

export default function IndexPage(): JSX.Element {
  const dataImage = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { eq: "svg" }
          sourceInstanceName: { eq: "imagegroups" }
        }
      ) {
        edges {
          node {
            id
            publicURL
            name
          }
        }
      }
    }
  `).allFile.edges.reduce((acc, { node }) => {
    return { ...acc, [node.name]: node.publicURL };
  }, {});

  return (
    <Layout>
      <Flex flexWrap="wrap" justify="center">
        {data.map((group: GroupData) => (
          <MainGroupBox
            key={group.id}
            group={group}
            groupImage={dataImage[group.shortname]}
          />
        ))}
      </Flex>
    </Layout>
  );
}
