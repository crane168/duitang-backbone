// 通过shim配置，将库文件模块化
require.config({
	shim: {
		'lib/zepto': {
			deps: [],
			// 暴漏$接口
			exports: '$'
		},
		// touch模块
		'lib/zepto.touch': {
			// 依赖zepto
			deps: ['lib/zepto']
		},
		'lib/underscore': {
			deps: [],
			// 暴漏_接口
			exports: '_'
		},
		// Backbone模块
		'lib/backbone': {
			// 依赖zepoto，underscore
			deps: ['lib/zepto', 'lib/underscore'],
			// 暴漏Backbone接口
			exports: 'Backbone'
		}
	},
	// 配置css插件
	map: {
		'*': {
			'css': 'lib/css'
		}
	}
})


// 引入路由文件
require(['route/route', 'css!reset.css'], function (route) {
	// 启动路由就是
	route();
})