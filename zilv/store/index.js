import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userinfo: {}, //用户信息
		hasregister: false, // 是否注册
		haslogin: false, // 是否登录
		token: '',

		ifnote: false,  	//是否添加文字笔记
		ifvoice: false, // 是否显示添加声音
		tishi: 0,   //显示操作提示:长按录音
		
		playing: false, //是否正在播放

		days:[],   // 日历时间
		
	},
	mutations: {
		//监听语音播放状态
		StartPlay(state) {
			state.playing = true
		},
		StopPlay(state){
			state.playing = false
		},
		//登录
		xlogin(state, provider) {
			state.haslogin = true
			state.userinfo = provider
			
			if (state.userinfo.img != '') {
				state.hasregister = true
			};
			uni.setStorage({
				key: 'userinfo',
				data: provider
			})
		},
		// 读取缓存
		read_storage(state, provider) {
			state.userinfo = provider
		},
		// 注销账号
		zhuxiao(state) {
			state.userinfo = {}
			uni.removeStorage({
				key: 'userinfo',
				success:res => {
					uni.showToast({
						title: '注销成功',
						icon:'success'
					});
					uni.reLaunch({
						url:'/pages/login/phone_login'
					})
				}
			})
		},
		// 退出登录
		logout(state) {
			state.userinfo = {}
			uni.removeStorage({
				key: 'userinfo',
				success:res => {
					uni.showToast({
						title: '退出登录',
						icon:'success'
					})
					uni.reLaunch({
						url:'/pages/login/phone_login'
					})
				}
			})
		},
		//注册个人信息
		xprofile(state,provider) {
			state.userinfo = provider
		},
		// 添加头像
		xtoux(state, provider){
			let img = provider.img
			state.userinfo.img = img
			state.userinfo.imgpath = img
		},
		
		//是否显示显示添加笔记
		addNote(state) {
			state.ifnote = !state.ifnote
		},
		//是否显示添加声音笔记
		addVoice(state) {
			state.ifvoice = !state.ifvoice

		},
		// 是否显示提示操作状态
		hidentishi(state) {
			state.tishi = 1
		},

		addTask(state,task) {
			let push_id = task.id + 1
			state.taskList.push({'id': push_id, 'content': task.content})
		},

		// 用户更新个人信息
		updateprofile(state, provider){
			state.userinfo.userName = provider.newname
			state.userinfo.img = provider.newimg
		}

	},
	actions: {},
	modules: {
		
	}
})
export default store
