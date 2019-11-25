import vue from 'vue'
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
	},
	locFnUploadFile: {
		methods: {
			locFnUploadFile(event) {
				let s = ''
				let check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp']
				if (event.target.files.length) {
					for (let i = 0; i < event.target.files.length; i++) {
						let tp = event.target.files[i].type.toLowerCase()
						if (
							tp.indexOf(check_file_type[0]) == -1 &&
							tp.indexOf(check_file_type[1]) == -1 &&
							tp.indexOf(check_file_type[2]) == -1 &&
							tp.indexOf(check_file_type[3]) == -1 &&
							tp.indexOf(check_file_type[4]) == -1 
							) {
							vue.prototype.$Ui.alert('이미지파일만 등록가능합니다.')
							return
						}

					}
					this.pf_file_target = event.target;
					if (event.target.files.length > 1) {
						s = event.target.files[0].name
						this.fakFile_txt_ant = `외 ${event.target.files.length - 1}개 파일`
					} else {
						s = event.target.files[0].name
						this.fakFile_txt_ant = ''
					}
				}
				this.fakFile_txt = s
			}
		}
	}
}
export const {
	userMypageView,
	userUpateExtend,
	locFnUploadFile
} = FnExtends;