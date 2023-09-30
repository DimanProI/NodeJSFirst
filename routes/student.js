var express = require("express");
// Вызываем функцию Router(), чтобы создать новый объект маршрутизации. Основной уже располагается в app.js
var router = express.Router();

// Указание, что модуль является экспортируемым (теперь его можно подключать в другие модули)
module.exports = router;

router.get("/listStudents", function(req, res)  {
    var students = [
        { 
            id: 1,
            firstname: "Андрей",
            lastname: "Петров",
            surname: "Макаров",
            dateofbirth: "19.05.2000",
            telephone: "7(914)709-83-28"
        },
        {
            id: 2,
            firstname:"Матвей",
            lastname: "Данилов",
            surname: "Александров",
            dateofbirth: "10.01.2001",
            telephone: "7(914)207-43-72"
        },
        {
            id: 3,
            firstname: "Полина",
            lastname: "Бирюкова",
            surname: "Николаевна",
            dateofbirth: "28.12.2005",
            telephone: "7(914)983-87-59"
        }
    ];
    res.render("listStudents", {
        students: students,
        title: "Список студентов"
    });  
});  

// :id — параметр запроса
router.get("/student/:id", function(req, res)  {
    var students =[
        { 
            id: 1,
            firstname: "Андрей",
            lastname: "Петров",
            surname: "Макаров",
            dateofbirth: "19.05.2000",
            telephone: "7(914)709-83-28"
        },
        {
            id: 2,
            firstname:"Матвей",
            lastname: "Данилов",
            surname: "Александров",
            dateofbirth: "10.01.2001",
            telephone: "7(914)207-43-72"
        },
        {
            id: 3,
            firstname: "Полина",
            lastname: "Бирюкова",
            surname: "Николаевна",
            dateofbirth: "28.12.2005",
            telephone: "7(914)983-87-59"
        }
    ]; //  массив скопируйте из обработчика маршрута /listStudents или запишите его в глобальную переменную
    
    // получение id студента из параметров запроса
    var student_id = req.params.id;

    // Поиск студента в массиве.
    // 1 способ - плохой способ (лучше закомментируйте его или удалите :)
    // var student = students[student_id-1];
    // 2 способ
    var student = students.find(item => item.id == student_id);

    res.render("student", {
        student: student,
        title: "Студент"
    });

});  

router.post("/student/:id", function(req, res)  {
    // отображение данных в терминале, которые были отправлены из формы 
    console.log(req.body)
    // переход по адресу localhost:3000/listStudents
    res.redirect("/listStudents");
}); 