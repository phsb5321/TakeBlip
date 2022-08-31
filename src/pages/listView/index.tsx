import {
  Box,
  Flex,
} from '@chakra-ui/react'
import { useState, useMemo, useEffect } from 'react'
import { Navbar, SearchBar } from '@/shared/components'
import { listContacts } from '@/shared/services'
import {
  useQuery,
} from 'react-query'
import { IContact } from '@/entities'
import { ContactGrid, ContactList } from './components'

export const Page_ListView = () => {

  const [contacts, setContacts] = useState<IContact[]>([])
  const [processedContacts, setProcessedContacts] = useState<IContact[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [orderBy, setOrderBy] = useState<'name' | 'type' | 'created'>('name')
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')

  const { isLoading, isError, isSuccess } = useQuery(
    ['contacts'],
    listContacts,
    {
      onSuccess: (data) => setContacts(data),
      refetchOnWindowFocus: false,
    }
  )

  const onHighlight = (name: string): void => {
    setContacts(contacts.map(contact => {
      if (contact.name === name) {
        contact.isHighlighted = !contact.isHighlighted
      }
      return contact
    }))
  }

  const memoOnHighlight = useMemo(() => onHighlight, [])

  useEffect(() => {
    setProcessedContacts(contacts.filter(
      (contact) => contact.name.toLowerCase().includes(searchValue.toLowerCase())
    ))
  }, [contacts])

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
                contacts={processedContacts}
                contactFilter={(contact) => contact.isHighlighted}
                onHighlight={memoOnHighlight}
                showHr={processedContacts.filter((contact) => contact.isHighlighted).length > 0}
              />
              <ContactGrid
                orderBy={orderBy}
                contacts={processedContacts}
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
                contacts={processedContacts}
                contactFilter={(contact) => contact.isHighlighted}
                onHighlight={memoOnHighlight}
                showHr={processedContacts.filter((contact) => contact.isHighlighted).length > 0}
              />
              <ContactList
                orderBy={orderBy}
                contacts={processedContacts}
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