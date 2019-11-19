import router from '@/router'
import vuex from '@/store'
export const mutations = {
	geCmmPayload:(state, payload)=>{
		state[payload.k] = payload.v
	},
	geUserInfo: (state, payload) => {
		console.log(payload);
		
		state.guest = payload.data
		// if (payload.me) {
		// 	state.user = payload.data
		// } else {
		// 	state.guest = payload.data
		// }
	},
	geIsLoading: (state, payload) => {
		if (typeof payload === 'boolean') {
			state.isLoading = payload;
		}else if(typeof payload === 'object'){ 
			state.isLoadingStyle = {
				extends: state.isLoadingStyle,
				opacity: .7,
			};
			state.isLoading = payload.bool;
		}
	},
	geSignIn: (state, payload) => {
		state.isAuth = true
		state.user = payload
		localStorage.setItem('access-token', payload.uid)
		if (typeof payload === 'function') payload.callback()
	},
	geSignOut: state => {
		state.isAuth = false
		state.user = {}
		localStorage.removeItem('access-token')
		router.push({
			name: 'main'
		})
	},
	geUserDetailView: (state, payload) => {
		let o = {}
		if (typeof payload === 'object') {
			let ar = payload.k.forEach((a, i) => {
				o[a] = payload.v[i];
			})
			o['modalDetailViewShow'] = true;
			state.userDetailView = o
		} else if (typeof payload === 'boolean') {
			state.userDetailView.modalDetailViewShow = payload
		}
		if(state.userDetailView.modalDetailViewShow){
			//router.push({query:{item:o.item_id}})
		}else{
			//router.replace({query:null})
		}
	},
	geTransDirection: (state, payload) => {
		state.transDirection = payload
		setTimeout(() => {
			state.transDirection = true
		}, 500) //페이지 트렌지션 하는 시간
	}
};