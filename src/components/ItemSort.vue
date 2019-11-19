<template>
    <div class="cmmSortWrap">
        <div class="btnsWrap" v-if="!no_btn">
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`n`)"
                class="green sm"
                >최신순</btn
            >
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`v`)"
                class="green sm"
                >조회순</btn
            >
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`f`)"
                class="green sm"
                >좋아요순</btn
            >
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`c`)"
                class="green sm"
                >댓글순</btn
            >
        </div>
        <Slick ref="slick" :options="slickOptions" v-if="slick">
            <Item
                :item_user_thumb="key.item_user_thumb"
                :item_user_nm="key.item_user_nm"
                :item_user_email="key.item_user_email"
                :item_user_uid="key.item_user_uid"
                :uid="key.uid"
                :item_title="key.item_title"
                :item_intro="key.item_intro"
                :item_favorite="key.item_favorite"
                :item_comment="key.item_comment"
                :item_create_date="key.item_create_date"
                :item_view="key.item_view"
                :item_thumb="key.item_thumb"
                v-for="(key, index) in sortdata"
                :key="index"
            ></Item>
        </Slick>
        <Item
            :item_user_thumb="key.item_user_thumb"
            :item_user_nm="key.item_user_nm"
            :item_user_email="key.item_user_email"
            :item_user_uid="key.item_user_uid"
            :uid="key.uid"
            :item_title="key.item_title"
            :item_intro="key.item_intro"
            :item_favorite="key.item_favorite"
            :item_comment="key.item_comment"
            :item_create_date="key.item_create_date"
            :item_view="key.item_view"
            :item_thumb="key.item_thumb"
            v-for="(key, index) in sortdata"
            :key="index"
            v-else
        ></Item>
    </div>
</template>
<script>
import Slick from "vue-slick";
import Item from "@/components/Item";
export default {
    props: ["sortitems", "sort", "limit_length", "slick" ,'no_btn'],
    data() {
        return {
            sortdata: null,
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
                            slidesToShow: 5,
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
            }
        };
    },
    created() {
        let s = `n`;
        let ar = this.sortitems;
        this.sortdata = ar;
        if (this.sort) s = this.sort;
        this.locFnSort(s);
    },
    methods: {
        locFnSort(s) {
            let t = "";
            switch (s) {
                case "f":
                    t = "item_favorite";
                    break;
                case "v":
                    t = "item_view";
                    break;
                case "c":
                    t = "item_comment";
                    break;
                default:
                    t = "item_create_date";
            }
            if (t) {
                this.sortdata = this.locFnSortApply(t);
            }
        },
        locFnSortApply(l) {
			console.log(this.sortdata);
			
            let ar = this.sortdata.sort((a, b) => {
                if (a[l] > b[l]) {
                    return -1;
                }
                if (a[l] < b[l]) {
                    return 1;
                }
                return 0;
            });
            if (this.limit_length) {
                ar = ar.slice(0, this.limit_length);
            }
            return ar;
        }
    },
    components: {
        Item,
        Slick
    }
};
</script>
