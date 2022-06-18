import { User } from '../utils/interfaces';
import { ServerResponse } from 'http';
import { findAllUsers, findUsers } from '../models/userModel';

export const getUsers = async (res: ServerResponse) => {
  try {
    const users = (await findAllUsers()) as User[];
    res.writeHead(200, { ContentType: 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (res: ServerResponse, id: string) => {
  try {
    const user = (await findUsers(id)) as User;
    if (!user) {
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.writeHead(200, { ContentType: 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.error(error);
  }
};
