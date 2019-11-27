<template>
<div class="container gray">
    <div class="mypageWrap">
        <div class="mypage_userinfo">
            <div class="lrow">
                <div class="user_t">
                    <span class="thumb">
                            <img :src="guest.thumb" />
                        </span>
                    <div class="user_name">{{ guest.name }}</div>
                    <div class="user_info">{{ guest.intro }}</div>
                    <div class="user_comp" v-if="guest.usercomp">
                        {{ guest.usercomp }}
                    </div>
                    <div class="user_email">{{ guest.email }}</div>
                </div>
            </div>
            <div class="lrow" v-if="guest.user_skills_model">
                <div class="title">skill</div>
                <div class="cont">
                    <div class="tag_area cmmInput radiochk meta" v-for="(k, i) in guest.user_skills_model" :key="i">
                        <span class="lb">{{ k }}</span>
                        <!-- <ahref href="/" class="tag" v-if="userSkills" v-for="(key,index) in userSkills">{{guestSkills[index]}}</ahref> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="cmmItemsWrap">
            <ItemSort v-if="guest.useritems && mypageItemView" :sortitems="guest.useritems"></ItemSort>
        </div>
    </div>
    <router-link :to="{ name: 'create', params: user.uid }" v-if="isAuth && user.uid == $route.params.uid" class="animated bounceIn btnCreate"><i class="fas fa-plus"></i></router-link>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import ItemSort from "@/components/ItemSort";
export default {
    data() {
        return {
            stateSelector: null,
            mypageItemView: false,
        };
    },
    computed: {
        ...mapState(["isAuth", "user", "guest", "data"]),
        ...mapGetters(["getOnceAllitem"]),
        params_uid() {
            return this.$route.params.uid;
        },
        data_items() {
            return this.guest;
        }
    },
    created() {
        this.locFnGetAllCollection();
    },
    watch: {
        $route() {
            this.locFnGetAllCollection();
        }
    },
    methods: {
        ...mapActions(["fnGetUserInfo", "fnGetAllCollection"]),
        ...mapMutations(["geCmmPayload", "geIsLoading"]),
        locFnGetAllCollection() {
            this.geIsLoading(true);
            this.fnGetAllCollection(async res => {
                this.geCmmPayload({
                    k: "data",
                    v: res
                });
                await this.fnGetUserInfo(this.params_uid)
                this.mypageItemView = true
            });
        }
    },
    components: { ItemSort },
    destroyed() {
        this.mypageItemView = false
    }
};
</script>
