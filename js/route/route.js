// 定义路由模块
define(['lib/backbone', 'list/list', 'layer/layer', 'collection/img', 'lib/zepto'], function (Backbone, List, Layer, ImageCollection) {
	// 通过js去修改改app的样式
	// $('#app').show()
	// 实例化集合类
	var ic = new ImageCollection();
	// 引入list视图，实例化
	var list = new List({
		// 定义容器元素
		el: '#app',
		// 传递集合实例化对象
		collection: ic
	});
	// 实例化大图页
	var layer = new Layer({
		// 定义容器元素
		el: '#app',
		// 定义集合
		collection: ic
	})
	
	// 第一步 拓展路由类
	var Router = Backbone.Router.extend({
		// 定义路由规则
		routes: {
			// 定义大图页路由
			'layer/:id': 'showLayer',
			// 定义默认路由，进入列表页
			'*other': 'showList'
		},
		// 定义路由方法
		showLayer: function (id) {
			// 渲染大图页
			layer.render(id);
			// 隐藏列表页
			list.$el.find('.wrap').hide();
			list.$el.find('.layer').show();
		},
		// 显示列表页
		showList: function () {
			// 渲染列表页视图
			// list.render()
			// 隐藏大图页页
			list.$el.find('.layer').hide();
			list.$el.find('.wrap').show();
		}
	})
	// 第二步 实例化路由
	var router = new Router();
	// 通常启动路由是在引入模块化后手动启动，不是引入模块就启动
	return function () {
		// 第三步 启动路由
		Backbone.history.start();
	}
	// 使用的时候要作为函数使用
	
})