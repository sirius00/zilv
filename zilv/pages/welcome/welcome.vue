<template>
	<view class="background">
		<view class="welcome_img">
			<welcome-logo></welcome-logo>
		</view>
		<view class="welcome_title">
			<h2 class="size">自律 = 自由</h2>
		</view>

		<view @click="jump()">
			<button-one>进入自律的世界</button-one>
		</view>
	</view>
</template>

<script>
import {
	mapState,
	mapMutations
} from "vuex"
import welcomeLogo from "../../components/welcome_logo.vue"
import buttonOne from "../../components/buttons/button_one.vue"
export default {
	components: {
		welcomeLogo,
		buttonOne
	},
	computed: {
		...mapState(['userinfo'])
	},
	onLoad() {
		let get = false
		uni.getStorage({
			key: 'userinfo',
			success: (res) => {
				console.log(res);
				this.read_storage(res.data)
				get = true
				if (get) {
					uni.switchTab({
						url: '/pages/home/home'
					})
				}
			},
			fail: (error) => {
				// uni.navigateTo({ url: '/pages/login/phone_login' })
				console.log(error);
			}
		})
	},
	methods: {
		...mapMutations(['read_storage']),
		jump() {
			console.log(this.userinfo);
			let get = false
			uni.getStorage({
				key: 'userinfo',
				success: (res) => {
					console.log(res);
					this.read_storage(res.data)
					get = true
					if (get) {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}
				},
				fail: (error) => {
					uni.navigateTo({ url: '/pages/login/weixin_login' })
					console.log(error);
				}
			})
			
		}
	}
}
</script>

<style scoped>
.background {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.welcome_img {
	width: 14rem;
	margin-left: 6rem;
}

.welcome_title {
	text-align: center;
}

.size {
	font-size: 2.6rem;
	font-weight: 700;
}
</style>
