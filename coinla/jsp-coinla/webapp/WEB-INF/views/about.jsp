<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords
	content='考拉行情，数字货币行情，虚拟币行情，数字货币数据分析，数字货币行业大数据，虚拟币数据分析，考拉账本'>
<meta name=description
	content="考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，数据挖掘服务。我们拥有全球2000多个数字货币，200多家交易平台，5千多个交易对的数据资源，提供最专业的数字货币趋势分析，行情分析等多维度，全方位的分析服务，数字货币账本服务。">
<meta charset=utf-8>
<title>考拉行情--聚合全球行情,挖掘数据价值-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/about.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="app" name="headClass" />
	</jsp:include>
	<div class="about">
		<img class="banner-about"
			src="/static/images/icon/banner_aboutus.png"
			alt="">
		<div class="about-cont container ">
			<p class="cont-size">
				<b>考拉（CoinLa）</b>
				采集了全球1000多个数字货币，200多家交易所的大量数据对接源，专注于为投资者提供数字货币的数据挖掘、数据分析。同时考拉行情社区对每个数字货币采集其全面的信息，诸如项目介绍、货币发行数据、团队介绍等，并实施更新项目进度等，为投资者提供一个关于该数字货币的专业讨论平台。
			</p>
			<p class="contact">联系我们</p>
			<ul>
				<li>广告服务 business@coinla.com</li>
				<li>商务合作 advertise@coinla.com</li>
				<li>客服帮助 support@coinla.com</li>
			</ul>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
</html>