<template>
    <div class="items">
        <div class="itin">

            <div class="uinf">
                <a href="javascript:;" @click="itemDetailView" class="thub" :style="`background-image: url(${item_thumb[0]});`">
                    <div class="fblb">
                        <span class="flb tp0">
                            <i class="fas fa-eye"></i>
                            <span class="t">{{item_view}}</span>
                        </span>
                        <span class="flb tp1">
                            <i class="far fa-thumbs-up"></i>
                            <span class="t">{{item_favorite}}</span>
                        </span>
                        <span class="flb tp2">
                            <i class="fas fa-comment-dots"></i>
                            <span class="t">{{item_comment}}</span>
                        </span>
                    </div>
                </a>
                <div class="txts">
                    <div class="txtop">
                        <a href="javascript:;" @click="userMypageView" class="u_thub" :style="`background-image: url(${item_user_thumb});`"></a>
                        <span class="tt">{{item_title}}</span>
                        <a href="javascript:;" @click="userMypageView" class="st">{{item_intro}}</a>
                    </div>
                    <a href="javascript:;" @click="itemDetailView" class="et">{{item_user_nm}}</a>
                    <a href="javascript:;" @click="itemDetailView" class="et">{{item_create_date}}</a>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {userMypageView} from '@/extend'






let ary = ['item_id','userthumb','usernm','userid','uid','item_title','item_intro','item_favorite','item_comment','item_create_date','item_view','item_thumb','item_user_nm','item_user_email','item_user_thumb']
export default{
    props:ary,
    data(){
        return {
            modalShow : false
        }
    },
    computed: {
        ...mapState(['userDetailView'])
    },
    methods: {
        ...mapMutations(['geUserDetailView']),
        itemDetailView(){
            //this.modalShow=true;
            let v = []
            let na = ary.forEach(r=>{
                v.push(this[r])
            })
            let k = ary
            this.geUserDetailView({k,v})
        },
    },
    mixins:[userMypageView]
}
</script>