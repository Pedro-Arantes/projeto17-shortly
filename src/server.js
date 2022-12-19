import express from 'express';
import cors from 'cors';
import signRouters from '../src/routes/signRouter.js'
import usersRouters from '../src/routes/usersRouter.js'
import urlsRouters from '../src/routes/urlsRouter.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use(signRouters);
app.use(usersRouters);
app.use(urlsRouters)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));