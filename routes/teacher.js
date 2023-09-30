var express = require("express");
// Вызываем функцию Router(), чтобы создать новый объект маршрутизации. Основной уже располагается в app.js
var router = express.Router();

// Указание, что модуль является экспортируемым (теперь его можно подключать в другие модули)
module.exports = router;

router.get("/listteacher", function(req, res)  {
    var teacher = [
        { 
            id: 1,
            firstname: "Марьяна",
            lastname: "Данилова",
            surname: "Артёмовна",
            trainingcourse: "Техно Софт"
        },
        {
            id: 2,
            firstname:"Макар",
            lastname: "Тихонов",
            surname: "Маркович",
            trainingcourse: "Веб мастер"
        },
        {
            id: 3,
            firstname: "Екатерина",
            lastname: "Комарова",
            surname: "Максимовна",
            trainingcourse: "Инфо Тех"
        }
    ];
    res.render("listteacher", {
        teacher: teacher,
        title: "Список учителей"
    });  
});  

// :id — параметр запроса
router.get("/teacher/:id", function(req, res)  {
    var teacher = [
        { 
            id: 1,
            firstname: "Марьяна",
            lastname: "Данилова",
            surname: "Артёмовна",
            trainingcourse: "Техно Софт"
        },
        {
            id: 2,
            firstname:"Макар",
            lastname: "Тихонов",
            surname: "Маркович",
            trainingcourse: "Веб мастер"
        },
        {
            id: 3,
            firstname: "Екатерина",
            lastname: "Комарова",
            surname: "Максимовна",
            trainingcourse: "Инфо Тех"
        }
    ]; 
    
    var teacher_id = req.params.id;


    var teacher = teacher.find(item => item.id == teacher_id);

    res.render("teacher", {
        teacher: teacher,
        title: "Учитель"
    });

});  

router.post("/teacher/:id", function(req, res)  {

    console.log(req.body)

    res.redirect("/listteacher");
}); 