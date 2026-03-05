const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const connectionDB = require('./DBConnection/dbconnection');
connectionDB();

app.use(cors());
app.use(express.json());

const Register = require('./Signup/register');
const Login = require('./Login/login');
const Emotion = require('./Emotion-Detection/emotion')
app.use('/api/users',Register);
app.use('/api/users',Login);
app.use('/api/users',Emotion);

app.get('/', (req, res) => {
  res.send('Backend is running');
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
