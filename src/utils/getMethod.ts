import { ServerResponse } from 'http';
import { getUsers } from './../controller/usersConroller';

export const getMethod = (url: string, res: ServerResponse) => {
  switch (url) {
    case '/api/users':
      getUsers(res);
      break;
    default:
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
      break;
  }
};
