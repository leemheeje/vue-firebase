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
			userUpateExtend(p, n) {
				let org_o = p
				let ext_o = n
				if (org_o && typeof org_o === 'object' && !Array.isArray(org_o)) {
					for (let k in org_o) {
						if (ext_o && typeof ext_o === 'object' && !Array.isArray(ext_o)) {
							for (let v in ext_o) {
									if(k == v){
										for (let c in ext_o[v]) {
											org_o[k][c] = ext_o[v][c]
										}
									}
							}
						}
					}
				}
				return org_o
			}
		}
	}
}
export const {
	userMypageView,
	userUpateExtend
} = FnExtends;