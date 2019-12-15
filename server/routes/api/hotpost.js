const router = require("express").Router();
const cors = require("cors")
const Post = require("../../model/Posts");
const Comment = require("../../model/Comments");
const Like = require("../../model/Likes");
router.use(cors())

router.get('/hotpost/:pID', (req, res) => {
    Post.find({ _id: req.params.pID }, (err, docs) => {
        if (!err) {
            res.json({ docs, msg: "true" })
        } else {
            console.log(err);
        }
    })
})

module.exports = router;