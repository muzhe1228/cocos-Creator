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
<title>考拉账本--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/book.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="book" name="headClass" />
	</jsp:include>
	<div class="bookIndex">
		<div class="bookIndex_nav">
			<a href="">考拉行情首页&nbsp;&nbsp;&gt;&nbsp;&nbsp;</a>
			<a href="javascript:0;" class=" active">账本首页</a>
		</div>
		<input type="hidden" id="bookId">
		<div class="bookIndex_cont" style="display: none;">
			<div class="container">
				<div class="cont_right">
					<%@ include file="/template/myBook.jsp"%>
				</div>
				<div class="cont_left">
					<div class="bookHome">
						<!---->
						<div class="book-wrap">
							<div class="con_nav">
								<p class="con_nav_l">币种投资</p>
								<div class="con_nav_r">
									<p class="addCcy">
										<i class="icon-ken_plus"></i><span>新增币种</span>
									</p>
								</div>
							</div>
							<div class="con_cont">
								<div class="con_cont_table">
									<ul class="table_title">
										<li>币种名称</li>
										<li>简称</li>
										<li>数量</li>
										<li>资产价值</li>
										<li>当前盈利</li>
										<li>操作</li>
									</ul>
									<div id="bookIndex"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="not-login container">
			<p>登陆后可查看操作考拉账本</p>
			<p>
				<button class="showLogin">立即登录</button>
				<button class="showRegister">注册账户</button>
			</p>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
	<%@ include file="/template/addCurrency.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
<script src="/js/book/bookComm.js"></script>
<script src="/js/book/index.js"></script>
</html>