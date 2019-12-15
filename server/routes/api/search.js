const router = require("express").Router();
const cors = require("cors")
const User = require("../../model/Users");
router.use(cors())


router.post("/find/:username", (req, res) => {
        User.find({ name: req.params.username }, (err, docs) => {
            if (!err) {
                res.json({ docs, found: "true" })
            } else {
                res.json({ err, found: 'false' })
            }
        })
    })
    // router.post('/find/:username', (req, res) => {
    //     User.find({ name: req.params.username })
    //         .then(user => {
    //             if (!user) {
    //                 res.json({ user, found: "true" })
    //             } else {
    //                 console.log("error bhayo hai")
    //             }
    //         })
    //         .catch(() => res.json({ notfound: "true" }))
    // })
module.exports = router;