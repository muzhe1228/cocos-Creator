<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords
	content='考拉行情，数字货币行情，虚拟币行情，数字货币数据分析，数字货币行业大数据，虚拟币数据分析，考拉账本'>
<meta name=description
	content="考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，数据挖掘服务。我们拥有全球2000多个数字货币，200多家交易平台，5千多个交易对的数据资源，提供最专业的数字货币趋势分析，行情分析等多维度，全方位的分析服务，数字货币账本服务。">
<meta charset=utf-8>
<title>账号设置--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/user.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<%@ include file="/template/header.jsp"%>
	<div class="user-wrap">
		<div class="container">
			<jsp:include page="/template/userLeft.jsp" flush="true">
				<jsp:param value="action" name="userLeft" />
			</jsp:include>
			<div class="user-right">
				<div class="user-action">
					<div class="action-nav">
						<p>账号设置</p>
					</div>
					<div class="action-edit">
						<ul class="phone">
							<li><p class="top">绑定手机</p>
								<p>账号更安全&nbsp;&nbsp;及时获取币价变动通知</p></li>
							<li><span id="actionPhone"></span></li>
							<li class="color-gray">无</li>
						</ul>
						<ul class="pwd">
							<li><p class="top">重置密码</p>
								<p>忘记密码时请及时修改设定</p></li>
							<li></li>
							<li><p class="handle">重置</p></li>
						</ul>
					</div>
					<div class="action-else" style="display: none">
						<div class="action-nav">
							<p>其他设置</p>
						</div>
						<div class="else-form">
							<form class="el-form">
								<div class="else-form-cont">
									<div class="el-form-item">
										<label class="el-form-item__label" style="width: 86px;">涨跌颜色</label>
										<div class="el-form-item__content" style="margin-left: 86px;">
											<div role="radiogroup" class="el-radio-group">
												<label role="radio" tabindex="0" class="el-radio is-checked"
													aria-checked="true"><span
													class="el-radio__input is-checked"><span
														class="el-radio__inner"></span><input type="radio"
														tabindex="-1" value="0" checked="checked"
														class="el-radio__original"></span><span
													class="el-radio__label">绿涨红跌<!----></span></label><label
													role="radio" tabindex="-1" class="el-radio"><span
													class="el-radio__input"><span
														class="el-radio__inner"></span><input type="radio"
														tabindex="-1" value="1" class="el-radio__original"></span><span
													class="el-radio__label">红涨绿跌 <!----></span></label>
											</div>
											<!---->
										</div>
									</div>
									<div class="el-form-item">
										<label class="el-form-item__label" style="width: 86px;">涨跌计算</label>
										<div class="el-form-item__content" style="margin-left: 86px;">
											<div role="radiogroup" class="el-radio-group">
												<label role="radio" aria-checked="true" tabindex="0"
													class="el-radio is-checked"><span
													class="el-radio__input is-checked"><span
														class="el-radio__inner"></span><input type="radio"
														tabindex="-1" value="0" checked="checked"
														class="el-radio__original"></span><span
													class="el-radio__label">24小时制 <!----></span></label><label
													role="radio" tabindex="-1" class="el-radio"><span
													class="el-radio__input"><span
														class="el-radio__inner"></span><input type="radio"
														tabindex="-1" value="1" class="el-radio__original"></span><span
													class="el-radio__label">当日制 <!----></span></label>
											</div>
											<!---->
										</div>
									</div>
									<div class="el-form-item" style="display: none;">
										<label class="el-form-item__label" style="width: 86px;">消息提醒</label>
										<div class="el-form-item__content" style="margin-left: 86px;">
											<div role="radiogroup" class="el-radio-group">
												<label role="radio" tabindex="0" class="el-radio"><span
													class="el-radio__input"><span
														class="el-radio__inner"></span><input type="radio"
														tabindex="-1" value="0" class="el-radio__original"></span><span
													class="el-radio__label">开启 <!----></span></label><label
													role="radio" tabindex="-1" class="el-radio"><span
													class="el-radio__input"><span
														class="el-radio__inner"></span><input type="radio"
														tabindex="-1" value="1" class="el-radio__original"></span><span
													class="el-radio__label">关闭 <!----></span></label>
											</div>
											<!---->
										</div>
									</div>
								</div>
							</form>
							<div class="else-form_btn">
								<button type="button" class="el-button el-button--default">
									<!---->
									<!---->
									<span>确定保存</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
<script src="/js/user/userComm.js"></script>
<script src="/js/user/action.js"></script>
</html>