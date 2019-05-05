<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords content='考拉行情，数字货币行情，虚拟币行情，数字货币数据分析，数字货币行业大数据，虚拟币数据分析，考拉账本'>
<meta name=description content="考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，数据挖掘服务。我们拥有全球2000多个数字货币，200多家交易平台，5千多个交易对的数据资源，提供最专业的数字货币趋势分析，行情分析等多维度，全方位的分析服务，数字货币账本服务。">
<meta charset=utf-8>
<title>考拉行情--聚合全球行情,挖掘数据价值-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/index.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
<jsp:include page="/template/header.jsp" flush="true">
 <jsp:param value="index" name="headClass"/>
</jsp:include>
	<div class="index">
		<%@ include file="/template/indexTop.jsp"%>
		<input type="hidden" id="currentPage" value="${list.currentPage}" />
		<input type="hidden" id="pageSize" value="${list.pageSize}" />
		<div class="index_cont">
			<div class="container">
				<div class="cont_left">
					<div class="con_nav">
						<p class="con_nav_l">
							所有货币<span>All Digital Currency</span>
						</p>
						<div class="con_nav_r">
						<%@ include file="/template/searchInp.jsp"%>
							<section class="selectWrap selectWrap2">
							<p class="showSelect">
								<span class="value">流通市值降序</span><span class="selectIcon"><i
									class="icon-kenbot"></i></span>
							</p>
							<ul class="options">
								<li data="price">当前价降序</li>
								<li data="turnover">成交额降序</li>
								<li data="riseFall">涨跌幅降序</li>
								<li data="totalValue">流通市值降序</li>
								<li data="total">流通数量降序</li>
							</ul>
							</section>
							<section class="selectWrap selectWrap1">
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
								<li>#</li>
								<li>币种</li>
								<li>当前价</li>
								<li>成交额(24H)</li>
								<li>涨跌幅</li>
								<li>流通市值</li>
								<li>流通数量</li>
								<li>趋势图</li>
							</ul>
							<div class="sortDom">
								<c:forEach items="${list.items}" var="entity"
									varStatus="userStatus">
									<!-- url币种跳转  格式化 -->
									<c:set var="string1"
										value="${fn:toLowerCase(entity.currencyEnglisgName)}" />
									<!-- 币种符号-->
									<!--<c:set var="ccyType"
										value="${fn:toLowerCase(entity.currencyEnglisgName)}" />-->
									<ul class="table_cont index-table" cerid="${entity.cerId}">
										<li>${(list.currentPage-1)*list.pageSize + (userStatus.index+1)}</li>
										<li><a
											href="/coin/${fn:replace(string1, ' ', '-')}"
											title="${entity.currencyName}-${entity.currencyShortName}"
											class="aClick"> <img
												alt="${entity.currencyName}-${entity.currencyShortName}"
												class="Img" src="${entity.pic}">${entity.currencyName}
										</a></li>
										<li class="price" sort="${entity.openPrice}">￥${entity.openPrice}</li>
										<li class="turnover" sort="${entity.openTurnoverSort}"><span class="ccy">￥</span>${entity.openTurnover}</li>
										<li
											class="riseFall ${entity.openRiseFall>0?'color-green':(entity.openRiseFall==0?'color-gay':'color-red') }" sort="${entity.openRiseFall}">${entity.openRiseFall>0?'+':''}${entity.openRiseFall}%</li>
										<li class="totalValue" sort="${entity.openCirculateTotalValueSort}"><span class="ccy">￥</span>${entity.openCirculateTotalValue}</li>
										<li class="total" sort="${entity.openCirculateTotalSort}">${entity.openCirculateTotal}</li>
										<li id="svg_${entity.cerId}"><svg width="80" height="21" class="peity"> <polyline
												fill="none"
												points="" stroke="${entity.openRiseFall>0?'#26b47a':(entity.openRiseFall==0?'#454545':'#ff0000')}"
												stroke-width="1" stroke-linecap="square"
												class="g-rect-fill svgInfo"></polyline> </svg></li>
									</ul>
								</c:forEach>
							</div>
							<c:if test="${list.totalPage > 1}">
								<div class="newPage" data="${list.currentPage}">
									<c:if test="${list.currentPage == 1}">
										<a href="javascript:0;" class="aDisabled">上一页</a>
									</c:if>
									<c:if test="${list.currentPage != 1}">
										<c:if test="${list.currentPage == 2}">
											<a href="">上一页</a>
										</c:if>
										<c:if test="${list.currentPage > 2}">
											<a
												href="/list_${list.currentPage-1}">上一页</a>
										</c:if>

									</c:if>
									<c:if test="${list.currentPage > 4}">
										<c:if test="${list.totalPage >= 8}">
											<c:if test="${list.currentPage+4 <= list.totalPage}">
												<a href="">1</a>
												<a
													href="/list_${list.currentPage-3}">···</a>
												<a
													href="/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
												<a
													href="/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
												<a
													href="/list_${list.currentPage}">${ list.currentPage }</a>
												<a
													href="/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
												<a
													href="/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
												<a
													href="/list_${list.currentPage+3}">···</a>
												<a
													href="/list_${list.totalPage}">${list.totalPage}</a>
											</c:if>
											<c:if test="${list.currentPage+4 > list.totalPage}">
												<a href="">1</a>
												<a
													href="/list_${list.totalPage-6}">···</a>
												<a
													href="/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
												<a
													href="/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
												<a
													href="/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
												<a
													href="/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
												<a
													href="/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
												<a
													href="/list_${list.totalPage}">${list.totalPage}</a>
											</c:if>
										</c:if>
										<c:if test="${list.totalPage < 8}">
											<a href="" class="">1</a>
											<c:forEach begin="2" end="${list.totalPage }" var="i">
												<a href="/list_${i}"
													class="">${ i}</a>
											</c:forEach>
										</c:if>
									</c:if>
									<c:if test="${list.currentPage <= 4}">
										<c:if test="${list.totalPage >= 8}">
											<a href="">1</a>
											<a href="/list_2">2</a>
											<a href="/list_3">3</a>
											<a href="/list_4">4</a>
											<a href="/list_5">5</a>
											<a href="/list_6">6</a>
											<a href="/list_7">···</a>
											<a
												href="/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
										<c:if test="${list.totalPage < 8}">
											<a href="" class="">1</a>
											<c:forEach begin="2" end="${list.totalPage }" var="i">
												<a href="/list_${i}">${ i }</a>
											</c:forEach>
										</c:if>
									</c:if>
									<c:if test="${list.totalPage == list.currentPage}">
										<a href="javascript:0;" class="aDisabled">下一页</a>
									</c:if>
									<c:if test="${list.totalPage > list.currentPage}">
										<a
											href="/list_${list.currentPage+1}">下一页</a>
									</c:if>
								</div>
							</c:if>
						</div>
					</div>
				</div>
				<div class="cont_right">
					<%@ include file="/template/rankFall.jsp"%>
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
<script src="/js/index.js"></script>
</html>
