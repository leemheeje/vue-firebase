<template>
    <div class="footer">
        <modal
            :show="userDetailView.modalDetailViewShow"
            v-slot:itemsDetailView
        >
            <div class="modalItemView">
                <div class="hdtop">
                    <a
                        href="javascript:;"
                        @click.prevent="geUserDetailView(false)"
                        class="modalItemCloseBtn"
                    >
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="tit">아이템 상세보기</div>
                    <btn
                        href="javascript:;"
                        class="init modalItemFavoritBtn"
                        :class="
                            !isAuth
                                ? 'disabled'
                                : userDetailView.isItemFavorit
                                ? 'active'
                                : ''
                        "
                        @eventBus_click="locAddFaviorit"
                    >
                        <span class="cir"> </span>
                        <i class="fas fa-thumbs-up"></i>
                    </btn>
                </div>
                <div class="hdcont">
                    <div class="txts">
                        <a
                            href="javascript:;"
                            @click="userMypageView"
                            class="txtop"
                        >
                            <div
                                class="u_thub"
                                :style="
                                    `background-image: url(${items.item_user_thumb});`
                                "
                            ></div>
                            <span class="tt">{{ items.item_title }}</span>
                            <span class="st">{{ items.item_intro }}</span>
                            <span class="sts">{{ items.item_user_nm }}</span>
                            <span class="et">{{ items.item_user_email }}</span>
                            <span class="dt">{{
                                items.item_create_date | date_after_day
                            }}</span>
                        </a>
                    </div>
                    <div class="deFov"></div>
                    <div class="deVisual">
                        <div class="cmmRibBar">
                            <Slick
                                ref="userInfoSlick"
                                class="slick"
                                :options="slickOptions"
                                v-if="
                                    items.item_thumb &&
                                        items.item_thumb.length > 1
                                "
                            >
                                <div
                                    class="img"
                                    v-for="(k, i) in items.item_thumb"
                                    :key="i"
                                >
                                    <span class="VALIGN"></span>
                                    <img :src="k" alt="" />
                                </div>
                            </Slick>
                            <div class="img only" v-else>
                                <span class="VALIGN"></span>
                                <img :src="items.item_thumb" alt="" />
                            </div>
                        </div>
                        <div class="fblb">
                            <span class="flb tp0">
                                <i class="fas fa-eye"></i>
                                <span class="t">{{ items.item_view }}</span>
                            </span>
                            <span class="flb tp1">
                                <i class="far fa-thumbs-up"></i>
                                <span class="t">{{ items.item_favorite }}</span>
                            </span>
                            <span class="flb tp2">
                                <i class="fas fa-comment-dots"></i>
                                <span class="t">{{ items.item_comment }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="deComt">
                        <div class="cmmsTit sm">
                            <i class="fas fa-comment-dots"></i>&nbsp;{{
                                items.item_comment
                            }}개의 댓글
                        </div>
                        <div class="commtWrap MT20 MB20">
                            <div class="comtItem">
                                <span
                                    class="comtThumb"
                                    :style="
                                        `background-image:url(${items.userthumb})`
                                    "
                                ></span>
                                <div class="comtTxts">
                                    <div class="nm">
                                        {{ items.usernm }}
                                    </div>
                                    <div class="tt">
                                        Tere is my new shot for Travel app
                                        Travel App Ilustration by: Diego Leal
                                        and P-A Rochat Thanks a lot. Press "L"
                                        if u like it ! and do not forget to
                                        Follow it's important for me Cheers! :)
                                        If you want to work with me or just say
                                        something ... write to me:
                                    </div>
                                    <div class="dt">2019-09-30 15:30:16</div>
                                </div>
                                <!-- 대댓글 -->
                                <div class="commtWrap MT20 MB20">
                                    <i class="fas fa-reply"></i>
                                    <div class="comtItem">
                                        <span
                                            class="comtThumb"
                                            :style="
                                                `background-image:url(${items.userthumb})`
                                            "
                                        ></span>
                                        <div class="comtTxts">
                                            <div class="nm">
                                                {{ items.usernm }}
                                            </div>
                                            <div class="tt">
                                                {{ items.stitle }}
                                            </div>
                                            <div class="dt">
                                                2019-09-30 15:30:16
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="comtItem">
                                <span
                                    class="comtThumb"
                                    :style="
                                        `background-image:url(${items.userthumb})`
                                    "
                                ></span>
                                <div class="comtTxts">
                                    <div class="nm">
                                        {{ items.usernm }}
                                    </div>
                                    <div class="tt">
                                        {{ items.stitle }}
                                    </div>
                                    <div class="dt">2019-09-30 15:30:16</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="deComtField" v-if="isAuth">
                        <textarea
                            class="textarea"
                            placeholder="댓글을 작성해주세요."
                        ></textarea>
                        <btn class="block blue MT10">댓글등록</btn>
                    </div>
                    <div class="deComtField" v-else>
                        <div class="deComtDimm">
                            <span class="tt">로그인후 이용가능 합니다.</span>
                            <btn @eventBus_click="login" class="blue md green"
                                >로그인하러가기</btn
                            >
                        </div>

                        <textarea class="textarea" placeholder=""></textarea>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Slick from "vue-slick";
import { userMypageView } from "@/extend";
export default {
    props: [],
    data() {
        return {
            slickOptions: {
                dots: true,
                adaptiveHeight: true
            },
            items: null,
            item_id:null,
            item_user_uid:null,
        };
    },
    computed: {
        ...mapState(["isAuth", "user", "userDetailView"]),
        ...mapGetters(["getOnceAllitem"]),
        isModalShow() {
            return this.userDetailView.modalDetailViewShow;
        }
    },
    watch: {
        isModalShow() {
            if (this.isModalShow) {
                this.item_id= this.userDetailView.item_id
                this.item_user_uid= this.userDetailView.item_user_uid
                this.items = this.getOnceAllitem({
                    item_id: this.item_id,
                    item_user_uid: this.item_user_uid
                });
            }
        }
    },
    methods: {
        ...mapMutations(["geUserDetailView"]),
        ...mapActions(["fnOnceAllitemUpdate"]),
        login() {
            this.geUserDetailView(false);
            setTimeout(() => {
                this.$router.push({ name: "login" });
            }, 350);
        },
        locAddFaviorit() {
            if (!this.isAuth) {
                this.$Ui.confirm(
                    "로그인후 이용가능합니다.\n로그인하시겠습니까?",
                    () => {
                        this.$router.push({ name: "login" });
                    }
                );
                return;
            }
            if (this.userDetailView.isItemFavorit) {
                this.$Ui.alert("이미 좋아요를 누른 아이템입니다");
                return;
            }
            let fav_array = this.items.item_favorite_group;
            fav_array.push(this.user.uid);
            let fav_length = fav_array.length;
            this.fnOnceAllitemUpdate({
                item_id: this.items.item_id,
                item_user_uid: this.items.item_user_uid,
                value: {
                    item_favorite_group: fav_array,
                    item_favorite: fav_length
                }
            });
            this.geUserDetailView({
                isItemFavorit: true
            });
        }
    },
    components: { Slick },
    mixins: [userMypageView]
};
</script>
