/**
 * Created by Umid Abulkasimov on 21.07.2018.
 * E-mail xaero@bk.ru
 */
var mysql = require('mysql');

module.exports = {

    connect: function() {
        var me = this;
        var con = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'ntest'
        });

        clearTimeout(me.retryTimeId);

        con.connect(function (err) {
            if (err) {
                me.retryTimeId = setTimeout(function () {
                    me.connect();
                }, 5000);
            }
        });
        con.on('error', function (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                me.retryTimeId = setTimeout(function () {
                    me.connect();
                }, 5000);
            }
        });
        return con;
    },

    /**
     * Добавить данных
     */
    insert: function (table, values) {
        var con = this.connect();
        return new Promise(function(resolve, reject){
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
    },

    /**
     * Загрузка данных
     */
    select: function (query, args) {
        var con = this.connect();
        return new Promise(function (resolve, reject) {
            con.query(query, args, function (err, res) {
                if (err) return reject(err);
                resolve(res);
            });
        });
    }
};

