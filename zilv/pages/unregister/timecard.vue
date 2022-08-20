<template>
	<view class="board">

		<view class="week">
			<view v-for="item in weekDay" :key="index">
				{{ item }}
			</view>
		</view>
		<!-- 日历组件 -->
		<calendar :days_list="dayslist" :current="currentIndex_default" @choose_day="today_task()"></calendar>

		<view class="todo_board">
			<!-- 任务列表 -->
			<scroll-view scroll-y class="scroll_view" enable-flex>
				<todo-card v-for="(item, index) in taskList" :card="item" :key="index" />
			</scroll-view>
			<!-- 添加文字笔记弹窗 -->
			<addnote @addtask="upDateTaskList()"></addnote>
			<!-- 添加语音笔记弹窗 -->
			<view class="zhezhao" v-if="ifvoice" @click="addVoice">
				<view class="add_voice" @click.stop="!addVoice">
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

					<view class="voice">

						<img src="../../static/img/record_button.png" v-if="pic == 'record'" @longpress="startRecord"
							@touchend="endRecord">
						<img src="../../static/img/play_button.png" v-if="pic == 'play'" @click="playVoice" @longpress="delVoice">
						<img src="../../static/img/pause.png" v-if="pic == 'pause'">
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
					<view class="add_button" @click="addVoice_task">
						添加
					</view>
				</view>
			</view>

		</view>
		<!-- 按钮 -->
		<view class="add_note">
			<view @click="hidennote()">
				<add-note></add-note>
			</view>
			<view @click="hidenvoice()">
				<add-voice></add-voice>
			</view>
		</view>

	</view>
</template>

<script>
// 格式化日期
function format_date() {
	const time = new Date();
	let year = time.getFullYear()
	let month = time.getMonth() + 1
	let format_month = ("0" + month).slice(-2);
	let day = time.getDate()
	return `${year}-${format_month}-${day}`;
}
import baseUrl from "@/network/baseUrlsConfigs.js"
const base2 = baseUrl.base2
import {
	mapState,
	mapMutations
} from "vuex"

import topTabbar from "@/components/topTabbar/topTabbar.vue"
import voiceBar from "@/components/voiceBar.vue"
import calendar from "@/components/calendar.vue"
import todoCard from "@/components/todo_card.vue"
import addNote from "@/components/buttons/addNote.vue"
import addVoice from "@/components/buttons/addVoice.vue"
import addnote from "@/components/add/addnote.vue"
import AddNote from "../../components/buttons/addNote.vue"

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

export default {
	components: {
		topTabbar,
		calendar,
		voiceBar,
		todoCard,
		addNote,
		addVoice,
		addnote,
		AddNote
	},
	data() {
		return {
			weekDay: ['日', "一", "二", "三", "四", "五", "六"],
			tabIndex: "timecard",
			tabBars: [{
				name: "推荐",
				id: "tuijian",
				path: './recommend'
			},
			{
				name: "我的时间卡",
				id: "timecard",
				path: "./timecard"
			}
			],
			dayslist: [],            // 日历
			currentIndex_default: null,   // 默认显示当前日期星期index
			// default_index: 0,
			text_value: '',          //文本内容
			taskList: [],             //任务列表

			pic: 'record',      //录音相关图标转换
			limited: false,     //任务查看权限
			voicePath: '',     // 音频路径
			show: false,

		}
	},

	computed: {
		...mapState(['addnote', 'addvoice', 'ifvoice', 'userinfo', 'tishi']),
	},

	mounted() {
		this.get_taskList()
		this.refresh_cal()
	},
	methods: {
		...mapMutations(['addNote', 'addVoice', 'hidentishi']),
		hidennote() {
			this.addNote()
		},
		hidenvoice() {
			this.voicePath = ''
			this.pic = 'record'
			this.addVoice()
			if (this.tishi == 0) {
				uni.showToast({
					title: '长按录音,长按删除',
					icon: 'none'
				})
				this.hidentishi()
			}
		},
		upDateTaskList() {
			this.get_taskList()
			this.refresh_cal()
			uni.$emit('add_voice_task')
			console.log('成功刷新');
		},
		// 刷新日历内容
		refresh_cal() {
			uni.$http.post(base2 + '/task/get/self', { uid: this.userinfo.memberId }).then((res) => {
				let new_res = res.data.data
				let days = new_res.day
				let today = format_date()
				let index = 0
				for (let item of days) {
					if (item.date == today) {
						this.currentIndex_default = Math.floor(index / 7)
						break
					}
					index++
				}
				let num = 7
				let cut = null
				if (days.length == 35) {
					cut = 5
				} else {
					cut = 6
				}

				for (let i = 0; i < cut; i++) {
					this.dayslist.push(days.splice(0, num))
				}
			}).catch((res) => {
				console.log(res);
			})
		},
		// 获取当日任务列表
		get_taskList() {
			uni.$http.post(base2 + '/task/get', { uid: this.userinfo.memberId }).then((res) => {
				this.taskList = res.data.data
			}).catch((res) => {
				console.log(res);
			})
		},
		//监听点击当日任务
		today_task(item) {
			this.taskList = []
			let date = item.date
			uni.$http.post(base2 + '/task/get', { uid: this.userinfo.memberId, dates: date }).then((res) => {
				this.taskList = res.data.data
				if (res.data.data.code == 1) {
					uni.showToast({
						title: '请求过于频繁',
						icon: 'loading',
					})
				}
			}).catch((res) => {
				console.log(res);
			})
		},
		// 更改权限
		limit() {
			this.limited = !this.limited
		},
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
			console.log(this.voicePath);
		},
		playVoice() {

			innerAudioContext.src = this.voicePath;
			innerAudioContext.play();

			this.show = true
			this.pic = 'pause'
			//自然播放结束
			innerAudioContext.onEnded(() => {
				this.pic = 'play'
				this.show = false;
				innerAudioContext.stop();
			})
		},
		//删除录音
		delVoice() {
			this.voicePath = ''
			this.pic = 'record';
			this.show = false
			innerAudioContext.stop()

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
					this.get_taskList()
					this.addVoice()
					this.voicePath = ''
					this.pic = 'record'
					uni.$emit('add_voice_task')
				},
				fail: (error) => { console.log(error); }
			})

		}
	},
}
</script>

<style scoped>
.board {
	height: 80vh;
}

/* 周日期 */
.week {
	height: 2rem;
	line-height: 2rem;
	width: 100%;

	display: flex;
	justify-content: space-around;
	color: rgb(185, 186, 187);
}

.todo_board {
	margin-top: 0.4rem;
	height: 70%;

}

.scroll_view {
	height: 100%;
	/* display: flex; */
	/* flex-flow: column nowrap;
	align-items: center; */

}

.add_note {
	height: 3rem;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;

}



/* 添加声音 */
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
	/* top: 350rpx; */
	top: 30vh;
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

.mind_area {
	height: 50rpx;
	width: 280rpx;
}

/* 提示信息 */
.mind {
	height: 50rpx;
	width: 280rpx;
	background-color: #46c4ba;
	border-radius: 15px;
}

.voice {
	margin-top: 0rpx;
}

.voice img {
	height: 100rpx;
	width: 110rpx;

}

.change_img {
	height: 100rpx;
	width: 100rpx;
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
