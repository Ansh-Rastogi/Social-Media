const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

dotenv.config('./.env');

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

// middlewares
app.use(express.json({
    limit: '50mb'
}));
app.use(morgan('common')); // used to console the details of the API request
app.use(cookieParser());   //used to store refresh tokens in cookie
// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:3000',
// }))

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/user', userRouter);
app.get('/', (req, res) => {
    res.status(200).send('ok from server');
})

const PORT = process.env.PORT || 4001;

dbConnect();

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})

