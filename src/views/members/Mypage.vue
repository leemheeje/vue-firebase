<template>
	<div class="container gray">
		<div class="mypageWrap">


			<div class="mypage_userinfo">
				<div class="lrow">
					<div class="user_t">
						<span class="thumb">
							<img :src="guest.userthumb"/>
						</span>
						<div class="user_name">{{guest.usernm}}</div>
						<div class="user_info">{{guest.userintro}}</div>
						<div class="user_comp" v-if="guest.usercomp">{{guest.usercomp}}</div>
						<div class="user_email">{{guest.userid}}</div>
					</div>
				</div>
				<div class="lrow" v-if="guest.user_skills_model">
					<div class="title">skill</div>
					<div class="cont">
						<div class="tag_area cmmInput radiochk meta" v-for="(k,i) in guest.user_skills_model" :key="i">
							<span class="lb">{{k}}</span>
							<!-- <ahref href="/" class="tag" v-if="userSkills" v-for="(key,index) in userSkills">{{guestSkills[index]}}</ahref> -->
						</div>
					</div>
				</div>
			</div>



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
		<router-link :to="{name:'create',params:user.uid}" v-if="isAuth" class="animated bounceIn btnCreate"><i class="fas fa-plus"></i></router-link>
	</div>
</template>
<script>
import { mapState,mapActions } from "vuex";
import Item from '@/components/Item'
import extendData from '@/data'
export default{
	extends:extendData,
	data(){
		return {
			stateSelector : null,
		}
	},
	computed: {
		...mapState(['isAuth','user','guest']),
	},
	created(){
		this.fnGetUserInfo(this.$route.params.uid)
		if(this.$route.params.uid == this.user.uid){
			this.stateSelector = this.user;
		}else{
			this.stateSelector = this.guest;
		}
	},
	watch:{
		$route(){
			this.fnGetUserInfo(this.$route.params.uid)
		}
	},
	methods: {
		...mapActions(['fnGetUserInfo'])
	},
	components:{Item}
}
</script>