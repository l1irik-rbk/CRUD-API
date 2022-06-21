import request from 'supertest';
import { server } from '../server';
import { User } from '../utils/interfaces';

let users: User[] = require('../../data/data.json');

describe('GET /api/users', () => {
  const user = {
    username: 'asd',
    age: 123,
    hobbies: ['asd', 'asd'],
  };

  const id = 'cce3e92a-0a55-4e69-a3a9-7d8d755e8947';

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it('Should get users', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toEqual(users);
  });

  it('Should get user by id', async () => {
    const res = await request(server).get(`/api/users/${id}`);

    const response = JSON.parse(res.text);

    expect(res.statusCode).toEqual(200);

    expect(response.id).toBe(id);
    expect(response.username).toBe('Anton');
    expect(response.age).toBe(23);
    expect(response.hobbies).toEqual(['saf']);
  });

  it('Should create user', async () => {
    const res = await request(server).post('/api/users').send(user);

    const response = JSON.parse(res.text);

    expect(res.statusCode).toBe(201);

    expect(response).toHaveProperty('id');
    expect(response.username).toBe('asd');
    expect(response.age).toBe(123);
    expect(response.hobbies).toEqual(['asd', 'asd']);
  });

  it('Should delete user', async () => {
    const res = await request(server).delete(`/api/users/${id}`);
    expect(res.statusCode).toBe(204);
  });
});
