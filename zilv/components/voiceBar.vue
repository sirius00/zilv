<template>
	<view>
		<view class="voice_bar" :style="'background-color:' + style + '; margin-left:' + margin">
			<view class="voice_toux">
				<img :src="single.avatar" alt="">
			</view>
			<view class="voice_content">
				<img src="/static/img/Voice.png" alt="" v-if="!playVoice">
				<view class="bbox" v-if="playVoice">
					<view class="yinjie one"></view>
					<view class="yinjie two"></view>
					<view class="yinjie three"></view>
					<view class="yinjie four"></view>
					<view class="yinjie five"></view>
					<view class="yinjie six"></view>
					<view class="yinjie seven"></view>
					<view class="yinjie eight"></view>
					<view class="yinjie nine"></view>
					<view class="yinjie ten"></view>
					<view class="yinjie ten"></view>
					<view class="yinjie nine"></view>
					<view class="yinjie eight"></view>
					<view class="yinjie seven"></view>
					<view class="yinjie six"></view>
					<view class="yinjie five"></view>
					<view class="yinjie four"></view>
					<view class="yinjie three"></view>
					<view class="yinjie two"></view>
					<view class="yinjie one"></view>
				</view>
			</view>
			<view class="play_button">
				<img src="/static/img/playCircle.png" alt="" @click="play()" v-if="!playBt">
				<img src="/static/img/zanting.png" alt="" @click="stopPlay()" v-if="playBt">
			</view>
		</view>
	</view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext()
import {
	mapState,
	mapMutations
} from "vuex"
export default {
	components: {
	},
	props: {
		single: Object,
	},
	data() {
		return {
			playVoice: false,   // 是否显示语音播放动画
			playBt: false, //
			path: '',    // 音频地址
		}
	},
	computed: {
		...mapState(['playing']),
		// 随机距离
		margin() {
			let x = Math.floor(Math.random() * 10);
			return x + "rem";
		},
		// 随机颜色
		style() {
			let R = Math.floor(Math.random() * 255);
			let G = Math.floor(Math.random() * 255);
			let B = Math.floor(Math.random() * 255);
			return "rgb(" + R + "," + G + "," + B + ")";
		},
	},
	onReady() {

	},
	methods: {
		...mapMutations(['StartPlay', 'StopPlay']),

		play() {
			if (this.playing == false) {
				// 开始播放
				innerAudioContext.src = this.single.voice_content
				innerAudioContext.play()
				this.StartPlay()
				this.playBt = !this.playBt
				this.playVoice = !this.playVoice
				innerAudioContext.onPlay(() => {

				})
				// 自然播放停止
				innerAudioContext.onEnded(() => {
					this.StopPlay()
					this.playBt = false
					this.playVoice = false
					console.log('自然停止')
				})

			}
			else {
				uni.showToast({
					title: '请停止其他声音',
					icon: 'error',
				})
			}
		},
		stopPlay() {
			// 停止播放
			this.StopPlay()
			innerAudioContext.stop()
			innerAudioContext.onStop(() => {
				this.playBt = false
				this.playVoice = false
			})
		}


	},
}
</script>

<style>
.voice_bar {
	margin-top: 1.5rem;
	/* background-color: #d40079; */
	width: 10rem;
	height: 90rpx;
	border-radius: 20px;
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
	min-width: 9rem;
}

.voice_toux img {
	height: 55rpx;
	width: 55rpx;
	border-radius: 30rpx;
}

.voice_content {
	height: 55rpx;
	line-height: 65rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-basis: calc(100% - 5rem);
}

.voice_content img {
	height: 30rpx;
	width: 35rpx;
	margin-right: 10rpx;
}

.play_button img {
	height: 55rpx;
	width: 55rpx;
}

/*  音阶部分 */
.bbox {
	/* background-color: aquamarine; */
	width: 100%;
	height: 100%;
	display: flex;
	/* flex-flow: row nowrap; */
	align-items: center;
	justify-content: space-evenly;
}

.yinjie {
	width: 5rpx;
	height: 60rpx;
	background-color: #fff;
	border-radius: 10px;
}

@keyframes yy {
	0% {
		transform: scale(1, 1);
		background-color: rgb(255, 255, 255);
	}

	100% {
		transform: scale(1, 0.2);
		background-color: rgb(255, 255, 255);
	}
}

.one {
	animation: yy 0.5s 2s linear infinite alternate;
}

.two {
	animation: yy 0.5s 1.8s linear infinite alternate;
}

.three {
	animation: yy 0.5s 1.6s linear infinite alternate;
}

.four {
	animation: yy 0.5s 1.4s linear infinite alternate;
}

.five {
	animation: yy 0.5s 1.2s linear infinite alternate;
}

.six {
	animation: yy 0.5s 1s linear infinite alternate;
}

.seven {
	animation: yy 0.5 0.8s linear infinite alternate;
}

.eight {
	animation: yy 0.5s 0.6s linear infinite alternate;
}

.nine {
	animation: yy 0.5s 0.4s linear infinite alternate;
}

.ten {
	animation: yy 0.5s 0.2s linear infinite alternate;
}
</style>
