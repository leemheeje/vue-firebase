<template>
    <div class="items">
        <div class="itin">

            <div class="uinf">
                <a href="javascript:;" @click="itemDetailView" class="thub" :style="`background-image: url(${main_thumb});`">
                    <div class="fblb">
                        <span class="flb tp0">
                            <i class="fas fa-eye"></i>
                            <span class="t">{{count_view}}</span>
                        </span>
                        <span class="flb tp1">
                            <i class="far fa-thumbs-up"></i>
                            <span class="t">{{favorite}}</span>
                        </span>
                        <span class="flb tp2">
                            <i class="fas fa-comment-dots"></i>
                            <span class="t">{{comment_length}}</span>
                        </span>
                    </div>
                </a>
                <div class="txts">
                    <div class="txtop">
                        <a href="javascript:;" @click="userMypageView" class="u_thub" :style="`background-image: url(${user_thumb});`"></a>
                        <span class="tt">{{title}}</span>
                        <a href="javascript:;" @click="userMypageView" class="st">{{name}}</a>
                    </div>
                    <a href="javascript:;" @click="itemDetailView" class="sts">{{stitle | filter_ellipsis(2)}}</a>
                    <a href="javascript:;" @click="itemDetailView" class="et">{{email}}</a>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {userMypageView} from '@/extend'
let ary = ['main_thumb','favorite','comment_length','count_view','user_thumb','title','name','email','stitle','uid']
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