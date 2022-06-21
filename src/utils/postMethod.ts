import { ServerResponse, IncomingMessage } from 'http';

import { postUser } from '../controller/usersConroller';

export const postMethod = (url: string, req: IncomingMessage, res: ServerResponse) => {
  switch (url) {
    case '/api/users':
      postUser(req, res);
      break;
    default:
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
      break;
  }
};
