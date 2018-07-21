/**
 * Created by Umid Abulkasimov on 21.07.2018.
 * E-mail xaero@bk.ru
 */
Ext.define('App.store.Message', {
    extend: 'Ext.data.Store',
    alias: 'store.Message',

    requires: [
        'App.model.Message'
    ],

    model: 'App.model.Message',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});