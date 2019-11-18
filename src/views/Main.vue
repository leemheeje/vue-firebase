<template>
    <div class="container">
        <div class="mainWrap">
            <div class="cmmRibBar">
                <div class="cmmItemsWrap slick">
                    <Slick ref="slick" :options="slickOptions" v-if="allitems">
                       <Item
                        :item_id="key.item_id"
                        :userthumb="key.item_user_thumb"
                        :usernm="key.item_user_nm"
                        :userid="key.item_user_email"
                        :uid="key.item_user_uid"
                        :item_title="key.item_title"
                        :item_intro="key.item_intro"
                        :item_favorite="key.item_favorite"
                        :item_comment="key.item_comment"
                        :item_create_date="key.item_create_date"
                        :item_view="key.item_view"
                        :item_thumb="key.item_thumb"
                        v-for="(key, index) in allitems"
                        :key="index"
                    ></Item>
                    </Slick>
                </div>
            </div>
            <div class="innerWrap">
                <div class="cmmTit sm MT40 MMB20">All Items</div>
                <div class="cmmItemsWrap">
                    <Item
                        :item_id="key.item_id"
                        :userthumb="key.item_user_thumb"
                        :usernm="key.item_user_nm"
                        :userid="key.item_user_email"
                        :uid="key.item_user_uid"
                        :item_title="key.item_title"
                        :item_intro="key.item_intro"
                        :item_favorite="key.item_favorite"
                        :item_comment="key.item_comment"
                        :item_create_date="key.item_create_date"
                        :item_view="key.item_view"
                        :item_thumb="key.item_thumb"
                        v-for="(key, index) in allitems"
                        :key="index"
                    ></Item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Item from "@/components/Item";
import Slick from "vue-slick";
import extendData from "@/data";
import { mapActions } from "vuex";
export default {
    extends: extendData,
    data() {
        return {
            slickOptions: {
                slidesToShow: 1,
                centerMode: true,
                infinite: false,
                dots: true,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 2561,
                        settings: {
                            slidesToShow: 5,
                            centerMode: true
                        }
                    },
                    {
                        breakpoint: 1921,
                        settings: {
                            slidesToShow: 3,
                            centerMode: true
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 2,
                            centerMode: false,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            centerMode: true
                        }
                    }
                ]
            },
            allitems: null
        };
    },
    components: {
        Item,
        Slick
    },
    created() {
        this.fnGetAllCollection(res => {
            this.allitems = res;
        });
    },
    mounted() {},
    methods: {
        ...mapActions(["fnGetAllCollection"])
    }
};
</script>
