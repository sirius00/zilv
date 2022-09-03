<template>
	<view class="container">
		<view class="board">
			<view class="board_border">
				<view class="category_title">
					<uni-segmented-control :current="current" :values="items.map((item) => { return item.title })"
						@clickItem="onClickItem()" styleType="text" activeColor="#0AC6B9">
					</uni-segmented-control>
				</view>
				<view class="category_content">
					<view v-if="current === 0">
						<recommend></recommend>
					</view>
					<view v-if="current === 1">
						<time-card></time-card>
					</view>
				</view>
			</view>
		</view>
		<mid-box :current-page="1"></mid-box>
		<view class="" >
			<view class="board-img" :animation="animationData1" v-show="pic1">
				<img src="../../static/img/BP_8.png" alt="">
			</view>
			<view class="board-img" :animation="animationData2" v-show="pic2">
				<img src="../../static/img/BP_0.png" alt="">
			</view>
			<view class="board-img" :animation="animationData3" v-show="pic3">
				<img src="../../static/img/BP_1.png" alt="">
			</view>
			<view class="board-img" :animation="animationData4" v-show="pic4">
				<img src="../../static/img/BP_2.png" alt="">
			</view>
			<view class="board-img" :animation="animationData5" v-show="pic5">
				<img src="../../static/img/BP_13.png" alt="">
			</view>
			<view class="board-img" :animation="animationData6" v-show="pic6">
				<img src="../../static/img/BP_14.png" alt="">
			</view>
			<view class="board-img" :animation="animationData7" v-show="pic7">
				<img src="../../static/img/BP_20.png" alt="">
			</view>
			<view class="board-img" :animation="animationData8" v-show="pic8">
				<img src="../../static/img/BP_27.png" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	// 引入分段器
	import {
		uniSegmentedControl
	} from '@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue'
	import {
		mapState,
		mapMutations
	} from "vuex"

	import baseUrl from "@/network/baseUrlsConfigs.js"
	const base2 = baseUrl.base2

	import recommend from "../unregister/recommend.vue"
	import timeCard from "../unregister/timecard.vue"
	import midBox from "../../components/midBox/midBox.vue"
	export default {
		components: {
			uniSegmentedControl,
			recommend,
			timeCard,
			midBox
		},

		data() {
			return {
				show: true,
				items: [{
						title: '推荐'
					},
					{
						title: '我的时间卡'
					}
				],
				current: 1,
				pic1: true,
				pic2: true,
				pic3: true,
				pic4: true,
				pic5: true,
				pic6: true,
				pic7: true,
				pic8: true,

				animationData1: {},
				animationData2: {},
				animationData3: {},
				animationData4: {},
				animationData5: {},
				animationData6: {},
				animationData7: {},
				animationData8: {},
			}
		},
		computed: {

		},
		onLoad: function(options) {
			this.current = options.current
			this.start()
		},
		methods: {
			...mapMutations(['get_days']),
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			start() {
				this.Lstart1()
				this.Lstart2()
				this.Lstart3()
				this.Lstart4()
				this.Lstart5()
				this.Lstart6()
				this.Lstart7()
				this.Lstart8()
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
				setTimeout(() => {
					this.pic1 = false
				}, 2150)
			},
			Lstart2() {
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease-in',
					delay: 0,
				})
				this.animation = animation
				animation.translateY(-500).translateX(-55).rotate(-20).step({
					delay: 500
				})
				animation.translateY(0).translateX(-150).step()
				this.animationData2 = this.animation.export()
				setTimeout(() => {
					this.pic2 = false
				}, 2650)
			},
			Lstart3() {
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease-in',
					delay: 0,
				})
				this.animation = animation
				animation.translateY(-350).translateX(-70).rotate(-20).step({
					delay: 700
				})
				animation.translateY(0).translateX(-200).step()
				this.animationData3 = this.animation.export()
				setTimeout(() => {
					this.pic3 = false
				}, 2850)
			},
			Lstart4() {
				var animation = uni.createAnimation({
					duration: 600,
					timingFunction: 'ease-in',
					delay: 0,
				})
				this.animation = animation
				animation.translateY(-200).translateX(-55).rotate(-20).step({
					delay: 500
				})
				animation.translateY(0).translateX(-100).step()
				this.animationData4 = this.animation.export()
				setTimeout(() => {
					this.pic4 = false
				}, 2750)
			},
			Lstart5() {
				var animation = uni.createAnimation({
					duration: 1000, //持续时长
					timingFunction: 'ease-in', // 动画效果
					delay: 0, // 动画延迟时长
				})
				// 存在return字段中
				this.animation = animation
				animation.translateY(-400).translateX(50).rotate(20).step()
				animation.translateY(0).translateX(150).step()
			
				this.animationData5 = this.animation.export()
				setTimeout(() => {
					this.pic5 = false
				}, 2150)
			},
			Lstart6() {
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease-in',
					delay: 0,
				})
				this.animation = animation
				animation.translateY(-410).translateX(55).rotate(-20).step({
					delay: 500
				})
				animation.translateY(0).translateX(150).step()
				this.animationData6 = this.animation.export()
				setTimeout(() => {
					this.pic6 = false
				}, 2650)
			},
			Lstart7() {
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease-in',
					delay: 0,
				})
				this.animation = animation
				animation.translateY(-380).translateX(70).rotate(-20).step({
					delay: 700
				})
				animation.translateY(0).translateX(200).step()
				this.animationData7 = this.animation.export()
				setTimeout(() => {
					this.pic7 = false
				}, 2850)
			},
			Lstart8() {
				var animation = uni.createAnimation({
					duration: 600,
					timingFunction: 'ease-in',
					delay: 0,
				})
				this.animation = animation
				animation.translateY(-410).translateX(55).rotate(-20).step({
					delay: 500
				})
				animation.translateY(0).translateX(150).step()
				this.animationData8 = this.animation.export()
				setTimeout(() => {
					this.pic8 = false
				}, 2750)
			}
			
		},
	}
</script>

<style scoped lang="scss">
	.container {
		background-color: #fff;
		height: 100vh;
	}

	/* 背景板 */
	.board {
		background-color: #fff;
		height: 89vh;
		width: 96vw;
		border: 6px solid rgb(10, 198, 185);
		border-radius: 35px;
		margin: 0 auto;
	}

	.board_border {
		height: 78vh;
		width: 85vw;
		border-radius: 35px;
		margin: 0.1rem auto;
	}

	.board-img {
		position: absolute;
		bottom: 0%;
		left: 40vw;

		img {
			height: 200rpx;
			width: 200rpx;
		}
	}
</style>
