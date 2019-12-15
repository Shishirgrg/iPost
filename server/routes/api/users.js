const router = require("express").Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Security = require("../../model/Security");
const User = require("../../model/Users");
const Moderator = require("../../model/Moderators");
const Post = require("../../model/Posts");
const Comment = require("../../model/Comments");
const Like = require("../../model/Likes");
const Notification = require("../../model/Notification");
const multer = require('multer');
const path = require('path');
const image = require("../../model/image");
router.use(cors());


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

//initializing the upload variable


process.env.SECRET_KEY = "secret";

router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(req.file);
                const pic = new image();
                pic.name = req.file.filename,
                    pic.path = req.file.path,
                    pic.type = req.file.mimetype,

                    pic.save((err, docs) => {
                        if (!err) {
                            //console.log(docs)
                            res.json({
                                msg: "successfully posted",
                                docs
                            });
                        } else {
                            console.log(err);
                        }
                    });

                //res.json({ success: "true", name: req.file.filename });
            }
        })
        // console.log(req.file);
        // res.json({
        //     success: "true",
        //     path: req.file.path
        // });
})



router.post("/register", (req, res) => {





    //console.log('bhayena');

    // console.log(req.body.username);
    const today = new Date();
    const userData = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fullname: '',
        address: '',
        contact: '',
        bio: '',
        date: today,
        moderator: false,
        ques1: req.body.quesone,
        ans1: req.body.ansone,
        ques2: req.body.questwo,
        ans2: req.body.anstwo,
        imagePath: ''

    };

    Moderator.findOne({
            name: req.body.username
        })
        .then(user => {
            if (!user) {
                User.findOne({
                        email: req.body.email,
                        name: req.body.username
                    })
                    .then(user => {
                        if (!user) {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                userData.password = hash;
                                bcrypt.hash(req.body.ansone, 10, (err, hash) => {
                                    userData.ans1 = hash;
                                    bcrypt.hash(req.body.anstwo, 10, (err, hash) => {
                                        userData.ans2 = hash;
                                        User.create(userData)
                                            .then(user => {
                                                res.json({ success: true, msg: " registered" });
                                            })
                                            .catch(err => {
                                                res.send(err);
                                            });
                                    });
                                });
                            });

                        } else {
                            res.json({ status: false, msg: "User already exists" });
                        }
                    })
                    .catch(err => {
                        res.send("error: " + err);
                    });
            }
        })
        .catch(err => {
            res.json({ status: false, msg: "User already exists" })
        })
});


//___________________________________________________
router.post("/login", (req, res) => {
    //console.log(req.body);
    User.findOne({
            moderator: false,
            name: req.body.username
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.imagePath
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: "1D"
                    });
                    res.json({ success: true, token });
                    //res.send(token)
                } else {
                    res.json({ success: false, msg: "Username or password wrong" });
                }
            } else {
                //res.json({ success: false, msg: 'User does not exist' })

                // For moderator
                Moderator.findOne({
                        moderator: true,
                        name: req.body.username
                    })
                    .then(user => {
                        if (user) {
                            if (bcrypt.compareSync(req.body.password, user.password)) {
                                const payload = {
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    //password: user.password
                                };

                                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                    expiresIn: "1D"
                                });
                                res.json({ moderator: true, token });

                                //res.send(token);
                            } else {
                                res.json({
                                    moderator: false,
                                    msg: "Username or password wrong"
                                });
                            }
                        } else {
                            res.json({ modertaor: false, msg: "User does not exist" });
                        }
                    })
                    .catch(err => {
                        res.send("error: " + err);
                    });
            }
        })
        .catch(err => {
            res.send("error: " + err);
        });
});

// Get all users
router.get("/user", (req, res) => {
    User.find({}, (err, docs) => {
        if (!err) {
            //console.log(docs);
            res.json({ success: "true", docs });
        } else {
            console.log(err);
        }
    });
});

//specific user ko data
router.get("/user/:name", (req, res) => {
    User.find({ name: req.params.name }, (err, docs) => {
        if (!err) {
            console.log(docs)
            res.json({ success: "true", docs });
        } else {
            console.log(err);
        }
    })

});




// post ko lagi 
router.post("/post", (req, res) => {
    const post = new Post();
    (post.name = req.body.username),
    (post.content = req.body.post),
    (post.like = false),
    (post.date = new Date()),
    (post.imagePath = req.body.img);
    post.save((err, docs) => {
        if (!err) {
            res.json({ msg: "successfully posted", docs });
        } else {
            console.log(err);
        }
    });
});

// Retrieve all the posts
router.get("/post", (req, res) => {
    Post.find()
        .sort("-date")
        .exec((err, docs) => {
            if (!err) {
                res.json({ msg: "success", docs });
            } else {
                console.log(err);
            }
        });
});






// router.get('/post', (req, res) => {
//     Post.findOne({}, {
//             "sort": [
//                 ['datefield', 'asc']
//             ]
//         }, )
//         //.select("_id content like comment")
//         .populate('comments')
//         .exec()
//         .then(docs => {
//             console.log("post get gar bahnyo")
//             res.send({ docs })

//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

//inserting the comment
router.post("/post/comment/:id", (req, res) => {
    Post.findById({ _id: req.params.id }, (err, docs) => {
        if (!err) {
            const comment = new Comment();
            comment.postId = req.params.id;
            comment.name = req.body.name;
            comment.comment = req.body.content;
            comment.imagePath = req.body.img;
            comment.save((err, docs) => {
                if (!err) {
                    res.json({ docs, msg: "true" });
                    //console.log("bhayo")
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
    //comment hanyo bhanera notify garna 
    // // const notification = new Notification();
    // // notification.postId = req.params.id;
    // // notification.sender = req.body.name;
    // // notification.receiver = req.body.pOwner;
    // // notification.type = req.body.notify;


    // // notification.save((err, noti) => {
    // //     if (!err) {
    // //         res.json({
    // //             noti,
    // //             msg: "true"
    // //         });
    // //         //console.log("bhayo")
    // //     } else {
    // //         console.log(err);
    // //     }
    // // });


    // .populate('comment').exec((err, comment) => {
    //     console.log("Populated " + comment);
    // })
});

//reteieve all comment 
router.get("/post/comment", (req, res) => {
    Comment.find((err, docs) => {
        if (!err) {
            res.json({
                docs,
                msg: "true"
            });
        } else {
            console.log(err);
        }
    });
});

// retrieve particular post comment
router.get("/post/comment/:id", (req, res) => {
    Comment.find({ postId: req.params.id }, (err, docs) => {
        if (!err) {
            res.json({ docs, msg: "true" });
        } else {
            console.log(err);
        }
    });
});

// delete particular post comment
router.delete("/post/deletecomment/:id", (req, res) => {
    Comment.findByIdAndDelete({ _id: req.params.id }, (err, docs) => {
        if (!err) {
            res.json({ msg: "successful" })
        } else {
            console.log(err);
        }
    })
})

// Delete posts
router.delete("/post/:id", (req, res) => {
    Post.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("-------------------")
            // console.log(result)
            // console.log("-----------------------")
            res.json({ deleted: true, result });
        }
    });
});

// Update posts
router.put("/post/:id", (req, res) => {
    const content = req.body;
    Post.findByIdAndUpdate({ _id: req.params.id }, { $set: { content: content.postdata } }, { returnOriginal: false },
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }
    );
});

//profile page ko routes aafno

//retrieve post from the profile of a user
router.get("/profile/post/:uname", (req, res) => {
    //console.log(req.params.uname)
    Post.find({
            name: req.params.uname
        })
        .sort("-date")
        .exec((err, docs) => {
            if (!err) {
                // console.log(docs)
                res.json({
                    docs,
                    msg: "retrieving data"
                });
                //console.log(docs)
            } else {
                res.send(err);
            }
        });
});

//get followers
router.get("/recommendation", (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.json({
                docs,
                msg: "Follow recommendation"
            });
        } else {
            console.log(err);
        }
    });
});

// When user like particular post
router.post("/post/likes/:id", (req, res) => {
    console.log(req.body.name)
    Post.findById({ _id: req.params.id }, (err, docs) => {
        if (!err) {
            const like = new Like();
            like.postId = req.params.id;
            like.LikedBy = req.body.name;
            like.save((err, docs) => {
                if (!err) {
                    res.json({ docs, msg: "liked by users" });
                } else {
                    console.log(err);
                }
            });
        }
    });
});

// to get all the likes on the all post
router.get("/post/likes", (req, res) => {
    Like.find((err, docs) => {
        if (!err) {
            res.json({ docs, msg: "user le like gareko " });
        } else {
            console.log(err);
        }
    });
});
// get the likes of the specific post
router.get("/post/likes/:pid", (req, res) => {
    Like.find({
        postId: req.params.pid
    }, (err, docs) => {
        if (!err) {
            res.json({
                docs
            })
        } else {
            console.log(err);
        }
    })
})

//when user dislike particular post
router.delete("/post/likes/:id", (req, res) => {
    Like.deleteOne({
        postId: req.params.id,
        LikedBy: req.body.name
    }, (err, docs) => {
        if (!err) {
            res.json({ delete: "true", docs });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;