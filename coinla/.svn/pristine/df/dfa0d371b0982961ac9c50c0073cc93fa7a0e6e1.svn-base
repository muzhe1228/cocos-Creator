<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="details_l_top">
	<ul class="top_l">
		<li class="Nos"><p>NO.${resultVo.ranking}</p></li>
		<li class="b_logo"><img alt="" src="${resultVo.pic}"></li>
		<li class="b_name"><p>${resultVo.currencyName}</p>
			<p>${resultVo.currencyShortName}</p></li>
		<li class="bot">
			<p>
				<span class="size">${resultVo.openAttentionnumber}人</span><span>关注</span>
			</p>
		</li>
	</ul>
	<div class="top_r">
		<div class="top_r_title">
			<p class="name">
				<span>${resultVo.currencyName}</span><span>${resultVo.currencyShortName}</span>
			</p>
			<p class="follow" cerid="${resultVo.cerId}">
				<i class="icon-ken_star color-star"></i>添加关注
			</p>
		</div>
		<p class="englishName">${resultVo.currencyEnglisgName}</p>
		<div class="top_r_info">
			<ul class="top_r_info_l">
				<li class="nav">当前价</li>
				<li class="price"><span>￥</span>${resultVo.openPrice}<span
					class="Rise color-green">${resultVo.openRiseFall}%</span></li>
				<li class="rightName">${resultVo.currencyShortName}/${resultVo.currencyRightShortName}</li>
			</ul>
			<ul class="top_r_info_r">
				<li>最高&nbsp;：<span class="color-green">￥${resultVo.openHighPrice}</span></li>
				<li>最低&nbsp;：<span class="color-red">￥${resultVo.openLowPrice}</span></li>
				<li>国行&nbsp;：<span>≈￥${resultVo.openNationalLowPrice}</span><span></span></li>
			</ul>
		</div>
		<div class="top_r_bot">
			<ul class="top_r_bot_l">
				<li>成交额(24h)&nbsp;：<span>&nbsp;￥${resultVo.openTurnover}</span>
				</li>
				<li>流通市值&nbsp;：<span>&nbsp;￥${resultVo.openCirculateTotalValue}</span></li>
			</ul>
			<ul class="top_r_bot_r">
				<li>流通总量&nbsp;：<span>&nbsp;${resultVo.openCirculateTotal}</span></li>
				<li>发行总量&nbsp;：<span>&nbsp;${resultVo.openTotal}</span></li>
			</ul>
		</div>
	</div>
</div>