var db = require("../models");

module.exports = function (app) {

    app.get("/api/message", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Message.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbMessage) {
            res.json(dbMessage);
        });
    });

    // route to create a message
    app.post("/api/message", function (req, res) {
        db.Message.create(req.body).then(function (dbMessage) {
            res.json(dbMessage);
        });
    });

    // route to delete a message
    app.delete("/api/message/:id", function (req, res) {
        db.Message.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbMessage) {
            res.json(dbMessage);
        });
    });
}
