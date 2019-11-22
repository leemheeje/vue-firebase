import router from '@/router'
import vue from 'vue'
import vuex from '@/store'
export const mutations = {
	geCmmPayload: (state, payload) => {
		state[payload.k] = payload.v
		if (payload.storage) {
			localStorage.setItem(payload.k, payload.v)
		}
	},
	geGuestUserItem: (state, payload) => {
		state.guest.useritems = payload
	},
	geIsLoading: (state, payload) => {
		if (typeof payload === 'boolean') {
			state.isLoading = payload;
		} else if (typeof payload === 'object') {
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
		if (typeof payload === 'object') {
			let exo = vue.prototype.$extend(state.userDetailView, payload)
			state.userDetailView = exo
		} else if (typeof payload === 'boolean') {
			state.userDetailView.modalDetailViewShow = payload
		}
	},
	geTransDirection: (state, payload) => {
		state.transDirection = payload
		setTimeout(() => {
			state.transDirection = true
		}, 500) //페이지 트렌지션 하는 시간
	},
	// 여기부터
	geOnceAllitemUpdate: (state, payload) => {
		/**
		 * @params  item_id = string
		 * @params  item_user_uid = string
		 * @params  value = typeof object && !Array.isArray(object)
		 */
		let c = null
		state.data.forEach((items, index) => {
			if (items.item_id == payload.item_id && items.item_user_uid == payload.item_user_uid) {
				c = index
			}
		})
		if (payload.target != 'comment') {
			for (let k in payload.value) {
				state.data[c][k] = payload.value[k]
			}
		} else {
			let d = null
			state.data[c].item_comment_group.forEach((items, index) => {
				if (items.date == payload.date && items.uid == payload.uid) {
					d = index
				}
			})
			if (payload.value === false) {
				state.data[c].item_comment--
				state.data[c].item_comment_group.splice(d, 1)
			} else {
				for (let k in payload.value) {
					state.data[c].item_comment_group[d][k] = payload.value[k]
				}
			}
		}

	},
};