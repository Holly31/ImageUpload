(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require("$"));
    } else {
        factory(jQuery);
    }
})(function ($) {

    var randomID = function () {
        var t = parseInt(1e5 * Math.random(), 10);
        var i = (new Date).getTime();
        return i.toString() + t.toString();
    };

    var fileUpload = function (element, opt) {
        this.$input = element;
        this.id = "fileUpload_" + randomID();
        this.options = $.extend({}, fileUpload._defaults, opt);

        this.init();
    };

    fileUpload._defaults = {
        server: null,
        change: null,
        success: null,
        fail: null
    };

    $.extend(fileUpload.prototype, {
        init: function () {
            this.$input.on('change', $.proxy(this.fileChange, this));
        },
        uploadData: function (file) {
            var self = this;
            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
                url: self.options.server,
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function(res){
                    self.options.success && self.options.success(res);
                },
                error: function(){
                    console.log('请求失败');
                    self.options.fail && self.options.fail();
                }
            });
        },
        fileChange: function () {
            var files = this.$input.prop('files');

            if (files.length > 0) {
                file = files[0];

                if (this.isImageFile(file)) {
                    if (this.url) {
                        URL.revokeObjectURL(this.url); // Revoke the old one
                    }
                    this.url = URL.createObjectURL(file);
                    //获取本地文件的url，如果是图片文件，可用于预览图片                    
                    this.options.change && this.options.change(this.url);

                    this.uploadData(file);
                }
            }
        },
        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        }

    });

    var old = $.fn.fileUpload;
    $.fn.fileUpload = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('fileUpload');
            var options = $.extend({}, $.isPlainObject(option) && option);

            if (!data) {
                $this.data('fileUpload', (data = new fileUpload($this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });
    };
    $.fn.fileUpload.Constructor = fileUpload;
    $.fn.fileUpload.noConflict = function () {
        $.fn.fileUpload = old;
        return this
    };
});