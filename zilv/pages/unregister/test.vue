<template>
	<view class="">
		<button @click="start()">开始</button>
		<view class="board" :animation="animationData1">
			<img src="../../static/img/BP_8.png" alt="">
		</view>
		<view class="board" :animation="animationData2">
			<img src="../../static/img/BP_0.png" alt="">
		</view>
		<view class="board" :animation="animationData3">
			<img src="../../static/img/BP_1.png" alt="">
		</view>
		<view class="board" :animation="animationData4">
			<img src="../../static/img/BP_2.png" alt="">
		</view>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				animationData1: {},
				animationData2: {},
				animationData3: {},
				animationData4: {},
			}
		},

		methods: {
			start () {
				this.Lstart1()
				this.Lstart2()
				this.Lstart3()
				this.Lstart4()
			},
			Lstart1() {
				var animation = uni.createAnimation({
					duration: 1000, //持续时长
					timingFunction: 'ease-in', // 动画效果
					delay: 0, // 动画延迟时长
				})
				// 存在return字段中
				this.animation = animation
				animation.translateY(-400).translateX(-50).rotate(20).step()
				animation.translateY(0).translateX(-150).step()

				this.animationData1 = this.animation.export()
			},
			Lstart2() {
				var animation = uni.createAnimation({
					duration: 1000, 
					timingFunction: 'ease-in', 
					delay: 0, 
				})
				this.animation = animation
				animation.translateY(-410).translateX(-55).rotate(-20).step({
					delay:500
				})
				animation.translateY(0).translateX(-150).step()
				this.animationData2 = this.animation.export()
			},
			Lstart3() {
				var animation = uni.createAnimation({
					duration: 1000, 
					timingFunction: 'ease-in', 
					delay: 0, 
				})
				this.animation = animation
				animation.translateY(-380).translateX(-70).rotate(-20).step({
					delay:700
				})
				animation.translateY(0).translateX(-200).step()
				this.animationData3 = this.animation.export()
			},
			Lstart4() {
				var animation = uni.createAnimation({
					duration: 600, 
					timingFunction: 'ease-in', 
					delay: 0, 
				})
				this.animation = animation
				animation.translateY(-410).translateX(-55).rotate(-20).step({
					delay:500
				})
				animation.translateY(0).translateX(-150).step()
				this.animationData4 = this.animation.export()
			}
		}
	}
</script>

<style lang="scss">
	.board {
		position: absolute;
		bottom: 0%;
		left: 40vw;

		img {
			height: 200rpx;
			width: 200rpx;
		}
	}
</style>
