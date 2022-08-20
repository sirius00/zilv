<template>
	<view class="background">
		<view class="other-login">
			<navigator url="/pages/login/weixin_login">微信一键登录</navigator>
		</view>
		<view>
			<h4>手机号登录</h4>
		</view>
		<view>
			<welcome-logo></welcome-logo>
		</view>
		<input-area>
			<view class="conutry">
				<view class="country_ch">
					CN
				</view>
				<view class="country_ch ">
					+86
				</view>
			</view>
			<view class="phone_nmber">
				<input type="text" placeholder="请输入手机号码" class="phone_input" v-model="phoneNumber">
			</view>
		</input-area>
		<input-area>
			<view class="input_code_sp">
				<view class="phone_number">
					<input type="text" placeholder="输入验证码" class="code_ip_ip" v-model="code">
				</view>
			</view>
			<view class="catch_code_sp" @click="getCode()" :style="{ 'color': getCodeColor }">
				<text>{{ getCodeText }}</text>
			</view>
		</input-area>
		<agruement @ifagree="ifAgree()"></agruement>
		<view @click="login()">
			<button-two>登录</button-two>
		</view>
	</view>
</template>

<script>
import {
	mapState,
	mapMutations
} from "vuex"
import baseUrl from "@/network/baseUrlsConfigs.js"
const base1 = baseUrl.base1

import welcomeLogo from "../../components/welcome_logo.vue"
import inputArea from "@/components/inputArea.vue"
import agruement from "@/components/agruement.vue"
import buttonTwo from "@/components/buttons/buttonTwo.vue"


export default {
	components: {
		welcomeLogo,
		inputArea,
		agruement,
		buttonTwo
	},
	data() {
		return {
			phoneNumber: '', //手机号
			code: '',    // 验证码
			agree_agreement: false,  // 同意用户协议
			getCodeText: '获取验证码',
			getCodeColor: '',
			getCodeWaiting: '',
			// 开发者相关账号
			AppId: 'wxe41b084c16a5ec45',
			AppSecret: '4fcd64264cda129d0078ed825a5f42b8'
		}
	},
	computed: {
		...mapState(['haslogin', 'hasregister'])
	},

	methods: {
		...mapMutations(['xlogin']),
		// 获取验证码
		async getCode() {
			uni.hideKeyboard()  //隐藏软键盘
			if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))) {  //验证手机号
				uni.showToast({
					title: '请填入正确的手机号码',
					icon: "none"
				})
				return false
			}

			// 验证码发送接口调用
			const time = new Date().getTime()
			let obj = {
				tel: this.phoneNumber,
				timestamp: time
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			const res = await uni.$http.post(base1 + '/v1/login/SendCode?args=' + e + '&er=' + er)
			this.getCodeText = '发送中....'
			this.getCodeWaiting = true;
			this.getCodeColor = "#878B8A";  //追加样式
			setTimeout(() => {
				uni.showToast({
					title: '验证码已发送',
					icon: 'none'
				})

				this.setTimer(); // 调用定时器方法
			}, 1000)
		},
		// setTimer: 需要定时执行一件事情的时候就要使用setTimer函数
		setTimer() {
			let holdtime = 60;  // 定义变量并赋值
			this.getCodeText = '重新获取(60)'
			// setInterval() 是一个实现定时调用的函数,可按照指定的周期( ms )来调用函数或计算表达式
			// setInterval() 方法会不停的调用函数, 直到clearInterval 被调用或窗口被关闭
			this.Timer = setInterval(() => {
				if (holdtime <= 0) {
					this.getCodeWaiting = false;
					this.getCodeColor = '#000'
					this.getCodeText = "获取验证码"
					clearInterval(this.Timer); // 清除该函数
					return;
				}
				this.getCodeText = "重新获取(" + holdtime + ")"
				holdtime--;
			}, 1000)
		},
		// 同意用户协议
		ifAgree(flag) {
			this.agree_agreement = flag
		},
		// 用户登录
		login() {
			uni.hideKeyboard()
			if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))) {  // 验证手机号码 
				uni.showToast({
					title: "请输入正确手机号",
					icon: 'none'
				});
				return false;
			}
			// 检查是否输入验证码
			if (this.code == '') {
				uni.showToast({
					title: '请输入验证码',
					icon: "none"
				})
			}
			// 检查是否同意用户协议
			if (this.agree_agreement == false) {
				uni.showToast({
					title: '请同意用户协议',
					icon: 'error'
				})
				return false
			}
			// 对比验证码
			const time = new Date().getTime()
			let obj = {
				tel: this.phoneNumber,
				timestamp: time,
				code: this.code,
				languageId: 2
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			uni.$http.post(
				base1 + '/v1/login/Login?args=' + e + '&er=' + er
			).then((res) => {

				let status = res.data.code
				if (status != 200) {
					uni.showToast({
						title: '验证码不正确',
						icon: 'none'
					})
					return false
				}

				let info = res.data.data.user

				this.xlogin(info)
				if (this.hasregister == false) {
					uni.redirectTo({
						url: '/pages/login/add_profile'
					})
				} else {
					uni.reLaunch({
						url: '/pages/home/home'
					})
				}

			}).catch(err => {
				console.log(err);

			})


		},

	}
}
</script>

<style scoped>
.background {
	height: 100vh;
	display: flex;
	flex-flow: column;
	justify-content: space-around;
	align-items: center;
}

/* 其他登录方式 */
.other-login {
	/* text-align: center; */
	font-size: 12px;
	align-self: flex-end;
	margin-right: 1.5rem;
}

/* 国家 */
.conutry {
	display: flex;
	justify-content: space-evenly;
	flex: 1;
}

.country_ch {
	text-align: center;
	color: #afb3b3;
}

.phone_number {
	flex-basis: 14rem;
}

.phone_input {
	height: 3rem;
	line-height: 3rem;
}

/* 输入验证码 */
.input_code_sp {
	flex-basis: 15rem;

}

.code_ip_ip {
	height: 3rem;
	line-height: 3rem;
	padding-left: 2rem;
}

/* 获取验证码 */
</style>
