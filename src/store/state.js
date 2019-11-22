export const state = {
    isAuth: false,
    isMobile:true,
    isLoading: true,
    isMypage:false,
    isItemFavorit:false,
    data:null,
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
        intro: '',
        user_skills_model: '',
    },
    userDetailView:{
        modalDetailViewShow:false,
        item_id:'',
        item_user_uid:'',
        isItemFavorit:true
    },
};