define([
    'jquery',
    'layer',
    'cropper',
    'ajaxForm'
], function ($, layer, cropper, ajaxForm) {

    var randomID = function () {
        var t = parseInt(1e5 * Math.random(), 10);
        var i = (new Date).getTime();
        return i.toString() + t.toString();
    };

    var IMAGE_UPLOAD_FORM = '' +
    '<form method="post" action="{server}" enctype="multipart/form-data" id="{id}" class="imageCropperForm">' +
    '	<div class="modal-body">' +
    '	  <div class="cropper-container">' +
    '		<div class="cropper-upload">' +
    '		  <input type="hidden" name="left">' +
    '		  <input type="hidden" name="top">' +
    '		  <input type="hidden" name="width">' +
    '		  <input type="hidden" name="height">' +   
    '		  <label for="cropperInput">Local upload</label>' +
    '		  <input type="file" class="cropper-input" id="cropperInput" name="cropper_file">' +
    '		</div>' +
    '		<div class="row">' +
    '		  <div class="col-md-9">' +
    '			<div class="cropper-wrapper"></div>' +
    '		  </div>' +
    '		  <div class="col-md-3">' +
    '			<div class="cropper-preview preview-lg"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></div>' +
    '			<div class="cropper-preview preview-md"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></div>' +
    '			<div class="cropper-preview preview-sm"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></div>' +
    '		  </div>' +
    '		</div>' +
    '		<div class="row cropper-btns">' +
    '			<button type="submit" class="btn btn-primary btn-block cropper-save">确定</button>' +
    '		</div>' +
    '	  </div>' +
    '	</div>' +
    '</form>';

    var imageCropper = function (element, options) {
        this.$element = element;
        this.$dialog = null;
        this.$cropperInput = null;
        this.id = "imageCropperForm_" + randomID();
        this.options = $.extend({}, imageCropper.DEFAULTS, options);

        this.init();
    };

    imageCropper.DEFAULTS = {
        isUploading: !1,
        title: "图片裁剪上传",
        //裁剪比例
        aspectRatio: 1,
        //图片上传地址
        server: null,
		//上传成功，参数为服务器返回的数据
        success: function (data) {},
		//发生错误，参数为当前对话框的索引，用于layer关闭
        error: function (index) {}
    };

    $.extend(imageCropper.prototype, {
        init: function () {
            var self = this;

            self.overlay = this.createOverlay();
            self.$element.on("click", function () {
                self.show();
            });
        },
        bindEvent: function () {
            var self = this;

            this.$cropperWrapper = $("#" + self.id).find('.cropper-wrapper');
            this.$cropperPreview = $("#" + self.id).find('.cropper-preview');
            this.$cropperInput = $("#" + self.id).find('.cropper-input');
			
            //选择图片后处理
            this.$cropperInput.on('change', $.proxy(this.fileChange, this));
			//图片提交使用 ajaxForm 处理
            $("#" + self.id).ajaxForm({
                dataType: 'json',
                beforeSubmit: function () {
                    var files = self.$cropperInput.prop('files');
                    if (files.length == 0) {
                        layer.msg('请先选择图片', {time: 1200});
                        return false;
                    }
                },
                error: function () {
					//图片上传成功，回调
                    self.options.error.call(self, self.$dialog);
                },
                success: function (data) {
					//图片上传成功，关闭对话框并回调
					layer.msg('图片上传成功', {time: 1200});
					layer.close(self.$dialog);
                    self.options.success.call(self, data);
                }
            });
        },
        fileChange: function () {
            var files = this.$cropperInput.prop('files');

            if (files.length > 0) {
                file = files[0];

                if (this.isImageFile(file)) {
                    if (this.url) {
                        URL.revokeObjectURL(this.url); // Revoke the old one
                    }
                    this.url = URL.createObjectURL(file);
                    this.startCropper();
                }
            }
        },
        startCropper: function () {
            var self = this;

            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$cropperWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: self.options.aspectRatio,
                    preview: this.$cropperPreview.selector,
                    crop: function (e) {
                        $("#" + self.id).find('input[name="left"]').val(e.x);
                        $("#" + self.id).find('input[name="top"]').val(e.y);
                        $("#" + self.id).find('input[name="width"]').val(e.width);
                        $("#" + self.id).find('input[name="height"]').val(e.height);
                    }
                });

                this.active = true;
            }
        },
        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                document.getElementById(this.id).reset();
                this.active = false;
            }
        },
        createOverlay: function () {
            return IMAGE_UPLOAD_FORM.replace(/{server}/, this.options.server).replace(/{id}/g, this.id);
        },
        show: function () {
            var self = this;

            self.$dialog = layer.open({
                type: 1,
                title: self.options.title,
                area: '900px',
                content: self.overlay,
                success: function () {
                    console.log('imageCropper Render Success');
                    self.stopCropper();
                    self.bindEvent();
                },
                cancel: function () {
                    self.stopCropper();
                },
                end: function () {
                    console.log('imageCropper Render Closed');
                }
            });
        },
        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        }
    });



    function Plugin(option) {
        return this.each(function () {
            var options = typeof option == 'object' && option;
            var d = new imageCropper($(this), options);
        })
    }
    var old = $.fn.ImageCropper
    $.fn.ImageCropper = Plugin
    $.fn.ImageCropper.Constructor = imageCropper
    $.fn.ImageCropper.noConflict = function () {
        $.fn.ImageCropper = old
        return this
    }

});