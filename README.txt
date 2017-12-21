# ImageUpload
由cropper.js及jquery.form.js封装的imageCropper.js实现图片裁剪上传功能；简单介绍jquery.fileupload.js正常上传图片的使用

1）jquery.fileupload图片上传：

html：

<form class="form" id="rengouForm">
	<div class="row imgrow">
		<label>合同图片：</label>
		<input type="file" id="contractPicture" />
		<input type="hidden" class="contractPicture" name="contractPicture" />
		<div class="showimg">
			<img src="../resources/image/upload.png" />
		</div>
		<span class="Perr">请选择图片</span>
	</div>
	<div class="row subm_action">
		<span class="cancel">取消</span>
		<span class="sure sureCusRg">确定</span>
	</div>
</form>
  
javascript:
  
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
  
  2)cropper图片裁剪上传
  
  html:
  
<form class="form clearfix" id="addproject">
      <div class="row img">
            <label><span class="must">*</span>项目图片：</label>
             <div class="advice clearfix">图片最适合尺寸为：750*560，或210*156<span class="Perr">请上传项目图片！</span></div>
             <div class="projectImg imguploadbox">                            		
                  <img class="imageUpload" id="" src="<%=request.getContextPath()%>/resources/image/upload.png" alt="上传图片" width="210" height="156"/>
              </div>
      </div>
      <div class="row">
            <input class="submit save_addpro" type="button" value="保存"  />
      </div>
</form>
         
javascript:

$(function() {
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
