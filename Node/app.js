//Express is a js module help to 
const express = require('express');
const app = express();
const router = express.Router();

// create different routers for different requests2
router.get('/home', (req, res) => [
    res.send('This is home router')
]);

router.get('/profile', (req, res) => [
    res.send('This is profile router')
]);
router.get('/login', (req, res) => [
    res.send('This is login router')
]);
router.get('/logout', (req, res) => [
    res.send('This is logout router')
])

app.use('/', router);
app.listen(process.env.port || 3000);

console.log(`Web Server is listened at ${process.env.port || 3000}`)