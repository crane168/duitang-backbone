/***
 * 定义列表页
 **/
define(['lib/backbone', 'lib/underscore', 'lib/zepto', 'lib/zepto.touch', 'css!list/list.css'], function (Backbone, _) {
	// 1 修改集合文件，暴漏接口，2 index.html删除图片，3 route.js 实例化集合，赋值给视图
	// 定义列表页视图
	var List = Backbone.View.extend({
		// 绑定事件
		events: {
			// 点击返回按钮
			'tap .go-top': 'goTop'
		},
		// 定义图片模板
		tpl: _.template($('#tpl1').html()),
		// 定义变量，存储左右容器的高度
		leftHeight: 0,
		rightHeight: 0,
		// 构造函数
		initialize: function () {
			var me = this;
			// 初始化dom元素，方便后面的访问
			this.initDOM();
			// 监听集合添加数据的事件
			// this.collection.on('add', function () {})
			this.listenTo(this.collection, 'add', function (model, collection) {
				// 这里的作用域是视图实例化对象，因此使用这种方式
				// console.log(model.toJSON())
				// 拿数据去渲染视图了
				this.render(model)
			})
			// 拉去数据，渲染视图
			this.getData();

			// 定义节流函数
			var getDataFn = _.throttle(function () {
				me.getData()
			}, 400);
			// 订阅window事件
			$(window).on('scroll', function () {
				// Body的高度 < 窗口距页面顶部的高度 + 窗口的高度 + 200px
				if ($('body').height() < $(window).scrollTop() + $(window).height()+ 200) {
					// console.log(123)
					// 拉去数据
					// me.getData();
					getDataFn();
				}
				// 是否显示返回顶部
				me.toggleGoTop();
			})
		},
		// 切换返回顶部按钮的显隐
		toggleGoTop: function () {
			if ($(window).scrollTop() > 300) {
				this.$el.find('.go-top').show()
			} else {
				this.$el.find('.go-top').hide();
			}
		},
		// 返回顶部
		goTop: function () {
			window.scrollTo(0, 0);
		},
		// 初始化dom元素
		initDOM: function () {
			this.leftDOM = this.$el.find('.image-left-container');
			this.rightDOM = this.$el.find('.image-right-container');
		},
		// 获取图片数据
		getData: function () {
			this.collection.fetchData();
		},
		// 定义渲染方法
		render: function (model) {
			var height = model.get('realHeight');
			// 1 获取容器元素
			// 2 获取数据
			var data = {
				href: '#layer/' + model.get('id'),	// #layer/4
				src: model.get('url'),
				title:model.get('title'),
				shoucang:model.get('shoucang'),
				user_header:model.get('user_header'),
				user_name:model.get('user_name'),
				special:model.get('special'),
				style: 'width: ' + model.get('realWidth') + 'px; height: ' + height + 'px;'
			}
			// 3 获取模板
			// 4 格式化
			var html = this.tpl(data)
			// 5 渲染  我们应该向哪个容器渲染呢
			// 左容器高度小于等于右容器高度，向左容器添加
			if (this.leftHeight <= this.rightHeight) {
				this.renderLeft(html, height)
			} else {
				this.renderRight(html, height)
			}
			// route.js中不要忘记注释render()方法
		},
		/**
		 * 向左容器渲染
		 * @html 	渲染的内容
		 * @height 	渲染的高度
		 **/
		renderLeft: function(html, height) {
			// 渲染元素
			this.leftDOM.append(html);
			// 更新高度 注意：底边的边距是6像素
			this.leftHeight += height + 6;
		},
		/**
		 * 向右容器渲染内容
		 * @html 	渲染的内容
		 * @height 	渲染的高度
		 **/
		renderRight: function (html, height) {
			// 渲染高度
			this.rightDOM.append(html);
			// 更新高度
			this.rightHeight += height + 6;
		},
		clearView: function () {
			// 清空内容
			this.leftDOM.html('');
			this.rightDOM.html('');
			// 清空高度
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		/**
		 * 渲染视图
		 * @result 	是由模型实例化对象组成的数组
		 **/
		renderResult: function (result) {
			var me = this;
			// 遍历
			result.forEach(function (model, index, arr) {
				// 渲染
				me.render(model)
			})
		}
	})
	
	// 暴漏接口就是返回这个类
	return List;
})