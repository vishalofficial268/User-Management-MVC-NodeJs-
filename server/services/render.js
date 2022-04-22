const axios = require('axios');
const controller = require('../controllers/controller');
const clientUrl = "http://localhost:8080/api/users";

exports.HomeRoutes = (req, res) => {
    // let allUser = controller.find();
    axios.get(clientUrl).then(function (result) {
        res.render('index', { users: result.data })
    }).catch(err => {
        res.send(err)
    })
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get(clientUrl, { params: { id: req.query.id } })
        .then((userData) => {
            res.render("update_user", { user: userData.data })
        })
        .catch(err => {
            res.send(err)
        })
}