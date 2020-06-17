var ref_location = decodeURI(window.location).split(AppClassName)[0];
function categories_option(){
	var link_url = ref_location+'required/categories?function=get_api',
		target_div = $('.categories_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.value+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})
}
var trans_status_opts = '';
function trans_status_option(){
	var link_url = ref_location+'required/transaction_status?function=get_api',
		target_div = $('.trans_status_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.status_name+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			trans_status_opts = hasil;
			target_div.html(hasil);
		}
	})
}
var unit_opts = '';
function unit_option(){
	var link_url = ref_location+'required/product_unit?function=get_api',
		target_div = $('.unit_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.unit_cd+'</option>';
				});
				hasil = '<option value="">Pilih Satuan</option>'+hasil;
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			unit_opts = hasil;
			target_div.html(hasil);
		}
	})
}
var customer_status_ops = '';
function customer_status(){
	var link_url = ref_location+'required/user_status?function=get_costomer_api',
		target_div = $('.customer_status');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id_uid+'">'+val.status_id+'</option>';
				});
				hasil += '<option value="">Pilih Status</option>';
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			customer_status_ops = hasil;
			target_div.html(hasil);
		}
	})
}
var customer_service_ops = '';
function customer_service(){
	var link_url = ref_location+'required/users?function=get_cs_api',
		target_div = $('.customer_service');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id_user+'">'+val.full_name+'</option>';
				});
				hasil = '<option value="">Pilih CS</option>'+hasil;
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			customer_service_ops = hasil;
			target_div.html(hasil);
		}
	})
}
function customer_option(){
	var link_url = ref_location+'required/users?function=get_customer_api',
		target_div = $('.customer_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id_user+'">'+val.full_name+'</option>';
				});
				hasil = '<option value="">Pilih Konsumen</option>'+hasil;
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			customer_service_ops = hasil;
			target_div.html(hasil);
		}
	})	
}
var status_id_ops = '';
function status_id(){
	var link_url = ref_location+'required/user_status?function=get_api',
		target_div = $('.status_id');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id_uid+'">'+val.status_id+'</option>';
				});
				hasil = '<option value="">Pilih Status</option>'+hasil;
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			status_id_ops = hasil;
			target_div.html(hasil);
		}
	})
}
function product_categories_option(){
	var link_url = ref_location+'required/product_categories?function=get_api',
		target_div = $('.product_categories_option'),
		target_div_2 = $('.product_categories_option_all');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '',
				hasil_2 = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.value+'</option>';
				});
				hasil_2 = '<option value="all">Pilih Kategori</option>'+hasil;
			}else{
				hasil = '<option value="all" disabled>No Data</option>';
				hasil_2 = hasil;				
			};
			if (target_div.length>0) {
				target_div.html(hasil);
			}if (target_div_2.length>0) {
				target_div_2.html(hasil_2);
			}
		}
	})
}
function product_variants_option(){
	var link_url = ref_location+'required/product_variants?function=get_api',
		target_div = $('.product_variants_option'),
		target_div_2 = $('.product_variants_option_all');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '',
				hasil_2 = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.variant_name+'</option>';
				});
				hasil_2 = '<option value="all">Pilih Variant</option>'+hasil;
			}else{
				hasil = '<option value="all" disabled>No Data</option>';
				hasil_2 = hasil;				
			};
			if (target_div.length>0) {
				target_div.html(hasil);
			}if (target_div_2.length>0) {
				target_div_2.html(hasil_2);
			}
		}
	})
}
var product_ops = '';
function product_option(col_target){
	var link_url = ref_location+'required/product_option?function=get_api',
		target_div = $('.product_option');
		if (col_target!='' && col_target!=undefined) {
			target_div = $(col_target);
		}
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				hasil += '<option value="">-</option>';
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.option_name+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			product_ops = hasil;
			target_div.html(hasil);
		}
	})
}
function keywords_option(){
	var link_url = ref_location+'required/keywords?function=get_api',
		target_div = $('.keywords_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.value+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})
}
var bank_option_ops = '';
function bank_option(){
	var link_url = ref_location+'required/bank_list?function=get_api',
		target_div = $('.bank_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += "<option value='"+val.id+"'>"+val.bank_name+" | "+val.account_name+" | "+val.account_number+"</option>";
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			bank_option_ops = hasil;
			target_div.html(hasil);
		}
	})
}
var product_selection_ops = '';
function product_selection(){
	var link_url = ref_location+'required/products?function=get_api',
		target_div = $('.product_selection'),
		target_div_2 = $('.product_selection_all');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '',
				hasil_2 = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += "<option value='"+val.id+"'>"+val.cd_product+" | "+val.product_name+"</option>";
					hasil_2 = "<option value='all'>Pilih Item</option>"+hasil;
				});
			}else{
				hasil_2 = hasil = '<option value="all" disabled>No Data</option>';				
			}
			product_selection_ops = hasil;
			target_div.html(hasil);
			target_div_2.html(hasil_2);
		}
	})
}
var bank_name_ops = '';
function bank_name_option(){
	var link_url = ref_location+'required/bank_name?function=get_api',
		target_div = $('.bank_name_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.bank_name+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			bank_name_ops = hasil;
			target_div.html(hasil);
		}
	})
}
function menus_list(){
	var link_url = ref_location+'required/menu?function=get_api',
		target_div = $('.menus_list');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				hasil += '<option value="0">Parent</option>';
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.name+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})
}
function lang_option(){
	var link_url = ref_location+'required/lang?function=get_api',
		target_div = $('.lang_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.kd_lang+' - '+val.lang+'</option>';
				});
			}else{
				hasil += '<option value="" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})
}
function func_option(){
	var link_url = ref_location+'required/func?function=get_api',
		target_div = $('.func_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.name+'</option>';
				});
			}else{
				hasil += '<option value="" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})
}
function webtext_option(){
	var link_url = ref_location+'required/webtext?function=get_api',
		target_div = $('.webtext_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.name+'</option>';
				});
			}else{
				hasil += '<option value="" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})
	
}
function user_status(){
	var link_url = ref_location+'required/user_status?function=get_api',
		target_div = $('.user_status'),
		target_div_null = $('.user_status_null');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = hasil_2 = '';
			if (result.length>0) {
				hasil = '<option value="all">Status User</option>'
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id_uid+'">'+val.status_id+'</option>';
				});
				hasil_2 = hasil+'<option value="null">User Baru</option>';
			}else{
				hasil += '<option value="" disabled>No Data</option>';				
			}
			target_div_null.html(hasil_2);
			target_div.html(hasil);
		}
	})
}
function lang_option_null(){
	var link_url = ref_location+'required/lang?function=get_api',
		target_div = $('.lang_option_null');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				hasil += '<option value="">Lang</option>';
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.kd_lang+' - '+val.lang+'</option>';
				});
			}else{
				hasil += '<option value="" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})

}
function contact_type_option_null(){
	var link_url = ref_location+'required/contact_type?function=get_api',
		target_div = $('.contact_type_option_null');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				hasil += '<option value="">Contact Type</option>';
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.name+'</option>';
				});
			}else{
				hasil += '<option value="" disabled>No Data</option>';				
			}
			target_div.html(hasil);
		}
	})

}
function files_date(){
	var link_url = ref_location+'required/files?function=files_date',
		target_div = $('.files_date'),
		target_div_2 = $('.files_date_all');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '',
				hasil_2 = '';
			if (result.length>0) {
				$.each(result,function(key,val){
					hasil += '<option value="'+val.kd_tgl+'">'+val.upload_date+'</option>';
				});
				hasil_2 = '<option value="all" disabled>Tgl. Upload</option>'+hasil;	
			}else{
				hasil = '<option value="all" disabled>No Data</option>';
				hasil_2 = hasil;
			}
			target_div.html(hasil);
			target_div_2.html(hasil_2);
		}
	})
}
function addplaceholder(target_div,placeholder){
	$(target_div).each(function(){
		if ($(this).hasClass("select2")==true) {
			$(this).prepend($("<option></option>").attr({"value":'all'}).text(placeholder));
			$(this).attr('style','color:DimGrey;text-transform:bold;padding:2px 4px;');
			$(this).val('all').trigger('change');
		}else{
			$(this).prepend($("<option></option>").attr({"value":'all'}).text(placeholder));
			$(this).attr('style','color:DimGrey;text-transform:bold;padding:2px 4px;');
			$(this).val('all').trigger('change');
		}
	});	
}