<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords content="${entity.exchangeName}交易平台,${entity.exchangeName}官网,${entity.exchangeName}手续费,${entity.exchangeName}怎么样,${entity.exchangeName}行情,${entity.exchangeName}简介">
<meta name=description content="考拉行情提供${entity.exchangeName}交易平台价格实时行情查询，对接${entity.exchangeName}所有交易对数据，还包括${entity.exchangeName}官网，${entity.exchangeName}所在国家,${entity.exchangeName}24小时成交量,${entity.exchangeName}历史等数据。">
<meta charset=utf-8>
<title>${entity.exchangeName}交易平台实时行情查询--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/_deatils.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="exchange" name="headClass" />
	</jsp:include>
	<c:set var="exchangeName"
		value="${fn:toLowerCase(entity.exchangeNameEn)}" />
	<div class="container MarketAll">
		<div class="MarketAll_nav">
			<a href="">考拉行情首页&nbsp;&nbsp;&gt;&nbsp;&nbsp;</a>
			<a href="/exchange">交易所&nbsp;&nbsp;&gt;&nbsp;&nbsp;</a>
			<a href="javascript:0;" class="active">${entity.exchangeName}</a>
		</div>
		<div class="Market">
			<div class="Market_l">
				<div class="con_nav">
					<p class="con_nav_l">交易所详情</p>
					<div class="con_nav_r"></div>
				</div>
				<div class="con_cont">
					<div class="con_cont_table resetLoading">
						<ul class="table_title">
							<li>排名</li>
							<li>币种</li>
							<li>交易对</li>
							<li>价格</li>
							<li>成交额(24H)</li>
							<li>占比</li>
						</ul>
						<div>
							<c:forEach items="${list.items}" var="coinItem"
								varStatus="userStatus">
								<!-- url币种跳转  格式化 -->
								<c:set var="ccyName"
									value="${fn:toLowerCase(coinItem.currencyEnglisgName)}" />
								<ul class="table_cont">
									<li>${(list.currentPage-1)*list.pageSize + (userStatus.index+1)}</li>
									<li><a
										href="/coin/${fn:replace(ccyName, ' ', '-')}"
										class="aClick"
										title="${coinItem.currencyName}-${coinItem.currencyShortName}"><img
											src="${coinItem.pic}"
											alt="${coinItem.currencyName}-${coinItem.currencyShortName}">${coinItem.currencyName}</a></li>
									<li>${coinItem.currencyShortName}/${coinItem.currencyRightShortName}</li>
									<li>￥${coinItem.openPrice}</li>
									<li>￥${coinItem.openTurnover}</li>
									<li>${coinItem.openTurnoverProportion}%</li>
								</ul>
							</c:forEach>
						</div>
					</div>
					<c:if test="${list.totalPage > 1}">
						<div class="newPage" data="${list.currentPage}">
							<c:if test="${list.currentPage == 1}">
								<a href="javascript:0;" class="aDisabled">上一页</a>
							</c:if>
							<c:if test="${list.currentPage != 1}">
								<c:if test="${list.currentPage == 2}">
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}">上一页</a>
								</c:if>
								<c:if test="${list.currentPage > 2}">
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage-1}">上一页</a>
								</c:if>

							</c:if>
							<c:if test="${list.currentPage > 4}">
								<c:if test="${list.totalPage >= 8}">
									<c:if test="${list.currentPage+4 <= list.totalPage}">
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}">1</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage-3}">···</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage}">${ list.currentPage }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage+3}">···</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
									<c:if test="${list.currentPage+4 > list.totalPage}">
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}">1</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage-6}">···</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
								</c:if>
								<c:if test="${list.totalPage < 8}">
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}"
										class="">1</a>
									<c:forEach begin="2" end="${list.totalPage }" var="i">
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${i}"
											class="">${ i}</a>
									</c:forEach>
								</c:if>
							</c:if>
							<c:if test="${list.currentPage <= 4}">
								<c:if test="${list.totalPage >= 8}">
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}">1</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_2">2</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_3">3</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_4">4</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_5">5</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_6">6</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_7">···</a>
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.totalPage}">${list.totalPage}</a>
								</c:if>
								<c:if test="${list.totalPage < 8}">
									<a
										href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}"
										class="">1</a>
									<c:forEach begin="2" end="${list.totalPage }" var="i">
										<a
											href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${i}">${ i }</a>
									</c:forEach>
								</c:if>
							</c:if>
							<c:if test="${list.totalPage == list.currentPage}">
								<a href="javascript:0;" class="aDisabled">下一页</a>
							</c:if>
							<c:if test="${list.totalPage > list.currentPage}">
								<a
									href="/exchange/details/${fn:replace(exchangeName, ' ', '-')}/list_${list.currentPage+1}">下一页</a>
							</c:if>
						</div>
					</c:if>
				</div>
			</div>
			<div class="Market_r">
				<div class="Market_r_nav">
					<p class="Img">
						<img alt="" src="${entity.pic}">
					</p>
					<ul class="Size">
						<li>${entity.exchangeName}</li>
						<li>
							<p class="rateWrap clear-f">
								<i class="icon-ken_star${entity.level >= 1?' active':''}"></i>
								<i class="icon-ken_star${entity.level >= 2?' active':''}"></i>
								<i class="icon-ken_star${entity.level >= 3?' active':''}"></i>
								<i class="icon-ken_star${entity.level >= 4?' active':''}"></i>
								<i class="icon-ken_star${entity.level >= 5?' active':''}"></i>
							</p>
						</li>
						<li><c:if test="${entity.futures == 0}">
								<p>
									<img src="../../static/images/newIndex/qihuo.png" alt=""><span>期货</span>
								</p>
							</c:if> <c:if test="${entity.stock == 0}">
								<p>
									<img src="../../static/images/newIndex/xianhuo.png" alt=""><span>现货</span>
								</p>
							</c:if> <c:if test="${entity.legalTender == 0}">
								<p>
									<img src="../../static/images/newIndex/fabi.png" alt=""><span>法币</span>
								</p>
							</c:if></li>
					</ul>
				</div>
				<ul class="Market_r_con">
					<li><p>
							交易对&nbsp;：&nbsp;<span>${entity.transactionPair}</span>
						</p></li>
					<li><p>
							国家&nbsp;：&nbsp;<span>${entity.country}</span>
						</p></li>
					<li><p>
							成交额(24h)&nbsp;：&nbsp;<span>￥${entity.turnover}</span>
						</p></li>
					<li><p>
							官网&nbsp;：&nbsp;<a href="${entity.link}"
								title="${entity.exchangeName}" target="_blank" class="Href">${entity.link}</a>
						</p></li>
					<li class="B_letter"><p>平台简介&nbsp;：&nbsp;</p>
						<p>${entity.introduce}</p></li>
				</ul>
			</div>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
</html>