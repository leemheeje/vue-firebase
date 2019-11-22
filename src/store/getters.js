export const getters = {
	getOnceAllitem: (state, getters) => (payload) => {
		if(!payload.item_id){
			return state.data.filter(items => {
				if(items.item_user_uid == payload.item_user_uid){
					return items
				}
			})
		}else{
			return state.data.find(items => items.item_id == payload.item_id && items.item_user_uid == payload.item_user_uid)
		}
	},
};