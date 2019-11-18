export const state = {
    isAuth: false,
    isMobile:true,
    isLoading: true,
    isMypage:false,
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
    }
};