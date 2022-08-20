<template>
	<view class="background">
		<view class="welcome_img">
			<welcome-logo></welcome-logo>
		</view>
		<view class=" shrink">
			<navigator url="/pages/login/add_profile">
				<button-one>本机号码直接登录</button-one>
			</navigator>
		</view>
		<view class="">
			<agruement></agruement>
		</view>
		<view class="code">
			<h4 class="">
				<navigator url="/pages/login/phone_login" >验证码登录</navigator>
			</h4>
		</view>
	</view>
</template>

<script>
	import welcomeLogo from "../../components/welcome_logo.vue"
	import buttonOne from "../../components/buttons/button_one.vue"
	import agruement from "../../components/agruement.vue"
	export default {
		components: {
			welcomeLogo,
			buttonOne,
			agruement
		},
		data() {
			return {
				flag: false
			}
		},
		methods: {
			agree() {
				this.flag = !this.flag
			}
		}
	}
</script>

<style scoped lang="scss">
	.background {
			height: 100vh;
			display: flex;
			flex-flow: column nowrap; 
			justify-content: space-around;
	}
	.welcome_img {
		width: 14rem;
		margin-left: 6rem;
	}
	.shrink {
		flex-shrink: 0.5;
	}
	.code {
		display: flex;
		flex-flow: row nowrap;
		 justify-content: center;
	}
</style>
