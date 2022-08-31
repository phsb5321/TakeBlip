import axios from 'axios';
import { IContact } from '@/entities';

export const listContacts = async (): Promise<IContact[]> => {
  const { data } = await axios.get(
    `https://front-end-test.beta-cs.blip.ai/bots`
  );

  const contacts = data.map((contact: IContact, index: number) => ({
    ...contact,
    created: new Date(contact.created),
    isHighlighted: false,
    id: index,
  }));

  return contacts;
}