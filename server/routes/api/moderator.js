const router = require("express").Router();
const cors = require("cors")

const Users = require("../../model/Users");
const Post = require("../../model/Posts");
const Like = require("../../model/Likes");
const Comment = require("../../model/Comments");
const Follow = require("../../model/Follow");
const Notifications = require("../../model/Notification");

router.use(cors())

// Get all posts
router.get('/post', (req, res) => {
    Post.find().sort('-date').exec((err, docs) => {
        if (!err) {
            res.json({ docs, msg: "retrieving data" })
            console.log(docs)
        } else {
            res.send(err);
        }
    })
})

// Delete posts
router.delete('/post/:id', (req, res) => {
    Post.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ deleted: "true", result });
        }
    })
})



//delete users by moderator
router.delete('/deletebymoderator/:username', (req, res) => {
    Users.findOne({ name: req.params.username }, (err, docs) => {
        if (!err) {
            Users.findOneAndDelete({name: req.params.username}, (err, docs) =>  {
                if(!err){
                    console.log(docs)
                    Post.deleteMany({name: req.params.username}, (err, docs) =>  {
                        if(!err){
                            console.log(docs)
                            Follow.deleteMany({username: req.params.username}, (err, docs) =>  {
                                if(!err){
                                    console.log(docs)
                                    Like.deleteMany({LikedBy: req.params.username}, (err, docs) =>  {
                                        if(!err){
                                            console.log(docs)
                                            Comment.deleteMany({name: req.params.username}, (err, docs) =>  {
                                                if(!err){
                                                    console.log(docs)
                                                    Notifications.deleteMany({receiver: req.params.username}, (err, docs) =>  {
                                                        if(!err){
                                                            console.log(docs);
                                                        }else{
                                                            console.log(err);
                                                        }
                                                    })
                                                }else{
                                                    console.log(err);
                                                }
                                            })
                                        }else{
                                            console.log(err);
                                        }
                                    })
                                }else{
                                    console.log(err);
                                }
                            })
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    console.log(err);
                }
            })
            Follow.deleteMany({followedBy: req.params.username}, (err, docs) =>  {
                if(!err){
                    console.log('bhayo hai')
                    Notifications.deleteMany({sender: req.params.username}, (err, docs) =>  {
                        if(!err){
                            console.log(docs);
                            res.json({success: "true", docs})
                        }else{
                            console.log(err);
                        }
                    })
                    
                }else{
                    console.log(err);
                }
            })
        } else {
            console.log(err);
        }
    })
})

module.exports = router;