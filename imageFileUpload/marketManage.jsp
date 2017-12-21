<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>营销管理</title>
</head>
<!--modal-->
<!--添加客户认购-->
<div class="add_subscribe initfloor modal_sec ">
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
</div>
<script type="text/javascript" src="../script/js/require.js?v=1d46acb6e7" data-main="../script/market-manage/marketManage.js?v=1d46acb6e2"></script>