<template>
    <transition
        name="slide2"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <router-view />
    </transition>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    computed: {
        ...mapState(["isAuth", "user"])
    },
    created() {
        this.locFnIsMypage();
    },
    watch: {
        $route() {
            this.locFnIsMypage();
        }
    },
    methods: {
        ...mapMutations(["geCmmPayload"]),
        locFnIsMypage() {
            if (this.isAuth && this.user.uid && this.$route.params.uid) {
                this.geCmmPayload({
                    k: "isMypage",
                    v: true
                });
            } else {
                this.geCmmPayload({
                    k: "isMypage",
                    v: false
                });
            }
        }
    }
};
</script>
<style scoped>
.animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
}
</style>
