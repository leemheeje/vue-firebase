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
import { mapActions, mapMutations } from "vuex";
const ar = ["pffiles"];
export default {
    data() {
        return {
            pf_file_target: null,
            pf_title: "",
            pf_intro: ""
        };
    },
    methods: {
        ...mapActions(["fnUserFileUpload"]),
        ...mapMutations(["geIsLoading"]),
        locFnUploadFile(event) {
            this.pf_file_target = event.target;
        },
        locFnPortFolioUpdate() {
            let img_ar = [];
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
                        .update({
                            pf_files: img_ar
                        });
                    this.geIsLoading(false);
                }
            });
        }
    }
};
</script>
