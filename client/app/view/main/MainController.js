/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.util.LocalStorage'
    ],

	/**
	 * Инициализация
	 */
    init: function() {

    	var me = this;

    	this.isScrollBottom = true;
		
		// используем локальную хранилищу
		this.storage = new Ext.util.LocalStorage({
			id: '_ntest'
		});
		
		// установливаем соединения socket
		this.socket = io();
		
		// создаем id пользователья
		var userId = this.createUser();

		// загрузка сообщении пользователья
        this.socket.emit('init-user', userId);

        this.socket.on('get init-user', function (data) {
        	Ext.Array.each(data, function (item) {
				item.isOwn = item.from === userId;
            });
			me.getStore('messages').loadRawData(data);
			me.scrollToDown();
        });

        this.socket.on('get message', function (data) {
			data.isOwn = data.from == userId;
			me.getStore('messages').add(data);
            me.scrollToDown();
        });
		
		this.getViewModel().set('user', userId);
	},
	
	/**
	 * возвращает id пользователья.
	 * потом для систему можно заменить это id для загрузки сообщениии.
	 */
	createUser: function() {
		var userId = Math.ceil(Math.random() * 1000);
		userId = 'guest-' + userId;		
		if (Ext.isEmpty(this.storage.getItem('user'))) {
			this.storage.setItem('user', userId);
		} else {
			userId = this.storage.getItem('user');
		}
		return userId;
	},

	/**
	 * Отправка сообщении
	 */
	onSend: function() {
		var vm = this.getViewModel();

		// отправка сообщении
		this.socket.emit('send message', {
			user: vm.get('user'),
			message: vm.get('message')
		});

		vm.set('message', '');

		this.scrollToDown();
	},

	/**
	 * После рендеринг сообщении
	 */
    onAfterRenderMessage: function(view) {
        var me = this,
            scrollable = view.getScrollable();
        view.el.on('scroll', function(){
            var maxPosition = scrollable.getMaxPosition(),
                curPosition = scrollable.getPosition();
            if(curPosition.y >= maxPosition.y - 50) {
                me.isScrollBottom = true;
            } else {
                me.isScrollBottom = false;
            }
        });
    },

    /**
     * Скроллить вниз
     */
    scrollToDown: function () {
        var me = this,
            view = this.getView().down('#messages');
        if (view) {
            var scrollable = view.getScrollable(),
                maxPosition = scrollable.getMaxPosition();
            if (me.isScrollBottom) {
                view.scrollBy(0, maxPosition.y, true);
            }
        }
    },

    /**
     * Отправка сообщении Ctrl + Enter
     */
    onKeyDownMessage: function (field, e) {
        if (e.getKey() === e.ENTER) {
            if (e.ctrlKey) {
                this.onSend();
            }
        }
    }
});
