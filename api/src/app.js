import express from 'express';
import { mint } from './services/Token';

const app = express();
const port = 4000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

mint('0');
