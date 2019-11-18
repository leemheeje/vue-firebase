<template>
    <div class="container">
        <div class="mainWrap">
            <div class="cmmRibBar">
                <div class="cmmItemsWrap slick">
                   <Slick ref="slick" :options="slickOptions">

					<Item 
					:main_thumb="key.main_thumb"
					:favorite="key.favorite"
					:comment_length="key.comment_length"
					:user_thumb="key.user_thumb"
					:title="key.title"
					:name="key.name"
					:email="key.email"
					:stitle="key.stitle"
					:uid="key.uid"
					v-for="(key,index) in allDataFortfolio" :key="index"></Item>

                    </Slick>

                </div>
            </div>
            <div class="innerWrap">
                <div class="cmmTit sm MT40 MMB20">All Items</div>
                <div class="cmmItemsWrap">


					<Item 
					:main_thumb="key.main_thumb"
					:favorite="key.favorite"
					:comment_length="key.comment_length"
					:user_thumb="key.user_thumb"
					:title="key.title"
					:name="key.name"
					:email="key.email"
					:stitle="key.stitle"
					:uid="key.uid"
					v-for="(key,index) in allDataFortfolio" :key="index"></Item>



                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Item from '@/components/Item'
import Slick from 'vue-slick'
import extendData from '@/data'
export default {
    extends:extendData,
    data(){
        return {
            slickOptions: {
                slidesToShow: 1,
                centerMode : true,
                infinite:false,
                dots: true,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive:[
                    {
                        breakpoint: 2561,
                        settings:{
                            slidesToShow: 5,
                            centerMode : true,
                        }
                    },
                    {
                        breakpoint: 1921,
                        settings:{
                            slidesToShow: 3,
                            centerMode : true,
                        }
                    }, {
                        breakpoint: 960,
                        settings:{
                            slidesToShow: 2,
                            centerMode : false,
                            slidesToShow: 2
                        }
                    },{
                        breakpoint: 768,
                        settings:{
                            slidesToShow: 1,
                            centerMode : true,
                        }
                    }
                ]
            },
        }
    },
    components: {
        Item,
        Slick
	},
    mounted() {
    },
    methods: {
    }
};
</script>
