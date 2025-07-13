const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../utils/sendEmail');
const { send } = require('node:process');

const users = [];

const register = async(req, res) => {

    try{
    const {username, password, role, email} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        email,
        role,
        password: hashedPassword
    };

    users.push(newUser);

    await sendEmail(email, 'Registration Successful', 'Welcome to Virtual Event Platform')
    
    res.status(201).json({message: 'User registered successfully'});
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
};

const login = async(req, res) => {

    const {username, password} = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({message: 'Invalid Credentials'})

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({message: 'Invalid Credentials'})

    const token = jwt.sign({id:user.id, role:user.role}, 'secretkey', {expiresIn: '1h'});

    res.json({token});
};

module.exports = {register, login, users};