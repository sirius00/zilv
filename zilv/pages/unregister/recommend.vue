<template>
	<view class="bgboard">
		<view class="week">
			<view v-for="item in weekDay" :key="index">
				{{ item }}
			</view>
		</view>
		<!-- 日历内容 -->
		<calendar :days_list="dayslist" :current="currentIndex_default" @choose_day="today_recommend()"></calendar>
		<view class="home_voice_bar">
			<!-- 推荐声音 -->
			<scroll-view scroll-y="true" class="scroll_view" enable-flex>
				<voice-bar class="bar" v-for="(item, index) in recommendList" :key="index" :single="item" />
			</scroll-view>
			<!-- 底部文字 -->
		</view>
		<view class="text">
			<text>TODO</text>
		</view>
	</view>
</template>

<script>
import {
	mapState
} from 'vuex'
import baseUrl from "@/network/baseUrlsConfigs.js"
const base2 = baseUrl.base2

import topTabbar from "@/components/topTabbar/topTabbar.vue"
import voiceBar from "@/components/voiceBar.vue"
import calendar from "@/components/calendar.vue"

export default {
	components: {
		topTabbar,
		calendar,
		voiceBar,
	},
	data() {
		return {
			weekDay: ['日', "一", "二", "三", "四", "五", "六",],
			tabIndex: "tuijian",
			tabBars: [
				{
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

			dayslist: [],
			currentIndex_default: null,
			recommendList: null,
		}
	},
	computed: {
		...mapState(['days', 'userinfo'])
	},
	mounted() {
		this.get_recommend()
		this.refresh_cal()
	},

	methods: {
		// 当前日期格式化
		format_date() {
			const time = new Date();
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let format_month = ("0" + month).slice(-2);
			let day = time.getDate()

			return `${year}-${format_month}-${day}`;
		},
		// 刷新日历内容
		refresh_cal() {
			uni.$http.post(base2 + '/task/get/self', { uid: this.userinfo.memberId }).then((res) => {
				console.log(res);
				let days = res.data.data.day
				let today = this.format_date()
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
		// 获得当日推荐
		get_recommend(time) {
			uni.$http.post(base2 + '/task/wall/load',).then((res) => {
				const data = res.data.data
				this.recommendList = data
			}).catch((res) => {
				console.log(res);
			})
		},

		//监听点击当日推荐
		today_recommend(item) {
			let today = item.date
			uni.$http.post(base2 + '/task/wall/load', { date: today }).then((res) => {
				const data = res.data.data
				this.recommendList = data
			}).catch((res) => {
				console.log(res);
			})
		}

	}

}
</script>

<style scoped>
.bar {
	width: 10rem;
}

/* 背景板 */
.bgboard {
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

.home_voice_bar {
	margin-top: 0.4rem;
	height: 70%;

}

.scroll_view {
	height: 100%;
	display: flex;
	flex-flow: column;
	/* align-items: center; */

}

.text {
	font-size: 3.5rem;
	font-weight: bolder;
	color: rgb(182, 188, 188);
	text-align: center;
}
</style>
