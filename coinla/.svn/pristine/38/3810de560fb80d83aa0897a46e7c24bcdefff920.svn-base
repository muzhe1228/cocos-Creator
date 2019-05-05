<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name=keywords content='考拉行情，加密货币概念，去中心化概念'>
<meta name=description content="区块链领域板块分类介绍,及个个加密货币分类。">
<meta charset=utf-8>
<title>区块链领域板块考拉行情分类介绍--考拉行情-CoinLa</title>
<link rel="stylesheet/less"
	href="/css/template.less">
<%@ include file="/template/link.jsp"%>
</head>
<body>
	<jsp:include page="/template/header.jsp" flush="true">
		<jsp:param value="template" name="headClass" />
	</jsp:include>
	<div class="template">
		<div class="template_cont container">
			<div class="template_cont-l">
				<div class="con_cont">
					<div class="top">
						<div class="con_nav">
							<div class="con_nav_l">
								<h2 class="con_nav_l">
									模板概念<span>Plate Concept</span>
								</h2>
							</div>
						</div>
						<div class="allClass">
							<p>所有分类&nbsp;：&nbsp;</p>
							<div class="mameList">
								<a href="/template"
									class="${mcId == 0 ? 'active':''}">全部</a>
								<c:forEach items="${moduleList}" var="templateTop"
									varStatus="topStatus">
									<a
										href="/template/module/block_${templateTop.mcId}"
										class="${mcId == templateTop.mcId ? 'active':''}">${templateTop.mcName}</a>
								</c:forEach>
							</div>
						</div>
					</div>
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
						<div>
							<c:forEach items="${list.items}" var="entity"
								varStatus="userStatus">
								<!-- url币种跳转  格式化 -->
								<c:set var="ccyName"
									value="${fn:toLowerCase(entity.currencyEnglisgName)}" />
								<!-- 币种符号-->
								<!--<c:set var="ccyType"
										value="${fn:toLowerCase(entity.currencyEnglisgName)}" />-->
								<ul class="table_cont index-table" cerid="${entity.cerId}"
									id="svg_${entity.cerId}">
									<li>${(list.currentPage-1)*list.pageSize + (userStatus.index+1)}</li>
									<li><a
										href="/coin/${fn:replace(ccyName, ' ', '-')}"
										title="${entity.currencyName}-${entity.currencyShortName}"
										class="aClick"> <img
											alt="${entity.currencyName}-${entity.currencyShortName}"
											class="Img" src="${entity.pic}">${entity.currencyName}
									</a></li>
									<li class="price" sort="${entity.openPrice}">¥${entity.openPrice}</li>
									<li class="turnover"><span class="ccy">￥</span>${entity.openTurnover}</li>
									<li
										class="${entity.openRiseFall>0?'color-green':(entity.openRiseFall==0?'color-gay':'color-red') }">${entity.openRiseFall>0?'+':''}${entity.openRiseFall}%</li>
									<li><span class="ccy">￥</span>${entity.openCirculateTotalValue}</li>
									<li>${entity.openCirculateTotal}</li>
									<li><svg width="80" height="21" class="peity"> <polyline
											fill="none"
											points=" 0 18.156028368794324 1.9047619047619047 15.390070921985814 3.8095238095238093 0 5.7142857142857135 20 7.619047619047619 13.829787234042554 9.523809523809524 13.617021276595745 11.428571428571427 9.858156028368795 13.333333333333332 8.865248226950355 15.238095238095237 7.7304964539007095 17.142857142857142 6.808510638297872 19.047619047619047 7.375886524822695 20.952380952380953 10 22.857142857142854 8.297872340425531 24.76190476190476 6.24113475177305 26.666666666666664 6.73758865248227 28.57142857142857 9.148936170212766 30.476190476190474 9.787234042553191 32.38095238095238 8.439716312056738 34.285714285714285 8.156028368794326 36.19047619047619 7.5177304964539005 38.095238095238095 4.539007092198581 40 6.808510638297872 41.904761904761905 8.652482269503546 43.80952380952381 10.49645390070922 45.71428571428571 5.815602836879432 47.61904761904761 8.22695035460993 49.52380952380952 6.808510638297872 51.42857142857142 8.439716312056738 53.33333333333333 6.950354609929078 55.238095238095234 17.659574468085108 57.14285714285714 15.74468085106383 59.047619047619044 13.75886524822695 60.95238095238095 16.45390070921986 62.857142857142854 12.695035460992907 64.76190476190476 13.049645390070923 66.66666666666666 12.624113475177305 68.57142857142857 12.907801418439718 70.47619047619047 10.638297872340425 72.38095238095238 9.787234042553191 74.28571428571428 8.156028368794326 76.19047619047619 5.531914893617022 78.09523809523809 5.531914893617022"
											stroke="${entity.openRiseFall>0?'#26b47a':(entity.openRiseFall==0?'#454545':'#ff0000')}"
											stroke-width="1" stroke-linecap="square"
											class="g-rect-fill svgInfo"></polyline> </svg></li>
								</ul>
							</c:forEach>
						</div>
						<c:if test="${mcId == 0 && list.totalPage > 1}">
							<div class="newPage" data="${list.currentPage}">
								<c:if test="${list.currentPage == 1}">
									<a href="javascript:0;" class="aDisabled">上一页</a>
								</c:if>
								<c:if test="${list.currentPage != 1}">
									<c:if test="${list.currentPage == 2}">
										<a href="/template">上一页</a>
									</c:if>
									<c:if test="${list.currentPage > 2}">
										<a
											href="/template/list_${list.currentPage-1}">上一页</a>
									</c:if>

								</c:if>
								<c:if test="${list.currentPage > 4}">
									<c:if test="${list.totalPage >= 8}">
										<c:if test="${list.currentPage+4 <= list.totalPage}">
											<a href="/template">1</a>
											<a
												href="/template/list_${list.currentPage-3}">···</a>
											<a
												href="/template/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
											<a
												href="/template/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
											<a
												href="/template/list_${list.currentPage}">${ list.currentPage }</a>
											<a
												href="/template/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
											<a
												href="/template/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
											<a
												href="/template/list_${list.currentPage+3}">···</a>
											<a
												href="/template/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
										<c:if test="${list.currentPage+4 > list.totalPage}">
											<a href="/template">1</a>
											<a
												href="/template/list_${list.totalPage-6}">···</a>
											<a
												href="/template/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
											<a
												href="/template/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
											<a
												href="/template/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
											<a
												href="/template/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
											<a
												href="/template/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
											<a
												href="/template/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
									</c:if>
									<c:if test="${list.totalPage < 8}">
										<a href="/template"
											class="">1</a>
										<c:forEach begin="2" end="${list.totalPage }" var="i">
											<a
												href="/template/list_${i}"
												class="">${ i}</a>
										</c:forEach>
									</c:if>
								</c:if>
								<c:if test="${list.currentPage <= 4}">
									<c:if test="${list.totalPage >= 8}">
										<a href="/template">1</a>
										<a
											href="/template/list_2">2</a>
										<a
											href="/template/list_3">3</a>
										<a
											href="/template/list_4">4</a>
										<a
											href="/template/list_5">5</a>
										<a
											href="/template/list_6">6</a>
										<a
											href="/template/list_7">···</a>
										<a
											href="/template/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
									<c:if test="${list.totalPage < 8}">
										<a href="/template"
											class="">1</a>
										<c:forEach begin="2" end="${list.totalPage }" var="i">
											<a
												href="/template/list_${i}">${ i }</a>
										</c:forEach>
									</c:if>
								</c:if>
								<c:if test="${list.totalPage == list.currentPage}">
									<a href="javascript:0;" class="aDisabled">下一页</a>
								</c:if>
								<c:if test="${list.totalPage > list.currentPage}">
									<a
										href="/template/list_${list.currentPage+1}">下一页</a>
								</c:if>
							</div>
						</c:if>
						<c:if test="${mcId != 0&& list.totalPage > 1}">
							<div class="newPage" data="${list.currentPage}">
								<c:if test="${list.currentPage == 1}">
									<a href="javascript:0;" class="aDisabled">上一页</a>
								</c:if>
								<c:if test="${list.currentPage != 1}">
									<c:if test="${list.currentPage == 2}">
										<a
											href="/template/module/block_${mcId}">上一页</a>
									</c:if>
									<c:if test="${list.currentPage > 2}">
										<a
											href="/template/module/block_${mcId}/list_${list.currentPage-1}">上一页</a>
									</c:if>

								</c:if>
								<c:if test="${list.currentPage > 4}">
									<c:if test="${list.totalPage >= 8}">
										<c:if test="${list.currentPage+4 <= list.totalPage}">
											<a
												href="/template/module/block_${mcId}">1</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage-3}">···</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage}">${ list.currentPage }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.currentPage+3}">···</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
										<c:if test="${list.currentPage+4 > list.totalPage}">
											<a
												href="/template/module/block_${mcId}">1</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage-6}">···</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
											<a
												href="/template/module/block_${mcId}/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
									</c:if>
									<c:if test="${list.totalPage < 8}">
										<a
											href="/template/module/block_${mcId}"
											class="">1</a>
										<c:forEach begin="2" end="${list.totalPage }" var="i">
											<a
												href="/template/module/block_${mcId}/list_${i}"
												class="">${ i}</a>
										</c:forEach>
									</c:if>
								</c:if>
								<c:if test="${list.currentPage <= 4}">
									<c:if test="${list.totalPage >= 8}">
										<a
											href="/template/module/block_${mcId}">1</a>
										<a
											href="/template/module/block_${mcId}/list_2">2</a>
										<a
											href="/template/module/block_${mcId}/list_3">3</a>
										<a
											href="/template/module/block_${mcId}/list_4">4</a>
										<a
											href="/template/module/block_${mcId}/list_5">5</a>
										<a
											href="/template/module/block_${mcId}/list_6">6</a>
										<a
											href="/template/module/block_${mcId}/list_7">···</a>
										<a
											href="/template/module/block_${mcId}/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
									<c:if test="${list.totalPage < 8}">
										<a
											href="/template/module/block_${mcId}"
											class="">1</a>
										<c:forEach begin="2" end="${list.totalPage }" var="i">
											<a
												href="/template/module/block_${mcId}/list_${i}">${ i }</a>
										</c:forEach>
									</c:if>
								</c:if>
								<c:if test="${list.totalPage == list.currentPage}">
									<a href="javascript:0;" class="aDisabled">下一页</a>
								</c:if>
								<c:if test="${list.totalPage > list.currentPage}">
									<a
										href="/template/module/block_${mcId}/list_${list.currentPage+1}">下一页</a>
								</c:if>
							</div>
						</c:if>
					</div>
				</div>
			</div>
			<div class="template_cont-r">
				<a class="goToUrl AppDown" href="/App"> <img
					src="static/images/newIndex/bannerRight.png" alt="">
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
<script src="/js/template.js"></script>
</html>