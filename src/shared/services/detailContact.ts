import axios from 'axios';
import { IContact } from '@/entities';

export const detailContacts = async (name: string): Promise<IContact> => {
  console.log("REQUEST" + name);
  if (!name) {
    throw new Error('Name is required');
  }
  const { data } = await axios.get(
    `https://front-end-test.beta-cs.blip.ai/${name.toLowerCase().replace(' ', '_')}/details`
  );

  console.table(data);

  return data;
}