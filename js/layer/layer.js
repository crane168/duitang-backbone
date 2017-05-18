/**
 * 定义大图页模块
 **/
define(['lib/backbone', 'lib/underscore', 'lib/zepto', 'css!./layer.css'], function (Backbone, _, $) {
	// 获取窗口高度
	var height = $(window).height();
	// 定义视图类
	var Layer = Backbone.View.extend({
		// 存储当前显示图片的id
		modelId: 0,
		// 定义事件
		events: {
			// 向左划，要显示后面的一张图片
			'swipeLeft .layer img': 'showNextImage',
			// 向右划，要显示前面的一张图片
			'swipeRight .layer img': 'showPrevImage',
			// 返回逻辑
			'tap .layer .go-back': 'goBack',
			// 点击图片，切换header的显隐
			'tap .layer img': 'toggleHeader'
		},
		// 定义模板
		tpl: _.template($('#tpl2').html()),
		// 返回上一个状态
		goBack: function () {
			history.go(-1)
		},
		// 切换header的显隐
		toggleHeader: function () {
			this.$el.find('.layer .header').toggle();
		},
		// 显示后面的一张图片
		showNextImage: function () {
			// 显示下一张要加一
			++this.modelId;
			// 获取模型实例化对象
			var model = this.collection.get(this.modelId);
			// 如果图片存在，显示图片
			if (model) {
				// location.hash = '#layer/' + this.modelId;
				this.resetView(model)
			} else {
				// 提示用户已经是最后一张了
				alert('已经是最后一张了！');
				// 多加的这次id要减回来
				--this.modelId;
			}
		},
		// 显示前面的一张图片
		showPrevImage: function () {
			// 显示前一张要减一
			--this.modelId;
			// 获取模型实例化对象
			var model = this.collection.get(this.modelId);
			// 如果图片存在，显示图片
			if (model) {
				// location.hash = '#layer/' + this.modelId;
				this.resetView(model)
			} else {
				// 提示用户已经是第一张了
				alert('已经是第一张了！');
				// 多减的这次id要加回来
				++this.modelId;
			}
		},
		// 定义渲染方法
		render: function (id) {
			// 我们要根据这个id找到这个id对应的模型
			var model = this.collection.get(id);
			// 判断model是否存在
			// 不存在，进入列表页
			if (!model) {
				// 进入列表页，可以改变哈希实现
				location.hash = '';
				return;
			}
			// 存储图片id
			this.modelId = id;
			// 定义数据
			var data = {
				src: model.get('url'),
				title: model.get('title'),
				style: 'line-height: ' + height + 'px;'
			}
			// 格式化
			var html = this.tpl(data);
			// 渲染
			this.$el.find('.layer').html(html)
			// console.log(model.toJSON())
			// this.$el.html('<h1 class="layer">渲染大图页</h1>')
		},
		resetView: function (model) {
			// 更改title
			this.$el.find('.layer .header h1').html(model.get('title'));
			// 更改图片地址
			this.$el.find('.layer .image-container img').attr('src', model.get('url'))
		}
	})
	return Layer;
})