/**
 * 创建图片的集合
 **/
define(['lib/backbone', 'model/img', 'lib/zepto'], function (Backbone, ImageModel, $) {
	// 创建图片集合
	var ImageCollection = Backbone.Collection.extend({
		// 图片模型类
		model: ImageModel,
		// 图片模型id累加器
		num: 0,
		// 定义请求的地址
		imgUrl: 'data/image_list.json',
		// 定义fetchData方法，用来获取数据
		fetchData: function () {
			var me = this;
			// 图片数据地址 this.imgUrl
			$.get(this.imgUrl, function (res) {
				// 判断数据请求成功
				if (res && res.errno === 0) {
					// 数组乱序
					res.data.sort(function (a, b) {
						// 想乱序，就随机一个结果是1或者-1
						return Math.random() > .5 ? 1 : -1;
					})
					// 为了可以通过某个id获取某个图片对象，我们可以为图片添加一个id
					res.data.forEach(function (obj) {
						// 为对象添加id
						obj.id = ++me.num;
					})
					// 将数据添加到模型中
					me.add(res.data)
					// 查看存储的结果
					// me.forEach(function (model) {
					// 	console.log(model.toJSON())
					// })
				}
			})
		}
	})

	// 暴漏接口
	return ImageCollection;

	// 测试
	// var ic = new ImageCollection();
	// ic.fetchData();
	// ic.fetchData();

})