var db = require("../models");

module.exports = function (app) {

    // route to grab post for the bulletin board
    app.get("/api/posts", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Post.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // route to create a bulletin board post
    app.post("/api/posts", function (req, res) {
        db.Post.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // route for a user to delete their bulletin board posts
    app.delete("/api/posts/:id", function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    app.put("/api/posts", function (req, res) {
        db.Post.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });
};
