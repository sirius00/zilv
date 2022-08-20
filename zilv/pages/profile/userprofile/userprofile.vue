<template>
  <view class="container">
    <view class="save" @click="save()">
      <text>保存</text>
    </view>
    <view class="toux">
      <view class="toux_box">
        <img :src="toux" alt="" @click="changeImage()">
        <!-- <img :src="toux" alt="" /> -->
      </view>
    </view>

    <view class="userprofile">
      <view class="tx">
        <text>用户名</text>
      </view>
      <view class="content">
        <input class="input_va" type="text" v-model="name">
      </view>
    </view>
    <view class="userprofile">
      <view class="tx">
        <text>关于我</text>
      </view>
      <view class="content">
        <input class="input_va" type="text" value="">
      </view>
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
  components: {
  },
  data() {
    return {
      toux: [],
      name: '',
      haschangetoux: false
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  created() {
    this.toux = this.userinfo.img
    this.name = this.userinfo.userName
    // uni.getStorage({
    //   key: 'userinfo',
    //   success: (res) => {
    //     this.toux = res.data.img
    //     this.name = res.data.userName
    //   }
    // })
  },
  methods: {
    ...mapMutations(['xtoux', 'xprofile', 'updateprofile']),
    //改变头像
    changeImage() {
      uni.chooseImage({
        count: 1,
        success: res => {
          this.toux = res.tempFilePaths
          this.haschangetoux = true
          console.log(this.toux);
        }
      })
    },
    //上传图片
    upLoadImage() {
      const time = new Date().getTime()
      let obj = {
        memberId: this.userinfo.memberId,
        timestamp: time,
        isFirst: 1
      }
      let data = JSON.stringify(obj)
      let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
      let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
      uni.uploadFile({
        url: 'http://test.gugu2019.com/v1/user/UploadImg?args=' + e + '&er=' + er,
        fileType: 'image',
        filePath: this.toux[0],
        name: 'img',
        success: res => {

          console.log('成功');
        },
        fail: (error) => {
          console.log(error);
        }
      })
    },
    changename() {
      const time = new Date().getTime()
      let obj = {
        memberId: this.userinfo.memberId,
        timestamp: time,
        userName: this.name,
        sex: this.userinfo.sex,
        born: this.userinfo.born,

      }
      let data = JSON.stringify(obj)
      let e = this.AES.encrypt(data, 'GuGuAPP$*@AesKey', '0000000000000000')
      let er = this.AES.encrypt('2', 'GuGuAPP$*@AesKey', '0000000000000000')
      uni.$http.post(
        base1 + '/v1/user/Register?args=' + e + '&er=' + er
      ).then((res) => {
        if (res.data.code == '400') {
          uni.showToast({
            title: '年龄未满18',
            icon: "none"
          })
          return false
        } else {
          let info = res.data.data.user
          this.xprofile(info)

        }
      }).catch(err => {
        console.log(err);
      })
    },
    save() {
      this.changename()
      if (this.haschangetoux) {
        this.upLoadImage()
      }
      let obj = {
        newname: this.name,
        newimg: this.toux
      }
      this.updateprofile(obj)

      uni.reLaunch({
        url: '/pages/profile/profile'
      })
    }
  }
}
</script>

<style>
.container {
  background-color: #f0f0edc3;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

.save {
  align-self: flex-end;
  margin-top: 1rem;
  margin-right: 1rem;
}

.save text {
  color: rgb(144, 68, 215);
}

.toux {
  height: 250rpx;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.toux .toux_box {
  height: 250rpx;
  width: 250rpx;
  margin: 0 auto;
  border-radius: 40rpx;
  background-color: #fff;
}

.toux img {
  height: 250rpx;
  width: 250rpx;
  border-radius: 40rpx;
}

.username {
  text-align: center;
  margin-top: 0.6rem;
}

.userprofile {
  margin: 1rem auto;
  display: flex;
  justify-content: flex-start;
  /* background-color: #f2eeee; */
  width: 94vw;
  height: 3rem;
  border-radius: 10px;
  align-items: center;
}

.tx {
  margin-left: 0.3rem;
  width: 4rem;
  text-align: center;
  color: rgb(136, 136, 136);
}

.content {
  background-color: rgb(255, 255, 255);
  margin-left: 0.5rem;
  height: 2.5rem;
  width: 70%;
  border-radius: 5px;
}

.input_va {
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 0.5rem;
}
</style>
