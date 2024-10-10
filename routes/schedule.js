var express = require("express");
var router = express.Router();

var db = require("./database.js");

module.exports = router;

router.get("/schedule", (req, res) => {
    db.all('SELECT * FROM student_group', (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("schedule/schedule", {
            studentGroups: rows,
            title: "Список студенческих групп"
        });
    });
});

router.get("/groupSchedule/:student_group_id", (req, res) => {
    db.get(
        `SELECT * FROM student_group WHERE id=?`,
        [req.params.student_group_id], (err, rows) => {
            if (err) {
                throw err;
            }
            var student_group = rows;
            db.all(
                `SELECT schedule.*, student_group.name as student_group_name, discipline.name as discipline_name, teacher.name as teacher_name
                FROM schedule
                INNER JOIN student_group ON student_group.id=schedule.student_group_id
                INNER JOIN discipline_teacher ON discipline_teacher.id=schedule.discipline_teacher_id
                INNER JOIN discipline ON discipline.id = discipline_teacher.discipline_id
                INNER JOIN teacher ON teacher.id = discipline_teacher.teacher_id
                WHERE student_group.id=?
                ORDER BY schedule.week_day, schedule.pair_number`, [req.params.student_group_id],
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    res.render("schedule/groupSchedule", {
                        student_group: student_group,
                        schedule: rows,
                        title: "Расписание занятий"
                    });
                });
        });
});

router.route("/addRecordSchedule/:student_group_id")
    .get((req, res) => {
    db.get(
        `SELECT * FROM student_group WHERE id=?`,
        [req.params.student_group_id], (err, rows) => {
            if (err) {
                throw err;
            }
            var student_group = rows;
            db.all(
                `SELECT discipline_teacher.id, discipline.id as discipline_id, discipline.name as discipline_name, teacher.id as teacher_id, teacher.name as teacher_name
                FROM discipline_teacher
	            INNER JOIN discipline ON discipline.id=discipline_teacher.discipline_id
	            INNER JOIN teacher ON teacher.id=discipline_teacher.teacher_id`,
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    var discipline_teacher = rows;
                    res.render("schedule/addRecordSchedule", {
                        student_group: student_group,
                        discipline_teacher: discipline_teacher,
                        title: "Добавление записи о занятии"
                    });
                });
        });
})
    .post((req, res) => {
    db.run(`INSERT INTO schedule(student_group_id, week_day, pair_number, discipline_teacher_id) VALUES (?, ?, ?, ?)`,
        [req.params.student_group_id, req.body.week_day, req.body.pair_number, req.body.discipline_teacher_id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect("/groupSchedule/" + req.params.student_group_id);
        }
    );
});

router.post("/deleteSchedule/scheduleId=:schedule_id/studentGroupId=:student_group_id", (req, res) => {
    db.run(`DELETE FROM schedule WHERE id=?`, [req.params.schedule_id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect("/groupSchedule/" + req.params.student_group_id);
        }
    );
});