const router = require("express").Router();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require('./model/Moderators')
router.use(cors())



router.post('/register', async(req, res) => {
    //console.log('bhayena');
    console.log(req.body.username);
    const userData = {
        name: req.body.username,
        
        password: req.body.password,
        
        moderator: true
    }
    User.findOne({
            name: req.body.name
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ success: true, msg: ' registered' })
                        })
                        .catch(err => {
                            res.send(err)
                        })
                })
            } else {
                res.json({ status: false, msg: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })


})

module.exports = router;