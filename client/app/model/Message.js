/**
 * Created by Umid Abulkasimov on 21.07.2018.
 * E-mail xaero@bk.ru
 */
Ext.define('App.model.Message', {
    extend: 'Ext.data.Model',
    fields: [
        { type: 'int', name: 'id' },
        { type: 'string', name: 'from' },
        { type: 'string', name: 'message' },
        { type: 'date', name: 'date_added' },
        { type: 'boolean', name: 'isOwn' }
    ]
});