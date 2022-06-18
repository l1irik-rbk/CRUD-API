import { IncomingMessage, ServerResponse } from 'http';
import { deleteUser } from './../controller/usersConroller';
import { getId } from './getId';
import { uuidValidateV4 } from './uuidValidateV4';

export const deleteMethod = (url: string, req: IncomingMessage, res: ServerResponse) => {
  switch (url) {
    case `${url.match(/^\/api\/users\/[\w-]+$/)}`:
      const id = getId(url);
      const idIsValid = uuidValidateV4(id);

      if (!idIsValid) {
        res.writeHead(400, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'User id is not valid' }));
      }

      deleteUser(res, id);
      break;
    default:
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
      break;
  }
};
