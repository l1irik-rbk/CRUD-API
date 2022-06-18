import { removeUser, updateUser } from './../models/userModel';
import { User } from '../utils/interfaces';
import { ServerResponse, IncomingMessage } from 'http';
import { createUser, findAllUsers, findUser } from '../models/userModel';

export const getUsers = async (res: ServerResponse) => {
  try {
    const users = (await findAllUsers()) as User[];
    res.writeHead(200, { ContentType: 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { ContentType: 'application/json' });
    res.end(JSON.stringify({ message: 'bad request' }));
  }
};

export const getUser = async (res: ServerResponse, id: string) => {
  try {
    const user = (await findUser(id)) as User;
    if (!user) {
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      res.writeHead(200, { ContentType: 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    res.writeHead(500, { ContentType: 'application/json' });
    res.end(JSON.stringify({ message: 'bad request' }));
  }
};

export const postUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || !age || !hobbies) {
        res.writeHead(400, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'Body does not contain required fields' }));
        return;
      }

      const user: User = {
        username,
        age,
        hobbies,
      };

      const newUser = await createUser(user);

      res.writeHead(201, { ContentType: 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  } catch (error) {
    res.writeHead(500, { ContentType: 'application/json' });
    res.end(JSON.stringify({ message: 'bad request' }));
  }
};

export const putUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = (await findUser(id)) as User;

    if (!user) {
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const { username, age, hobbies } = JSON.parse(body);

        const updatedUser: User = {
          username: username || user.username,
          age: age || user.age,
          hobbies: hobbies || user.hobbies,
        };

        const updUser = await updateUser(id, updatedUser);

        res.writeHead(200, { ContentType: 'application/json' });
        res.end(JSON.stringify(updUser));
      });
    }
  } catch (error) {
    res.writeHead(500, { ContentType: 'application/json' });
    res.end(JSON.stringify({ message: 'bad request' }));
  }
};

export const deleteUser = async (res: ServerResponse, id: string) => {
  try {
    const user = (await findUser(id)) as User;
    if (!user) {
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    } else {
      await removeUser(id);
      res.writeHead(204, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'The record is found and deleted' }));
    }
  } catch (error) {
    res.writeHead(500, { ContentType: 'application/json' });
    res.end(JSON.stringify({ message: 'bad request' }));
  }
};
