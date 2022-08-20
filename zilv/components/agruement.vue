<template>
	<view class="agruement_sp">
		<view class="agree_log" @click="agree">
			<img src="../static/img/check.png" alt="" v-if="!flag">
			<img src="../static/img/check-active.png" alt="" v-if="flag">
		</view>
		<view class="agree_text">
			<view>
				登录即表示您已同意
			</view>
			<view class="xy_link" @click="agreement()">
				<text>
					&laquo;用户协议&raquo;
				</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "agruement",
	data() {
		return {
			flag: false,
			show: false
		}
	},
	methods: {
		agree() {
			this.flag = !this.flag
			this.$emit('ifagree', this.flag)
		},
		agreement() {
			console.log('点击');
			uni.navigateTo({
				url: '/pages/agreemnt_content/agreemnt_content'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.agruement_sp {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	width: 20rem;
}
.agree_text {
	display: flex;
}
.xy_link {
	color: forestgreen;
}
.agree_log img {
	width: 70rpx;
	height: 70rpx;
}
</style>
