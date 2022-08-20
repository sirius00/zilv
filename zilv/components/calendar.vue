<template>
	<view class="date_day">
		<swiper class="swiper_st" :current="current" @change="change_current()">
			<swiper-item class="swiper_item" v-for="(list,ind) in days_list"  :key="ind">

				<view class="day_st" 
					v-for="(item, index) in list" :key="index"
					:class="currentday == index ? 'select_day' : ''" 
					@click="day_select(item,index)" >
					{{ item.day }}
					<line-area :task="item" :date="item.date" ></line-area>	
				</view>
				
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
// 当前日期格式化
function format_date() {
	const time = new Date();
	let year = time.getFullYear()
	let month = time.getMonth() + 1
	let format_month = ("0" + month).slice(-2);
	let day = time.getDate()

	return `${year}-${format_month}-${day}`;
}

import {
	mapState
} from "vuex"
import lineArea from "@/components/todo_line/linesArea.vue"


export default {

	components: {
		lineArea,
	},
	props: {
		days_list: Array,
		current: Number
	},
	data() {
		return {
			// daysList: [],
			currentlist: null,
			currentday: null,
		}
	},
	computed: {
		// ...mapState(['daysList'])
	},


		mounted() {
		this.get_weekday()
		// this.$refs.linearea.get_task_number(this.$refs.linearea.date)
	},
	methods: {

		change_current(e) {
			this.currentday = null
		},
		day_select(item,index) {
			this.currentday = index
			// debugger
			this.$emit('choose_day', item)
		},
		get_weekday() {
			const time = format_date()
			let weekday = new Date(time).getDay()
			this.currentday = weekday
		},

	},
}
</script>

<style scoped>
.date_day {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
}

.swiper_st {
	/* background-color: bisque; */
	width: 22rem;
	height: 3rem;
}

.swiper_item {
	display: flex;
	flex-flow: row nowrap;
}

.day_st {
	flex: 1;
	margin: 1px 0.2rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 18px;
	text-align: center;
	display: inline-block;

	box-shadow: 0 0 1px 2px rgb(188, 187, 187, 0.3);
	border-radius: 10px;

}

.select_day {
	border: 2px solid rgb(19, 221, 214);
}
</style>
