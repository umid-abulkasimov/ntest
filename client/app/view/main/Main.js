/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'App.view.main.MainController',
        'App.view.main.MainModel',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.util.Format',
        'Ext.view.View'
    ],

    controller: 'main',
	
	viewModel: {
		type: 'main'
	},
	
	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'center'
	},
	
	items: [{
		xtype: 'panel',
		width: 500,
		height: '90%',
		border: true,
		bind: {
			title: 'Wellcome: {user}'
		},
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		bodyPadding: '3px',
		items: [{
			xtype: 'dataview',
			bind: {
				store: '{messages}'
			},
            emptyText: 'No messages',
            scrollable: true,
			cls: 'chat-message',
            itemSelector: 'div.chat-msg-item',
            selectedItemCls: 'selected',
			tpl: new Ext.XTemplate(
				'<div class="chat-msg-body">',
					'<tpl for=".">',
						'<div class="chat-msg-item {[this.getItemClass(values)]}">',
							'<div class="chat-msg-user">{from}</div>',
							'<div class="chat-msg-message">',
								'<div class="chat-msg-arrow"></div>',
								'<div class="chat-msg-date">{[this.getDateAdded(values)]}</div>',
								'<div class="chat-msg-inner">',
									'{[this.getMessage(values)]}',
								'</div>',
							'</div>',
						'</div>',
					'</tpl>',
				'</div>',
				{
					getItemClass: function(vs) {
						if (vs.isOwn === true) {
							return 'chat-msg-owner';
						}
						return 'chat-msg-default';
					},
                    getDateAdded: function(vs) {
                        var date = '';
                        if (vs.date_added) {
                            date = new Date(vs.date_added);
                            date = Ext.Date.format(date, 'd.m.Y H:i');
                        }
                        return date;
					},
					getMessage: function(vs) {
						var message = Ext.String.htmlEncode(vs.message);
						return Ext.util.Format.nl2br(message);
					}
				}
			),
			flex: 1,
			itemId: 'messages',
			border: true,
			margin: '0 0 3 0',
			listeners: {
				afterRender: 'onAfterRenderMessage'
			}
		},{
			xtype: 'form',
			height: 'auto',
			layout: {
				type: 'hbox'				
			},
			items: [{
				xtype: 'container',
				flex: 1,
				layout: {
					type: 'vbox'
				},
				items: [{
                    xtype: 'textarea',
                    height: 90,
					width: '100%',
                    margin: '0 3 0 0',
                    bind: {
                        value: '{message}'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onKeyDownMessage'
                    }
                },{
					xtype: 'container',
					html: 'ctrl + enter',
					style: 'font-size: 10px; padding-left: 5px'
				}]
			},{
				xtype: 'button',
				text: 'Send',
				width: 70,
				disabled: true,
				bind: {
					disabled: '{!message}'
				},
				handler: 'onSend'
			}]
		}]
	}]
});
