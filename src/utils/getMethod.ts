import { ServerResponse } from 'http';
import { getUser, getUsers } from './../controller/usersConroller';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { uuidValidateV4 } from './uuidValidateV4';

export const getMethod = (url: string, res: ServerResponse) => {
  switch (url) {
    case '/api/users':
      getUsers(res);
      break;
    case `${url.match(/^\/api\/users\/[\w-]+$/)}`:
      const id = url.split('/')[3];
      const idIsValid = uuidValidateV4(id);

      if (!idIsValid) {
        res.writeHead(400, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'User id is not valid' }));
      }

      getUser(res, id);
      break;
    default:
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
      break;
  }
};
