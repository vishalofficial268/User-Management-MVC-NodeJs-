var Userdb = require('../model/model');
//create and save new user:


exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }
    //new user
    let body = req.body;
    const user = new Userdb({
        name: body.name,
        email: body.email,
        gender: body.gender,
        status: body.status
    });
    //save user in database
    user.save().then(data => {
        res.redirect('/')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while create methods"
        })
    })
}

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "can not be found the user with the id = " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error while retriving the user id = " + id })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "error found while getting data"
                })
            })
    }
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "data to update can not be empty" })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `can not update user with ${id}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "error while updating the user info" })
        })

}

exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `can not delete user with ${id}` })
            } else {
                res.send({ message: "user has been deleted successfully" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "could not delete the user with id = " + id })
        })
}