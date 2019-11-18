import vue from 'vue';
import router from '@/router';
export const actions = {
	fnUserFileUpload: ({
		dispatch
	}, payload) => { //payload => event.target
		let pad = payload;
		if (payload.data) {
			pad = payload.data;
		}
		let storageRef = vue.prototype.$storage.ref();
		let files = [] //리스폰스 리턴용
		for (var i = 0; i < pad.files.length; i++) {
			var child = storageRef.child(`${pad.files[i].name}`)
			var uploadTask = child.put(pad.files[i]).then(res=>{
				console.log(res);
				
			})
			return;
			dispatch('fnUserFileUploadCallback',{
				task : uploadTask,
				callback : payload.callback
			})
		}
		
	},
	fnUserFileUploadCallback:({},payload)=>{
		let snapshot = null
		payload.task.on('state_changed', snapshot => {
			snapshot = snapshot
		}, err => {}, () => {
			payload.task.snapshot.ref.getDownloadURL().then(res => {
				if (typeof payload.callback === 'function') {
					payload.callback(res);
				}
			})
		})
	},
	fnUserCreate: ({
		dispatch,
		commit,
	}, payload) => {
		commit('geIsLoading', {
			bool: true
		});
		let {
			userid,
			usernm,
			userthumb,
		} = payload;
		//vue.prototype.UI.Alert('회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.')
		vue.prototype.$firebase.auth().createUserWithEmailAndPassword(userid, payload.userpw).then(res => {
			console.log('이메일 가입 성공 : ', res);
			res.user.updateProfile({
				displayName: usernm,
			}).then(() => {
				dispatch('fnUserFileUpload', {
					data: userthumb,
					callback: c => {
						payload.userthumb = c;
						payload.uid = res.user.uid;
						vue.prototype.$firestore.collection("userinfo").doc(res.user.uid).set(payload);
						console.log('userName 업데이트 성공')
						console.log(res);
						dispatch('fnSignInCallBack', () => {
							router.push({
								name: 'main'
							})
						});
					}
				});
			}).catch(err => {
				console.error('userName 업데이트 실패 : ', err);
			})
		}).catch(err => {
			console.log(err);

			switch (err.code) {
				case "auth/email-already-in-use":
					alert(vue.prototype.$Msg.error.msg4);
					break;
				case "auth/invalid-email":
					alert(vue.prototype.$Msg.error.msg5);
					break;
				case "auth/operation-not-allowed":
					alert(vue.prototype.$Msg.error.msg6);
					break;
				case "auth/weak-password":
					alert(vue.prototype.$Msg.error.msg7);
					break;
			}
			commit('geIsLoading', false);
		})
	},
	fnSignIn: ({
		dispatch,
		commit,
	}, payload) => {
		commit('geIsLoading', true);
		let {
			userid,
			userpw
		} = payload;
		vue.prototype.$firebase.auth().signInWithEmailAndPassword(userid, userpw).then(res => {
			console.log(res);
			alert(vue.prototype.$Msg.error.msg2)
			dispatch('fnSignInCallBack', () => {
				router.push({
					name: 'main'
				})
			});
		}).catch(err => {
			switch (err.code) {
				case "auth/invalid-email":
					alert(vue.prototype.$Msg.error.msg5);
					break;
				case "auth/user-disabled":
					alert(vue.prototype.$Msg.error.msg8);
					break;
				case "auth/user-not-found":
					alert(vue.prototype.$Msg.error.msg9);
					break;
				case "auth/wrong-password":
					alert(vue.prototype.$Msg.error.msg10);
					break;
			}
			commit('geIsLoading', false);

		})
	},
	fnSignInCallBack: ({
		commit
	}, callback) => {
		vue.prototype.$firebase.auth().onAuthStateChanged(user => {
			if (user) {
				vue.prototype.$firestore.collection("userinfo").doc(user.uid).get().then(res => {
					console.log();
					commit('geSignIn', {
						uid: user.uid,
						name: user.displayName,
						email: user.email,
						thumb: res.data().userthumb,
					})
					if (typeof callback === 'function') callback();
					commit('geIsLoading', false);
				});
			}
		})
	},
	fnSignOut: ({
		commit
	}) => {
		if (confirm(vue.prototype.$Msg.error.msg11)) {
			vue.prototype.$firebase.auth().signOut().then(res => {
				alert(vue.prototype.$Msg.error.msg3);
				commit('geSignOut');
			}).catch(err => {})
		}
	},
	fnGetUserInfo: ({
		commit,
		state
	}, payload) => {
		if (payload == state.guest.uid) return
		commit('geIsLoading', true);
		console.log(payload);

		vue.prototype.$firestore.collection("userinfo").doc(payload).get().then(res => {
			console.log(res);
			console.log(res.data());
			let p = {
				me: false,
				data: res.data()
			}
			if (state.isAuth && state.user.uid == payload) {
				p.me = true;
			}
			commit('geUserInfo', p);
			commit('geIsLoading', false);
		});
	}
};