const router = require("express").Router();
const Post = require("../../model/Posts");
const Follow = require("../../model/Follow");
const Notification = require("../../model/Notification");

router.get('/postOfN/:username', (req, res) => {
    var myPost = "";
    var allPost = "";
    var followedUser = "";
    var newPost = "";
    Post.find({ name: req.params.username }, (err, docs) => {
        if (!err) {
            myPost = docs
                //res.json({myPost})

            Post.find({}, (err, docs) => {
                allPost = docs;
                if (!err) {
                    //res.json({docs})
                    Follow.find({ followedBy: req.params.username }, (err, docs) => {
                        if (!err) {
                            followedUser = docs
                                //res.json({ docs })

                            for (i = 0; i < allPost.length; i++) {
                                for (j = 0; j < followedUser.length; j++) {
                                    if (allPost[i].name === followedUser[j].username) {
                                        //console.log(allPost[i]);
                                        myPost = myPost.concat(allPost[i]);
                                    } else {
                                        //console.log('Have some fun')
                                        var nothing = allPost[i];
                                    }
                                }
                            }
                            //console.log(myPost)
                            myPost.sort(function(a,b){
                                return new Date(b.date) - new Date(a.date);
                            });
                            res.json({ myPost, msg: "true" })
                        }
                    })
                }
            })
        } else {
            console.log(err)
        }
    })
})


module.exports = router