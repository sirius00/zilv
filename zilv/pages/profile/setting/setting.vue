<template>
	<view class="board">
		<view class="cancel" @click="cancel()">
			注销账号
		</view>
		<view class="logout" @click="out()">
			退出登录
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

		}
	},
	computed: {
		...mapState(['userinfo'])
	},
	methods: {
		...mapMutations(['logout' , 'zhuxiao']),
		// 注销账号
		cancel() {
			const time = new Date().getTime()
			let obj = {
				memberId: this.userinfo.memberId,
				timestamp: time,
				type: 2
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			uni.$http.post(
				base1 + '/v1/user/Cancellation?args=' + e + '&er=' + er
			).then( (res) => {
				console.log(res);
				this.zhuxiao()
			}).catch( (err) => {
				console.log(err);
			})
		},
		// 退出登录
		out() {
			this.logout()
		}
	}
}
</script>

<style>
.board {
	height: 100vh;
	width: 100vw;
	background-color: aliceblue;
}

.cancel {
	background-color: #c8c3a5;
	width: 95vw;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 16px;
	text-align: center;
	margin: 3rem auto;
	border-radius: 10px;
}

.logout {
	color: aliceblue;
	background-color: #131310;
	width: 10rem;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	margin: 4rem auto;
	border-radius: 10px;

}
</style>
