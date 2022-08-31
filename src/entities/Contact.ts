export interface IContact {
  id: number;
  name: string;
  type: string;
  shortName?: string;
  description?: string;
  created: Date;
  updated?: Date;
  isHighlighted: boolean;
  image?: string;
  culture?: string;
  analytics?: {
    user: {
      total: number,
      actived: number,
    },
    message: {
      received: number,
      sent: number,
    },
  },
};