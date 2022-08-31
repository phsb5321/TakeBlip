import { Star_Yellow, Star } from "@/assets";
import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface IElementRow {
  isHighlighted: boolean;
  title: string;
  onToggleHighlight: () => void;
  onClick?: () => void;
  color: string;
  created: string;
}

export const ElementRow = ({
  isHighlighted,
  onToggleHighlight,
  title,
  color,
  created,
}: IElementRow) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box
        onClick={onToggleHighlight}
        _hover={{ cursor: 'pointer' }}
        m={'4'}
      >
        <Image
          src={isHighlighted ? Star_Yellow : Star}
          alt="TakeBlip Logo"
          boxSize={'34px'}
        />
      </Box>


      <Flex
        borderRadius={'7px'}
        height={'70PX'}
        bgColor={'white'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Box
          bgColor={color}
          borderRadius={'50%'}
          height={'30px'}
          width={'30px'}
          ml={'4'}
        />


        <Text
          fontSize={'larger'}
          color={'boxTextColor'}
          ml={'4'}
        >
          <Link to={`/detail/${title}`}>
            {title}
          </Link>
        </Text>

        <Spacer />

        <Text
          fontSize={'large'}
          color={'boxSubtitle'}
          fontWeight={'normal'}
          mr={'4'}
        > {`Created at ${created}`} </Text>
      </Flex>

    </Flex >
  )
}