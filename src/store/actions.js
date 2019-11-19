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
			var uploadTask = child.put(pad.files[i])
			dispatch('fnUserFileUploadCallback', {
				task: uploadTask,
				callback: payload.callback
			})
		}

	},
	fnUserFileUploadCallback: ({}, payload) => {
		let snapshot = null
		console.log(payload);

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
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg4);
					break;
				case "auth/invalid-email":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg5);
					break;
				case "auth/operation-not-allowed":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg6);
					break;
				case "auth/weak-password":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg7);
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
			vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg2)
			dispatch('fnSignInCallBack', () => {
				router.push({
					name: 'main'
				})
			});
		}).catch(err => {
			switch (err.code) {
				case "auth/invalid-email":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg5);
					break;
				case "auth/user-disabled":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg8);
					break;
				case "auth/user-not-found":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg9);
					break;
				case "auth/wrong-password":
					vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg10);
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
				vue.prototype.$Ui.alert(vue.prototype.$Msg.error.msg3);
				commit('geSignOut');
			}).catch(err => {})
		}
	},
	fnGetUserInfo: ({
		commit,
		state
	}, payload) => {
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
	},
	fnGetAllCollection: ({
		commit,
		dispatch
	}, callback) => {
		let db = vue.prototype.$firestore.collection('userinfo')
		let rst = []
		db.get().then(res => {
			for (let i = 0; i < res.docs.length; i++) {
				dispatch('fnGetAllCollection2', {
					data: res.docs[i].data(),
					callback: d => {
						for (let key in d.useritems) {
							rst.push(d.useritems[key])
						}
					}
				})
			}
			if (typeof callback === 'function') {
				callback(rst)
			}
		})
	},
	fnGetAllCollection2: ({}, payload) => {
		if (typeof payload.callback === 'function') {
			payload.callback(payload.data)
		}
	}
};