<template>
    <div class="container">
        <div class="mainWrap">
            <div class="cmmRibBar tp0">
                <div class="cmmItemsWrap slick">
                    <ItemSort
                        :sortitems="allitems"
                        :sort="`f`"
                        :limit_length="7"
                        :slick="true"
                        :no_btn="true"
                        v-if="allitems"
                    ></ItemSort>
                </div>
            </div>
            <div class="innerWrap">
                <div class="cmmTit sm MT40 MMB20">All Items</div>
                <div class="cmmItemsWrap">
                    <ItemSort v-if="compAllitems" :sortitems="compAllitems"></ItemSort>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemSort from "@/components/ItemSort";
import extendData from "@/data";
import { mapActions, mapMutations, mapState } from "vuex";
import { watch } from 'fs';
export default {
    extends: extendData,
    data() {
        return {
            allitems: null
        };
    },
    components: {
        ItemSort,
    },
    computed:{
        compAllitems(){
            return this.allitems
        }
    },
    created() {
        this.geIsLoading(true)
        this.fnGetAllCollection(res => {
            this.allitems = res;
            this.geIsLoading(false)
        });
    },
    mounted() {},
    methods: {
        ...mapActions(["fnGetAllCollection"]),
        ...mapMutations(['geIsLoading'])
    }
};
</script>
