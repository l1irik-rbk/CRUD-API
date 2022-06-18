import { User } from '../utils/interfaces';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = require('../../data/data.json');

export const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findUser = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const createUser = (user: User) => {
  return new Promise((resolve, reject) => {
    const newUser = { ...user, id: uuidv4() } as User;
    users.push(newUser);
    resolve(newUser);
  });
};
