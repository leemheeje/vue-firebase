<template>
<div class="container">
    <div class="mainWrap">
        <div class="cmmRibBar tp0">
            <div class="cmmItemsWrap slick">
                <ItemSort v-if="comp_data_slide && mainBestView" :sortitems="comp_data_slide" :sort="`f`" :slick="true" :no_btn="true" :allitems="false"></ItemSort>
            </div>
        </div>
        <div class="innerWrap">
            <div class="cmmTit sm MT40 MMB20">All Items</div>
            <div class="cmmItemsWrap">
                <ItemSort :allitems="true" v-if="comp_data && mainItemsView" :sortitems="comp_data"></ItemSort>
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
    data() {
        return {
            mainBestView: false,
            mainItemsView: false,
            limit_length : 7
        }
    },
    computed: {
        ...mapState(["data", "main_best"]),
        comp_data_slide() {
            let ar = this.main_best
            if (this.main_best && this.main_best.length) {
                ar = this.main_best.sort((a, b) => {
                    if (a['favorite'] > b['favorite']) {
                        return -1;
                    }
                    if (a['favorite'] < b['favorite']) {
                        return 1;
                    }
                    return 0;
                });
                if (this.limit_length) {
                    ar = ar.slice(0, this.limit_length);
                }
            }
            return ar;
        },
        comp_data() {
            return this.data;
        }
    },
    components: {
        ItemSort
    },
    created() {
        this.locFnGetAllCollection();
    },
    watch: {
        $route() {
            this.locFnGetAllCollection();
        }
    },
    mounted() {},
    methods: {
        ...mapActions(["fnGetAllCollection"]),
        ...mapMutations(["geIsLoading", "geCmmPayload"]),
        locFnGetAllCollection() {
            this.geIsLoading(true);
            let main_best_items = null;
            this.fnGetAllCollection(res => {
                this.geCmmPayload({
                    k: "data",
                    v: res
                });
                this.mainItemsView = true
                this.geIsLoading(false);
            });
            this.fnGetAllCollection(res => {
                this.geCmmPayload({
                    k: "main_best",
                    v: res
                });
                this.mainBestView = true
                this.geIsLoading(false);
            });
        }
    },
    destroyed() {
        this.mainBestView = false
        this.mainItemsView = false
    }
};
</script>