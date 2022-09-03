<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item, index) in swipeList" :right-options="item.options" :key="item.tId"
				@click="swipeClick($event, index)">
				<view class="content_box">
					<view class="voice_bar" :style="'background-color:' + style() + '; margin-left:' + margin"
						v-if="!word">
						<view class="voice_toux">
							<image src="../static/img/checkbox_unchecked.png" mode="" v-if="!checked" @click="checkBox">
							</image>
							<image src="../static/img/checked.png" mode="" v-if="checked" @click="checkBox"></image>
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
					<view class="word_bar" :style="'background-color:' + style() + '; margin-left:' + margin"
						v-if="word">
						<view class="word_toux">
							<image src="../static/img/checkbox_unchecked.png" mode="" v-if="!checked" @click="checkBox">
							</image>
							<image src="../static/img/checked.png" mode="" v-if="checked" @click="checkBox"></image>
						</view>
						<view class="word_content">
							<text class="word" >{{content}}</text>
						</view>

					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

	</view>
</template>

<script>
	import baseUrl from "@/network/baseUrlsConfigs.js"
	const base2 = baseUrl.base2
	import {
		mapState,
		mapMutations
	} from "vuex"

	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		props: {
			// 用户 task_item
			card: {
				type: Object
			}
		},
		data() {
			return {
				word: false,
				content: this.card.content,
				playVoice: false,
				playBt: false,
				checked: false,
				swipeList: [{
					id: 0,
					options: [{
						text: '删除',
						isImage: true,
						src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAV9JREFUaEPtWe1twkAMtW8B6CbdoHQDNqEjtBOxAmzULpCrQoNUkE7v7tkWTeX8dZ79PnJEwSorv3Tl/CUFPDpBUwK11r3UehCRZxHZEmJOovqhqicCe4HQAhbyR3bwDU71lRXBC5im2bUXFwEiZy1lx/SyCKjMwAbmU0t5Yvq5CdBShnrVaboxYBR/FTs09LdDVgJWfAqwOmjFwwTuBzAHzBPTOiPNM5ACPO2f37iNX7n/m8C9gV6HrhUM27/7PcAO6H2S2P4poNdhdN/DE0AErPWWAW6PkJUgwqcA5FB0PROIdhj1zwSQQ9H1TCDaYdQ/E0AORdczgWiHUf9MADkUXQ9PAH2woDoyIAWwDiHnr3W2v9sXWS/RP/O3ipUwwH9pKV07t5EEPFdKSH/3yqlfwM9G0meph+gPLP26Bcwzl83k27JW3SAeRP0squ8jG8shAQShcEgKCLcYDFh9At8m8aJA2BtS2AAAAABJRU5ErkJggg==',
						style: {
							backgroundColor: 'rgb(255,58,49)',
							imgWidth: '60rpx',
							imgHeight: '60rpx',
						}
					}],
				}, ],

			}
		},
		computed: {
			...mapState(['playing']),
			// 随机距离
			margin() {
				let x = Math.floor(Math.random() * 10);
				return x + "rem";
			},
		},

		mounted() {
			this.ifcheck()
			this.ifword()
			this.style()
		},
		methods: {
			...mapMutations(['StartPlay', 'StopPlay']),
			// 获取颜色
			style() {
				if(this.checked){
					return "rgb(217 219 220)"
				}else{
					let R = Math.floor(Math.random() * 255);
					let G = Math.floor(Math.random() * 255);
					let B = Math.floor(Math.random() * 255);
					return "rgb(" + R + "," + G + "," + B + ")";
				}
			},
			// 是否显示文字
			ifword() {
				if (this.card.content != "") {
					this.word = true
				}
			},
			// 是否完成任务
			ifcheck() {
				if (this.card.doittime != 0) {
					this.checked = true
					this.style()
				}
			},
			play() {
				if (this.playing == false) {
					// 开始播放
					innerAudioContext.src = this.card.voice_content
					innerAudioContext.play()
					this.playBt = !this.playBt
					this.playVoice = !this.playVoice
					this.StartPlay()
					// 自然播放停止
					innerAudioContext.onEnded(() => {
						this.playBt = false
						this.playVoice = false
						this.StopPlay()
					})

				} else {
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
			},
			checkBox() {
				this.checked = !this.checked
				uni.$http.post(
					base2 + '/task/obtain', {
						id: this.card.id
					}
				).then((res) => {
					uni.$emit('down')
				}).catch((err) => {
					console.log(err);
				})
			},
			swipeClick(e, index) {
				let {
					content
				} = e;
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: res => {
							if (res.confirm) {
								this.swipeList.splice(index, 1);
								uni.$http.post(base2 + '/task/del', {
									id: this.card.id
								}).then((res) => {
									if (res.data.code == 0) {
										uni.$emit('del_task')
										uni.showToast({
											title: '删除成功',
											icon: 'success'
										})
									}
								}).catch(err => {
									console.log(err);
								})
							} else if (res.cancel) {}
						}
					});
				}
			},
			// 获取新输入的文本
			onKey_taskcontent(e) {
				this.new_taskcontent = e.target.value
			},
			// 检测文本是否发生变化
			// check_content(item) {
			// 	if (this.new_taskcontent != item.content) {
			// 		this.$store.commit("changeTask", { id: item.id, content: this.new_taskcontent })
			// 		if (this.new_taskcontent == '') {
			// 			this.$store.commit("changeTask", { id: item.id, content: item.content })
			// 		}
			// 	}
			// }
		}
	}
</script>

<style scoped>
	.voice_bar {
		margin-top: 1.5rem;
		width: 10rem;
		height: 90rpx;
		border-radius: 20px;
		padding: 19rpx;
		display: flex;
		justify-content: space-between;
		min-width: 9rem;
	}
	.word_bar{
		margin-top: 1.5rem;
		width: 10rem;
		height: 90rpx;
		border-radius: 20px;
		padding: 19rpx;
		display: flex;
		min-width: 9rem;
	}

	.voice_toux image {
		height: 50rpx;
		width: 50rpx;

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
	.word_toux {
		display: flex;
		align-items: center;
	}
	.word_toux image {
		height: 50rpx;
		width: 50rpx;
	
	}

	.word_content {
		height: 55rpx;
		line-height: 55rpx;
		display: flex;
		align-items: center;
	}
	.word {
		height: 55rpx;
		line-height: 55rpx;
		overflow: hidden;
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
