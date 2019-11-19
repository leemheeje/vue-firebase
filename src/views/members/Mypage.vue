<template>
    <div class="container gray">
        <div class="mypageWrap">
            <div class="mypage_userinfo">
                <div class="lrow">
                    <div class="user_t">
                        <span class="thumb">
                            <img :src="guest.userthumb" />
                        </span>
                        <div class="user_name">{{ guest.usernm }}</div>
                        <div class="user_info">{{ guest.userintro }}</div>
                        <div class="user_comp" v-if="guest.usercomp">
                            {{ guest.usercomp }}
                        </div>
                        <div class="user_email">{{ guest.userid }}</div>
                    </div>
                </div>
                <div class="lrow" v-if="guest.user_skills_model">
                    <div class="title">skill</div>
                    <div class="cont">
                        <div
                            class="tag_area cmmInput radiochk meta"
                            v-for="(k, i) in guest.user_skills_model"
                            :key="i"
                        >
                            <span class="lb">{{ k }}</span>
                            <!-- <ahref href="/" class="tag" v-if="userSkills" v-for="(key,index) in userSkills">{{guestSkills[index]}}</ahref> -->
                        </div>
                    </div>
                </div>
                <!-- <div class="lrow noline">
                    <div class="title">statistics</div>
                    <div class="cont">
                        <ul class="sta_ul">
                            <li class="tp tp0">
                                <span class="t">1,414</span>
                                <span class="s">총 조회수</span>
                            </li>
                            <li class="tp tp1">
                                <span class="t">87</span>
                                <span class="s">총 좋아요수</span>
                            </li>
                            <li class="tp tp2">
                                <span class="t">13</span>
                                <span class="s">총 댓글수</span>
                            </li>
                        </ul>
                    </div>
                </div> -->
            </div>

            <div class="cmmItemsWrap">
                <ItemSort
                    v-if="guest.useritems"
                    :sortitems="isItems"
                ></ItemSort>
            </div>
        </div>
        <router-link
            :to="{ name: 'create', params: user.uid }"
            v-if="isAuth"
            class="animated bounceIn btnCreate"
            ><i class="fas fa-plus"></i
        ></router-link>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ItemSort from "@/components/ItemSort";
export default {
    data() {
        return {
            stateSelector: null,
            data_items: null
        };
    },
    computed: {
        ...mapState(["isAuth", "user", "guest"]),
        isItems() {
            let ar = [];
            if (this.guest.useritems) {
                for (const k in this.guest.useritems) {
                    ar.push(this.guest.useritems[k])
                }
            }
            console.log(ar);
            return ar;
        }
    },
    created() {
        this.fnGetUserInfo(this.$route.params.uid);
        if (this.$route.params.uid == this.user.uid) {
            this.stateSelector = this.user;
        } else {
            this.stateSelector = this.guest;
        }
    },
    watch: {
        $route() {
            this.fnGetUserInfo(this.$route.params.uid);
        }
    },
    methods: {
        ...mapActions(["fnGetUserInfo"])
    },
    components: { ItemSort }
};
</script>
