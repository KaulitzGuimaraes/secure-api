const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User  = require('../models/user')

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bycript.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.login = async (req,res) =>{
    try{
        const { email, password } = req.body;
        const user =  await User.findOne({where: {email}})
        if (!user) return res.status(401).json({error: 'Invalid email or password'})

        const match = await bycript.compare(password, user.password_hash)
      
        if (!match) return res.status(401).json({error: 'Invalid email or password'})

        const jwtToken = jwt.sign(
            {userd: user.id, emai: user.emai},
            process.env.JWT_SECRET,

        )

        res.status(200).json({message: 'Login succesful!', jwtToken})
        

    }catch(error){
        console.error(error)
        res.status.json({error: 'Something went wrong'})
    }
}