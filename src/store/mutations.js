import router from '@/router'
export const mutations = {
	geUserInfo: () => {},
	geSignIn: (state, payload) => {
		state.isAuth = true
		state.user.email = payload.email
		state.user.uid = payload.uid
		localStorage.setItem('access-token', payload.uid)
		router.push({
			name: 'main'
		})
	},
	geSignOut: state => {
		state.isAuth = false
		state.user.email = ''
		state.user.uid = ''
		localStorage.removeItem('access-token')
		router.push({
			name: 'main'
		})
	}
};