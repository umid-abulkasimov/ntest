/**
 * Created by Umid Abulkasimov on 21.07.2018.
 * E-mail xaero@bk.ru
 */
var mysql = require('mysql');

module.exports = {

    /**
     * Создание соединения к базу данных
     */
    connect: function () {
        return new Promise(function (resolve, reject) {
            var con = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'ntest'
            });
            con.connect(function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(con);
            });
            con.on('error', function (err) {
                console.log(err);
            })
        });
    },

    /**
     * Добавить новый запись
     */
    insert: function (table, values) {
        var con = this.connect();
        return new Promise(function (resolve, reject) {
            con.then(function (con) {
                var query = 'INSERT INTO ' + table + ' SET ', ps = [];
                for (var key in values) {
                    ps.push('`' + key + '`' + ' = ' + con.escape(values[key]));
                }
                query += ps.join(',');
                con.query(query, function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });
    },

    /**
     * Загрузка данных
     */
    select: function (query, args) {
        var con = this.connect();
        return new Promise(function (resolve, reject) {
            con.then(function (con) {
                con.query(query, args, function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });
    }
};

