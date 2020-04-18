import { Box, Flex } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

import AchievementBox from '../components/AchievementBox';
import { Layout } from '../components/Layout';
import consts from '../data/consts.yml';
import texts from '../data/texts.yml';

interface Achievement {
  id: number;
  title: string;
  category: 'szakmai' | 'kozossegi';
  level: number;
}
interface UserLevel {
  id: number;
  level: number;
}
interface LevelText {
  level: number;
  text: string;
}

interface Props extends RouteComponentProps {
  id?: string;
}

function ShowGroupPage({ id }: Props): JSX.Element {
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
      .catch((err) => console.log('error', err));
  }, [id]);
  return (
    <Layout>
      {texts.levels.map((level: LevelText) => {
        return (
          <Box key={level.level}>
            <Box>{level.text}</Box>
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

ShowGroupPage.propTypes = {};

export default ShowGroupPage;
