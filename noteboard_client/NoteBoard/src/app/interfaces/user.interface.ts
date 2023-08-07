import { v4 as uuidv4 } from 'uuid';

export interface User {
  userId: string;
  username: string;
  password: string;
  active: boolean;
}

export const NULL_USER: User = {
  userId: uuidv4(),
  username: '',
  password: '',
  active: false,
};
