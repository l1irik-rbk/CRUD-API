import { getMethod } from './utils/getMethod';
import { getUsers } from './controller/usersConroller';
import dotenv from 'dotenv';
import http, { IncomingMessage, Server, ServerResponse } from 'http';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case 'GET':
      getMethod(req.url as string, res);
      break;
    default:
      res.writeHead(404, { ContentType: 'application/json' });
      res.end(JSON.stringify({ message: 'Not a valid Method' }));
      break;
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
