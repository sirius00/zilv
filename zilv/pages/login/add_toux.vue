<template>
	<view class="background bgcolor">
		<view class="center">
			<h1>真实形象照</h1><br>
			<text>形象越优质越容易接触到优质用户</text>
		</view>
		<view class="choose_toux">
			<img src="../../static/img/Add.png" alt="" @click="upImage" v-if="!flag" class="up_img">
			<img :src="toux[0]" alt="无法显示" v-if="flag" @click="changeImage" class="toux">
		</view>
		<view @click="upLoadImage()">
			<button class="last">最后一步了</button>
		</view>
		<view class="register_guide">
			<img src="../../static/img/register_image_guide_en.png" alt="">
		</view>
	</view>
</template>

<script>
import {
	mapState,
	mapMutations
} from "vuex"
import baseUrl from "@/network/baseUrlsConfigs.js"
const base1 = baseUrl.base1

export default {
	data() {
		return {
			toux: [],
			flag: false
		}
	},
	computed: {
		...mapState(['userinfo'])
	},

	methods: {
		...mapMutations(['xtoux']),
		//添加图片
		upImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.flag = !this.flag
					this.toux = res.tempFilePaths
				}
			})
		},
		// 改变图片
		changeImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.toux = res.tempFilePaths;
				}
			})
		},

		//上传图片
		upLoadImage() {
			if (this.toux.length < 1) {
				uni.showToast({
					title: '请上传图片',
					icon: 'error'
				});
				return false
			}
			const time = new Date().getTime()
			let obj = {
				memberId: this.userinfo.memberId,
				// memberId: 994248,
				timestamp: time,
				isFirst: 1
			}
			let data = JSON.stringify(obj)
			let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
			let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
			uni.uploadFile({
				// url: 'http://api.gugu2019.com/v1/user/UploadImg?args=' + e + '&er=' + er,
				url: base1 + '/v1/user/UploadImg?args=' + e + '&er=' + er,
				fileType: 'image',
				filePath: this.toux[0],
				name: 'img',
				header: {
					lang: 206,
					'AppAuthorization': this.userinfo.AppAuthorization,
				},
				// header: {
				// 	lang: 206,
				// 	'AppAuthorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTExMTAwOTQsImlhdCI6MTY1OTU3NDA5NCwibWVtYmVySWQiOjk5NDI0OH0.02Ckq71bp3ucoaIpEbgu4bOWlyEL3fh5OYBFK2nVGGw",
				// },
				success: (res) => {
					let result = JSON.parse(res.data)
					if(result.code != '200') {
						uni.showToast({
							title: '图片过大或识别人脸识别失败',
							icon: 'error'
						})
						return false
					}
					// let info = result.data.imginfo[0]
					let info = result.data.imginfo
					let single = null
					for (let item of info) {
						console.log(item);
						single = item
					}
					this.xtoux(info)
					this.xtoux(single)
					uni.reLaunch({
						url: '/pages/home/home'
					})

				},
				fail: (error) => {
					console.log(error);

				}
			})
		}


	}
}
</script>

<style scoped lang="scss">
.center {
	text-align: center;
}

.background {
	height: 100vh;
	display: flex;
	flex-flow: column;
	justify-content: space-around;
	align-items: center;
}

.bgcolor {
	background: -webkit-linear-gradient(bottom, #1b6365, #38e1e5, #37e2e5);
}

.choose_toux {
	// width: 14rem;
	width: 420rpx;
	// height: 6rem;
	height: 200rpx;
	flex: 0.4 auto;
	background-color: #39afb1;
	border-radius: 15px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}

.up_img {
	border-radius: 100rpx;
	width: 150rpx;
	height: 150rpx;
}

.toux {
	width: 100%;
	height: 100%;
	border-radius: 15px;
}

.last {
	width: 20rem;
}

.register_guide img {
	height: 150rpx;

}
</style>
