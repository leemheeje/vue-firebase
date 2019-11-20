<template>
    <div class="items">
        <div class="itin">
            <div class="uinf">
                <a
                    href="javascript:;"
                    @click="itemDetailView"
                    class="thub"
                    :style="`background-image: url(${item_thumb[0]});`"
                >
                    <div class="fblb">
                        <span class="flb tp0">
                            <i class="fas fa-eye"></i>
                            <span class="t">{{ add_item_view }}</span>
                        </span>
                        <span class="flb tp1">
                            <i class="far fa-thumbs-up"></i>
                            <span class="t">{{ item_favorite }}</span>
                        </span>
                        <span class="flb tp2">
                            <i class="fas fa-comment-dots"></i>
                            <span class="t">{{ item_comment }}</span>
                        </span>
                    </div>
                    <div class="mblb" v-if="item_thumb.length > 1">
                        <span class="t">{{ item_thumb.length - 1 }}</span>
                    </div>
                </a>
                <div class="txts">
                    <div class="txtop">
                        <a
                            href="javascript:;"
                            @click="userMypageView"
                            class="u_thub"
                            :style="
                                `background-image: url(${item_user_thumb});`
                            "
                        ></a>
                        <span class="tt">{{ item_title }}</span>
                        <a
                            href="javascript:;"
                            @click="userMypageView"
                            class="st"
                            >{{ item_intro }}</a
                        >
                        <a
                            href="javascript:;"
                            @click="itemDetailView"
                            class="sts"
                            >{{ item_user_nm }}</a
                        >
                        <a
                            href="javascript:;"
                            @click="itemDetailView"
                            class="dt"
                            >{{ item_create_date | date_after_day }}</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { userMypageView, userUpateExtend } from "@/extend";

let ary = [
    "item_id",
    "userthumb",
    "usernm",
    "userid",
    "item_user_uid",
    "item_title",
    "item_intro",
    "item_favorite",
    "item_favorite_group",
    "item_comment",
    "item_create_date",
    "item_view",
    "item_thumb",
    "item_user_nm",
    "item_user_email",
    "item_user_thumb"
];
export default {
    props: ary,
    data() {
        return {
            modalShow: false,
            add_view: 0
        };
    },
    computed: {
        ...mapState(["userDetailView"]),
        add_item_view() {
            return this.item_view + this.add_view;
        }
    },
    methods: {
        ...mapMutations(["geUserDetailView"]),
        ...mapActions(["fnUpdateUserInfo"]),
        itemDetailView(s) {
            this.add_view++;
            let v = [];
            let na = ary.forEach(r => {
                if (r == "item_view") {
                    v.push(this.add_item_view);
                } else {
                    v.push(this[r]);
                }
            });
            let k = ary;
            this.geUserDetailView({ k, v });
            this.fnUpdateUserInfo({
                item_id: this.item_user_uid,
                callback: response => {
                    let user = {};
                    let rsp = response.useritems;
                    let add_view_count =
                        rsp[`item${this.item_id}`]["item_view"] + 1;
                    user[`item${this.item_id}`] = {};
                    user[`item${this.item_id}`]["item_view"] = add_view_count;

                    this.$firestore
                        .collection("userinfo")
                        .doc(this.item_user_uid)
                        .update({
                            useritems: this.userUpateExtend(rsp, user)
                        });
                }
            });
        }
    },
    mixins: [userMypageView, userUpateExtend]
};
</script>
