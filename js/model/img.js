/***
 * 定义图片模型
 **/
define(['lib/backbone', 'lib/zepto'], function (Backbone, $) {
	// 第一步 获取容器的宽度
	// 窗口宽度 / 2 - 6 *3 / 2;
	var w = $(window).width() / 2 - 10 * 3 / 2;
	// 创建图片的模型
	var ImageModel = Backbone.Model.extend({
		// 定义构造函数
		initialize: function (obj) {
			// 适配属性数据，绑定事件
			// 已知
			// 		图片缩放的宽度：w 
			// 		图片真实的宽度：width属性
			// 		图片真实的高度：height属性
			// 	求图片缩放的高度 h = w / W * H
			// 访问width，height有两种方式：obj.width, this.attributes.width
			// console.log(obj.width, this.attributes.width)
			var h = w / this.attributes.width * this.attributes.height;
			// 适配属性数据,不要将原有的属性覆盖
			this.attributes.realWidth = w;
			this.attributes.realHeight = h;

		}
	})

	return ImageModel;
})