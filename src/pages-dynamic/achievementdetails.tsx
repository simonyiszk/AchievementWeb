import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

import AchievementBox from '../components/AchievementBox';
import { Layout } from '../components/Layout';
import LevelupIcon from '../components/LevelupIcon';
import consts from '../data/consts.yml';
import groupData from '../data/groups.yml';

interface Achievement {
  id: number;
  title: string;
  category: 'szakmai' | 'kozossegi';
  level: number;
  description: string;
  groupId: number;
}
interface GroupData {
  id: number;
  name: string;
  img: string;
}

interface Props extends RouteComponentProps {
  id?: string;
}

export default function ShowAchievementPage({ id }: Props): JSX.Element {
  const [achievement, setAchievement] = useState<Achievement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch(`${consts.root_url}/achievement/${id}`, {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAchievement(res);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('error', err));
  }, [id]);

  const groupName = (groupId: number): string => {
    return groupData.filter((group: GroupData) => group.id === groupId)[0].name;
  };

  const handleUpgradeClick = () => {
    console.log('a');
    onOpen();
  };

  return (
    <Layout>
      {achievement && (
        <Flex position="relative">
          <Flex
            flexDirection="column"
            flexGrow={1}
            alignItems={['center', null, 'start']}
          >
            <Heading as="h1" mb={[2, null, 4]} textAlign="center">
              {groupName(achievement.groupId)}
            </Heading>
            <Flex display={['block', null, 'none']}>
              <AchievementBox
                mb={4}
                achievement={achievement}
                withText={false}
              />
            </Flex>
            <Heading as="h2" size="lg" mb={4} textAlign="center">
              {achievement.title}
            </Heading>
            <Heading as="h3" size="md">
              Leírás
            </Heading>
            <Box>{achievement.description}</Box>
            <Flex display={['block', null, 'none']}>
              <LevelupIcon mt={4} onClick={onOpen} />
            </Flex>
          </Flex>
          <Flex display={['none', null, 'block']}>
            <AchievementBox mb={4} achievement={achievement} withText={false} />
            <LevelupIcon onClick={onOpen} />
          </Flex>
        </Flex>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Achievement fejlesztése</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              repellat nam assumenda? Cupiditate atque tempore itaque
              consectetur, voluptatem repudiandae ad?
            </Box>
          </ModalBody>

          <ModalFooter
            justifyContent={['center', null, 'space-between']}
            flexDirection={['column', null, 'row']}
          >
            <Input type="file" />
            <Button variantColor="green" onClick={handleUpgradeClick}>
              Küldés
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
