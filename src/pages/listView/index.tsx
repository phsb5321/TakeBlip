import {
  Box,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { useState, useMemo, useEffect, useReducer } from 'react'
import { Navbar, SearchBar } from '@/shared/components'
import { listContacts } from '@/shared/services'
import {
  useQuery,
} from 'react-query'
import { IContact } from '@/entities'
import { ContactGrid, ContactList } from './components'

export const Page_ListView = () => {

  const [contacts, setContacts] = useState<IContact[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [orderBy, setOrderBy] = useState<'name' | 'type' | 'created'>('name')
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')


  const setNewState = async (data: IContact[]) => {
    return await Promise.resolve(setContacts(data))
  }

  const { isSuccess, data } = useQuery(
    ['contacts'],
    listContacts,
    {
      onSuccess: (data) => setNewState(data),
    }
  )

  const onHighlight = (contact: IContact): void => {
    setContacts(contacts.map(listContact => {
      if (listContact.name === contact.name) {
        listContact.isHighlighted = !listContact.isHighlighted
      }
      return listContact
    }))
  }

  const memoOnHighlight = useMemo(() => onHighlight, [])

  useEffect(() => {
    if (searchValue) {
      const newList = contacts.filter(contact => (
        contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        contact.type.toLowerCase().includes(searchValue.toLowerCase())
      ))
      setContacts(newList)
    }
  }, [searchValue])

  if (!isSuccess && !data) {
    return (
      <Box bgColor={'background'}>
        <Navbar />
        <Flex
          justifyContent={'center'}
          mt={'28'}
          bgColor={'background'}>
          <Spinner />
        </Flex>
      </Box>
    )
  }

  return (
    <>
      <Navbar />
      <Flex
        className={'App'}
        fontFamily={'fonts.body'}
        fontWeight={'extrabold'}
        bgColor={'background'}
        direction={'column'}
        gap={'10'}
        p={8}
      >
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          sortBy={orderBy}
          setSortBy={setOrderBy}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />


        {
          currentView === 'grid' && (
            <>
              <ContactGrid
                orderBy={orderBy}
                contacts={contacts}
                contactFilter={(contact) => contact.isHighlighted}
                onHighlight={memoOnHighlight}
                showHr={contacts.filter((contact) => contact.isHighlighted).length > 0}
              />
              <ContactGrid
                orderBy={orderBy}
                contacts={contacts}
                contactFilter={(contact) => !contact.isHighlighted}
                onHighlight={memoOnHighlight}
              />
            </>
          )
        }

        {
          currentView === 'list' && (
            <>
              <ContactList
                orderBy={orderBy}
                contacts={contacts}
                contactFilter={(contact) => contact.isHighlighted}
                onHighlight={memoOnHighlight}
                showHr={contacts.filter((contact) => contact.isHighlighted).length > 0}
              />
              <ContactList
                orderBy={orderBy}
                contacts={contacts}
                contactFilter={(contact) => !contact.isHighlighted}
                onHighlight={memoOnHighlight}
              />
            </>
          )
        }
      </Flex >
    </>
  )
}