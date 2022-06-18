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
    const newUser = { id: uuidv4(), ...user } as User;
    users.push(newUser);
    resolve(newUser);
  });
};

export const updateUser = (id: string, user: User) => {
  return new Promise((resolve, reject) => {
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { id, ...user };
    resolve(users[userIndex]);
  });
};
