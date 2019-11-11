import vue from 'vue';
export const actions = {
	fnUserCreate: ({
		dispatch
	}, payload) => {
		let {
			userid,
			userpw
		} = payload;
		console.log(payload);
		//vue.prototype.UI.Alert('회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.')
		vue.prototype.$firebase.auth().createUserWithEmailAndPassword(userid, userpw).then(res => {
			console.log('이메일 가입 성공 : ', res);
			res.user.updateProfile({
				displayName: '임희재히',
				testsibar0: 'sibar0',
				testsibar1: 'sibar1',
				testsibar2: 'sibar2',
				testsibar3: 'sibar3',
				testsibar4: 'sibar4',
				testsibar5: 'sibar5',
			}).then(() => {
				console.log(res);
				console.log('userName 업데이트 성공')
			}).catch(err => {
				console.error('userName 업데이트 실패 : ', err);
			})
			//dispatch('fnSignInCallBack');
		}).catch(err => {
			console.log(err);

			switch (err.code) {
				case "auth/email-already-in-use":
					alert('이미 사용중인 이메일 입니다.');
					break;
				case "auth/invalid-email":
					alert('유효하지 않은 메일입니다');
					break;
				case "auth/operation-not-allowed":
					alert('이메일 가입이 중지되었습니다.');
					break;
				case "auth/weak-password":
					alert("비밀번호를 6자리 이상 필요합니다");
					break;
			}
		})
	},
	fnSignIn: ({
		dispatch
	}, payload) => {
		let {
			userid,
			userpw
		} = payload;
		vue.prototype.$firebase.auth().signInWithEmailAndPassword(userid, userpw).then(res => {
			alert('로그인')
			dispatch('fnSignInCallBack');
		}).catch(err => {
			switch (err.code) {
				case "auth/invalid-email":
					alert('유효하지 않은 메일입니다');
					break;
				case "auth/user-disabled":
					alert('사용이 정지된 유저 입니다.');
					break;
				case "auth/user-not-found":
					alert('사용자를 찾을 수 없습니다.');
					break;
				case "auth/wrong-password":
					alert("잘못된 패스워드 입니다.");
					break;
			}

		})
	},
	fnSignInCallBack: ({
		commit
	}) => {
		vue.prototype.$firebase.auth().onAuthStateChanged(user => {

			if (user) {
				commit('geSignIn', user);
			}
		})
	},
	fnSignOut: ({
		commit
	}) => {
		vue.prototype.$firebase.auth().signOut().then(res => {
			alert(vue.prototype.$Msg.error.msg3);
			commit('geSignOut');
		}).catch(err => {})
	}
};