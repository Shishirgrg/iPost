const router = require("express").Router();
const cors = require("cors");

const Follow = require("../../model/Follow");

router.use(cors());

// Follow some users
router.post("/follow", (req, res) => {

    console.log("Pasena")

    const follow = new Follow();
    (follow.userId = req.body.followId),
    (follow.username = req.body.followName),
    (follow.userPhoto = req.body.fPic),
    //yo chai follow garne user ko
    (follow.followedBy = req.body.name),
    (follow.followedById = req.body.userID),
    (follow.followedByPhoto = req.body.userPic),
    (follow.friend = true);
    follow.save((err, docs) => {
        if (!err) {
            res.json({ docs, msg: "successfully followed" });
        } else {
            console.log(err);
        }
    });
});
//Unfollow users
router.delete("/follow", (req, res) => {
    console.log(req.body.theName)
    console.log(req.body.name)

    Follow.deleteOne({
        username: req.body.theName,
        followedBy: req.body.name

    }, (err, docs) => {
        if (!err) {
            res.json({
                docs,
                msg: "successfully followed"
            });
        } else {
            console.log(err);
        }
    })
});

// Show follower tables
router.get("/follower/:username", (req, res) => {
    //console.log(req.params.username)
    Follow.find({ username: req.params.username }, (err, docs) => {
        if (!err) {
            //console.log(docs)
            res.json({ msg: "true", docs });

        } else {
            console.log(err);
        }
    });
});


// Show followings tables
router.get("/follow/:name", (req, res) => {
    Follow.find({ followedBy: req.params.name }, (err, docs) => {
        if (!err) {
            console.log("-----------------------------")
            console.log(docs)
            console.log("-----------------------------")
            res.json({
                docs,
                msg: "true"
            });
        } else {
            console.log(err);
        }
    });
});
module.exports = router;