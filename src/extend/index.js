const FnExtends = {
	userMypageView: {
		methods: {
			userMypageView() {
				if (this.userDetailView.modalDetailViewShow) {
					this.geUserDetailView(false)
					setTimeout(() => {
						this.$router.push({
							name: 'mypage',
							params: {
								uid: this.item_user_uid
							}
						})
					}, 250)
				} else {
					this.$router.push({
						name: 'mypage',
						params: {
							uid: this.item_user_uid
						}
					})
				}
			}
		}
	},
	userUpateExtend: {
		methods: {
			// userUpateExtend(p, n) {
			// 	let org_o = p
			// 	let ext_o = n
			// 	let new_o = {}
			// 	if (org_o && typeof org_o === 'object' && !Array.isArray(org_o) && ext_o && typeof ext_o === 'object' && !Array.isArray(ext_o)) {
			// 		for (let k in ext_o) {
			// 			new_o[k] = ext_o[k]
			// 		}
			// 		for (let c in org_o) {
			// 			if(typeof new_o[c] == 'undefined'){
			// 				new_o[c] = org_o[c]
			// 			}
			// 		}
					
			// 	}
			// 	return new_o
			// }
		}
	}
}
export const {
	userMypageView,
	userUpateExtend
} = FnExtends;