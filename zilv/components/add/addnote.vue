<template>
	<view class="zhezhao" v-if="ifnote" @click="hidenote">
		<view class="add_note" @click.stop="!hidenote">
			<view class="">
				<textarea 
				id="note_content" 
				v-model="text_value"
				class="addtext"
				@confirm="get_text_value"
				confirm-type="done"
				placeholder="添加事项..."
				>
				</textarea>
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
			<view class="add_button" @click="add_task">
				添加
			</view>
		</view>
	</view>
</template>

<script>
import baseUrl from "@/network/baseUrlsConfigs.js"
const base2 = baseUrl.base2
import {
	mapState,
	mapMutations
} from "vuex"

	export default {
		props:{
		
		},
		data() {
			return {
				limited: false,
				text_value: ''
			}
		},
		computed: {
			...mapState(['userinfo', 'ifnote']),

		},
		methods: {
			...mapMutations(['addNote']),
			// 添加权限
			limit() {
				this.limited = !this.limited
			},
			hidenote() {
				this.$store.commit("addNote")
			},

			add_task () {
				uni.$http.post(
					base2 + '/task/add/text', 
					{ uid: this.userinfo.memberId, content: this.text_value}
					).then( (res) => {
					this.$emit('addtask')
					this.addNote()
				}).catch( (err) => {
					console.log(err);
					
				})

			}
		}
	}
</script>

<style scoped >
	.zhezhao {
		/* background-color: chartreuse; */
		position: absolute;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		z-index: 5;
	}
	.add_note {
		width: 500rpx;
		height: 480rpx;
		background-color: #fff;
		position: absolute;
		z-index: 10;
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
