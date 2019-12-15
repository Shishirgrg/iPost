const router = require("express").Router();
const cors = require("cors");

const User = require("../../model/Users");
const Follow = require("../../model/Follow");

router.use(cors());

router.get("/followrecommendation/:username", (req, res) => {

    var followedUsers = [];
    var users = [];
    Follow.find({ followedBy: req.params.username }, (err, docs) => {
        if (!err) {
            // console.log(docs)
            followedUsers = docs;
            // res.json({ followedUsers });

            User.find({}, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    //console.log(docs)
                    users = docs;
                    //res.json({ users });
                    for (i = 0; i < users.length; i++) {
                        for (j = 0; j < followedUsers.length; j++) {
                            if (users[i].name === followedUsers[j].username) {
                                users.splice(i, 1);
                            } else {
                                //console.log("Something is not right");
                                var nothing = users[i];
                            }
                        }
                    }
                    console.log("----");
                    console.log(users);
                    console.log("----");
                    res.json({
                        users
                    });
                } else {
                    console.log("----");
                }


            });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;