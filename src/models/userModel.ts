import { User } from '../utils/interfaces';

const users: User[] = require('../../data/data.json');

export const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findUsers = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};
