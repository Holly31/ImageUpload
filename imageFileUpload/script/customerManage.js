define(['jquery', 'ajaxfileupload'], function($) {
	$(function() {
		//上传图片
		$('.showimg').on('click', function() {
			$('#contractPicture').click();
		})
		$('#contractPicture').fileUpload({
			server: '/img/uploadImg',
			success: function(val) {
				console.log(val);
				$('.contractPic').val(val.data);
				$('.showimg img').attr('src', val.data);
			}
		});

	})

})