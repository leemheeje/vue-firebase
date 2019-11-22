<template>
    <div class="container">
        <div class="mainWrap">
            <div class="cmmRibBar tp0">
                <div class="cmmItemsWrap slick">
                    <ItemSort
                        v-if="comp_data"
                        :sortitems="comp_data"
                        :sort="`f`"
                        :limit_length="7"
                        :slick="true"
                        :no_btn="true"
                        :allitems="true"
                    ></ItemSort>
                </div>
            </div>
            <div class="innerWrap">
                <div class="cmmTit sm MT40 MMB20">All Items</div>
                <div class="cmmItemsWrap">
                    <ItemSort :allitems="true" v-if="comp_data" :sortitems="comp_data"></ItemSort>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemSort from "@/components/ItemSort";
import { mapActions, mapMutations, mapState } from "vuex";
import { watch } from "fs";
export default {
    computed:{
        ...mapState(['data']),
        comp_data(){
            return this.data
        }
    },
    components: {
        ItemSort
    },
    created() {
        this.locFnGetAllCollection()
    },
    mounted() {},
    methods: {
        ...mapActions(["fnGetAllCollection"]),
        ...mapMutations(["geIsLoading", "geCmmPayload"]),
        locFnGetAllCollection(){
            this.geIsLoading(true);
            this.fnGetAllCollection(res => {
                this.geCmmPayload({
                    k: "data",
                    v: res,
                });
                this.geIsLoading(false);
            });
        }
    }
};
</script>
