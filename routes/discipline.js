var express = require("express");
var router = express.Router();

var db = require("./database.js");

module.exports = router;

router.get("/listDisciplines", (req, res) => {
    db.all('SELECT * FROM discipline', (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("discipline/listDisciplines", {
            discipline: rows,
            title: "Список учебных дисциплин"
        });
    });
});


router.route("/addDiscipline")
    .get((req, res) => {
    res.render("discipline/addDiscipline", {
        title: "Добавление учебной дисциплины"
    })
})
    .post((req, res) => {
    db.run(`INSERT INTO discipline(name) VALUES (?)`, [req.body.name],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect("/listDisciplines");
        }
    );
});


router.get("/discipline/:id", (req, res) =>  {
    db.get(`SELECT * FROM discipline WHERE id=?`, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("discipline/discipline", {
            discipline: rows,
            title: "Учебная дисциплина"
        });
    });
});

router.post("/updateDiscipline/:id", (req, res) => {
    db.run(`UPDATE discipline SET name=? WHERE id=?`, [req.body.name, req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listDisciplines');
        }
    );
});


router.post("/deleteDiscipline/:id", (req, res) => {
    db.run(`DELETE FROM discipline WHERE id=?`, [req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listDisciplines');
        }
    );
});