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
<title>消息中心--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/user.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<%@ include file="/template/header.jsp"%>
	<div class="user-wrap">
		<div class="container">
			<jsp:include page="/template/userLeft.jsp" flush="true">
				<jsp:param value="msg" name="userLeft" />
			</jsp:include>
			<div class="user-right">
				<div class="user-msg">
					<div class="msg-nav">
						<p>消息中心</p>
						<p class="btn">
							<span id="emptyMsg">清空消息</span> <span id="allRead">全部已读</span>
						</p>
					</div>
					<div class="msg-cont resetLoading">
						<div>
							<div class="list" id="msg-list"></div>
							<div class="newPage">
								<a href="/"
									class="aDisabled nuxt-link-exact-active nuxt-link-active">上一页</a>
								<a href="/"
									class="nuxt-link-exact-active nuxt-link-active active">1</a> <a
									href="/page2" class="">2</a> <a href="/page3" class="">3</a> <a
									href="/page4" class="">4</a> <a href="/page5" class="">5</a> <a
									href="/page6" class="">6</a> <a href="/page7" class="">···</a>
								<a href="/page19" class="">19</a> <a href="/page2" class="">下一页</a>
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
<script src="/js/user/msg.js"></script>
</html>