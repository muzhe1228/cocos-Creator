<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<header>
	<div class="container v-head">
		<a href="" class="logo"><img
			src="/static/images/icon/logo.png"></a>
		<div class="v-head__menu">
			<div class="kenMenu">
				<a href="/"
					class="item ${param.headClass == 'index'?'active':''}">首页</a> <a
					href="/optional"
					class="item ${param.headClass == 'optional'?'active':''}">自选</a>
				<div
					class="kenSubMenu item ${param.headClass == 'rank'?'active':''}">
					<p>
						排行<span></span>
					</p>
					<div class="subMenuInfo">
						<a class="${param.subHeadClass == 0?'active':''}"
							href="/rank/rise">涨幅榜</a>
						<a class="${param.subHeadClass == 1?'active':''}"
							href="/rank/fall">跌幅榜</a>
						<a class="${param.subHeadClass == 2?'active':''}"
							href="/rank/currency">币种成交榜</a>
						<a class="${param.subHeadClass == 3?'active':''}"
							href="/rank/exchange">交易所成交榜</a>
						<a class="${param.subHeadClass == 4?'active':''}"
							href="/rank/trend">市值趋势</a>
					</div>
				</div>
				<a href="/exchange"
					class="item ${param.headClass == 'exchange'?'active':''}">交易所</a> <a
					href="/template"
					class="item ${param.headClass == 'template'?'active':''}">模块概念</a>
				<a class="item ${param.headClass == 'book'?'active':''}"
					href="/book"
					target="_blank">账本</a> <a
					class="item ${param.headClass == 'app'?'active':''}"
					href="/App" target="_blank">app</a>
			</div>
			<div>
				<p class="login">
					<span class="showRegister">注册</span> / <span class="showLogin">登录</span>
				</p>
				<div class="isLogo">
					<div class="onLine">
						<div class="userMsg">
							<div class="userKen">
								<div class="userKen-Img">
									<img
										src="http://bileimages.oss-cn-hangzhou.aliyuncs.com/images/1527243507745.jpg">
								</div>
								<p>个人中心</p>
							</div>
						</div>
						<div class="userSubMenu">
							<a href="/user">Ken-Coinla</a>
							<a href="/user/action">账号设置</a>
							<a href="/user/msg">消息中心</a>
							<a href="javascript:0;" class="logOut">退出登录</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="hover-hand" id="subHead">
		<div class="hover-hand-wrap">
			<div class="hover-hand-logo"></div>
			<div class="hover-hand__menu">
				<div class="kenMenu">
					<a href="/"
						class="item ${param.headClass == 'index'?'active':''}">首页</a> <a
						href="/optional"
						class="item ${param.headClass == 'optional'?'active':''}">自选</a>
					<div
						class="kenSubMenu item ${param.headClass == 'rank'?'active':''}">
						<p>
							排行<span></span>
						</p>
						<div class="subMenuInfo">
							<a class="${param.subHeadClass == 0?'active':''}"
								href="/rank/rise">涨幅榜</a>
							<a class="${param.subHeadClass == 1?'active':''}"
								href="/rank/fall">跌幅榜</a>
							<a class="${param.subHeadClass == 2?'active':''}"
								href="/rank/currency">币种成交榜</a>
							<a class="${param.subHeadClass == 3?'active':''}"
								href="/rank/exchange">交易所成交榜</a>
							<a class="${param.subHeadClass == 4?'active':''}"
								href="/rank/trend">市值趋势</a>
						</div>
					</div>
					<a href="/exchange"
						class="item ${param.headClass == 'exchange'?'active':''}">交易所</a>
					<a href="/template"
						class="item ${param.headClass == 'template'?'active':''}">模块概念</a>
					<a class="item ${param.headClass == 'book'?'active':''}"
						href="/book"
						target="_blank">账本</a> <a
						class="item ${param.headClass == 'app'?'active':''}"
						href="/app" target="_blank">app</a>
				</div>
				<div>
					<p class="login" style="display: none">
						<span class="showRegister">注册</span> / <span class="showLogin">登录</span>
					</p>
					<div class="isLogo">
						<div class="onLine">
							<div class="userMsg">
								<div class="userKen">
									<div class="userKen-Img">
										<img
											src="http://bileimages.oss-cn-hangzhou.aliyuncs.com/images/1527243507745.jpg">
									</div>
									<p>个人中心</p>
								</div>
							</div>
							<div class="userSubMenu">
								<a href="/user">Ken-Coinla</a>
								<a href="/user/action">账号设置</a>
								<a href="/user/msg">消息中心</a>
								<a href="javascript:0;" class="logOut">退出登录</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
<div class="loginShade shadeCom">
	<div class="loginWrap">
		<div class="loginWrap-title">
			<i class="icon-ken_close loginRegClose"></i>
		</div>
		<div class="loginWrap-top">
			<a href="" class="login-logo"><img
				src="./static/images/loginRegister/login_logo.png" alt=""></a>
			<p>
				<strong>登录</strong>
			</p>
		</div>
		<div class="loginWrap-form">
			<div class="form-row">
				<input type="text" placeholder="请输入手机号" id="loginPhone"
					name="loginPhone"> <span class='inpIcon'><i
					class="icon-ken_phone"></i></span> <span class="error"></span>
			</div>
			<div class="form-row">
				<input type="password" placeholder="请输入密码" id="loginPwd"
					name="loginPwd"> <span class='inpIcon'><i
					class="icon-ken_passwd"></i></span> <a class="forgetPwd" href="">忘记密码?</a>
				<span class="error"></span>
			</div>
			<div class="form-btn">
				<button id="loginBtn">登录</button>
			</div>
		</div>
		<div class="loginWrap-bot">
			<p>
				您还没有考拉账号？<a href="">请先注册</a>
			</p>
			<p>
				<a href="">下 载 考 拉 App</a>
			</p>
		</div>
	</div>
</div>
<div class="registerShade shadeCom">
	<div class="loginWrap">
		<div class="loginWrap-title">
			<i class="icon-ken_close loginRegClose"></i>
		</div>
		<div class="loginWrap-top">
			<a href="" class="login-logo"><img
				src="./static/images/loginRegister/login_logo.png" alt=""></a>
			<p>
				<strong>注册</strong>
			</p>
		</div>
		<div class="loginWrap-form">
			<div class="form-row">
				<input type="text" placeholder="请输入用户名" id="regAction"
					name="regAction"> <span class='inpIcon'><i
					class="icon-ken_action"></i></span> <span class="error"></span>
			</div>
			<div class="form-row">
				<input type="password" placeholder="请输入密码" id="regPwd" name="regPwd">
				<span class='inpIcon'><i class="icon-ken_passwd"></i></span> <span
					class="error"></span>
			</div>
			<div class="form-row">
				<input type="text" placeholder="请输入手机号" id="regPhone"
					name="regPhone"> <span class='inpIcon'><i
					class="icon-ken_phone"></i></span> <span class="error"></span>
			</div>
			<div class="form-row captchaInp">
				<input type="text" placeholder="请输入验证密码" id="regCaptcha"
					name="regCaptcha"> <span class='inpIcon'><i
					class="icon-ken_key"></i></span>
				<button class="captcha">发送验证码</button>
				<span class="error"></span>
			</div>
			<div class="form-btn">
				<button id="registerBtn">注册</button>
			</div>
		</div>
		<div class="loginWrap-bot">
			<p>
				已有考拉账号？<a href="">直接登录</a>
			</p>
			<p>
				<a href="">下 载 考 拉 App</a>
			</p>
		</div>
	</div>
</div>
