<template>
    <div class="container">
        <div class="innerWrap">
            <roundbox>
                <div class="cmmTit">회원가입</div>
                <div class="reserFormArea MT30">
                    <div class="row">
                        <div class="col4">
                            <forminput
                                label="이메일"
                                required="true"
                                v-model="userid"
                                type="email"
                            ></forminput>
                        </div>
                        <div class="col4 MMT30">
                            <forminput
                                label="이름"
                                required="true"
                                v-model="usernm"
                                type="text"
                            ></forminput>
                        </div>
                    </div>
                    <div class="row MT30">
                        <div class="col4">
                            <forminput
                                label="비밀번호"
                                required="true"
                                v-model="userpw"
                                type="password"
                            ></forminput>
                        </div>
                        <div class="col4 MMT30">
                            <forminput
                                label="비밀번호 확인"
                                required="true"
                                v-model="userpwcf"
                                type="password"
                            ></forminput>
                        </div>
                    </div>
                    <div class="row MT30">
                        <div class="col8">
                            <forminput
                                label="간략소개"
                                required="true"
                                v-model="userintro"
                                formType="textarea"
                            ></forminput>
                        </div>
                    </div>
                    <div class="row MT30">
                        <div class="col4">
                            <input @change="fileUpload" type="file" />
                        </div>
                        <div class="col4 MMT30">
                            <forminput
                                label="소속/직급"
                                required="true"
                                v-model="usercomp"
                                type="text"
                            ></forminput>
                        </div>
                    </div>

                    <div class="cmmsTit MT60 required">관련스킬 <small>(하나이상 선택해주세요.)</small></div>
                    <div class="row MT30">
                        <div class="col12">

                            <div
                                class="cmmInput radiochk meta"
                                formType="checkbox"
                                v-for="(k, i) in skills"
                                :key="i"
                            >
                                <input
                                    type="checkbox"
                                    :id="`chk${i}`"
                                    :name="`chk${i}`"
                                    :value="k"
                                    v-model="user_skills_model"
                                />
                                <label :for="`chk${i}`" class="lb">{{ k }}</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="btnsWrap MT50 TXTC">
                    <btn href="javascript:;" class="blue" @eventBus_click="register">회원가입</btn>
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
export default {
    data() {
        return {
            skills: [
                "웹기획",
                "웹서비스기획",
                "모바일기획",
                "컨텐츠기획",
                "PM",
                "UI설계",
                "스토리보드",
                "제안·컨설팅",
                "정보설계",
                "통계·로그분석",
                "웹PD",
                "사용자평가",
                "네트워크관리",
                "서버관리자",
                "시스템운영",
                "네트워크엔지니어",
                "서버구축",
                "Linux",
                "보안관리",
                "정보보안",
                "보안기술",
                "Windows",
                "방화벽",
                "보안관제",
                "Unix",
                "LAN",
                "CCNA",
                "Cisco",
                "POS",
                "Apache",
                "MCSE",
                "IIS",
                "Solaris",
                "포토샵",
                "일러스트레이터",
                "HTML",
                "UI·UX디자인",
                "웹UI",
                "모바일UI",
                "CSS",
                "플래쉬",
                "드림위버",
                "GUI",
                "Sketch",
                "웹퍼블리셔",
                "자바스크립트",
                "HTML5",
                "HTML코딩",
                "CSS",
                "UI·UX",
                "웹표준",
                "CSS3",
                "웹접근성",
                "Java",
                "웹프로그래머",
                "jsp",
                "MySQL",
                "php",
                "SQL",
                "MS-SQL",
                ".NET",
                "AJAX",
                "asp",
                "MiPlatform",
                "Servlet",
                "xml",
                "mHTML",
                "APM",
                "HDML",
                "WinForm",
                "VB.NET",
                "SCJP",
                "EJB",
                "cgi",
                "VRML"
            ],
            user_skills_model: [],
            userid: "",
            userpw: "",
            userpwcf: "",
            usernm: "",
            usercomp: "",
            userintro: "df",
            userthumb: null
        };
    },
    methods: {
        fileUpload(event) {
            this.userthumb = event.target;
        },
        ...mapActions(["fnUserCreate", "fnUserFileUpload"]),
        ...mapMutations(["geUserDetailView"]),
        register() {
            if (
                !this.userid ||
                !this.userpw ||
                !this.usernm ||
                !this.userthumb ||
                !this.userintro||
                !this.user_skills_model.length
            ) {
                alert("회원정보를 입력해주세요");
                return;
            }
            if (this.userpw != this.userpwcf) {
                alert("비밀번호가 일치하지않습니다.");
                return;
            }
            let userinfo = {
                userid: this.userid,
                usernm: this.usernm,
                userthumb: this.userthumb,
                usercomp: this.usercomp,
                userintro: this.userintro,
                user_skills_model: this.user_skills_model,
                useritems: {}
            };
            this.fnUserCreate(userinfo);
        }
    }
};
</script>
