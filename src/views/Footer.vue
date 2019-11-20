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
                        :class="!isAuth ? 'disabled' : isItemFavorit ? 'active' : ''"
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
                                    `background-image: url(${userDetailView.item_user_thumb});`
                                "
                            ></div>
                            <span class="tt">{{
                                userDetailView.item_title
                            }}</span>
                            <span class="st">{{
                                userDetailView.item_intro
                            }}</span>
                            <span class="sts">{{
                                userDetailView.item_user_nm
                            }}</span>
                            <span class="et">{{
                                userDetailView.item_user_email
                            }}</span>
                            <span class="dt">{{
                                userDetailView.item_create_date | date_after_day
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
                                v-if="userDetailView.item_thumb.length > 1"
                            >
                                <div
                                    class="img"
                                    v-for="(k, i) in userDetailView.item_thumb"
                                    :key="i"
                                >
                                    <span class="VALIGN"></span>
                                    <img :src="k" alt="" />
                                </div>
                            </Slick>
                            <div class="img only" v-else>
                                <span class="VALIGN"></span>
                                <img :src="userDetailView.item_thumb" alt="" />
                            </div>
                        </div>
                        <div class="fblb">
                            <span class="flb tp0">
                                <i class="fas fa-eye"></i>
                                <span class="t">{{
                                    userDetailView.item_view
                                }}</span>
                            </span>
                            <span class="flb tp1">
                                <i class="far fa-thumbs-up"></i>
                                <span class="t">{{
                                    userDetailView.item_favorite
                                }}</span>
                            </span>
                            <span class="flb tp2">
                                <i class="fas fa-comment-dots"></i>
                                <span class="t">{{
                                    userDetailView.item_comment
                                }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="deComt">
                        <div class="cmmsTit sm">
                            <i class="fas fa-comment-dots"></i>&nbsp;{{
                                userDetailView.item_comment
                            }}개의 댓글
                        </div>
                        <div class="commtWrap MT20 MB20">
                            <div class="comtItem">
                                <span
                                    class="comtThumb"
                                    :style="
                                        `background-image:url(${userDetailView.userthumb})`
                                    "
                                ></span>
                                <div class="comtTxts">
                                    <div class="nm">
                                        {{ userDetailView.usernm }}
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
                                                `background-image:url(${userDetailView.userthumb})`
                                            "
                                        ></span>
                                        <div class="comtTxts">
                                            <div class="nm">
                                                {{ userDetailView.usernm }}
                                            </div>
                                            <div class="tt">
                                                {{ userDetailView.stitle }}
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
                                        `background-image:url(${userDetailView.userthumb})`
                                    "
                                ></span>
                                <div class="comtTxts">
                                    <div class="nm">
                                        {{ userDetailView.usernm }}
                                    </div>
                                    <div class="tt">
                                        {{ userDetailView.stitle }}
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
import { mapState, mapMutations, mapActions } from "vuex";
import Slick from "vue-slick";
import { userMypageView, userUpateExtend } from "@/extend";
export default {
    props: [],
    data() {
        return {
            slickOptions: {
                dots: true,
                adaptiveHeight: true
            }
        };
    },
    computed: {
        ...mapState(["isAuth", 'user',"userDetailView" , 'isItemFavorit', 'guest']),
        item_user_uid() {
            return this.userDetailView.item_user_uid;
        }
    },
    watch:{
        userDetailView(){
            if(this.isAuth && this.userDetailView.modalDetailViewShow){ //로그인되어있고, 팝업이 열렷을때
                let ar = this.userDetailView.item_favorite_group;
                let bool = false
                console.log(ar);
                
                if(ar && ar.length){
                    for (let i = 0; i < ar.length; i++) {
                        if(ar[i] == this.user.uid){
                            bool = true
                        }
                    }
                }
                this.geCmmPayload({
                    k:'isItemFavorit',
                    v:bool
                })
                console.log('isItemFavorit' , bool);
                
            }
            
        }
    },
    methods: {
        ...mapMutations(["geUserDetailView", "geCmmPayload",'geGuestUserItem']), 
        ...mapActions(["fnUpdateUserInfo"]),
        login() {
            this.geUserDetailView(false);
            setTimeout(() => {
                this.$router.push({ name: "login" });
            }, 350);
        },
        locAddFaviorit(){
            if(!this.isAuth){
                this.$Ui.confirm('로그인후 이용가능합니다.\n로그인하시겠습니까?',()=>{
                    this.$router.push({name:'login'})
                })
                return;
            }
            if(this.isItemFavorit){
                this.$Ui.alert('이미 좋아요를 누른 아이템입니다')
                return;
            }
            this.fnUpdateUserInfo({
                item_id : this.userDetailView.item_user_uid,
                callback:res=>{
                    let items = res.useritems
                    let v_items = {}
                    v_items[`item${this.userDetailView.item_id}`] = {}
                    v_items[`item${this.userDetailView.item_id}`]['item_favorite_group'] = items[`item${this.userDetailView.item_id}`]['item_favorite_group']
                    v_items[`item${this.userDetailView.item_id}`]['item_favorite_group'].push(this.user.uid)
                    v_items[`item${this.userDetailView.item_id}`]['item_favorite'] = v_items[`item${this.userDetailView.item_id}`]['item_favorite_group'].length
                    console.log(this.userUpateExtend(items,v_items))
                    this.$firestore
                        .collection("userinfo")
                        .doc(this.userDetailView.item_user_uid)
                        .update({
                            useritems: this.userUpateExtend(items,v_items)
                        });
                    this.geGuestUserItem(this.userUpateExtend(items,v_items))
                }
            })
            this.geCmmPayload({
                k : 'isItemFavorit',
                v : true
            })
            this.userDetailView.item_favorite_group.push(this.user.uid);
            this.geUserDetailView({
                k : 'item_favorite_group',
                v : this.userDetailView.item_favorite_group
            })
            this.geUserDetailView({
                k : 'item_favorite',
                v : this.userDetailView.item_favorite + 1
            })
        }
    },
    components: { Slick },
    mixins: [userMypageView, userUpateExtend]
};
</script>
