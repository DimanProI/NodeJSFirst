// Подключение модуля Sqlite
var sqlite3 = require('sqlite3');

// Создание объекта для работы с базой данных
var db = new sqlite3.Database(
    './db/attendance.db', // attendance.db — имя файла базы данных
    sqlite3.OPEN_READWRITE, // указываем, что можно получать и записывать данные
    (err) => { // в случае возникновения ошибки будет выведено сообщение о проблеме в терминал
        if (err) {
            console.error(err.message);
        }
    }
);

// При каждом подключении к базе данных нужно включать поддержку внешних ключей
db.run(`PRAGMA foreign_keys = ON`);

// Экспорт объекта db
module.exports = db