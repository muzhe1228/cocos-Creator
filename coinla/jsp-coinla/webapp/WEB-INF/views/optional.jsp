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
<title>我的自选--考拉行情-CoinLa</title>
<link rel="stylesheet/less" href="css/optional.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="optional" name="headClass" />
	</jsp:include>
	<div class="optional">
		<%@ include file="/template/indexTop.jsp"%>
		<div class="optional_cont">
			<div class="container">
				<div class="cont_left">
					<div class="con_nav">
						<p class="con_nav_l deleteTest">
							我的自选<span>Optional Currency</span>
						</p>
						<div class="con_nav_r">
							<%@ include file="/template/searchInp.jsp"%>
							<section class="selectWrap selectWrap1">
							<p class="showSelect">
								<span class="value">流通市值降序</span><span class="selectIcon"><i
									class="icon-kenbot"></i></span>
							</p>
							<ul class="options">
								<li data="0">当前价降序</li>
								<li data="1">成交额降序</li>
								<li data="2">涨跌幅降序</li>
								<li data="3">流通市值降序</li>
							</ul>
							</section>
							<section class="selectWrap selectWrap2">
							<p class="showSelect">
								<span class="value">CNY</span><span class="selectIcon"><i
									class="icon-kenbot"></i></span>
							</p>
							<ul class="options">
								<li data="0">CNY</li>
								<li data="1">USD</li>
							</ul>
							</section>
						</div>
					</div>
					<div class="con_cont">
						<div class="con_cont_table resetLoading">
							<ul class="table_title">
								<li>币种</li>
								<li>交易对</li>
								<li>交易所</li>
								<li>当前价</li>
								<li>成交额(24H)</li>
								<li>涨跌幅</li>
								<li>流通市值</li>
								<li>操作</li>
							</ul>
							<div class="yes-login">
								<div id="optionalList"></div>
								<div class="newPage" style="display: none"></div>
							</div>
							<div class="not-login">
								<p>登陆后可添加自选</p>
								<p>
									<button class="showLogin">立即登录</button>
									<button class="showRegister">注册账户</button>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="cont_right">
					<%@ include file="/template/rankCurreny.jsp"%>
					<%@ include file="/template/newCurreny.jsp"%>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
<script src="/js/top.js"></script>
<script src="/js/optional.js"></script>
</html>