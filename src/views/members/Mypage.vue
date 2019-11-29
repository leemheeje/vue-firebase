<template>
<div class="container gray">
    <div class="mypageWrap">
        <div class="mypage_userinfo">
            <div class="mypage_box active">
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
            <a href="javascript:;" class="btns block init mobileShow mobItemDetailBtn" @click="!item_detail_view ? item_detail_view = true : item_detail_view = false">
                {{!item_detail_view ? '등록게시물 상세정보 확인하기' : '등록게시물 상세정보 닫기'}}
            </a>
            <div class="mypage_box MT10" :class="item_detail_view?'active':''" v-if="guest.user_skills_model">
                <div class="tit">보유한 스킬</div>
                <div class="cont MT15">
                    <div class="tag_area cmmInput radiochk meta" v-for="(k, i) in guest.user_skills_model" :key="i">
                        <span class="lb">{{ k }}</span>
                        <!-- <ahref href="/" class="tag" v-if="userSkills" v-for="(key,index) in userSkills">{{guestSkills[index]}}</ahref> -->
                    </div>
                </div>
            </div>
        </div>


        <div class="mypage_right" :class="item_detail_view?'active':''">
            <div class="mypage_box">
                <div class="tit">총 게시물 현황</div>
                <ul class="list_txt MT15">
                   <li class="tp">
                        <i class="fas fa-eye"></i>
                        <span class="txt">{{data_view_math | filter_comma}}명이 확인하였습니다.</span>
                    </li>
                    <li class="tp">
                        <i class="far fa-thumbs-up"></i>
                        <span class="txt">{{data_favo_math | filter_comma}}명이 좋아요를 눌렀습니다.</span>
                    </li>
                    <li class="tp">
                        <i class="fas fa-comment-dots"></i>
                        <span class="txt">{{data_comm_math | filter_comma}}개의 댓글이 있습니다.</span>
                    </li>
                </ul>
            </div>
            <div class="mypage_box" v-if="guest.useritems.length && data_last_comt.leng">
                <div class="tit">
                    최근에 달린 댓글
                    <span style="cursor: default;" class="btns sm outline green ML10" v-if="Object.keys(data_last_comt.comment_reply).length">답변완료</span>
                    <a href="javascript:;" @click="itemDetailView(`data_last_comt`)" class="btns sm green ML10" v-else>답변달기</a>
                </div>
                <div class="list_conf">
                    <a href="javascript:;" class="conf_th" @click="itemDetailView(`data_last_comt`)" :style="`background-image:url(${data_last_comt.thumb})`"></a>
                    <div class="txts">
                        <a href="javascript:;" @click="itemDetailView(`data_last_comt`)" class="dt">{{data_last_comt.title}}</a>
                        <a href="javascript:;" @click="itemDetailView(`data_last_comt`)" class="dd">{{data_last_comt.comment}}</a>
                    </div>
                </div>
            </div>

            <div class="mypage_box" v-if="guest.useritems.length">
                <div class="tit">가장많은 추천의 게시물</div>
                <ul class="list_fv">
                    <li class="tp" v-if="data_favo_many">
                        <a href="javascript:;" class="th" @click="itemDetailView(`data_favo_many`)" :style="`background-image:url(${data_favo_many.item_thumb[0]})`"></a>
                        <a href="javascript:;" class="txt" @click="itemDetailView(`data_favo_many`)">
                            <span class="cr">추천수 : {{data_favo_many.item_favorite | filter_comma}}</span>
                            {{data_favo_many.item_title}}
                        </a>
                    </li>
                </ul>
            </div>





        </div>


        <div class="cmmItemsWrap">
            <div class="cmmitembox">
                <ItemSort sort="n" v-if="guest.useritems && mypageItemView" :sortitems="guest.useritems" :no_btn="true"></ItemSort>
            </div>
        </div>


    </div>
    <router-link :to="{ name: 'create', params: user.uid }" v-if="isAuth && user.uid == $route.params.uid" class="animated bounceIn btnCreate"><i class="fas fa-plus"></i></router-link>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import ItemSort from "@/components/ItemSort";
import { log } from 'util';
export default {
    data() {
        return {
            stateSelector: null,
            mypageItemView: false,
            item_detail_view: false
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
        },
        data_view_math() {
            return this.guest.useritems && !this.guest.useritems.length ? 0 : this.locFnMath({
                array: this.guest.useritems,
                key: 'item_view'
            })
        },
        data_favo_math() {
            return this.guest.useritems && !this.guest.useritems.length ? 0 : this.locFnMath({
                array: this.guest.useritems,
                key: 'item_favorite'
            })
        },
        data_comm_math() {
            return this.guest.useritems && !this.guest.useritems.length ? 0 : this.locFnMath({
                array: this.guest.useritems,
                key: 'item_comment'
            })
        },
        data_last_comt() {
            let array = this.guest.useritems
            let leng = 0
            let v_array = []
            let obj = {}

            if (array && array.length) {

                let va = {}
                for (let i = 0; i < array.length; i++) {
                    if (array[i].item_comment_group.length) {
                        leng = true
                        for (let q = 0; q < array[i].item_comment_group.length; q++) {
                            va = array[i].item_comment_group[q]
                            va['v_title'] = array[i].item_title
                            va['v_thumb'] = array[i].item_thumb[0]
                            va['v_item_id'] = array[i].item_id
                            va['v_item_user_uid'] = array[i].item_user_uid
                            v_array.push(va)
                        }
                    }
                }
                obj = v_array.sort((a, b) => {
                    if (a.date > b.date) {
                        return -1;
                    }
                    if (a.date < b.date) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    leng,
                    title: v_array.length ? obj[0]['v_title'] : '',
                    comment: v_array.length ? obj[0].comment_value : '',
                    thumb: v_array.length ? obj[0]['v_thumb'] : '',
                    item_id: v_array.length ? obj[0]['v_item_id'] : '',
                    item_user_uid: v_array.length ? obj[0]['v_item_user_uid'] : '',
                    comment_reply: v_array.length ? obj[0].comment_reply : '',
                }
            }
        },
        data_favo_many() {
            if (this.guest.useritems.length >= 1) {
                let v_array0 = this.locFnSortFavorite(`item_favorite`)
                return v_array0[0]
            } else {
                return false
            }
        },
        item_info() {
            return (gubun) => {
                return this.getOnceAllitem({
                    item_id: this[gubun].item_id,
                    item_user_uid: this[gubun].item_user_uid
                });
            }
        },
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
        ...mapMutations(["geCmmPayload", "geIsLoading", 'geUserDetailView']),
        locFnGetAllCollection() {
            this.fnGetAllCollection(async res => {
                this.geCmmPayload({
                    k: "data",
                    v: res
                });
                await this.fnGetUserInfo(this.params_uid)
                this.mypageItemView = true
            });

        },
        locFnMath(params) {
            if (typeof params !== 'undefined') {
                let { array, key } = params
                let sum = array ? array[0][key] : ''
                if (array.length > 1) {
                    sum = array.reduce((n, c) => {
                        if(typeof n === 'object'){
                            n = n[key]
                        }
                        return Number(n + c[key])
                    })

                }else{
                    sum = array[0][key]
                }
                return sum
            } else {
                return 0
            }
        },
        itemDetailView(_t) {
            let chkFavorite = () => {
                let ars = null;
                if (this.isAuth && this.user.uid && this.item_info(_t)) {
                    ars = this.item_info(_t).item_favorite_group.filter(
                        ar => ar == this.user.uid
                    );
                }
                return ars && ars.length ? true : false;
            };
            this.geUserDetailView({
                modalDetailViewShow: true,
                item_id: this[_t].item_id,
                item_user_uid: this[_t].item_user_uid,
                isItemFavorit: chkFavorite()
            });
        },
        locFnSortFavorite(str) {
            let array = this.guest.useritems
            if (array.length) {
                array.sort((a, b) => {
                    if (a[str] > b[str]) {
                        return -1
                    } else if (a[str] < b[str]) {
                        return 1
                    }
                    return 0
                })
                return array
            } else {
                return false
            }
        },
    },
    components: { ItemSort },
    destroyed() {
        this.mypageItemView = false
    }
};
</script>
