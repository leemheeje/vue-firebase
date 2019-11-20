export const state = {
    isAuth: false,
    isMobile:true,
    isLoading: true,
    isMypage:false,
    isItemFavorit:false,
    isLoadingStyle:{
        opacity: 1,
        color: '#2196f3',
        width: 30,
    },
    transDirection: true,
    user:{
        email : '',
        uid: '',
        name: '',
        thumb: '',
    },
    guest:{
        email : '',
        uid: '',
        name: '',
        thumb: '',
    },
    userDetailView:{
        modalDetailViewShow:false
    },
    item_id:'',
    userthumb:'',
    usernm:'',
    userid:'',
    item_user_uid:'',
    item_title:'',
    item_intro:'',
    item_favorite:'',
    item_comment:'',
    item_create_date:'',
    item_view:'',
    item_thumb:'',
    item_user_nm:'',
    item_user_email:'',
    item_user_thum:''
};