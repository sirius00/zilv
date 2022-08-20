<template>
	<view :class="task_down == 0 ? 'line1' : 'line2'">
	</view>
</template>

<script>
	export default {
		props: {
			task_down: Number
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.line1 {
		height: 5rpx;
		/* width: 80rpx; */
		background-color: rgb(19, 221, 214);
	}
	.line2 {
		height: 5rpx;
		/* width: 80rpx; */
		background-color: rgb(145, 147, 147);
	}

</style>
