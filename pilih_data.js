//var ref_location = decodeURI(window.location).split(AppClassName)[0];
var bank_option_ops = '';
function bank_option(){
	var link_url = base_url+'json_data/bank?function=get_api',
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
var categories_option_ops = '';
function categories_option(){
	var link_url = base_url+'json_data/product_categories?function=get_api',
		target_div = $('.categories_option');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				hasil += '<option value="all">Semua Kategori</option>';
				$.each(result,function(key,val){
					hasil += "<option value='"+val.id+"' class='text-uppercase'>"+val.value+"</option>";
				});
			}else{
				hasil += '<option value="all" disabled>No Data</option>';			
			}
			categories_option_ops = hasil;
			target_div.html(hasil);
		}
	})
}
function courier_option(target_div,courier_id){
	var link_url = base_url+'json_data/courier',
		target_div = $('.courier_option');
		target_div.html('<option disabled selected>Loading Kurir...</option>');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var data = JSON.parse(data),
				hasil = '';
			if (data.length>0) {
				hasil += '<option value="">Pilih Kurir</option>';
					if (target_div!=undefined && courier_id>0) {
						$.each(data,function(key,val){
							var sel = '';
								if (val.id==courier_id) {
									sel = 'selected';
								}
							hasil += '<option value="'+val.id+'" '+sel+'>'+val.courier_cd+'</option>';
						});
					}else{
						$.each(data,function(key,val){
							hasil += '<option value="'+val.id+'" '+selected+'>'+val.courier_cd+'</option>';
						});
					}
			}
			province_ops = hasil;
			target_div.html(hasil);
		},error:function(data){
			data.responseText();
		}
	})	
}
function courier_cd_option(){
	var link_url = base_url+'json_data/courier',
		target_div = $('.courier_cd_option');
		target_div.html('<option disabled selected>Loading Kurir...</option>');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var data = JSON.parse(data),
				hasil = '';
			if (data.length>0) {
				hasil += '<option value="">Pilih Kurir</option>';
				$.each(data,function(key,val){
					hasil += '<option value="'+val.courier_cd+'">'+val.courier_cd+'</option>';
				});
			}
			province_ops = hasil;
			target_div.html(hasil);
		},error:function(data){
			data.responseText();
		}
	})	
}
var province_ops = '';
function province_option(id,target_div,target_province){
	var get = [];
	if (parseInt(id)>0) {
		get.push('id='+id);
	}if (get.length>0) {
		get = '?'+get.join('&');
	}if (get.length==0) {
		get = '';
	}if (target_div=='' || target_div==undefined) {
		target_div = '.province_option';
	}
	var link_url = base_url+'json_data/province'+get,
		target_div = $(target_div);
		target_div.html('<option disabled selected>Loading Provinsi...</option>');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			if (data!='cURL Error #:Could not resolve host: pro.rajaongkir.com') {
				var data = JSON.parse(data),
					hasil = '';
				if (data.rajaongkir.status.code==200) {
					if (data.rajaongkir.results.length>0) {
						hasil += '<option value="">Pilih Provinsi</option>';
						$.each(data.rajaongkir.results,function(key,val){
							var sel = '';
							if (target_province==val.province_id) {
								sel = 'selected';
							}
							hasil += '<option value="'+val.province_id+'" '+sel+'>'+val.province+'</option>';
						});
					}else{
						hasil += '<option value="all" disabled>No Data</option>';				
					}
				}
				province_ops = hasil;
				target_div.html(hasil);
			}else{
				target_div.html('<option disabled selected>data tidak ditemukan</option>');
			}
		},error:function(data){
			data.responseText();
		}
	})
}
var city_ops = '';
function city_option(province_id,city_id,target_div,target_city){
	var get = [];
	if (parseInt(city_id)>0) {
		get.push('id='+city_id);
	}if (parseInt(province_id)>0) {
		get.push('province='+province_id);
	}if (get.length>0) {
		get = '?'+get.join('&');
	}if (get.length==0) {
		get = '';
	}if (target_div=='' && target_div==undefined) {
		target_div = '.city_option';
	}
	var link_url = base_url+'json_data/city'+get,
		target_div = $(target_div);
		target_div.html('<option disabled selected>Loading Kabupaten...</option>');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			if (data!='cURL Error #:Could not resolve host: pro.rajaongkir.com') {
				var data = JSON.parse(data),
					hasil = '';
				if (data.rajaongkir.status.code==200) {
					if (data.rajaongkir.results.length>0) {
						hasil += '<option value="">Pilih Kabupaten</option>';
						$.each(data.rajaongkir.results,function(key,val){
							var sel = '';
							if (val.city_id==target_city) {
								sel = 'selected';
							}
							hasil += '<option value="'+val.city_id+'" '+sel+'>'+val.city_name+'</option>';
						});
					}else{
						hasil += '<option value="all" disabled>No Data</option>';				
					}
				}
				city_ops = hasil;
				target_div.html(hasil);
			}else{
				target_div.html('<option disabled selected>data tidak ditemukan</option>');
			}
		}
	})
}
var subdistrict_ops = '';
function subdistrict_option(city,target_div,target_subdisctrict){
	var get = [];
	if (parseInt(city)>0) {
		get.push('city='+city);
	}if (get.length>0) {
		get = '?'+get.join('&');
	}if (get.length==0) {
		get = '';
	}if (target_div=='' || target_div==undefined) {
		target_div = '.subdistrict_option';
	}
	var link_url = base_url+'json_data/subdistrict'+get,
		target_div = $(target_div);
		target_div.html('<option disabled selected>Loading Kecamatan...</option>');
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			if (data!='cURL Error #:Could not resolve host: pro.rajaongkir.com') {			
				var data = JSON.parse(data),
					hasil = '';
				if (data.rajaongkir.status.code==200) {
					if (data.rajaongkir.results.length>0) {
						hasil += '<option value="">Pilih Kecamatan</option>';
						$.each(data.rajaongkir.results,function(key,val){
							var sel = '';
							if (val.subdistrict_id==target_subdisctrict) {
								sel = 'selected';
							}
							hasil += '<option value="'+val.subdistrict_id+'" '+sel+'>'+val.subdistrict_name+'</option>';
						});
					}else{
						hasil += '<option value="all" disabled>No Data</option>';				
					}
				}
				subdistrict_ops = hasil;
				target_div.html(hasil);
			}else{
				target_div.html('<option disabled selected>data tidak ditemukan</option>');
			}
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
