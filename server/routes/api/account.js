const router = require("express").Router();
const bcrypt = require("bcrypt");
const cors = require("cors");


const Users = require("../../model/Users");
const Post = require("../../model/Posts");
const Like = require("../../model/Likes");
const Comment = require("../../model/Comments");
const Follow = require("../../model/Follow");
const Notifications = require("../../model/Notification");
const multer = require('multer');
const path = require('path');
const image = require("../../model/image");
router.use(cors())

const storage = multer.diskStorage({

    destination: '/Users/sudeshgurung/Desktop/iPost-app/server/public/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});
//setstorage engine

const upload = multer({
    storage: storage
}).single('file');

router.put('/upload/:username', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.file);
            // const pic = new Users();
            // pic.imagePath = req.file.filename,
            Users.updateOne({
                name: req.params.username
            }, {
                imagePath: req.file.filename
            }, (err, docs) => {
                if (!err) {
                    res.json({
                        success: "true",
                        docs
                    })

                }
            })



            //res.json({ success: "true", name: req.file.filename });
        }
    })
})


// get the details 
router.get('/info/:username', (req, res) => {

        Users.find({ name: req.params.username }, (err, docs) => {
            if (!err) {
                res.json({ success: "true", docs })
                console.log(docs)
            } else {
                console.log(err);
            }
        })
    })
    //updating the bio details
router.put('/info/:username', (req, res) => {
    Users.updateOne({
        name: req.params.username
    }, {
        fullName: req.body.fullname,
        address: req.body.add,
        contact: req.body.contact,
        bio: req.body.bio
    }, (err, docs) => {
        if (!err) {
            res.json({ success: "true", docs })

        }
    })
})



//update password 
router.put('/changepassword/:username', (req, res) => {
    Users.findOne({ name: req.params.username }, (err, docs) => {
        if (!err) {
            // res.json({docs})
            if (bcrypt.compareSync(req.body.password, docs.password)) {
                // res.json({msg: 'successfull'})

                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    nayaPassword = hash;
                    Users.findOneAndUpdate({ name: req.params.username }, { $set: { password: nayaPassword } }, { returnOriginal: false },
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ success: "true" });
                            }
                        }
                    );

                });

            } else {
                //console.log("error")
                res.json({ notsuccess: "true" })
            }
        } else {
            console.log(err)
        }
    })
})


//delete users
router.delete('/delete/:username', (req, res) => {
    Users.findOne({ name: req.params.username }, (err, docs) => {
        if (!err) {
            if (bcrypt.compareSync(req.body.pass, docs.password)) {

                Users.findOneAndDelete({ name: req.params.username }, (err, docs) => {
                    if (!err) {
                        console.log(docs)
                        Post.deleteMany({ name: req.params.username }, (err, docs) => {
                            if (!err) {
                                console.log(docs)
                                Follow.deleteMany({ username: req.params.username }, (err, docs) => {
                                    if (!err) {
                                        console.log(docs)
                                        Like.deleteMany({ LikedBy: req.params.username }, (err, docs) => {
                                            if (!err) {
                                                console.log(docs)
                                                Comment.deleteMany({ name: req.params.username }, (err, docs) => {
                                                    if (!err) {
                                                        console.log(docs)
                                                            // Notifications.findOneAndDelete({receiver: req.params.username}, (err, docs) =>  {
                                                            //     if(!err){
                                                            //         console.log(docs);
                                                            //     }else{
                                                            //         console.log(err);
                                                            //     }
                                                            // })
                                                    } else {
                                                        console.log(err);
                                                    }
                                                })
                                            } else {
                                                console.log(err);
                                            }
                                        })
                                    } else {
                                        console.log(err);
                                    }
                                })
                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                    }
                })
                Notifications.deleteMany({ receiver: req.params.username }, (err, docs) => {
                    if (!err) {
                        console.log(docs);
                        console.log("----")
                    } else {
                        console.log(err);
                    }
                })
                Notifications.deleteMany({ sender: req.params.username }, (err, docs) => {
                    if (!err) {
                        console.log(docs);
                        console.log("----")
                    } else {
                        console.log(err);
                    }
                })
                Follow.deleteMany({ followedBy: req.params.username }, (err, docs) => {
                    if (!err) {
                        console.log('bhayo hai')
                            // Notifications.findOneAndDelete({sender: req.params.username}, (err, docs) =>  {
                            //     if(!err){
                            //         console.log(docs);
                        res.json({ success: "true", docs })
                            //     }else{
                            //         console.log(err);
                            //     }
                            // })

                    } else {
                        console.log(err);
                    }
                })

            } else {
                console.log('password doesnt match')
            }

        } else {
            console.log(err);
        }
    })
})

module.exports = router;