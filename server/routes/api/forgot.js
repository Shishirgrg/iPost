const router = require('express').Router();

//const Security = require("../../model/Security");
const Users = require("../../model/Users")
const bcrypt = require("bcrypt");

router.post("/forgotpassword/:username", (req, res) => {
    //console.log(req.params.username)
    Users.findOne({ name: req.params.username }, (err, docs) => {
        if (!err) {
            res.json({ success: "true", docs });
        } else {
            console.log(err);
        }
    })
});

router.post("/forgotpassword/answer/:username", (req, res) => {
    // console.log(req.body.ansone);
    // console.log(req.body.anstwo);
    Users.findOne({ name: req.params.username }, (err, docs) => {
        if(!err){
            if(bcrypt.compareSync(req.body.ansone, docs.ans1) && bcrypt.compareSync(req.body.anstwo, docs.ans2)){
                res.json({success: "true", docs});
            }else{
                res.json({notsuccess: "true"});
            }
        }else{
            console.log(err);
        }
    })
});

router.put("/forgotpassword/updatePassword/:username", (req, res) =>  {
    console.log(req.params.newPassword)
    Users.findOne({ name: req.params.username }, (err, docs) => {
        if(!err){
            bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                nayaPassword = hash;
                Users.findOneAndUpdate({ name : req.params.username }, { $set: { password: nayaPassword } }, { returnOriginal: false },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({success: "true", result});
                        }
                    }
                );
        
            });
        }else{
            console.log(err)
        }
    })
});

module.exports = router;
