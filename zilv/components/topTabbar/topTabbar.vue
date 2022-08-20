<template>
	<!-- 顶部选项卡 -->
	<view class="topbar">
		<view class="tab_item" v-for="(tab,index) in tabBars" :key="tab.id">
			<text class="tab_item_title" :class="{tabActive: tabIndex==tab.id}" @click="tarTap(tab)">
				{{tab.name}}
			</text>
		</view>

	</view>
</template>

<script>
	export default {
		name: "index-tabbar",
		props: {
			tabBars: Array,
			tabIndex: String,
		},
		data() {
			return {}
		},
		methods: {
			tarTap(tab) {
				let url = tab.path
				uni.redirectTo({
					url: url,
				})
			},
		}
	}
</script>

<style scoped>
	.topbar {
		height: 90rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
	}

	.tab_item {
		line-height: 90rpx;
		width: 100%;
		white-space: nowrap;
		/* border-bottom: 1.5px solid #eee; */
		text-align: center;
	}

	.tab_item_title {
		color: #676a6c;
	}

	.tabActive {
		color: #1abdaa;
		border-bottom: 2px solid #1abdaa;
		font-size: 35rpx;
		padding: 5rpx;
	}
</style>
