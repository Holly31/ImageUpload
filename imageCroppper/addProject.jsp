<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>添加项目</title>
</head>

<div class="container">
    <div class="content">
        <div class="main">
            <div class="small_area">
                <div class="page_tit">添加项目</div>
                <div class="page_content addPro">
                    <h2>基本信息</h2>
                    <form class="form clearfix" id="addproject">
                        <div class="row img">
                            <label><span class="must">*</span>项目图片：</label>
                            <div class="advice clearfix">图片最适合尺寸为：750*560，或210*156<span class="Perr">请上传项目图片！</span></div>
                            <div class="projectImg imguploadbox">                            		
                            		<img class="imageUpload" id="" src="<%=request.getContextPath()%>/resources/image/upload.png" alt="上传图片" width="210" height="156"/>
                                   <!-- <img src="${ig.list_img_url}" alt="上传图片" width="210" height="156"/>-->
                            </div>
                        </div>
                        <div class="row">
                            <input class="submit save_addpro" type="button" value="保存"  />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!--layer层-->
<div class="layerBox">
	<ul class="developer_lis"></ul>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/script/js/require.js?v=1d46acb6e3" data-main="<%=request.getContextPath()%>/script/project/addproject.js?v=2"></script>