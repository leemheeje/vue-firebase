<template>
    <div class="items">
        <div class="itin">
            <div class="uinf">
                <a
                    href="javascript:;"
                    @click="itemDetailView"
                    class="thub"
                    :style="
                        `background-image: url(${item_info.item_thumb[0]});`
                    "
                >
                    <div class="fblb">
                        <span class="flb tp0">
                            <i class="fas fa-eye"></i>
                            <span class="t">{{ item_info.item_view }}</span>
                        </span>
                        <span class="flb tp1">
                            <i class="far fa-thumbs-up"></i>
                            <span class="t">{{ item_info.item_favorite }}</span>
                        </span>
                        <span class="flb tp2">
                            <i class="fas fa-comment-dots"></i>
                            <span class="t">{{ item_info.item_comment }}</span>
                        </span>
                    </div>
                    <div class="mblb" v-if="item_info.item_thumb.length > 1">
                        <span class="t">{{
                            item_info.item_thumb.length - 1
                        }}</span>
                    </div>
                </a>
                <div class="txts">
                    <div class="txtop">
                        <a
                            href="javascript:;"
                            @click="userMypageView"
                            class="u_thub"
                            :style="
                                `background-image: url(${item_info.item_user_thumb});`
                            "
                        ></a>
                        <span class="tt">{{ item_info.item_title }}</span>
                        <a
                            href="javascript:;"
                            @click="userMypageView"
                            class="st"
                            >{{ item_info.item_intro }}</a
                        >
                        <a
                            href="javascript:;"
                            @click="itemDetailView"
                            class="sts"
                            >{{ item_info.item_user_nm }}</a
                        >
                        <a
                            href="javascript:;"
                            @click="itemDetailView"
                            class="dt"
                            >{{
                                item_info.item_create_date | date_after_day
                            }}</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import { userMypageView } from "@/extend";
export default {
    props: ["item_user_uid", "item_id"],
    data() {
        return {
            modalShow: false,
            add_view: 0
        };
    },
    created() {},
    computed: {
        ...mapState(["isAuth", "user", "userDetailView"]),
        ...mapGetters(["getOnceAllitem"]),
        item_info() {
            return this.getOnceAllitem({
                item_id: this.item_id,
                item_user_uid: this.item_user_uid
            });
        },
    },
    methods: {
        ...mapMutations(["geUserDetailView"]),
        ...mapActions(["fnUpdateUserItemInfo", "fnOnceAllitemUpdate"]),
        itemDetailView(s) {
            let chkFavorite = () => {
                let ars = null;
                if (this.isAuth && this.user.uid && this.item_info) {
                    ars = this.item_info.item_favorite_group.filter(
                        ar => ar == this.user.uid
                    );
                }
                return ars&&ars.length ? true : false;
            };
            this.geUserDetailView({
                modalDetailViewShow:true,
                item_id: this.item_id,
                item_user_uid: this.item_user_uid,
                isItemFavorit: chkFavorite()
            });
            this.itemAddViewCount();
        },
        itemAddViewCount() {
            this.fnOnceAllitemUpdate({
                item_id: this.item_id,
                item_user_uid: this.item_user_uid,
                value: {
                    item_view: this.item_info.item_view + 1
                }
            });
        }
    },
    mixins: [userMypageView]
};
</script>
