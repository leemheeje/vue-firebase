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
		//vue.prototype.$firebase.auth().setPersistence(vue.prototype.$firebase.auth.Auth.Persistence.LOCAL)
		vue.prototype.$firebase.auth().onAuthStateChanged(user => {
			console.log('onAuthStateChanged');
			
			if (user) {
				commit('geCmmPayload', {
					k: 'isAuth',
					v: true
				})
				vue.prototype.$firestore.collection("userinfo").doc(user.uid).get().then(res => {
					commit('geSignIn', {
						uid: user.uid,
						name: user.displayName,
						email: user.email,
						thumb: res.data().photoURL? res.data().photoURL :res.data().userthumb,
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

		vue.prototype.$firestore.collection("userinfo").doc(payload).get().then(res => {
			let data = res.data()
			let useritems = []
			for (let k in data.useritems) {
				if (data.useritems.hasOwnProperty(k)) {
					useritems.push(data.useritems[k])
				}
			}

			commit('geCmmPayload', {
				k: 'guest',
				v: {
					email: data.userid,
					uid: data.item_user_uid,
					name: data.usernm,
					thumb: data.userthumb,
					intro: data.userintro,
					user_skills_model: data.user_skills_model,
					useritems: useritems
				}
			});
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
	},
	fnUpdateUserItemInfo: ({
		commit
	}, payload) => {
		/**
		 * @params payload.item_user_uid = doc(uid)
		 * @params payload.item_id = res.data().useritems[`item${item_id}`]
		 * @params payload.callback = ()
		 */
		try {
			vue.prototype.$firestore.collection('userinfo').doc(payload.item_user_uid).get().then(res => {
				if (typeof payload.callback === 'function') {
					payload.callback(res.data().useritems[`item${payload.item_id}`])
				}
			})
		} catch (err) {}
	},
	//여기부터
	fnOnceAllitemUpdate: ({
		commit
	}, payload) => {
		commit('geOnceAllitemUpdate', payload)
		let firestore = vue.prototype.$firestore.collection('userinfo').doc(payload.item_user_uid)
		let $extend = vue.prototype.$extend
		firestore.get().then(res => {
			let useritems = res.data().useritems
			let items = useritems[`item${payload.item_id}`]
			let $extend_items = $extend(items, payload.value)
			useritems[`item${payload.item_id}`] = $extend_items;
			firestore.update({
				useritems: useritems
			})
		})
	},
	fnOnceAllitemInComment: ({
		commit
	}, payload) => {
		commit('geOnceAllitemUpdate', payload)
		let firestore = vue.prototype.$firestore.collection('userinfo').doc(payload.item_user_uid)
		let $extend = vue.prototype.$extend
		firestore.get().then(res => {
			let useritems = res.data().useritems
			let items = useritems[`item${payload.item_id}`].item_comment_group //array
			let c = 0
			let t_items = items.filter((itm, i) => {
				if (itm.date == payload.date && itm.uid == payload.uid) {
					return c = i
				}
			})
			let $extend_items = null
			if (payload.value === false) {
				items.splice(c, 1)
				useritems[`item${payload.item_id}`].item_comment--
				useritems[`item${payload.item_id}`].item_comment_group = items;
			} else {
				$extend_items = $extend(items[c], payload.value)
				useritems[`item${payload.item_id}`].item_comment_group[c] = $extend_items;
			}
			firestore.update({
				useritems: useritems
			})
		})
	}
};