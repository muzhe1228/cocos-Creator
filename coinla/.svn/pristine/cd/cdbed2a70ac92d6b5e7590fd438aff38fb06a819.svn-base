<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta name=keywords content="${resultVo.currencyShortName},${resultVo.currencyName}, ${resultVo.currencyShortName} ${resultVo.currencyName}价格,${resultVo.currencyName} ${resultVo.currencyShortName}行情,${resultVo.currencyName} ${resultVo.currencyShortName}交易网,${resultVo.currencyName} ${resultVo.currencyShortName}交易平台,${resultVo.currencyName} ${resultVo.currencyShortName}官网。">
	<meta name=description content="考拉行情对接全球200多家交易所对${resultVo.currencyName} ${resultVo.currencyShortName}价格查询,及${resultVo.currencyShortName}的发行流通,24小时换手率等数据实时跟踪,包过对${resultVo.currencyShortName}团队最新信息实时跟进。">
	<meta charset=utf-8>
	<title>${resultVo.currencyShortName} ${resultVo.currencyName} ${resultVo.currencyEnglisgName},全球200交易所${resultVo.currencyName}实时价格对接,${resultVo.currencyName}走势团队等介绍--考拉行情-CoinLa。</title>
<link rel="stylesheet/less"
	href="/css/coindetails.less">
<%@ include file="/template/link.jsp"%>
<body>
	<%@ include file="/template/header.jsp"%>
	<c:set var="ccyName"
		value="${fn:toLowerCase(resultVo.currencyEnglisgName)}" />
		<input type="hidden" id="ccyName" value="${ccyName}" />
	<div class="detailWrap container">
	<div class="detailWrap_nav">
	<a href="" class="nuxt-link-active">考拉行情首页&nbsp;&nbsp;&gt;&nbsp;&nbsp;</a>
	<a href="/optional" class="">自选&nbsp;&nbsp;&gt;&nbsp;&nbsp;</a>
	<a href="javascript:0;" class="active">${resultVo.currencyShortName}详情</a>
	</div>
		<div class="details">
			<div class="details_l">
				<%@ include file="/template/coinDetailsTop.jsp"%>
				<div class="details_l_con">
					<div class="details_l_con_nav">
						<c:set var="string1"
							value="${fn:toLowerCase(resultVo.currencyEnglisgName)}" />
						<div class="nav_tab">
							<a
								href="/coin/${fn:replace(ccyName, ' ', '-')}">核心数据</a>
							<a
								href="/coin/${fn:replace(ccyName, ' ', '-')}/market">交易所行情</a>
							<a
								href="/coin/${fn:replace(ccyName, ' ', '-')}/trend">市值趋势</a>
							<a href="javascript:0;" class="active">历史数据</a> <a
								href="/coin/${fn:replace(ccyName, ' ', '-')}/intro">币种介绍</a>
						</div>
						<div class="nav_right"></div>
					</div>
				</div>
				<div data-v-0f5429cb="" class="history con_cont child">
					<div class="con_cont_table resetLoading">
						<ul class="table_title">
							<li>日期</li>
							<li>最高价</li>
							<li>最低价</li>
							<li>交易额(24h)</li>
							<li>流通市值</li>
						</ul>
						<div>
							<c:forEach items="${list.items}" var="entity"
								varStatus="userStatus">
								<ul class="table_cont">
									<li>${entity.createTime}</li>
									<li>￥${entity.highPrice}</li>
									<li>￥${entity.lastPrice}</li>
									<li>￥${entity.turnover}</li>
									<li>￥${entity.circulateTotalValue}</li>
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
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history">上一页</a>
									</c:if>
									<c:if test="${list.currentPage > 2}">
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage-1}">上一页</a>
									</c:if>

								</c:if>
								<c:if test="${list.currentPage > 4}">
									<c:if test="${list.totalPage >= 8}">
										<c:if test="${list.currentPage+4 <= list.totalPage}">
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history">1</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage-3}">···</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage-2}">${ list.currentPage-2 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage-1}">${ list.currentPage-1 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage}">${ list.currentPage }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage+1}">${ list.currentPage+1 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage+2}">${ list.currentPage+2 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage+3}">···</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
										<c:if test="${list.currentPage+4 > list.totalPage}">
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history">1</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage-6}">···</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage-5}">${ list.totalPage-5 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage-4}">${ list.totalPage-4 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage-3}">${ list.totalPage-3 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage-2}">${ list.totalPage-2 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage-1}">${ list.totalPage-1 }</a>
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage}">${list.totalPage}</a>
										</c:if>
									</c:if>
									<c:if test="${list.totalPage < 8}">
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history"
											class="">1</a>
										<c:forEach begin="2" end="${list.totalPage }" var="i">
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${i}"
												class="">${ i}</a>
										</c:forEach>
									</c:if>
								</c:if>
								<c:if test="${list.currentPage <= 4}">
									<c:if test="${list.totalPage >= 8}">
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history">1</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_2">2</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_3">3</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_4">4</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_5">5</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_6">6</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_7">···</a>
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.totalPage}">${list.totalPage}</a>
									</c:if>
									<c:if test="${list.totalPage < 8}">
										<a
											href="/coin/${fn:replace(ccyName, ' ', '-')}/history"
											class="">1</a>
										<c:forEach begin="2" end="${list.totalPage }" var="i">
											<a
												href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${i}">${ i }</a>
										</c:forEach>
									</c:if>
								</c:if>
								<c:if test="${list.totalPage == list.currentPage}">
									<a href="javascript:0;" class="aDisabled">下一页</a>
								</c:if>
								<c:if test="${list.totalPage > list.currentPage}">
									<a
										href="/coin/${fn:replace(ccyName, ' ', '-')}/history/list_${list.currentPage+1}">下一页</a>
								</c:if>
							</div>
						</c:if>
					</div>
				</div>
			</div>

			<div class="details_r">
				<div class="list_nav">
					<div class="list_nav_l">
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAQZJREFUOI3N1M8qRVEUx/HP1U2UBxBFHkApJSa6paQMRDK5EwMZmhiIjJTyBAbKLaRIJjIgXkB5AXmFm4FEKa7B2XScto46V/nVGuy11/quP7V36f50tIEtrGJQQbUUBfwFcBlLzQJ2YRZtzQIu4B21PGAZ7TmwHkziBPU84ByuMJPT3Sv2086fgAOSvaxhB/2Z+z5M4AgPecBWDOEMG5LRathEZ4hZxAsOssnlCHAEHbjEDa4xjyoqOMcYdvGYTY51OB7GuA3nZ2xjKhSZxhMOI7nRDhu4wFvGX5es4Bi9Afor4HosMKW7YFH9y7f8TZ8jD2MF3QVYe2lgJVgRfQFLKWfhD/YDcFssf1M80OUAAAAASUVORK5CYII="
							alt="">
						<p class="active">基本资料</p>
					</div>
				</div>
				<ul class="details_r_con resetLoading">
					<li><p>
							名称&nbsp;：&nbsp;<span>${currencyVo.currencyName}</span>
						</p></li>
					<li><p>
							英文&nbsp;：&nbsp;<span>${currencyVo.english}</span>
						</p></li>
					<li><p>
							简称&nbsp;：&nbsp;<span>${currencyVo.shortName}</span>
						</p></li>
					<li><p>
							发布时间&nbsp;：&nbsp;<span>${currencyVo.initiateCreateDate}</span>
						</p></li>
					<li><p>
							发行总量&nbsp;：&nbsp;<span>${currencyVo.total}</span>
						</p></li>
					<li><p>
							官网&nbsp;：&nbsp;<a href="https://bitcoin.org/" title="比特币-BTC"
								target="_blank" class="Href">${currencyVo.guanw }</a>
						</p></li>
					<li>
						<p>
							募集&nbsp;：&nbsp;<span>${currencyVo.isIco>0?"有":"无"}</span>
						</p>
					</li>

					<li>
						<p>
							募集时间&nbsp;：&nbsp;<span>${currencyVo.privateTime}</span>
						</p>
					</li>
					<li>
						<p>
							募集总价值&nbsp;：&nbsp;<span>${currencyVo.privateTotalValue}</span>
						</p>
					</li>
					<li>
						<p>
							募集数量&nbsp;：&nbsp;<span>${currencyVo.ico}</span>
						</p>
					</li>
					<%-- <li>
        <p>
            是否可挖矿&nbsp;：&nbsp;<span>${currencyVo.ismining}</span>
        </p>
    </li> --%>
					<%-- <li>
        <p>
            募集总价值&nbsp;：&nbsp;<span>${currencyVo.privateTotalValue ? currencyVo.privateTotalValue : "未知"}</span>
        </p>
    </li>
    <li>
        <p>
            募集数量&nbsp;：&nbsp;<span>${currencyVo.ico ? currencyVo.ico : '未知' }</span>
        </p>
    </li>
    <li>
        <p>
            是否可挖矿&nbsp;：&nbsp;<span>${currencyVo.ismining ? "是" : "否"}</span>
        </p>
    </li> --%>
					<li class="B_letter">
						<p>共识机制&nbsp;：&nbsp;</p>
						<p class="cont_letter">${currencyVo.consensusMechanism}</p>
					</li>
					<!--<li v-if="Details.appIntroduce">-->
					<!--<p>当前应用&nbsp;：&nbsp;<span>{{Details.appIntroduce}}</span></p>-->
					<!--</li>-->
					<li class="B_letter">
						<p>币种简介&nbsp;：&nbsp;</p>
						<p>${currencyVo.introduce}</p> <a>查看更多</a>
					</li>
				</ul>
				<ul class="details_r_bot">
					<li><a href="${currencyVo.blockChain}"
						title="${currencyVo.blockChain}" target="_blank"><p
								class="left">
								<img src="../static/images/newIndex/icon_link.png" alt=""><span>区块链浏览器</span>
							</p>
							<p>
								<i class="icon-ken_right"></i>
							</p></a></li>
					<li><a href="${currencyVo.officialCommunity}"
						title="${currencyVo.officialCommunity}" target="_blank"><p
								class="left">
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAahJREFUOI2t00+ITmEUx/HPTG/ErEZJhGZGLFCKyMJuWGlmzN5C+RNWkljI0oYymaWSLKxEo9fKjKwmRc1ikD+Nd0qKlP//U8biOVd33u597yzmV7duz3PO9zy/85yHeVZb4+7+lvtYhh7U8BJv8LcouKf3sloJqIZV6EZHbn0zfmIar/CnKDGvRQFZjQXYhv5YH8F4/K/HuoBO40czsDNsLcdi9KIPX3ALvzGAfajjDr5HTne0oYGPGXAHlmI3duIRLuB57vQPA7AHl3APt/EWK+Kr17AdJ7EJYziOd829CTWi0JJwcB6Pw8UzaMd9PMUBXGkBy+sDruIgnuBctpFZrueCO3EMG/ACFzGDo1iLKQzjPX6F7UNZcntB9cMB2osHOI0zmAzoFI6UHb0IuAU3ovoIvuErbuJz7G0sAxYN9id0iSYHIK810jjNGTgsWbwu9XYiF9uPQQyVAYssT+IUtkojslKasSHJ6olckTmdEF5Ll7ELZ6Vbvia9kJYqA2YalZ7YQullVKoKWDd7RjP1VQGbk2YqCrWVFP8PLAIUJWWxVQXnT/8AezpgCqTwJfsAAAAASUVORK5CYII="
									alt=""><span>官方社区</span>
							</p>
							<p>
								<i class="icon-ken_right"></i>
							</p></a></li>
					<li><a href="${currencyVo.whitePaperZh}"
						title="${currencyVo.whitePaperZh}" target="_blank"><p
								class="left">
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAANBJREFUOI3t1LFKglEYxvGfHyc3l4KIyEGHoKitO3Bq6Q4axEGIFhfnlpa6g6CpO9ClpYvoAtKxQdDZEHLQD77BsqNfkz7wcp6X97x/nuUcclah99ZIfYJTHGFnFVi19twNmf4ElbXiIaCIR9RRiti9mp+djBfwgGPcYvRHWOe3hNc4w0VEuh+VYBefecBSYK7aAjcBmH3Le2iZfRBh8fU44A3ecYfJOsAhDnGOJl6xv2RvgMaiQcALntDHJcr4igzWTU2CNj5wgHuM8R1R/6spL8IkbPz2fUoAAAAASUVORK5CYII="
									alt=""><span>白皮书中文</span>
							</p>
							<p>
								<i class="icon-ken_right"></i>
							</p></a></li>
					<li><a href="${currencyVo.whitePaperEn}"
						title="${currencyVo.whitePaperEn}" target="_blank"><p
								class="left">
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAANBJREFUOI3t1LFKglEYxvGfHyc3l4KIyEGHoKitO3Bq6Q4axEGIFhfnlpa6g6CpO9ClpYvoAtKxQdDZEHLQD77BsqNfkz7wcp6X97x/nuUcclah99ZIfYJTHGFnFVi19twNmf4ElbXiIaCIR9RRiti9mp+djBfwgGPcYvRHWOe3hNc4w0VEuh+VYBefecBSYK7aAjcBmH3Le2iZfRBh8fU44A3ecYfJOsAhDnGOJl6xv2RvgMaiQcALntDHJcr4igzWTU2CNj5wgHuM8R1R/6spL8IkbPz2fUoAAAAASUVORK5CYII="
									alt=""><span>白皮书英文</span>
							</p>
							<p>
								<i class="icon-ken_right"></i>
							</p></a></li>
				</ul>
			</div>
		</div>
	</div>
	<%@ include file="/template/footer.jsp"%>
</body>
<%@ include file="/template/linkJs.jsp"%>
<script src="/js/coin/coinComm.js"></script>
<script src="/js/coin/history.js"></script>
</html>