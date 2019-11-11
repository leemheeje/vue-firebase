<template>
    <div class="cmmInput radiochk" v-if="formType == 'checkbox'">
        <input type="checkbox" :id="id" name="USR_PTYE" :value="label" />
        <label :for="id" class="lb">{{label}}</label>
    </div>
    <div class="cmmInput radiochk" v-else-if="formType == 'radio'">
        <input type="radio" id="agr03" name="unity_use_agree" value="Y" />
        <label for="agr03" class="lb">{{label}}</label>
    </div>
    <div class="cmmInput" v-else-if="formType == 'select'">
        <div class="cmmInput">
            <div class="ip">
                <select class="select tp2" name="CLIENT_TECH_PERSON">
                    <option value="없음">없음</option>
                    <option value="1명">1명</option>
                    <option value="2~5명">2~5명</option>
                    <option value="6~10명">6~10명</option>
                    <option value="11명 이사">11명 이상</option>
                </select>
            </div>
        </div>
    </div>
    <div class="cmmInput" v-else>
        <template v-if="type == 'file'">
            <span :class="required ? `lb required` : 'lb'">{{label}}</span>
            <div class="cmmInputFile fakFile">
                <div class="ip">
                    <input
                        :type="type"
                        :class="cssClass"
                        :name="name"
                        :id="id"
                        :title="title"
                        :placeholder="placeholder"
                        @input="eventBusInputVmodel"
                        @keyup.enter="eventBusKeyupEnter"
                    />
                </div>
                <label :for="id" class="btns blue">파일첨부</label>
            </div>
        </template>
        <template v-else>
            <label :for="id" :class="required ? `lb required` : 'lb'">{{label}}</label>
            <div class="ip">
                <input
                    :type="type"
                    :class="cssClass"
                    :name="name"
                    :id="id"
                    :title="title"
                    :placeholder="placeholder"
                    @input="eventBusInputVmodel"
                    @keyup.enter="eventBusKeyupEnter"
                />
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: [
        "formType",
        "type",
        "label",
        "name",
        "title",
        "id",
        "cssClass",
        "minlength",
        "maxlength",
        "readonly",
        "placeholder",
        "required"
    ],
    methods: {
        eventBusInputVmodel(event) {
            this.$emit("input", event.target.value);
        },
        eventBusKeyupEnter() {
            this.$emit("eventBus_keyup_enter");
        }
    }
};
</script>