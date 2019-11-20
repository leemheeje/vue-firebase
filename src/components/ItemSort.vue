<template>
    <div class="cmmSortWrap">
        <div class="btnsWrap" v-if="!no_btn">
            <div class="cmmSelect">
                <select @change="locFnSortSelect">
                    <option value="n">최신순</option>
                    <option value="v">조회순</option>
                    <option value="f">좋아요순</option>
                    <option value="c">댓글순</option>
                </select>
                <span class="vTxt">{{ vTxt }}</span>
            </div>
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`n`)"
                :class="`green sm ${sortbtn_class == 'n' ? '' : 'outline'}`"
                >최신순</btn
            >
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`v`)"
                :class="`green sm ${sortbtn_class == 'v' ? '' : 'outline'}`"
                >조회순</btn
            >
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`f`)"
                :class="`green sm ${sortbtn_class == 'f' ? '' : 'outline'}`"
                >좋아요순</btn
            >
            <btn
                href="javascript:;"
                ref="sortbtn"
                @eventBus_click="locFnSort(`c`)"
                :class="`green sm ${sortbtn_class == 'c' ? '' : 'outline'}`"
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
                :item_id="key.item_id"
                :item_intro="key.item_intro"
                :item_favorite="key.item_favorite"
                :item_favorite_group="key.item_favorite_group"
                :item_comment="key.item_comment"
                :item_create_date="key.item_create_date"
                :item_view="key.item_view"
                :item_thumb="key.item_thumb"
                v-for="(key, index) in compSortitems"
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
            :item_id="key.item_id"
            :item_intro="key.item_intro"
            :item_favorite="key.item_favorite"
            :item_favorite_group="key.item_favorite_group"
            :item_comment="key.item_comment"
            :item_create_date="key.item_create_date"
            :item_view="key.item_view"
            :item_thumb="key.item_thumb"
            v-for="(key, index) in compSortitems"
            :key="index"
            v-else
        ></Item>
    </div>
</template>
<script>
import Slick from "vue-slick";
import Item from "@/components/Item";
export default {
    props: ["sortitems", "sort", "limit_length", "slick", "no_btn"],
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
            },
            sortbtn_class: `n`,
            vTxt: ""
        };
    },
    created() {
        console.log(this.sortitems);
        let s = `n`;
        let ar = this.sortitems;
        this.sortdata = ar;
        if (this.sort) s = this.sort;
        this.locFnSort(s);
    },
    computed:{
        compSortitems(){
            return this.sortitems
        }
    },
    methods: {
        locFnSort(s) {
            let t = "";
            let txt = "";
            switch (s) {
                case "f":
                    t = "item_favorite";
                    txt = "좋아요순";
                    break;
                case "v":
                    t = "item_view";
                    txt = "조회순";
                    break;
                case "c":
                    t = "item_comment";
                    txt = "댓글순";
                    break;
                default:
                    t = "item_create_date";
                    txt = "최신순";
            }
            if (t) {
                this.sortdata = this.locFnSortApply(t);
                this.sortbtn_class = s;
                this.vTxt = txt;
            }
        },
        locFnSortApply(l) {
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
        },
        locFnSortSelect(event) {
            this.locFnSort(event.target.value);
        }
    },
    components: {
        Item,
        Slick
    }
};
</script>
