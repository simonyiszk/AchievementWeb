import { Box, Flex, Heading } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

import AchievementBox from '../components/AchievementBox';
import { Layout } from '../components/Layout';
import consts from '../data/consts.yml';
import groupData from '../data/groups.yml';
import texts from '../data/texts.yml';

interface Achievement {
  id: number;
  title: string;
  category: 'szakmai' | 'kozossegi';
  level: number;
  description: string;
}
interface UserLevel {
  id: number;
  level: number;
}
interface LevelText {
  level: number;
  text: string;
}
interface GroupData {
  id: number;
  name: string;
  img: string;
}

interface Props extends RouteComponentProps {
  id?: string;
}

export default function ShowGroupPage({ id }: Props): JSX.Element {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userlevels, setUserlevels] = useState<UserLevel[]>([]);

  useEffect(() => {
    fetch(`${consts.root_url}/groups/${id}`, {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAchievements(res.allAchievements);
        setUserlevels(res.userAchievementLevels);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('error', err));
  }, [id]);
  const groupName = (groupId?: string): string => {
    return groupId
      ? groupData.filter((group: GroupData) => group.id === +groupId)[0].name
      : '';
  };
  return (
    <Layout>
      <Heading mb={4}>{groupName(id)}</Heading>
      {texts.levels.map((level: LevelText) => {
        return (
          <Box key={level.level}>
            <Heading as="h2" size="lg">
              {level.text}
            </Heading>
            <Flex flexWrap="wrap">
              {achievements
                .filter((achievement) => achievement.level === level.level)
                .map((achievement: Achievement) => (
                  <AchievementBox
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
            </Flex>
          </Box>
        );
      })}
    </Layout>
  );
}
