<template>
    <div class="container">
        <div class="innerWrap">
            <roundbox>
                <div class="cmmTit">포트폴리오 등록하기</div>
                <div class="reserFormArea MT30">
                    <div class="row">
                        <div class="col8">
                            <forminput
                                label="제목"
                                required="true"
                                v-model="pf_title"
                                type="text"
                            ></forminput>
                        </div>
                    </div>
                    <div class="row MT30">
                        <div class="col8">
                            <forminput
                                label="설명"
                                required="true"
                                v-model="pf_intro"
                                formType="textarea"
                            ></forminput>
                        </div>
                    </div>
                    <div class="row MT30">
                        <div class="col8">
                            <input
                                type="file"
                                @change="locFnUploadFile"
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div class="btnsWrap MT50 TXTC">
                    <btn
                        href="javascript:;"
                        @eventBus_click="locFnPortFolioUpdate"
                        class="blue"
                        >등록하기</btn
                    >
                    <router-link
                        :to="{ name: 'main' }"
                        class="btns outline ML10"
                        >홈으로</router-link
                    >
                </div>
            </roundbox>
        </div>
    </div>
</template>
<script>
import { mapState,mapActions, mapMutations } from "vuex";
const ar = ["pffiles"];
export default {
    data() {
        return {
            pf_file_target: null,
            pf_title: "",
            pf_intro: "",
            pt_date: ""
        };
    },
    computed:{
        ...mapState(['user'])
    },
    methods: {
        ...mapActions(["fnUserFileUpload"]),
        ...mapMutations(["geIsLoading"]),
        locFnUploadFile(event) {
            this.pf_file_target = event.target;
        },
        locFnPortFolioUpdate() {
            let img_ar = [];
            let getTime = this.$current_date_live(new Date())
            this.geIsLoading({
                bool: true
            });
            this.fnUserFileUpload({
                data: this.pf_file_target,
                callback: c => {
                    img_ar.push(c);
                    this.$firestore
                        .collection("userinfo")
                        .doc(this.$route.params.uid)
                        .get()
                        .then(res => {
                            let d = res.data();
                            let res_d = [];
                            this.pt_date = this.$options.filters.date_format(
                                this.$current_date
                            );
                            if (d.useritems) {
                                console.log(this.user.thumb);
                                
                                res_d[`useritems`] = d.useritems;
                                res_d[`useritems`][`item${getTime}`] = {
                                    item_id : `${getTime}`,
                                    item_thumb: img_ar,//포트폴리오 썸네일 array
                                    item_title: this.pf_title,
                                    item_intro: this.pf_intro,
                                    item_favorite: 0,
                                    item_view: 0,
                                    item_comment: 0,
                                    item_create_date: this.pt_date,
                                    item_comment_group: [],
                                    item_user_nm : this.user.name,
                                    item_user_email : this.user.email,
                                    item_user_thumb : this.user.thumb,
                                    item_user_uid : this.user.uid,
                                };
                                this.$firestore
                                    .collection("userinfo")
                                    .doc(this.$route.params.uid)
                                    .update({
                                        useritems: res_d[`useritems`]
                                    });
                            }
                            this.geIsLoading(false);
                            this.$router.push({name:'mypage' , params:this.$route.params.uid})
                        });
                    
                }
            });
        }
    }
};
</script>
