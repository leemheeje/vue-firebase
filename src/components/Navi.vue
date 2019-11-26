<template>
    <div class="navibar">
        <div class="innerWrap">
            <div class="ltbox">
                <btn href="javascript:;" class="init menubtn" v-if="isMain" style="display: none;">
                    <i class="fas fa-align-left"></i>
                </btn>
                <btn href="javascript:;" @eventBus_click="fnBackBtn" class="init menubtn" v-else>
                    <i class="fas fa-chevron-left"></i>
                </btn>
            </div>
            <div class="tit">
                <router-link :to="{name:'main'}"><i class="fab fa-meetup"></i></router-link>
            </div>
            <div class="rtbox">
                <div class="rtboxin">
                    <template v-if="isAuth">
                        <router-link :to="{name: 'mypage', params:{uid:user.uid}}" href="javascript:;" class="btns init rtbtn tp2" title="마이페이지">
                           <i class="fas fa-user-circle"></i>
                        </router-link>
                        <btn @eventBus_click="fnSignOut" href="javascript:;" class="init rtbtn tp1" title="로그아웃">
                            <i class="fas fa-sign-out-alt"></i>
                        </btn>
                    </template>
                    <template v-else>
                        <router-link href="javascript:;" :to="{name:'login'}" class="btns init rtbtn tp0" title="로그인">
                           <i class="fas fa-sign-in-alt"></i>
                        </router-link>
                        <router-link href="javascript:;" :to="{name:'register'}" class="btns init rtbtn tp1" title="회원가입">
                            <i class="fas fa-user-plus"></i>
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data(){
        return {
            isMain:false
        }
    },
    computed: {
        ...mapState(["isAuth",'user','transDirection'])
    },
    methods: {
        ...mapActions(["fnSignOut"]),
        ...mapMutations(['geTransDirection']),
        fnIsMain(){
                        

            
            if(this.$route.name != 'main'){
                this.isMain = false;
            }else{
                this.isMain = true;
                //this.geTransDirection(true);
            }
        },
        fnBackBtn(){
            this.geTransDirection(false);
            this.$router.go(-1)
        }
    },
    created(){
        this.fnIsMain();
    },
    watch:{
        $route(){
            this.fnIsMain();
        }
    },
};
</script>