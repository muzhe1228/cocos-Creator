<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords content="考拉行情，虚拟币交易所·数字货币交易所">
<meta name=description
	content="考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，全球虚拟数字货币交易所介绍大全·考拉数据实时跟新。">
<meta charset=utf-8>
<title>虚拟币数字货币交易所.全球数字货币交易所大全--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/exchange.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="exchange" name="headClass" />
	</jsp:include>
	<div class="bourse">
		<div class="container">
			<div class="bourse_left">
				<div class="con_nav">
					<p class="con_nav_l">
						交易所<span>Exchange</span>
					</p>
					<div class="con_nav_r"></div>
				</div>
				<div class="con_cont resetLoading">
					<div class="con_cont_all">
						<c:forEach items="${list.items}" var="entity"
							varStatus="userStatus">
							<c:set var="exchangeName"
								value="${fn:toLowerCase(entity.exchangeNameEn)}" />
							<div class="con_cont_slider">
								<div class="cont-l">
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}"
										class=""><img class="exchangeImg"
										alt="${entity.exchangeName}-${entity.exchangeNameEn}"
										src="${entity.pic}"></a>
								</div>
								<div class="cont-r">
									<ul>
										<li><a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}"
											title="${entity.exchangeName}-${entity.exchangeNameEn}"
											class="">${entity.exchangeName}<span>${entity.country}</span></a></li>
										<li>
											<p class="rateWrap clear-f">
												<i class="icon-ken_star${entity.level >= 1?' active':''}"></i>
												<i class="icon-ken_star${entity.level >= 2?' active':''}"></i>
												<i class="icon-ken_star${entity.level >= 3?' active':''}"></i>
												<i class="icon-ken_star${entity.level >= 4?' active':''}"></i>
												<i class="icon-ken_star${entity.level >= 5?' active':''}"></i>
											</p>
										</li>
									</ul>
									<p title="${entity.introduce}" class="size">${entity.introduce}</p>
									<div class="size-msg">
										<div class="kind">
											<p>交易对&nbsp;：&nbsp;${entity.transactionPair}</p>
											<p>
												成交额(24h)&nbsp;：&nbsp;<span class="color-red">￥${entity.turnover}</span>
											</p>
										</div>
										<div class="adver">
											<c:if test="${entity.futures == 0}">
												<p>
													<img src="./static/images/newIndex/qihuo.png" alt=""><span>期货</span>
												</p>
											</c:if>
											<c:if test="${entity.stock == 0}">
												<p>
													<img src="./static/images/newIndex/xianhuo.png" alt=""><span>现货</span>
												</p>
											</c:if>
											<c:if test="${entity.legalTender == 0}">
												<p>
													<img src="./static/images/newIndex/fabi.png" alt=""><span>法币</span>
												</p>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</c:forEach>
					</div>
				</div>
				<div class="newPage" data="${list.currentPage}">
					<c:if test="${list.currentPage == 1}">
						<a href="javascript:0;" class="aDisabled">上一页</a>
					</c:if>
					<c:if test="${list.currentPage != 1}">
						<c:if test="${list.currentPage == 2}">
							<a href="/exchange">上一页</a>
						</c:if>
						<c:if test="${list.currentPage > 2}">
							<a
								href="/exchange/list_${list.currentPage-1}">上一页</a>
						</c:if>

					</c:if>
					<c:if test="${list.currentPage > 4}">
						<c:if test="${list.totalPage >= 8}">
							<c:if test="${list.currentPage+4 <= list.totalPage}">
								<a href="/exchange">1</a>
								<a
									href="/exchange/list_${list.currentPage-3}">···</a>
								<a
									href="/exchange/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
								<a
									href="/exchange/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
								<a
									href="/exchange/list_${list.currentPage}">${ list.currentPage }</a>
								<a
									href="/exchange/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
								<a
									href="/exchange/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
								<a
									href="/exchange/list_${list.currentPage+3}">···</a>
								<a
									href="/exchange/list_${list.totalPage}">${list.totalPage}</a>
							</c:if>
							<c:if test="${list.currentPage+4 > list.totalPage}">
								<a href="/exchange">1</a>
								<a
									href="/exchange/list_${list.totalPage-6}">···</a>
								<a
									href="/exchange/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
								<a
									href="/exchange/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
								<a
									href="/exchange/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
								<a
									href="/exchange/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
								<a
									href="/exchange/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
								<a
									href="/exchange/list_${list.totalPage}">${list.totalPage}</a>
							</c:if>
						</c:if>
						<c:if test="${list.totalPage < 8}">
							<a href="/exchange"
								class="">1</a>
							<c:forEach begin="2" end="${list.totalPage }" var="i">
								<a
									href="/exchange/list_${i}"
									class="">${ i}</a>
							</c:forEach>
						</c:if>
					</c:if>
					<c:if test="${list.currentPage <= 4}">
						<c:if test="${list.totalPage >= 8}">
							<a href="/exchange">1</a>
							<a
								href="/exchange/list_2">2</a>
							<a
								href="/exchange/list_3">3</a>
							<a
								href="/exchange/list_4">4</a>
							<a
								href="/exchange/list_5">5</a>
							<a
								href="/exchange/list_6">6</a>
							<a
								href="/exchange/list_7">···</a>
							<a
								href="/exchange/list_${list.totalPage}">${list.totalPage}</a>
						</c:if>
						<c:if test="${list.totalPage < 8}">
							<a href="/exchange"
								class="">1</a>
							<c:forEach begin="2" end="${list.totalPage }" var="i">
								<a
									href="/exchange/list_${i}">${ i }</a>
							</c:forEach>
						</c:if>
					</c:if>
					<c:if test="${list.totalPage == list.currentPage}">
						<a href="javascript:0;" class="aDisabled">下一页</a>
					</c:if>
					<c:if test="${list.totalPage > list.currentPage}">
						<a
							href="/exchange/list_${list.currentPage+1}">下一页</a>
					</c:if>
				</div>
			</div>
			<div class="bourse_right">
				<a class="goToUrl AppDown" href="/App"> <img
					src="./static/images/newIndex/bannerRight.png" alt="">
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
<script src="/js/exchange/index.js"></script>
</html>