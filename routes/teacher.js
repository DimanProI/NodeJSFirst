var db = require("./database.js");
var express = require("express");
// Вызываем функцию Router(), чтобы создать новый объект маршрутизации. Основной уже располагается в app.js
var router = express.Router();

// Указание, что модуль является экспортируемым (теперь его можно подключать в другие модули)
module.exports = router;

router.get("/listteacher", (req, res) => {
    db.all(`SELECT * FROM teacher`,
        (err, rows) => {
            if (err) {
                throw err;
            }
            res.render("teacher/listteacher", {
                teacher: rows,
                title: "Список преподавателей"
            });
        });
});

router.route("/addTeacher")
    .get((req, res) => {
    res.render("teacher/addTeacher", {
        title: "Добавление преподавателя"
    })
})
    .post((req, res) => {
    db.run(`INSERT INTO teacher(name) VALUES (?)`, [req.body.name],
        (err) => {
            if (err) {
                throw err;
            }
            // переход к списку студенческих групп после добавления записи
            res.redirect("/listteacher");
        }
    );
});

router.get("/teacher/:id", (req, res) =>  {
    db.get(`SELECT * FROM teacher WHERE id=?`, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("teacher/teacher",  {
            teacher: rows,
            title: "Преподаватели"
        });
    });
});

router.post("/deleteTeacher/:id", (req, res) => {
    db.run('DELETE FROM teacher WHERE id=?', [req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listteacher');
        }
    );
});

router.post("/updateTeacher/:id", (req, res) => {
    db.run(`UPDATE teacher SET name=? WHERE id=?`, [req.body.name, req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listteacher');
        }
    );
});




router.get("/listDisciplineTeacher", (req, res) => {
    db.all(
        `SELECT discipline.id as discipline_id, discipline.name as discipline_name, teacher.id as teacher_id, teacher.name as teacher_name
            FROM discipline_teacher
	        INNER JOIN discipline ON discipline.id=discipline_teacher.discipline_id
	        INNER JOIN teacher ON teacher.id=discipline_teacher.teacher_id`,
        (err, rows) => {
            if (err) {
                throw err;
            }
            res.render("teacher/listDisciplineTeacher", {
                disciplineTeacher: rows,
                title: "Назначение преподавателям учебных дисциплин"
            });
        });
});

router.route("/addDisciplineTeacher")
    .get((req, res) => {
    db.all(`SELECT * FROM teacher`, (err, rows) => {
        if (err) {
            throw err;
        }
        var teachers = rows;
        db.all(`SELECT * FROM discipline`, (err, rows) => {
            if (err) {
                throw err;
            }
            var disciplines = rows;
            res.render("teacher/addDisciplineTeacher", {
                teachers: teachers,
                disciplines: disciplines,
                title: "Назначение преподавателям учебных дисциплин"
            });
        });
    });
})
    .post((req, res) => {
    db.run(`INSERT INTO discipline_teacher(discipline_id, teacher_id) VALUES (?, ?)`, [req.body.discipline_id, req.body.teacher_id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listDisciplineTeacher');
        }
    );
});

router.post("/deleteDisciplineTeacher/disciplineId=:discipline_id/teacherId=:teacher_id", (req, res) => {
    db.run(`DELETE FROM discipline_teacher WHERE discipline_id=? AND teacher_id=? `, [req.params.discipline_id, req.params.teacher_id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listDisciplineTeacher');
        }
    );
});