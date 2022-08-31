import { IContact } from "@/entities"
import { Box, Flex } from "@chakra-ui/react"
import { useMemo } from "react"
import { ElementCard } from "./ElementCard"
import { ElementRow } from "./ElementRow"

export interface IContactListProps {
  onHighlight: (index: string) => void,
  contactFilter: (contact: IContact) => boolean,
  contacts: IContact[],
  showHr?: boolean,
  orderBy?: 'name' | 'type' | 'created',
}

const colors = [
  'pink',
  'lightBlue',
  'lightYellow',
  'Purple',
  'orange',
  'lightgreen',
  'lightgray',
  'brown'
]

export const ContactList = ({
  contacts,
  onHighlight,
  contactFilter,
  showHr = false,
  orderBy = 'name',
}: IContactListProps) => {
  const sortedContacts = useMemo(() => {
    return contacts.sort((a: IContact, b: IContact) => {
      if (a[orderBy] < b[orderBy]) return -1
      if (a[orderBy] > b[orderBy]) return 1
      return 0
    })
  }, [contacts, orderBy])

  return (
    <Flex justifyContent={'start'} wrap={'wrap'} direction={'column'} gap={'4'} >
      {
        sortedContacts.map((contact, index) => (
          contactFilter(contact) &&
          <ElementRow
            key={index}
            title={contact.name}
            color={colors[index % colors.length]}
            isHighlighted={contact.isHighlighted}
            onToggleHighlight={() => onHighlight(contact.name)}
            created={new Intl.DateTimeFormat('pt-Br').format(new Date(contact.created))}
          />
        ))
      }
      {showHr && <Box m={'5'} mt={'14'} height={'2px'} width={'90%'} bgColor={'iconLight'} />}
    </Flex>
  )
}
