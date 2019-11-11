<template>
    <div class="navibar">
        <div class="innerWrap">
            <btn class="init menubtn">
                <i class="zmdi zmdi-menu"></i>
            </btn>
            <div class="rtbox">
                <div class="rtboxin">
                    <template v-if="isAuth">
                        <btn class="init rtbtn tp2">
                            <i class="zmdi zmdi-account"></i>
                        </btn>
                        <btn @eventBus_click="fnSignOut" class="init rtbtn tp1">로그아웃</btn>
                    </template>
                    <template v-else>
                        <router-link :to="{name:'login'}" class="btns init rtbtn tp0">
                            <i class="zmdi zmdi-sign-in"></i>
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["isAuth"])
    },
    methods: {
        ...mapActions(["fnSignOut"])
    }
};
</script>