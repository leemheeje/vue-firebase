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
            </div>

            <div class="cmmItemsWrap">
                    <Item
                        :item_id="key.item_user_uid"
                        :item_user_thumb="key.item_user_thumb"
                        :item_user_nm="key.item_user_nm"
                        :item_user_email="key.item_user_email"
                        :uid="key.uid"
                        :data-asdf="key.item_user_thumb"
                        :item_title="key.item_title"
                        :item_intro="key.item_intro"
                        :item_favorite="key.item_favorite"
                        :item_comment="key.item_comment"
                        :item_create_date="key.item_create_date"
                        :item_view="key.item_view"
                        :item_thumb="key.item_thumb"
                        v-for="(key, index) in guest.useritems"
                        :key="index"
                    ></Item>
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
import Item from "@/components/Item";
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
            return Object.keys(this.guest.useritems).length 
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
			console.log('mypage 진입');
			
            this.fnGetUserInfo(this.$route.params.uid);
        }
    },
    methods: {
        ...mapActions(["fnGetUserInfo"])
    },
    components: { Item }
};
</script>
