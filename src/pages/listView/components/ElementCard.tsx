import {
  Box,
  Flex,
  Image,
  Text,
  useBoolean,
} from '@chakra-ui/react'

import { Star, Star_Yellow } from '@/assets/index'
import { Link } from 'react-router-dom';

export interface IElementCard {
  isHighlighted: boolean;
  title: string;
  subtitle: string;
  onToggleHighlight: () => void;
  onClick?: () => void;
  color: string;
}

export const ElementCard = ({
  isHighlighted,
  onToggleHighlight,
  title,
  subtitle,
  color,
}: IElementCard) => {

  return (
    <Box
      bgColor={'white'}
      width={'220px'}
      height={'250px'}
      borderRadius={'7px'}
      m={8}
    >
      <Box>
        <Box
          m={0.5}
          onClick={onToggleHighlight}
          _hover={{ cursor: 'pointer' }}
        >
          <Image
            src={isHighlighted ? Star_Yellow : Star}
            alt="TakeBlip Logo"
            boxSize={'34px'}
            m={3}
          />
        </Box>

        <Flex width={'100%'} direction={'column'} alignContent={'center'}>
          <Box
            bgColor={color}
            borderRadius={'50%'}
            height={'70px'}
            width={'70px'}
            m={'auto'}
          />
          <Text
            m={'auto'}
            fontSize={'larger'}
            mt={8}
            color={'boxTextColor'}
          >
            <Link to={`/detail/${title}`}>
              {title}
            </Link>
          </Text>

          <Text
            m={'auto'}
            fontSize={'large'}
            color={'boxSubtitle'}
            fontWeight={'normal'}
          > {subtitle} </Text>
        </Flex>

      </Box>
    </Box>
  )
}