const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { sendLogToKinesis } = require('./producerController')
require('dotenv').config()

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {

    const saltRounds = 10;
    const hashedPassword = await bycript.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
    });

    await sendLogToKinesis(process.env.KINESIS_STREAM_NAME, {
      email: email,
      action: 'SIGNUP_SUCESS',
      timestamp: new Date().toISOString()
    })

    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {


    await sendLogToKinesis(process.env.KINESIS_STREAM_NAME, {
      email: email,
      action: 'SIGNUP_FAIL',
      timestamp: new Date().toISOString(),
      error: error.message || error.toString(), // safer to send string error info
    })

    console.error(error);

    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } })

        if (!user) {
      await sendLogToKinesis(process.env.KINESIS_STREAM_NAME, {
        email,
        action: 'LOGIN_UNAUTHORIZED',
        timestamp: new Date().toISOString(),
      });
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bycript.compare(password, user.password_hash);
    if (!match) {
      await sendLogToKinesis(process.env.KINESIS_STREAM_NAME, {
        email,
        action: 'LOGIN_UNAUTHORIZED',
        timestamp: new Date().toISOString(),
      });
      return res.status(401).json({ error: 'Invalid email or password' });
    }





    const jwtToken = jwt.sign(
      { userd: user.id, email: user.email },
      process.env.JWT_SECRET,

    )
     console.log(process.env.KINESIS_STREAM_NAME)
    await sendLogToKinesis(process.env.KINESIS_STREAM_NAME, {
      email: email,
      action: 'LOGIN_SUCESS',
      timestamp: new Date().toISOString()
    })

    res.status(200).json({ message: 'Login succesful!', jwtToken })


  } catch (error) {
    await sendLogToKinesis(process.env.KINESIS_STREAM_NAME, {
      email: email || '',
      action: 'lOGIN_FAIL',
      timestamp: new Date().toISOString(),
      error: error.message || error.toString(), // safer to send string error info
    })
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}