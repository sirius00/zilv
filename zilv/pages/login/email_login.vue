<template>
	<view class="background">

		<view class="other-login">
			<navigator url="/pages/login/weixin_login">手机号登录</navigator>
		</view>
		<view>
			<h4>邮箱登录</h4>
		</view>
		<view>
			<welcome-logo></welcome-logo>
		</view>
		<input-area>
			<view class="input_code_sp">
				<view class="phone_ip">
					<input type="text" placeholder="输入邮箱" class="code_ip_ip" v-model="email">
				</view>
			</view>
			<view class="catch_code_sp" @click="getCode()" :style="{ 'color': getCodeColor }">
				<text>{{ getCodeText }}</text>
			</view>
		</input-area>
		<input-area>
			<view class="input_code_sp">
				<view class="phone_ip">
					<input type="text" placeholder="输入验证码" class="code_ip_ip" v-model="code">
				</view>
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
			flag: false,
			email: '',
			code: '',
			getCodeText: '获取验证码',
			agree_agreement: false,  // 同意用户协议
			getCodeColor: '',
			getCodeWaiting: ''
		}
	},
	computed: {
		...mapState(['haslogin', 'hasregister'])
	},
	methods: {
		...mapMutations(['xlogin']),
	// 获取验证码
		async getCode() {
			uni.hideKeyboard()
			if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.email))) {
				uni.showToast({
					title: '请填入正确的邮箱地址',
					icon: 'none',
				})
				return false
			}

			//验证码 发送接口调用  
			const time = new Date().getTime()
			let obj = {
				email: this.email,
				timestamp: time
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			const res = await uni.$http.post(base1 + '/v1/login/SendEmailCode?args=' + e + '&er=' + er)
			this.getCodeText = "发送中..."
			this.getCodeColor = "#878B8A"
			this.getCodeWaiting = true
			setTimeout(() => {
				uni.showToast({
					title: '验证码已发送',
					icon: 'none'
				})
				this.setTimer();
			}, 1000)
		},
		setTimer() {
			let holdtime = 60;
			// this.getCodeText = "重新获取验证码(60)"
			this.Timer = setInterval(() => {
				if (holdtime <= 0) {
					this.getCodeWaiting = false;
					this.getCodeColor = '#000'
					this.getCodeText = "获取验证码"
					clearInterval(this.Timer);
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
		// 
		login() {
			uni.hideKeyboard()
			if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.email))) {
				uni.showToast({
					title: '请输入正确邮箱地址',
					icon: 'none'
				});
				return false;
			}
			if (this.code == '') {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				})
				return false
			}
			// 检查是否同意用户协议
			if (this.agree_agreement == false) {
				uni.showToast({
					title: '请同意用户协议',
					icon: 'error'
				})
				return false
			}
			//对比验证码
			const time = new Date().getTime()
			let obj = {
				email: this.email,
				timestamp: time,
				code: this.code,
				languageId: 2
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			uni.$http.post(
				base1 + '/v1/login/EmailLogin?args=' + e + '&er=' + er
			).then((res) => {
				console.log(res);
				let status = res.data.code
				if (status != 200) {
					uni.showToast({
						title: '验证码不正确',
						icon: 'none'
					})
					return false
				}
				let info = res.data.data.user
				// console.log(info);
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


		}
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
