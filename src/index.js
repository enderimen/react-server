import express from 'express';
import bodyParser from 'body-parser';
import AppRouter from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

// mongoose.connect('mongodb://ebuser:Ege74014001?@ds243344.mlab.com:43344/react_server_api'});
// mongoose.Promise = global.Promise;

mongoose.connect("mongodb://ds243344.mlab.com:43344/react_server_api", {
    auth: {
      user: "ebuser",
      password: "Ege74014001?"
    },
    useCreateIndex: true,
    useNewUrlParser: true
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

AppRouter(app);

app.get('/', (req, res) => {
    res.send('Hi API');
});

app.listen(3300, () => console.log("Runnig..."));