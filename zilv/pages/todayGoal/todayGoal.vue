<template>
	<view>
		<view class="container">
			<view class="title">
				<text>Today' goal</text>
			</view>

			<view class="box">
				<view class="mind_area">
					<view class="mind" v-show="show">
						<view class="bbox">
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
				</view>
				<view class="bg_wave">
					<view class="bg">
						<view class="icon">
							<img src="../../static/img/Identify.png" @longpress="startRecord" @touchend="endRecord">
						</view>
						<view class="bg w1"></view>
						<view class="bg w2"></view>
						<view class="bg w3"></view>
						<view class="bg w4"></view>
						<view class="bg w5"></view>
						<view class="bg w6"></view>
					</view>
				</view>
				<view class="prompt" v-if="prompt">
					<view class="play" @click="playVoice()">
						播放
					</view>
					<view class="delete" @click="delVoice()">
						删除
					</view>
					<view class="upload" @click="addVoice_task()">
						添加
					</view>
				</view>
				<view class="logo">
					<img src="../../static/img/welcome.png" alt="">
				</view>
			</view>

		</view>
		<mid-box :current-page="0"></mid-box>
	</view>
</template>

<script>
import midBox from "../../components/midBox/midBox.vue"
import {
	mapState,
	mapMutations
} from "vuex"
import baseUrl from "@/network/baseUrlsConfigs.js"
const base2 = baseUrl.base2

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
export default {
	components: {
		midBox
	},
	data() {
		return {
			voicePath: '',
			show: false,
			prompt: false,
			// show: true
		}
	},
	computed: {
		...mapState(['userinfo'])
	},
	created() {

	},
	methods: {
		// 长按开始录音
		startRecord() {
			recorderManager.onStop((res) => {
				this.voicePath = res.tempFilePath;
			})
			const options = {
				duration: this.duration, // 指定录音的时长，单位 ms
				sampleRate: 16000, // 采样率
				numberOfChannels: 1, // 录音通道数
				encodeBitRate: 96000, // 编码码率
				format: 'mp3', // 音频格式，有效值 aac/mp3
				frameSize: 10, // 指定帧大小，单位 KB
			}
			recorderManager.start(options);
			this.show = true
		},
		// 长按结束录音事件
		endRecord() {
			this.pic = 'play'
			recorderManager.onStop((res) => {
				this.voicePath = res.tempFilePath;
			});
			recorderManager.stop();
			this.show = false
			this.prompt = true
			console.log(this.voicePath);
		},
		playVoice() {
			innerAudioContext.src = this.voicePath;
			innerAudioContext.play();

			this.show = true
			this.pic = 'pause'
			//自然播放结束
			innerAudioContext.onEnded(() => {
				this.show = false;
				innerAudioContext.stop();
			})
		},
		//删除录音
		delVoice() {

			this.voicePath = ''
			this.prompt = false
			this.show = false
			innerAudioContext.stop()
			uni.showToast({
				title: '删除成功',
				icon: 'success'
			})
		},
		//添加语音任务
		addVoice_task() {
			uni.uploadFile({
				url: base2 + '/task/add/mp3',
				// fileType: 'file',
				filePath: this.voicePath,
				name: 'file',
				formData: {
					uid: this.userinfo.memberId,
					content: ''
				},
				header: {
					'content-type': 'multipart/form-data'
				},
				success: (res) => {

					this.voicePath = ''
					this.prompt = false
					uni.$emit('tg_add_voice_task')
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					})
				},
				fail: (error) => { console.log(error); }
			})
		}
	}
} 
</script>

<style scoped>
.container {
	/* background-color: #fff03b; */
	height: 100vh;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
}

.title {
	height: 3rem;
	line-height: 3rem;
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1rem;
}

.box {
	background-color: #F46F9A;
	width: 80vw;
	height: 60vh;
	border-radius: 10px;
}

.bg_wave {
	width: 70vw;
	height: 40vh;
	margin: 10vh auto;
}

.bg {
	position: absolute;
	width: 70vw;
	height: 40vh;
}

.icon {
	position: absolute;
	top: 17vh;
	left: 29vw;
	z-index: 1;
}

.icon img {
	width: 12vw;
	height: 6vh;
}

@keyframes waves {
	0% {
		transform: scale(0, 0);
		opacity: 1;
		background-color: #46c4ba;
		border-radius: 50%;
	}

	100% {
		opacity: 0;
		transform: scale(1, 1);
		background-color: #46c4ba;
		border-radius: 50%;
	}
}

.w1 {
	animation: waves 3s 0.5s linear infinite;
}

.w2 {
	animation: waves 3s 1s linear infinite;
}

.w3 {
	animation: waves 3s 1.5s linear infinite;
}

.w4 {
	animation: waves 3s 2s linear infinite;
}

.w5 {
	animation: waves 3s 2.5s linear infinite;
}

.w6 {
	animation: waves 3s 3s linear infinite;
}

.mind_area {
	position: fixed;
	margin-top: 10vh;
	margin-left: 21vw;
}

/* 提示信息 */
.mind {
	height: 60rpx;
	width: 280rpx;
	border-radius: 15px;
}

.prompt {
	position: fixed;
	top: 50vh;
	left: 30vw;
	background-color: #eae4e4;
	border-radius: 5px;
	height: 60rpx;
	width: 300rpx;
	display: flex;
	justify-content: space-evenly;
}

.play {
	color: black;
	text-align: center;
	height: 2rem;
	line-height: 2rem;
	width: 33%;
}

.delete {
	color: red;
	text-align: center;
	height: 2rem;
	line-height: 2rem;
	width: 33%;
}

.upload {
	color: #46c4ba;
	text-align: center;
	height: 2rem;
	line-height: 2rem;
	width: 33%;
}

.wave {
	height: 400rpx;
	width: 400rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 150rpx;
}

/* 声音波纹动画 */


/* .box .wave img {
	height: 150rpx;
	width: 150rpx;
	margin-left: 30rpx;
	z-index: 2;
} */

.box .logo {
	position: fixed;
	top: 55vh;
}

.box .logo img {
	height: 200rpx;
	width: 200rpx;
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
