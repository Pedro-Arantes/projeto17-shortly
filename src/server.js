import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use(signRouters);
app.use(usersRouters);
app.use(urlsRouters)

app.listen(4000, () => {
    console.log('Running on http://localhost:4000')
});