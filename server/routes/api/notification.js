const router = require("express").Router();
const cors = require("cors")

const Notification = require("../../model/Notification");
router.use(cors())


//send notification
router.post('/notifications/:pID', (req, res) => {
    console.log("------------")
    console.log(req.body.receiver)
    console.log("------------")
    const notification = new Notification();
    notification.postId = req.params.pID;
    notification.sender = req.body.name;
    notification.receiver = req.body.receiver;
    notification.type = req.body.notify;

    notification.save((err, docs) => {
        if (!err) {
            res.json({ docs, success: "true" })
        } else {
            console.log(err);
        }
    })
});

router.post('/notifications', (req, res) => {
    const notification = new Notification();
    notification.sender = req.body.name;
    notification.receiver = req.body.followName;
    notification.type = req.body.notificationType;

    notification.save((err, docs) => {
        if (!err) {

            res.json({
                success: "true"
            })
        } else {
            console.log(err);
        }
    })
});
//delete notification
router.delete("/notifications/:pID", (req, res) => {
        Notification.deleteOne({
            postId: req.params.pID,
            sender: req.body.name,
            receiver: req.body.receiver,
            type: req.body.notify,
        }, (err, docs) => {
            if (!err) {
                res.json({
                    success: 'true',
                    docs
                });
            } else {
                console.log(err);
            }
        })
    })
    //get notification for a user
router.get('/notifications/:username', (req, res) => {
    Notification.find({
            receiver: req.params.username
        }).sort("-date")
        .exec((err, docs) => {
            if (!err) {

                console.log(docs);

                res.json({ docs, success: "true" });



            } else {
                console.log(err);
            }

        })
});

module.exports = router;