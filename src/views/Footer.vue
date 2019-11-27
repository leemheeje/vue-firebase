<template>
<div class="footer">
    <modal :show="userDetailView.modalDetailViewShow" v-slot:itemsDetailView>
        <div class="modalItemView">
            <div class="hdtop">
                <a href="javascript:;" @click.prevent="geUserDetailView(false)" class="modalItemCloseBtn">
                        <i class="fas fa-chevron-down"></i>
                    </a>
                <div class="tit">아이템 상세보기</div>
                <btn href="javascript:;" class="init modalItemFavoritBtn" :class="
                            !isAuth
                                ? 'disabled'
                                : userDetailView.isItemFavorit
                                ? 'active'
                                : ''
                        " @eventBus_click="locAddFaviorit">
                    <span class="cir"> </span>
                    <i class="fas fa-thumbs-up"></i>
                </btn>
            </div>
            <div class="hdcont">
                <div class="txts">
                    <a href="javascript:;" @click="userMypageView" class="txtop">
                        <div class="u_thub" :style="
                                    `background-image: url(${items.item_user_thumb});`
                                "></div>
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
                        <Slick ref="userInfoSlick" class="slick" :options="slickOptions" v-if="
                                    items.item_thumb &&
                                        items.item_thumb.length > 1
                                ">
                            <div class="img" v-for="(k, i) in items.item_thumb" :key="i">
                                <span class="VALIGN"></span>
                                <a :href="k" target="_blank"><img :src="k" alt="" @click="locFnFullView(k)" /></a>
                            </div>
                        </Slick>
                        <div class="img only" v-else>
                            <span class="VALIGN"></span>
                            <a :href="items.item_thumb" target="_blank"><img :src="items.item_thumb" alt="" @click="locFnFullView(items.item_thumb)"/></a>
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
                        <i class="fas fa-comment-dots"></i>&nbsp;{{ items.item_comment }}개의 댓글
                    </div>
                    <div class="commtWrap MT20 MB20" v-if="items.item_comment_group.length">
                        <div class="comtItem" v-for="(k, i) in items.item_comment_group" :key="i">
                            <router-link class="comtThumb" :style="`background-image:url(${k.thumb})`" :to="{
                                        name: 'mypage',
                                        params: { uid: k.uid }
                                    }"></router-link>
                            <div class="comtTxts">
                                <router-link class="nm" :to="{
                                            name: 'mypage',
                                            params: { uid: k.uid }
                                        }">
                                    {{ k.name }}
                                    <span class="em">{{ k.email }}</span>
                                </router-link>
                                <pre class="tt" v-if="!k.comment_modify">{{
                                        k.comment_value
                                    }}</pre>
                                <div class="cmModify" v-else>
                                    <textarea class="textarea" placeholder="내용을 입력해주세요" v-model="comment_value_modify"></textarea>
                                </div>
                                <div class="dt">
                                    {{ k.date | date_after_day }}
                                </div>
                                <div class="btnsWrap">
                                    <btn href="javascript:;" class="btns sm green" v-if="
                                                k.uid == user.uid &&
                                                    !k.comment_modify
                                            " @eventBus_click="
                                                locModifyComments(
                                                    true,
                                                    k.date,
                                                    k.uid
                                                )
                                            ">내용 수정하기</btn>
                                    <btn href="javascript:;" class="btns sm green outline" @eventBus_click="
                                                locModifyComments(
                                                    false,
                                                    k.date,
                                                    k.uid
                                                )
                                            " v-if="k.comment_modify">수정 취소하기</btn>
                                    <btn href="javascript:;" class="btns sm blue" v-if="k.comment_modify" @eventBus_click="
                                                locUpdateComments(
                                                    true,
                                                    k.date,
                                                    k.uid
                                                )
                                            ">수정내용 적용하기</btn>
                                    <btn href="javascript:;" :class="`btns sm blue ${Object.keys(k.comment_reply).length ? 'outline' : ''}`" v-if="((items.item_user_uid == user.uid|| replyDisable) && k.email != user.email) && !k.comment_reply_modify" @eventBus_click="locReplyComment(
                                                    true,
                                                    k.date,
                                                    k.uid
                                                )">
                                        <template v-if="!Object.keys(k.comment_reply).length">
                                                <span>답변달기</span>
</template>

<template v-else>
<span>답변수정</span>
</template>
                                            </btn>
                                        <btn
                                            href="javascript:;"
                                            class="btns sm red"
                                            v-if="(items.item_user_uid == user.uid|| deleteDisable) && k.email != user.email"
                                            @eventBus_click="
                                                locUpdateComments(
                                                    false,
                                                    k.date,
                                                    k.uid
                                                )
                                            "
                                            >댓글삭제</btn
                                        >
                                        <btn
                                            href="javascript:;"
                                            class="btns sm gray"
                                            v-if="((items.item_user_uid == user.uid|| replyDisable) && k.email != user.email) && k.comment_reply_modify"
                                             @eventBus_click="locReplyComment(
                                                    false,
                                                    k.date,
                                                    k.uid
                                                )"
                                            >답변취소하기</btn
                                        >
                                        <btn
                                            href="javascript:;"
                                            class="btns sm green"
                                            v-if="((items.item_user_uid == user.uid|| replyDisable) && k.email != user.email) && k.comment_reply_modify"
                                            @eventBus_click="locUpdateReplyComment(
                                                true,
                                                k.date,
                                                k.uid
                                            )"
                                            >답변등록하기</btn
                                        >
                                    </div>
                                </div>
                                <div class="cmModify" v-if="k.comment_reply_modify">
                                    <textarea class="textarea" v-model="comment_reply_value" placeholder="답변을 작성해주세요."></textarea>
                                </div>
                                <!-- 대댓글 -->
                                <div
                                    class="commtWrap MT20 MB20"
                                    v-if="Object.keys(k.comment_reply).length"
                                >
                                    <i class="fas fa-reply"></i>
                                    <div class="comtItem">
                                        <span
                                            class="comtThumb"
                                            :style="
                                                `background-image:url(${k.comment_reply.thumb})`
                                            "
                                        ></span>
                                        <div class="comtTxts">
                                            <div class="nm">
                                                {{ k.comment_reply.name }}
                                            </div>
                                            <pre class="tt">{{ k.comment_reply.comment_reply_value }}</pre>
                                            <div class="dt">
                                                {{ k.comment_reply.date | date_after_day }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="commtWrap MT20 MB20 TXTC"
                            style="font-size: 13px;"
                            v-else
                        >
                            댓글을 작성해주세요.
                        </div>
                    </div>
                    <div class="deComtField" v-if="isAuth">
                        <textarea
                            class="textarea"
                            placeholder="댓글을 작성해주세요."
                            v-model="comment_value"
                        ></textarea>
                        <btn
                            class="block blue MT10"
                            @eventBus_click="locAddComments"
                            >댓글등록</btn
                        >
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
            item_id: null,
            item_user_uid: null,
            comment_value: "",
            comment_value_modify: "",
            deleteDisable: false,
            replyDisable: false,
            comment_reply_value: "",
            comment_reply_modify: "",
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
                this.item_id = this.userDetailView.item_id;
                this.item_user_uid = this.userDetailView.item_user_uid;
                this.items = this.getOnceAllitem({
                    item_id: this.item_id,
                    item_user_uid: this.item_user_uid
                });
                if (this.Auth) {
                    if (this.user.uid != this.item_user_uid) {
                        this.deleteDisable = true;
                        this.replyDisable = true;
                    } else {
                        this.deleteDisable = false;
                        this.replyDisable = false;
                    }
                }
            }
        }
    },
    methods: {
        ...mapMutations(["geUserDetailView", "geOnceAllitemUpdate"]),
        ...mapActions(["fnOnceAllitemUpdate", "fnOnceAllitemInComment"]),
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
        },
        locAddComments() {
            //this.items
            //this.user.name
            //this.user.email
            //this.user.thumb
            //this.user.uid / 댓글유저 페이지갈때
            //this.comment_value
            if (this.comment_value != "") {
                this.items.item_comment_group.push({
                    name: this.user.name,
                    email: this.user.email,
                    thumb: this.user.thumb,
                    date: this.$current_date_live(new Date()),
                    uid: this.user.uid,
                    comment_value: this.comment_value,
                    comment_modify: false,
                    comment_reply_modify: false,
                    comment_reply: {}
                });
                this.items.item_comment = this.items.item_comment + 1;
                this.comment_value = "";
                this.fnOnceAllitemUpdate({
                    item_id: this.items.item_id,
                    item_user_uid: this.items.item_user_uid,
                    value: {
                        item_comment_group: this.items.item_comment_group,
                        item_comment: this.items.item_comment
                    }
                });
            }
        },
        locModifyComments(bool, date, uid) {
            console.log(date, uid);
            //코멘트 그룹 수정
            this.geOnceAllitemUpdate({
                target: "comment",
                item_id: this.items.item_id,
                item_user_uid: this.items.item_user_uid,
                date: date,
                uid: uid,
                value: {
                    comment_modify: bool
                }
            });
        }, //comment_value_modify
        locUpdateComments(bool, date, uid) {
            let defaults = {
                target: "comment",
                item_id: this.items.item_id,
                item_user_uid: this.items.item_user_uid,
                date: date,
                uid: uid
            };
            if (bool) {
                this.fnOnceAllitemInComment(
                    this.$extend(defaults, {
                        value: {
                            comment_modify: false,
                            date: this.$current_date_live(new Date()),
                            comment_value: this.comment_value_modify
                        }
                    })
                );
            } else {
                this.$Ui.confirm(
                    "댓글을 삭제하시겠습니까?\n삭제시 복구 불가합니다.",
                    () => {
                        this.fnOnceAllitemInComment(
                            this.$extend(defaults, {
                                value: false
                            })
                        );
                    }
                );
            }
            this.comment_value_modify = "";
        },
        locReplyComment(bool, date, uid) {
            console.log(date, uid);
            //코멘트 그룹 수정
            this.geOnceAllitemUpdate({
                target: "comment",
                item_id: this.items.item_id,
                item_user_uid: this.items.item_user_uid,
                date: date,
                uid: uid,
                value: {
                    comment_reply_modify: bool
                }
            });
        },
        locUpdateReplyComment(bool, date, uid) {
            let defaults = {
                target: "comment",
                item_id: this.items.item_id,
                item_user_uid: this.items.item_user_uid,
                date: date,
                uid: uid
            };
            if (bool) {
                this.fnOnceAllitemInComment(
                    this.$extend(defaults, {
                        value: {
                            comment_reply_modify: false,
                            comment_reply: {
                                name: this.user.name,
                                email: this.user.email,
                                thumb: this.user.thumb,
                                date: this.$current_date_live(new Date()),
                                uid: this.user.uid,
                                comment_reply_value: this.comment_reply_value
                            }
                        }
                    })
                );
            }
        },
        locFnFullView(img) {
            console.log(img);

        }
    },
    components: { Slick },
    mixins: [userMypageView]
};
</script>
