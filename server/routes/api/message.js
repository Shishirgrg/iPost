const router = require("express").Router();
const cors = require("cors")
const Messages = require("../../model/Message");
router.use(cors())

//send message 
router.post('/sendmessage/:uname', (req, res) => {
        const msg = new Messages();
        msg.sender = req.body.sname;
        msg.receiver = req.params.uname;
        msg.message = req.body.content;

        msg.save((err, docs) => {
            if (!err) {
                //console.log(docs);
                res.json({
                    success: "true",
                    docs
                });
            } else {
                console.log(err);
            }
        })
    })
    //getting the messasges if i'm the receiver
router.get('/messagereceived/:uname', (req, res) => {
        Messages.find({
                receiver: req.params.uname
            }).sort("-date")
            .exec((err, docs) => {
                if (!err) {
                    //console.log(docs)
                    res.json({
                        success: "true",
                        docs
                    });
                } else {
                    console.log(err);
                }
            })
    })
    //getting the messasges if i'm the sender
router.get('/messagesent/:uname', (req, res) => {
    Messages.find({
            sender: req.params.uname
        }).sort("-date")
        .exec((err, docs) => {
            if (!err) {
                //console.log(docs)
                res.json({
                    success: "true",
                    docs
                });
            } else {
                console.log(err);
            }
        })
})

module.exports = router;