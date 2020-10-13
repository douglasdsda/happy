import express from 'express';
import { userInfo } from 'os';

const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
  console.log(request.query)
  console.log(request.params)
  console.log(request.body)
 return response.json( { message: 'hello world!' } );
})

app.listen(3333);