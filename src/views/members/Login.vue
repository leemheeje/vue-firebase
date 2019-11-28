<template>
<div class="container">
    <div class="innerWrap">
        <div class="row">
            <div class="col12 TXTC">
                <div class="loginArea">
                    <div class="row MT30 MB20">
                        <div class="col col6">
                            <btn class="block gray1 snslogin MMB10" @eventBus_click="locFnSnsLogin('g')">
                                <span class="ico">
                                <i class="icos google"></i>
                            </span> Sign in with Google
                            </btn>
                        </div>
                        <div class="col col6">
                            <btn class="block gray1 snslogin tp2" @eventBus_click="locFnSnsLogin('f')">
                                <span class="ico">
                                <i class="icos facebook"></i>
                            </span> Sign in with Facebook
                            </btn>
                        </div>
                    </div>
                    <roundbox>
                        <forminput id="userid" label="이메일" @eventBus_keyup_enter="login" v-model="userid" type="text"></forminput>
                        <forminput id="userpw" class="" label="비밀번호" @eventBus_keyup_enter="login" v-model="userpw" type="password"></forminput>
                        <btn class="block blue MT20" @eventBus_click="login">로그인</btn>
                        <div class="btnsWrap TXTR MT15">
                            <router-link :to="{ name: 'register' }" class="btns outline md">회원가입</router-link>
                            <router-link :to="{ name: 'main' }" class="btns outline md ML10">홈으로</router-link>
                        </div>
                    </roundbox>

                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            userid: "",
            userpw: ""
        };
    },
    computed: {
        ...mapState(["user"])
    },
    mounted() {},
    methods: {
        ...mapActions(["fnSignIn"]),
        login() {
            this.fnSignIn({
                userid: this.userid,
                userpw: this.userpw
            });
        },
        locFnSnsLogin(n) {
            let provider = ''
            switch (n) {
                case 'g':
                    provider = this.$provider_google
                    break;
                case 'f':
                    provider = this.$provider_facebook
                    break;
            }
            if (!provider) return this.$Ui.alert('provider 올바르지않습니다')
            this.$firebase.auth().signInWithPopup(provider).then(async res => {
                this.$Ui.alert(this.$Msg.error.msg2);
                let isUserItems = false
                await this.$firestore.collection("userinfo").doc(res.user.uid).get().then(userinfo => {
                    if (!userinfo.exists) {
                        this.$firestore.collection("userinfo").doc(res.user.uid).set({
                            userid: res.user.email,
                            usernm: res.user.displayName,
                            userthumb: res.user.photoURL,
                            useritems: {}
                        });
                    } else {
                        if (typeof userinfo.data().useritems !== 'undifined' && Object.keys(userinfo.data().useritems).length) {
                            isUserItems = userinfo.data().useritems
                        }
                        this.$firestore.collection("userinfo").doc(res.user.uid).set({
                            userid: res.user.email,
                            usernm: res.user.displayName,
                            userthumb: res.user.photoURL,
                            useritems: isUserItems ? isUserItems : {}
                        });
                    }
                })
                this.$router.push({
                    name: "main"
                });
            });
        },
    }
};
</script>
