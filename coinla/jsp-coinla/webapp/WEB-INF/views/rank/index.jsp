<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords content='考拉行情，虚拟币涨跌幅，数字货币行情，虚拟币行情，数字货币数据分析，数字货币行业大数据，虚拟币数据分析，考拉账本'>
<meta name=description content="考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，每日24小时及每小时全球虚拟货币涨跌幅排名。">
<meta charset=utf-8>
<title>虚拟币每日涨跌幅排行--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/rank.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="rank" name="headClass" />
		<jsp:param value="${type}" name="subHeadClass" />
	</jsp:include>
	<div class="Rank">
		<div class="container">
			<div class="Rank_left">
				<div class="con_cont">
					<div class="top-fall_nav con_nav">
						<div class="nav_tab">
							<a
								href="${type==0?'javascript:0;':'/rank/rise'}"
								class="${type==0?'active':''}">涨幅币种TOP50</a> <a
								href="${type==1?'javascript:0;':'/rank/fall'}"
								class="${type==1?'active':''}">跌幅币种TOP50</a>
						</div>
						<div class="nav_right"></div>
					</div>
					<div class="con_cont_table resetLoading">
						<ul class="table_title">
							<li>#</li>
							<li>币种</li>
							<li>当前价</li>
							<li>成交额</li>
							<li>涨幅</li>
							<li>流通市值</li>
						</ul>
						<div>
							<c:forEach items="${list.items}" var="entity"
								varStatus="userStatus">
								<!-- url币种跳转  格式化 -->
								<c:set var="ccyName"
									value="${fn:toLowerCase(entity.currencyEnglisgName)}" />
								<ul class="table_cont">
									<li class="${userStatus.index > 2?'':'color-red' }">${userStatus.index+1}</li>
									<li><a
										href="/coin/${fn:replace(ccyName, ' ', '-')}"
										class="aClick" title="${entity.currencyShortName }"><img
											alt="${entity.currencyShortName }" src="${entity.pic}">${entity.currencyShortName }
									</a></li>
									<li>￥${entity.openPrice}</li>
									<li>￥${entity.openTurnover}</li>
									<li
										class="${entity.openRiseFall>0?'color-green':(entity.openRiseFall==0?'color-gay':'color-red') }">${entity.openRiseFall>0?'+':''}${entity.openRiseFall}%</li>
									<li>￥${entity.openCirculateTotalValue}</li>
								</ul>
							</c:forEach>
						</div>
					</div>
				</div>
			</div>
			<div class="Rank_right">
				<a class="goToUrl AppDown" href="/App"> <img
					src="../static/images/newIndex/bannerRight.png" alt="">
				</a>
				<%@ include file="/template/rankFall.jsp"%>
				<%@ include file="/template/rankCurreny.jsp"%>
				<%@ include file="/template/newCurreny.jsp"%>
			</div>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
<script src="/js/index.js"></script>
</html>