import { Box, Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react'
import { useMemo } from 'react';
import { BsFillGridFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'

export interface ISearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  currentView: 'grid' | 'list';
  setCurrentView: (value: 'grid' | 'list') => void;
  sortBy?: 'name' | 'type' | 'created';
  setSortBy: (value: 'name' | 'type' | 'created') => void;
}

export const SearchBar = ({
  currentView,
  setCurrentView,
  sortBy = 'name',
  setSortBy,
  searchValue,
  setSearchValue,
}: ISearchBarProps) => {
  const memoSetSortBy = useMemo(() => setSortBy, [setSortBy])
  return (
    <Box bgColor={'colors.background'} >
      <Flex justifyContent={'space-between'}>

        <Text
          fontSize={'3xl'}
          fontWeight={'extrabold'}
          color='colors.titleGrey'
        >
          My chatbots
        </Text>

        <Flex
          justifyContent={'space-around'}
          direction={'row'}
          gap={1}
        >
          <Box width={'412px'}>
            <Input
              placeholder="Search"
              bgColor={'white'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          <Button
            bgColor={sortBy === 'name'
              ? 'selectedHighlight' : 'highlight'}
            color={'clearText'}
            onClick={() => memoSetSortBy('name')}
          >
            Order by name
          </Button>

          <Button
            bgColor={sortBy === 'created'
              ? 'selectedHighlight' : 'highlight'}
            color={'clearText'}
            onClick={() => memoSetSortBy('created')}
          >
            Order by creation
          </Button>

          <Flex
            direction={'row'}
            alignItems={'top'}
            justifyContent={'space-between'}
            ml={3}
            gap={3}
          >

            <Box
              onClick={() => setCurrentView('grid')}
              _hover={{ cursor: 'pointer' }}
            >
              <BsFillGridFill color={currentView === 'grid' ? '#6E7B91' : '#D2DFE6'} size={38} />
            </Box>

            <Box
              onClick={() => setCurrentView('list')}
              _hover={{ cursor: 'pointer' }}
            >
              <FaThList color={currentView === 'list' ? '#6E7B91' : '#D2DFE6'} size={38} />
            </Box>

          </Flex>

        </Flex>

      </Flex>

      <Text
        fontSize={'3xl'}
        fontFamily={'fonts.body'}
        fontWeight={'extrabold'}
        color='subtitle'
        mt={4}
      >
        Favorites
      </Text>
    </Box>
  )
}