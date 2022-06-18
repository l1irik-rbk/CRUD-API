import { User } from '../utils/interfaces';

const users: User[] = require('../../data/data.json');

export const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};
