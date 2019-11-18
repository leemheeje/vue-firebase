<template>
  <div class="footer">
    <modal :show="userDetailView.modalDetailViewShow" v-slot:itemsDetailView>
            <div class="modalItemView">
                <div class="hdtop">
                    <a href="javascript:;" @click.prevent="geUserDetailView(false)" class="modalItemCloseBtn">
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="tit">아이템 상세보기</div>
                    <a href="javascript:;" class="modalItemFavoritBtn">
                        <span class="cir">
                        </span>
                        <i class="fas fa-thumbs-up"></i>
                    </a>
                </div>
                <div class="hdcont">
                     <div class="txts">
                        <a href="javascript:;" @click="userMypageView" class="txtop">
                            <div class="u_thub" :style="`background-image: url(${userDetailView.userthumb});`"></div>
                            <span class="tt">{{userDetailView.item_title}}</span>
                            <span class="st">{{userDetailView.item_intro}}</span>
                            <span class="st">{{userDetailView.item_create_date}}</span>
                        </a>
                        <span class="sts">{{userDetailView.usernm}}</span>
                        <span class="et">{{userDetailView.userid}}</span>
                    </div>
                    <div class="deFov"></div>
                    <div class="deVisual">
                        <div class="img cmmRibBar">
                                <Slick ref="userInfoSlick" class="slick" :options="slickOptions" v-if="userDetailView.item_thumb.length > 1">
                                    <img :src="k" v-for="(k,i) in userDetailView.item_thumb" :key="i" alt="">
                                </Slick>
                                <img :src="userDetailView.item_thumb" alt="" v-else>
                        </div>
                        <div class="fblb">
                            <span class="flb tp0">
                                <i class="far fa-thumbs-up"></i> 
                                <span class="t">{{userDetailView.item_favorite}}</span>
                            </span>
                            <span class="flb tp1">
                                <i class="fas fa-comment-dots"></i>
                                <span class="t">{{userDetailView.item_comment}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="deComt">
                        <div class="cmmsTit sm"><i class="fas fa-comment-dots"></i>&nbsp;{{userDetailView.item_comment}}개의 댓글</div>
                        <div class="commtWrap MT20 MB20">

                            <div class="comtItem">
                                <span class="comtThumb" :style="`background-image:url(${userDetailView.userthumb})`"></span>
                                <div class="comtTxts">
                                    <div class="nm">{{userDetailView.usernm}}</div>
                                    <div class="tt">
                                        Tere is my new shot for Travel app
                                        Travel App

                                        Ilustration by: Diego Leal and P-A Rochat
                                        Thanks a lot.

                                        Press "L" if u like it !

                                        and do not forget to Follow it's important for me
                                        Cheers! :)

                                        If you want to work with me or just say something ...
                                        write to me:
                                    </div>
                                    <div class="dt">2019-09-30 15:30:16</div>
                                </div>
                                <!-- 대댓글 -->
                                <div class="commtWrap MT20 MB20">
                                    <i class="fas fa-reply"></i>
                                    <div class="comtItem">
                                        <span class="comtThumb" :style="`background-image:url(${userDetailView.userthumb})`"></span>
                                        <div class="comtTxts">
                                            <div class="nm">{{userDetailView.usernm}}</div>
                                            <div class="tt">{{userDetailView.stitle}}</div>
                                            <div class="dt">2019-09-30 15:30:16</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="comtItem">
                                <span class="comtThumb" :style="`background-image:url(${userDetailView.userthumb})`"></span>
                                <div class="comtTxts">
                                    <div class="nm">{{userDetailView.usernm}}</div>
                                    <div class="tt">{{userDetailView.stitle}}</div>
                                    <div class="dt">2019-09-30 15:30:16</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="deComtField" v-if="isAuth">
                        <textarea class="textarea" placeholder="댓글을 작성해주세요."></textarea>
                        <btn class="block blue MT10">댓글등록</btn>
                    </div>
                    <div class="deComtField" v-else>
                        <div class="deComtDimm">
                            <span class="tt">로그인후 이용가능 합니다.</span>
                            <btn @eventBus_click="login" class="blue md green">로그인하러가기</btn>
                        </div>
                        
                        <textarea class="textarea" placeholder=""></textarea>
                    </div>
                </div>
            </div>
        </modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Slick from 'vue-slick'
import {userMypageView} from '@/extend'
export default {
  props:[],
  data(){
      return {
          slickOptions:{
              dots: true,
          }
      }
  },
  computed:{
    ...mapState(['isAuth','userDetailView']),
    uid(){
      return this.userDetailView.uid
    }
  },
  methods: {
        ...mapMutations(['geUserDetailView']),
        login(){
            this.geUserDetailView(false)
            setTimeout(()=>{
                this.$router.push({name:'login'})
            }, 350)
        }
  },
  components: {Slick},
  mixins:[userMypageView]
};
</script>
