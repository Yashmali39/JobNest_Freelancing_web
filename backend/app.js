require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const freelancerRouter = require('./routes/freelancerRouter')
const clientRouter = require('./routes/clientRouter')
const cors = require('cors');
const connectDB = require('./config/mongoose-connection');
const dbgr = require('debug');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', (req, res)=>{
    res.send("backend is running...");
})

app.use('/users',userRouter)
app.use('/freelancer', freelancerRouter);
app.use('/client', clientRouter);


connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running");
  });
});