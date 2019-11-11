<template>
    <div class="loginArea">
        <div class="innerWrap">
            <div class="row">
                <div class="col12">
                    <roundbox>
                        <forminput id="userid" label="이메일" @eventBus_keyup_enter="login" v-model="userid" type="text"></forminput>
                        <forminput id="userpw" class="" label="비밀번호" @eventBus_keyup_enter="login" v-model="userpw" type="password"></forminput>
                        <btn class="block blue MT20" @eventBus_click="login">로그인</btn>
                        <div class="btnsWrap TXTR MT15">
                            <router-link :to="{name:'register'}" class="btns outline md">회원가입</router-link>
                            <router-link :to="{name:'register'}" class="btns outline md ML10">홈으로</router-link>
                        </div>
                    </roundbox>
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
        }
    }
};
</script>