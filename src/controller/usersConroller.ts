import { User } from '../utils/interfaces';
import { ServerResponse } from 'http';
import { findAllUsers } from '../models/userModel';

export const getUsers = async (res: ServerResponse) => {
  try {
    const users = (await findAllUsers()) as User[];
    res.writeHead(200, { ContentType: 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};
