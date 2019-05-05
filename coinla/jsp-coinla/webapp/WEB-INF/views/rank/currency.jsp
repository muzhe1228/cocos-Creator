<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords content="考拉行情，加密货币成交量">
<meta name=description
	content="考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，每日24小时及每小时全球虚拟货币成交量。">
<meta charset=utf-8>
<title>加密货币每日成交量排名--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/ccy_exchange.less">
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
				<div class="Togger">
					<div class="con_nav">
						<p class="con_nav_l">
							币种成交榜<span>Currency Make List</span>
						</p>
						<div class="con_nav_r"></div>
					</div>
					<div class="con-cont">
						<div class="con-cont_all resetLoading">
							<c:forEach items="${list.items}" var="entity"
								varStatus="userStatus">
								<section>
								<div class="title">
									<p>NO.${(list.currentPage-1)*list.pageSize + (userStatus.index+1)}
										${entity.currencyName}</p>
									<p>
										<span>总成交量：￥${entity.openTurnover}</span>
									</p>
								</div>
								<c:if test="${fn:length(entity.list)> 5}">
									<div class="cont" style="height: 360px">
								</c:if> <c:if test="${fn:length(entity.list) <= 5}">
									<div class="cont" style="height:${fn:length(entity.list)*60}px">
								</c:if>
								<ul class="cont_title">
									<li>#</li>
									<li>交易平台</li>
									<li>交易对</li>
									<li>成交额(24H)</li>
									<li>当前价</li>
									<li>成交占比</li>
								</ul>
								<div>
									<c:forEach items="${entity.list}" var="itemList"
										varStatus="itemNum">
										<!-- url币种跳转  格式化 -->
										<c:set var="exchangeName"
											value="${fn:toLowerCase(itemList.exchangeNameEn)}" />
										<ul class="cont_cont">
											<li>${itemNum.index + 1}</li>
											<li><a
												href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}"
												class="aClick" title="${itemList.exchangeName}">${itemList.exchangeName}</a></li>
											<li>${itemList.currencyShortName}/${itemList.currencyRightShortName}</li>
											<li>￥${itemList.openTurnover}</li>
											<li>￥${itemList.openPrice}</li>
											<li>${itemList.openTurnoverProportion}%</li>
										</ul>
									</c:forEach>
								</div>
						</div>
						<c:if test="${fn:length(entity.list)> 5}">
							<p class="more">查看更多</p>
						</c:if>
						</section>
						</c:forEach>
					</div>
					<c:if test="${list.totalPage > 1}">
						<div class="newPage" data="${list.currentPage}">
							<c:if test="${list.currentPage == 1}">
								<a href="javascript:0;" class="aDisabled">上一页</a>
							</c:if>
							<c:if test="${list.currentPage != 1}">
								<c:if test="${list.currentPage == 2}">
									<a
										href="/rank/currency">上一页</a>
								</c:if>
								<c:if test="${list.currentPage > 2}">
									<a
										href="/rank/currency/list_${list.currentPage-1}">上一页</a>
								</c:if>

							</c:if>
							<c:if test="${list.currentPage > 4}">
								<c:if test="${list.totalPage >= 8}">
									<c:if test="${list.currentPage+4 <= list.totalPage}">
										<a
											href="/rank/currency">1</a>
										<a
											href="/rank/currency/list_${list.currentPage-3}">···</a>
										<a
											href="/rank/currency/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
										<a
											href="/rank/currency/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
										<a
											href="/rank/currency/list_${list.currentPage}">${ list.currentPage }</a>
										<a
											href="/rank/currency/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
										<a
											href="/rank/currency/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
										<a
											href="/rank/currency/list_${list.currentPage+3}">···</a>
										<a
											href="/rank/currency/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
									<c:if test="${list.currentPage+4 > list.totalPage}">
										<a
											href="/rank/currency">1</a>
										<a
											href="/rank/currency/list_${list.totalPage-6}">···</a>
										<a
											href="/rank/currency/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
										<a
											href="/rank/currency/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
										<a
											href="/rank/currency/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
										<a
											href="/rank/currency/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
										<a
											href="/rank/currency/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
										<a
											href="/rank/currency/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
								</c:if>
								<c:if test="${list.totalPage < 8}">
									<a
										href="/rank/currency"
										class="">1</a>
									<c:forEach begin="2" end="${list.totalPage }" var="i">
										<a
											href="/rank/currency/list_${i}"
											class="">${ i}</a>
									</c:forEach>
								</c:if>
							</c:if>
							<c:if test="${list.currentPage <= 4}">
								<c:if test="${list.totalPage >= 8}">
									<a
										href="/rank/currency">1</a>
									<a
										href="/rank/currency/list_2">2</a>
									<a
										href="/rank/currency/list_3">3</a>
									<a
										href="/rank/currency/list_4">4</a>
									<a
										href="/rank/currency/list_5">5</a>
									<a
										href="/rank/currency/list_6">6</a>
									<a
										href="/rank/currency/list_7">···</a>
									<a
										href="/rank/currency/list_${list.totalPage}">${list.totalPage}</a>
								</c:if>
								<c:if test="${list.totalPage < 8}">
									<a
										href="/rank/currency"
										class="">1</a>
									<c:forEach begin="2" end="${list.totalPage }" var="i">
										<a
											href="/rank/currency/list_${i}">${ i }</a>
									</c:forEach>
								</c:if>
							</c:if>
							<c:if test="${list.totalPage == list.currentPage}">
								<a href="javascript:0;" class="aDisabled">下一页</a>
							</c:if>
							<c:if test="${list.totalPage > list.currentPage}">
								<a
									href="/rank/currency/list_${list.currentPage+1}">下一页</a>
							</c:if>
						</div>
					</c:if>

				</div>
			</div>
		</div>
		<div class="Rank_right">
			<a class="goToUrl AppDown" href="/App"> <img
				src="/static/images/newIndex/bannerRight.png"
				alt="">
			</a>
			<%@ include file="/template/rankFall.jsp"%>
			<%@ include file="/template/rankCurreny.jsp"%>
			<%@ include file="/template/newCurreny.jsp"%>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
<script src="/js/ccy_exchange.js"></script>
</html>