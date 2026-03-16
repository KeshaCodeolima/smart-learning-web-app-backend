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
const Note = require('./NoteSummaraz/notesummaraz')
const Quiz = require('./QuizGenerator/quizgenerator')
const QuizSave = require('./QuizSave/quizsave')
const VideoText = require('./VideoText/videotext')
const GetText = require('./VideoText/videotextgetting')
const GetQuizSave = require('./Progerss-Tracking/progresstracking')
const ResetPassword = require('./Forgot-Password/forgotpassword')
app.use('/api/users', Register);
app.use('/api/users', Login);
app.use('/api/users', Emotion);
app.use('/api/users', Note);
app.use('/api/users', Quiz);
app.use('/api/users', QuizSave);
app.use('/api/users', VideoText);
app.use('/api/users', GetText);
app.use('/api/users', GetQuizSave);
app.use('/api/users', ResetPassword);

app.get('/', (req, res) => {
  res.send('Backend is running');
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
