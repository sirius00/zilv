<template>
	<view class="zhezhao" v-if="ifvoice" @click="hidevoice">
		<view class="add_voice" @click.stop="!hidevoice">
			<view class="">
				<textarea name="" id="" placeholder="添加事项..." class="addtext"></textarea>
			</view>

			<view class="voice">
				<img src="../../static/add_voice_button.png" alt="" v-if="pic == 'record'" @click="startRecord">
				<img src="../../static/img/stop-circle.png" v-if="pic == 'endrecord'" @click="endRecord">
				<img src="../../static/img/play.png" alt="" v-if="pic == 'play'" @click="playVoice">
				<!-- <img src="../../static/img/stop.png" alt="" v-if="pic == 'stop'" @click="endRecord"> -->
			</view>
			<view class="limit">
				<view class="">
					<img src="../../static/img/limit.png" alt="" v-if="!limited" @click="limit">
					<img src="../../static/img/limited.png" alt="" v-else @click="limit">
				</view>
				<view>
					仅自己可见
				</view>
			</view>
			<view class="add_button">
				添加
			</view>
		</view>
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

export default {
	props: {

	},
	data() {
		return {
			pic: 'record',
			limited: false,
			voicePath: ''
		}
	},
	onLoad() {
		let self = this;
		recorderManager.onStop(function (res) {
			console.log('recorder stop' + JSON.stringify(res));
			self.voicePath = res.tempFilePath;
		});
	},
	computed: {
		ifvoice() {
			return this.$store.state.ifvoice
		}
	},
	methods: {
		limit() {
			this.limited = !this.limited
		},
		// 隐藏添加笔记弹窗
		hidevoice() {
			this.$store.commit("addVoice")
		},

		startRecord() {
			console.log('开始录音');
			this.pic = 'endrecord'

			const options = {
				duration: this.duration, // 指定录音的时长，单位 ms
				sampleRate: 16000, // 采样率
				numberOfChannels: 1, // 录音通道数
				encodeBitRate: 96000, // 编码码率
				format: 'mp3', // 音频格式，有效值 aac/mp3
				frameSize: 10, // 指定帧大小，单位 KB

				recorderManager.start(options)
			},
				endRecord() {
					console.log('录音结束');
					this.pic = 'play'
					recorderManager.stop();
				},
					playVoice() {
				console.log('播放录音');

				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			}
		}
	}
</script>

<style scoped>
.zhezhao {
	/* background-color: chartreuse; */
	position: absolute;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	z-index: 5;
}

.add_voice {
	width: 500rpx;
	height: 550rpx;
	background-color: #fff;
	position: relative;
	/* z-index: 10; */
	top: 300rpx;
	left: 125rpx;
	border-radius: 15px;
	box-shadow: 0 0 1px 1px rgb(136, 136, 136, 0.2);
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: space-evenly;
}

.addtext {
	/* background-color: aquamarine; */
	padding: 20rpx;
	height: 200rpx;
	width: 400rpx;
}

.voice img {
	height: 150rpx;
	width: 150rpx;
}

.limit {
	align-self: flex-start;
	margin-left: 50rpx;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;

}

.limit img {
	height: 40rpx;
	width: 40rpx;
	margin-right: 10rpx;
	margin-top: 4rpx;
}

.add_button {
	width: 200rpx;
	height: 80rpx;
	background-color: #46c4ba;
	color: #fff;
	line-height: 80rpx;
	border-radius: 13px;
	text-align: center;
}
</style>
