<template>
	<view>
		<view>
			<view>
				<view class="other-login">
					<navigator url="/pages/login/email_login">邮箱登录</navigator>
				</view>
				<view class='header'>
					<image src='../../static/img/weixin.png'></image>
				</view>
				<view class='content' v-if="show == 'authorized'">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<!-- withCredentials=true  获取到除用户基本信息之外的encryptedData以及iv等数据 -->
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
					@click="GetUserInfo()" v-if="show == 'authorized'">
					授权微信登录
				</button>
				<button class='bottom' type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
					v-if="show == 'phone'">
					授权手机
				</button>
			</view>
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
export default {
	data() {
		return {
			show: 'authorized',
			encryptedData1: '',
			encryptedData2: '',
			iv1: '',
			iv2: '',
			code: '',
			userName: '',
			sex: '',
			img: ''
		}
	},
	onLoad(options) {
	},
	methods: {
		...mapMutations(['xlogin']),
		GetUserInfo() {
			uni.getUserProfile({
				desc: '用于获取您的个人信息',
				lang: 'zh_CN',
				success: (res) => {
					console.log(res);
					uni.showToast({
						title: '授权成功',
						icon: 'success',
						mask: true
					})
					this.encryptedData1 = res.encryptedData
					this.iv1 = res.iv
					let userinfo = res.userInfo
					this.userName = userinfo.nickName
					this.sex = userinfo.gender
					this.img = userinfo.avatarUrl
					uni.login({
						success: (res) => {
							this.code = res.code
						}
					})
					this.show = 'phone'
				},
				fail: (error) => {
					uni.showToast({
						title: '取消授权',
						icon: 'error'
					})
					console.log(error);
				}
			})
		},
		getPhoneNumber(ev) {
			if (ev.detail.errMsg == "getPhoneNumber:ok") {
				this.encryptedData2 = ev.detail.encryptedData
				this.iv2 = ev.detail.iv
			}
			setTimeout(function (){
				uni.showToast({
					title: '获取手机',
					icon: "success"
				})
			}, 1000)

			//登录
			const time = new Date().getTime()
			let obj = {
				encryptedData1: this.encryptedData1,
				encryptedData2: this.encryptedData2,
				iv1: this.iv1,
				iv2: this.iv2,
				code: this.code,
				userName: this.userName,
				sex: this.sex,
				img: this.img,
				timestamp: time,
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			uni.$http.post(
				base1 + '/v1/login/SmallProgramLogin?args=' + e + '&er=' + er
			).then((res) => {
				console.log(res.data.data.user);
				let info = res.data.data.user
				this.xlogin(info)
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}).catch(err => {
				console.log(err);
			})
		}
	}
}
</script>

<style scoped>
.other-login {
	text-align: end;
	margin-right: 50rpx;
	color: #908e8e;
	margin-top: 30rpx;
}

.header {
	margin: 90rpx 0 90rpx 50rpx;
	border-bottom: 1px solid #ccc;
	text-align: center;
	width: 650rpx;
	height: 300rpx;
	line-height: 450rpx;
}

.header image {
	width: 200rpx;
	height: 200rpx;
}

.content {
	margin-left: 50rpx;
	margin-bottom: 90rpx;
}

.content text {
	display: block;
	color: #9d9d9d;
	margin-top: 40rpx;
}

.bottom {
	border-radius: 80rpx;
	margin: 70rpx 50rpx;
	font-size: 35rpx;
}
</style>
