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
								uid: this.uid
							}
						})
					}, 250)
				} else {
					this.$router.push({
						name: 'mypage',
						params: {
							uid: this.uid
						}
					})
				}
			}
		}
	},
	bbb:()=>{
		console.log(123);
	}
}
export const {userMypageView,bbb} = FnExtends;