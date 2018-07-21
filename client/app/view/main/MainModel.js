/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('App.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'App.store.Message'
    ],

    data: {
		user: null,
        message: null
    },

    stores: {
        messages: {
            type: 'Message'
        }
    }
});
