<template>
<div id="app">
    <div class="wrap">
        <div class="vld-parent">
            <transition name="fade">
                <Loading :active.sync="isLoading" :opacity="isLoadingStyle.opacity" :color="isLoadingStyle.color" :width="isLoadingStyle.width">
                    <slot name="detault">
                        <i class="fab fa-meetup animated pulse infinite preloader"></i>
                    </slot>
                </Loading>
            </transition>
        </div>
        <Header v-if="currentMembersPage"></Header>
        <transition name="slide" :enter-active-class="`animated ${transitionDirection.ea}`" :leave-active-class="`animated ${transitionDirection.la}`">
            <router-view />
        </transition>
        <Footer v-if="currentMembersPage"></Footer>
    </div>
    <transition name="dimm" enter-active-class="fadeIn" leave-active-class="fadeOut">
        <div class="dimm" v-if="userDetailView.modalDetailViewShow"></div>
    </transition>
</div>
</template>

<script>
import vue from "vue";

import Header from "@/views/Header";
import Footer from "@/views/Footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapActions, mapState, mapMutations } from "vuex";
import { log } from "util";
export default {
    data() {
        return {
            currentMembersPage: true
        };
    },
    computed: {
        ...mapState([
            "isAuth",
            "user",
            "isLoading",
            "transDirection",
            "isLoadingStyle",
            "userDetailView"
        ]),
        transitionDirection() {
            let ea = this.$isMobile ? "slideInRight" : "fadeIn";
            let la = this.$isMobile ? "slideOutLeft" : "fadeOut";
            if (!this.transDirection) {
                //반대방향 뒤로버튼
                ea = this.$isMobile ? "slideInLeft" : "fadeIn";
                la = this.$isMobile ? "slideOutRight" : "fadeOut";
            }
            return {
                ea,
                la
            };
        }
    },
    created() {
        if (this.isAuth) {
            this.fnSignInCallBack();
        } else {
            setTimeout(() => this.geIsLoading(false), 500);
        }
    },
    methods: {
        ...mapActions(["fnSignInCallBack"]),
        ...mapMutations(["geIsLoading", "geCmmPayload"])
    },
    components: {
        Header,
        Footer,
        Loading
    }
};
</script>

<style scoped>
.animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
}

@media only screen and (min-width: 1301px) {
    .dimm {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #000;
        opacity: 0.3;
        transform: translateX(0);
        z-index: 10;
        transition: opacity 0.3s;
    }
    .dimm.fadeIn {
        opacity: 0;
    }
}
</style>
