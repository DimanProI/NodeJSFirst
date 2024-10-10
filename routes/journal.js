var express = require("express");
var router = express.Router();

var db = require("./database.js");

module.exports = router;

router.get("/addAttendanceMark/:student_group_id", (req, res) => {
    db.all(
        `SELECT schedule.id as schedule_id, discipline.id as discipline_id, discipline.name as discipline_name,
        teacher.id as teacher_id, teacher.name as teacher_name
        FROM discipline_teacher
        INNER JOIN schedule ON schedule.discipline_teacher_id=discipline_teacher.id
        INNER JOIN discipline ON discipline.id=discipline_teacher.discipline_id
        INNER JOIN teacher ON teacher.id=discipline_teacher.teacher_id
        WHERE schedule.student_group_id=?
        ORDER BY schedule.week_day, schedule.pair_number`,
        [req.params.student_group_id],
        (err, rows) => {
            if (err) {
                throw err;
            }
            var disciplineTeacher = rows;
            db.all(
                `SELECT * FROM student WHERE student_group_id=?`,
                [req.params.student_group_id],
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    var students = rows;
                    db.get(`SELECT * FROM student_group WHERE id=?`,
                        [req.params.student_group_id],
                        (err, rows) => {
                            if (err) {
                                throw err;
                            }
                            res.render("journal/addAttendanceMark", {
                                disciplineTeacher: disciplineTeacher,
                                students: students,
                                studentGroup: rows,
                                title: "Добавление отметки посещаемости"
                            });
                        });
                });
        });
});