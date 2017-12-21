requirejs.config({
	shim: {
		'layer': ['jquery'],
		'nicescroll': ['jquery'],
		'imageCropper': {
			deps: ['jquery', 'layer', 'cropper']
		}
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		'jquery': '../js/jQuery',
		'layer': '../js/layer/layer',
		'ajaxForm': '../js/jquery.form',
		'cropper': '../js/cropper/cropper',
		'imageCropper': '../js/cropper/imageCropper',
	}
})

require(['jquery', 'layer','ajaxForm', 'cropper', 'imageCropper'], function($, App, layer, F) {
	$(function() {
		//--- 添加项目 --- 
		var imgArray = [];	
		//图片上传
		$('.imageUpload').ImageCropper({
			title: '项目图片上传',
			aspectRatio: 210 / 156,
			server: '/img/uploadImgLog',
			success: function(data) {
				console.log(data);
				var imgString = data.detaiImgPath + "-" + data.listImgPath;
				var imgInnerbox = '<div class="imginner" ><img src=' + data.detaiImgPath + '  width="210" height="156"/><div class="del">删除</div><input type="hidden" value=' + imgString + ' name="projectPicture" required="required"></div>';
				$('.imageUpload').before(imgInnerbox);
				$('.imginner .del').off().on('click', function() {
					$(this).parent('.imginner').remove();

				})
			},
			error: function(index) {
				//layer.close(index);
			}
		});
		//删除图片
		$('.imginner .del').off().on('click', function() {
			$(this).parent('.imginner').remove();
		})	
	})

})