<template>
    <div id="app">
        <div class="wrap">
            <Header v-if="currentMembersPage"></Header>
            <transition name>
                <router-view />
            </transition>
            <Footer v-if="currentMembersPage"></Footer>
            <button @click="asdf">butto1n</button>
        </div>
    </div>
</template>
 
<script>
import { db } from "@/main";

import Header from "@/views/Header";
import Footer from "@/views/Footer";
import store from "@/store";
export default {
    data() {
        return {
            currentMembersPage: true
        };
    },
    created() {
        store.dispatch("fnSignInCallBack");
    },
    mounted() {
        this.fnCurrentMembersPage();
    },
    watch: {
        $route() {
            this.fnCurrentMembersPage();
        }
    },
    methods: {
        fnCurrentMembersPage() {
            if (
                this.$route.name === "login" ||
                this.$route.name === "register"
            ) {
                this.currentMembersPage = false;
            } else {
                this.currentMembersPage = true;
            }
        },
        asdf() {
            db.collection("andt").add({ test: "123" });
        }
    },
    components: {
        Header,
        Footer
    }
};
</script>
