const ui = {
	alert:(msg)=>{
		window.alert(msg)
	},
	confirm:(msg, callback_true, callback_false)=>{
		if(window.confirm(msg)){
			if(typeof callback_true === 'function'){
				callback_true()
			}
		}else{
			if(typeof callback_false === 'function'){
				callback_false()
			}
		}
	}
	
}
export const Ui = ui