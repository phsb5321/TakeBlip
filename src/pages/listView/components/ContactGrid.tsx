import { IContact } from "@/entities"
import { Box, Flex } from "@chakra-ui/react"
import { useMemo } from "react"
import { ElementCard } from "./ElementCard"

export interface IContactGridProps {
  onHighlight: (contact: IContact) => void,
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

export const ContactGrid = ({
  contacts,
  onHighlight,
  contactFilter,
  showHr = false,
  orderBy = 'name',
}: IContactGridProps) => {
  const sortedContacts = useMemo(() => {
    return contacts.sort((a: IContact, b: IContact) => {
      if (a[orderBy] < b[orderBy]) return -1
      if (a[orderBy] > b[orderBy]) return 1
      return 0
    })
  }, [contacts, orderBy])

  return (
    <Flex justifyContent={'start'} wrap={'wrap'} >
      {
        sortedContacts.map((contact, index) => (
          contactFilter(contact) &&
          <ElementCard
            key={index}
            title={contact.name}
            subtitle={contact.type}
            isHighlighted={contact.isHighlighted}
            color={colors[index % colors.length]}
            onToggleHighlight={() => onHighlight(contact)}
          />
        ))
      }
      {showHr && <Box mt={'10'} height={'2px'} width={'90%'} bgColor={'iconLight'} />}
    </Flex>
  )
}
