function after_submit(form_name,data){
	//saldo
	if (form_name=='edit_top_up') {
		var val = JSON.parse(data);
		if (val.data!=null && val.data.id!=undefined) {
			$('[name="crud_top_up"] [name="id"]').val(val.data.id);
			$('[name="crud_top_up"] [name="id_bank"]').val(val.data.id_bank);
			$('[name="crud_top_up"] [name="amount"]').val(convert_Rp(val.data.amount));
		}if (val.files!=undefined) {
			render_all_image_top_up(val.files);			
		}
	}if (form_name=='crud_top_up') {
		if (data=='1' || data=='11') {
			$('#modal_crud_top_up').modal('hide');
			default_func(decodeURI(refresh_location(1)));
		}
	}if (form_name=='delete_top_up') {
		if (data=='1' || data=='11') {
			$('#modal_crud_top_up').modal('hide');
			default_func(decodeURI(refresh_location(1)));
		}		
	}


	//profile
	if (form_name=='profile_update') {
		if (data!=undefined) {
			if (data=='1') {
				confirm_result("Profile berhasil di update");
			}
		}
	}
	//transaksi	
	if (form_name=='transaksi_delete_inv') {
		default_func(decodeURI(refresh_location(1)));		
	}if (form_name=='crud_bukti_transfer') {
		$("#modal_bukti_transfer").modal('hide');
		default_func(decodeURI(refresh_location(1)));
	}if (form_name=='delete_transfer_files') {
		var data = JSON.parse(data);
		if (data.result!=undefined) {
			if (data.id_file!=undefined) {
				$('[file-bukti-transfer-'+data.id_file+']').remove();
			}
		}if ($('#file_list_paper img').length==0) {
			$('#file_list_paper').append(no_transfer_files)
		}
	}if (form_name=='transaksi_delete_from_cart') {
		var data = JSON.parse(data);
		if (data.id!=undefined) {
			$('[detail-item-in-cart-'+data.id+']').remove();
			render_cart_data();
			render_cart_btn();
			get_product_in_cart(id);
			get_cart_detail(tmp_link_url_detail_transaksi,true);
		}
	}if (form_name=='delete_item_cart') {
		var data = JSON.parse(data);
		if (data.result=='1' && data.result!=undefined) {
			if (typeof default_func=='function') {
				default_func(decodeURI(refresh_location(1)));
			};
			if (data.item_left==0) {
				if ($('#modal_cart_detail').length>0) {
					$('#modal_cart_detail').modal('hide');
				}if ($('[load-cart-list]').length>0) {
					$('[load-cart-list]').html("<h3 align='center' style='margin:50px 0px;border:1px solid #ddd;padding:30px 0px'><label>Tidak ada item dalam keranjang.<br>Kembali ke halaman awal <br><span timeout>5</span></label></h3>");
					var timeout = 5;
					setInterval(function(){
						timeout-=1;
						$('[load-cart-list] [timeout]').html(timeout);
					},1000);
					setTimeout(function(){
						location.href = base_url;
					},5500)
				}
			}else{
				confirm_result("Item berhasil dihapus",1,1000);
				var target = $('[total-cart-on-transaction-'+data.id_trans+'],[total-weight-cart-on-transaction-'+data.id_trans+']');
				target.css({'opacity':'0','-webkit-animation':"die_time .3s"});
				setTimeout(function(){	
					$('[single-item-on-cart-list-'+data.id+']').remove();
					$('[total-cart-on-transaction-'+data.id_trans+']').html(convert_Rp(data.cart_price));
					$('[total-weight-cart-on-transaction-'+data.id_trans+']').html(data.cart_weight);					
					target.css({'opacity':'1','-webkit-animation':"show_time .5s"});
				},300)
			}
		}
	}


	if (form_name=='check_out_transaction') {
		var inv = $('[name="check_out_transaction"]').attr("inv-num");
		if (data=='1' || data=='11') {
			location.href = base_url+'keranjang?inv='+inv+'&final'
		}
	}
	if (form_name=='delete_from_cart') {
		var data = JSON.parse(data);
		if (data.id!=undefined) {
			$('[detail-item-in-cart-'+data.id+']').remove();
			render_cart_data();
			render_cart_btn();
			get_product_in_cart(id);						
		}
	}if (form_name=='message-form') {
		open_captcha();
		var result = JSON.parse(data);
		if (result.result!=undefined) {
			if (result.result=='1') {
				$('[name="'+form_name+'"]').trigger('reset');
			}
			confirm_result(result.message);
		}
	}if (form_name=='employee-reg') {
		open_captcha();
		var result = JSON.parse(data);
		if (result.result!=undefined) {
			if (result.result=='1') {
				$('[name="'+form_name+'"]').trigger('reset');
			}
			confirm_result(result.message);
		}
	}if (form_name=='buy_product') {
		render_form_btn();
		render_cart_btn();
		var id = product_in_cart.attr('id');
		get_product_in_cart(id);
		render_cart_data();
		$('#modal-cart-list').modal('show');
	}if (form_name=='log_verify') {
		var result = JSON.parse(data);
		if (result.hasil!=undefined) {
			if (result.hasil=='1') {
				setTimeout(function(){
					location.href = result.base_url;
				},2000)
			}if (result.hasil=='2') {
				confirm_result("Username atau password tidak sesuai",'2',3000);
				$('[name="log_verify"] [name="username"]').focus();
				$('[name="log_verify"] [name="captcha"]').val('');
				open_captcha();
			}if (result.hasil=='911') {
				open_captcha();
				$('[name="log_verify"] [name="captcha"]').val('').focus();
				confirm_result("Captcha tidak sesuai",'2',3000);
			}
		}
	}if (form_name=='crud_testimony') {
		if (data=='1') {
			confirm_result("Testimony anda berhasil terkirim",1,3000);
		}else if (data=='2') {
			confirm_result("Testimony anda gagal terkirim",2,3000);
		}else if (data=='3') {
			confirm_result("Tidak bisa mengirim testimony",2,3000);
		}else if (data=='4') {
			confirm_result("Hanya dapat mengirim 1 testimony perhari",2,3000);
		}else{
			$('#modal-user-log').modal('show');
			confirm_result("Anda harus login terlebih dahulu",2,3000);			
		}
		$("[name='crud_testimony']").trigger('reset');
	}if (form_name=='user_message_footer') {
		if (data=='1') {
			confirm_result("Pesan anda berhasil terkirim",1,3000);
		}else if (data=='2') {
			confirm_result("Pesan anda gagal terkirim",2,3000);
		}else if (data=='3') {
			confirm_result("Tidak bisa mengirim pesan",2,3000);
		}else if (data=='4') {
			confirm_result("Pesan gagal terkirim",2,3000);
		}
		open_captcha();
		$("[name='user_message_footer']").trigger('reset');	
		$("[name='user_message_footer'] [name='captcha']").val('');		
	}
}