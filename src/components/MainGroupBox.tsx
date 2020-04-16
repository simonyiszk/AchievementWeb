import { Flex, Image } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

interface Group {
  name: string;
  img: string;
}

function MainGroupBox({
  group,
  onClick,
}: {
  group: Group;
  onClick: (name: string) => void;
}): JSX.Element {
  return (
    <Flex
      justify="center"
      alignItems="center"
      m={4}
      p={4}
      height="10rem"
      width="15rem"
      border="solid 1px rgba(0, 0, 0, 0.05)"
      cursor="pointer"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      onClick={(): void => onClick(group.name)}
    >
      <Image height="100%" src={group.img} />
    </Flex>
  );
}

MainGroupBox.propTypes = {
  group: PropTypes.shape({ name: PropTypes.string, img: PropTypes.string })
    .isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MainGroupBox;
