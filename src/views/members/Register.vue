<template>
    <div class="registerArea MT40">
        <div class="innerWrap">
            <roundbox class="tp2">
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
                                label="비밀번호확인"
                                required="true"
                                type="password"
                            ></forminput>
                        </div>
                    </div>
                    <div class="row MT30">
                        <div class="col8">
                            <forminput
                                id="form"
                                label="대표이미지"
                                required="true"
                                type="file"
                            ></forminput>
                        </div>
                    </div>
                    <div class="cmmsTit MT60">관련스킬</div>
                    <div class="row MT30">
                        <div class="col12">
                            <forminput
                                :label="key"
                                :id="`chk${index}`"
                                class="meta"
                                formType="checkbox"
                                v-for="(key,index) in skills"
                            ></forminput>
                        </div>
                    </div>
                </div>
                <div class="btnsWrap MT50 TXTC">
                    <btn
                        class="blue"
                        @eventBus_click="register"
                    >회원가입</btn>
                    <router-link
                        :to="{name:'main'}"
                        class="btns outline ML10"
                    >홈으로</router-link>
                </div>
            </roundbox>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
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
            userid: "",
            userpw: ""
        };
    },
    methods: {
        ...mapActions(["fnUserCreate"]),
        register() {
            this.fnUserCreate({
                userid: this.userid,
                userpw: this.userpw
            });
        }
    }
};
</script>