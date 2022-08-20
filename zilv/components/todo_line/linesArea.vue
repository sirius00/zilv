<template>
	<view class="lines">
		<!-- <line v-for="item in taskList.slice(0, 6)"  :down="item.doittime"></line> -->
		<line v-for="(item, index) in taskList" :task_down="item.doittime" v-if="index < 6" :key="index"></line>
	</view>
</template>

<script>
import {
	mapState
} from 'vuex'
import line from "@/components/todo_line/line.vue"
import baseUrl from "@/network/baseUrlsConfigs.js"
const base2 = baseUrl.base2
export default {
	components: {
		line
	},
	props: {
		task: Object,
		date: String
	},
	data() {
		return {
			// date: String,
			taskList: []
		}
	},
	computed: {
		...mapState(['userinfo'])
	},
	mounted() {

		uni.$on('down', () => {
			this.$nextTick(function () {
				this.refs_task_number(this.date)
			})
		})
		uni.$on('add_voice_task', () => {
			this.$nextTick(function () {
				this.refs_task_number(this.date)
			})
		})
		uni.$on('del_task', () => {
			this.$nextTick(function () {
				this.refs_task_number(this.date)
			})
		})
	},
	created() {
		this.get_task_number(this.date)
	},
	methods: {
		refs_task_number(date) {
			uni.$http.post(
				base2 + '/task/get', { uid: this.userinfo.memberId, dates: date }
			).then((res) => {
				this.taskList = res.data.data
			}).catch((err) => {
				console.log(err);
			})
		},
		get_task_number(date) {
			uni.$http.post(
				base2 + '/task/get', { uid: this.userinfo.memberId, dates: date }
			).then((res) => {
				this.taskList = res.data.data
			}).catch((err) => {
				console.log(err);
			})


		}



	}
}
</script>

<style>
.lines {
	height: 55rpx;
	width: 80rpx;
	position: absolute;
	top: 16rpx;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	z-index: -5;
}
</style>
