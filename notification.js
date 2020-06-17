var count_user = 0,
	count_top_up = 0,
	count_message = 0,
	transaction_tot = 0;

func_recall();
setInterval(function(){
	func_recall();
},10000);


function func_recall(){
	check_new_user();
	check_new_transaction();
	check_top_up();
}
function check_new_transaction(){
	var target_div = $('[count-transaction]'),
		link_url = required_folder+'transaction?function=notif';
	if (target_div.length>0) {
		$.ajax({
			type:"GET",
			url:link_url,
			data:'',
			success:function(data){
				var result = JSON.parse(data);
				if (result.length>0) {
					transaction_tot += result.length;
					if (result.length>0) {
						var length = 0;
						$('[notif-trans]').html('-');
						$.each(result,function(key,val){
							var target_notif = $('[notif-trans-'+val.trans_status+'-'+val.transfer_files+']');
							if (target_notif.length>0) {
								length += parseInt(val.total);
								target_notif.html(val.total)
							}
						})
						target_div.html(length);
					}else{
						target_div.html('0');
					}
				}else{
					target_div.html('0');
				}
			},error : function(data){
		        console.log(data.responseText);
			}
		})
	}	
}
function check_new_user(){
	var target_div = $('[users-notif]'),
		target_div_2 = $('[user-count-notification]'),
		link_url = required_folder+'users?function=notif';
	if (target_div.length>0) {
		$.ajax({
			type:"GET",
			url:link_url,
			data:'',
			success:function(data){
				var result = JSON.parse(data);
				if (result.total!=undefined && result.total>0) {
					count_user += result.total;
					if (result.total>1) {
						target_div.html(result.total+' akun baru');
						target_div_2.html(result.total);
					}else{
						target_div.html(result.total+' akun baru');
						target_div_2.html(result.total);
					}
				}else{
					target_div.html("<small>Tidak ada akun baru</small>");
					target_div_2.html('0');
				}
			},error : function(data){
		        console.log(data.responseText);
			}
		})
	}	
}


function check_top_up(){
	var target_div = $('[count-topup]'),
		target_div_2 = $('[notif-topup]'),
		link_url = required_folder+'top_up?function=notif';
	if (target_div.length>0) {
		$.ajax({
			type:"GET",
			url:link_url,
			data:'',
			success:function(data){
				var result = JSON.parse(data);
				if (result.total!=undefined && result.total>0) {
					count_top_up += result.total;
					if (parseInt(result.total)>0) {
						target_div.html(result.total);
						target_div_2.html(result.total+' Top Up baru')
					}else{
						target_div.html(result.total);
						target_div_2.html("<p class='text-center no-margin no-padding'><small><i class='fas fa fa-credit-card'></i> Tidak Ada Top Up</small></p>");
					}
				}else{
					target_div.html(0);
					target_div_2.html("<p class='text-center no-margin no-padding'><small><i class='fas fa fa-credit-card'></i> Tidak Ada Top Up</small></p>");
				}
			},error : function(data){
		        console.log(data.responseText);
			}
		})
	}	
}