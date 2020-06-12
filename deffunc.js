window.addEventListener('click', function(e){
	if ($('[show-sosmed-icon]').length>0) {
	if (document.querySelector('[show-sosmed-icon]').contains(e.target)==true){
		if ($('.sosmed-bar').is(':visible')) {
			$('.sosmed-bar').hide(130);
			$('[show-sosmed-icon] i').removeClass('fa-chevron-left').addClass('fa-whatsapp');
		}else{
			$('.sosmed-bar').show(130);
			$('[show-sosmed-icon] i').removeClass('fa-whatsapp').addClass('fa-chevron-left');
		}
	}else if (document.querySelector('[show-sosmed-icon]').contains(e.target)==false && document.querySelector('.sosmed-bar').contains(e.target)==false) {
		$('.sosmed-bar').hide(130);
		$('[show-sosmed-icon] i').removeClass('fa-chevron-left').addClass('fa-whatsapp');
	}
	}
});

$(document).on('click','[open-modal-buy-product]',function(){
	$('[modal-buy-product]').addClass('active');
	var pd_name = '<h3>'+document.querySelector('[name="buy_product"] .product-name').innerHTML+'</h3>',
		price = '<h5>'+document.querySelector('[name="buy_product"] .product-price').innerHTML+'</h5>';
		img = '<div modal-buy-product-img><img src="'+$('[all-product-images] .row img').attr('src')+'"></div>';
	$('[modal-buy-product] [detail-modal-buy-product]').html(img+pd_name+price);
	$('[name="buy_product"] [name="qty"]').focus();
	$('[name="buy_product"] [name="qty"]').val('1');
})
$(document).on('click','[close-modal-buy-product]',function(){
	$('[modal-buy-product]').removeClass('active');	
})
$(document).on('click','.ul-variant li',function(event){
	event.preventDefault();
	$('.ul-variant li.active').removeClass('active');
	$(this).addClass('active');
	$("[name='buy_product'] [name='id_variant']").val(this.value).change();
})
$(document).on('click',"[name='buy_product'] [name='id_variant']",function(event){
	event.preventDefault();
	$('.ul-variant li.active').removeClass('active');
	$('.ul-variant li[value='+this.value+']').addClass('active');
})
if ($('#render-catalogue-products').length>0) {
	render_catalogue_products();
}
$(document).on('submit','[name="catalogue-form"]',function(event){
	event.preventDefault();
	var data = $(this).serializeArray(),
		sufix = '',
		filter = '';
	if (data.length>0) {
		sufix = [];
		filter = [];
		$.each(data,function(key,val){
			sufix.push(val.name+'='+val.value);
			filter.push(val.value);
		})
		if (sufix.length>0) {
			filter = filter.join('/');
			sufix = sufix.join('&');
		}
	}
	new_state = base_url+'katalog/'+filter;
	if (window.location != new_state) {
		window.history.pushState({ path: new_state}, '', new_state);
		render_catalogue_products(sufix);
	}
})
if ($('[name="catalogue-form"]')!=undefined) {
	render_catalogue();
}
function render_catalogue(){	
	var	thisis = $('[name="catalogue-form"]'),
		s = $('[name="catalogue-form"] [name="s"]').attr('val'),
		k = $('[name="catalogue-form"] [name="k"]').attr('val'),
		key = $('[name="catalogue-form"] [name="key"]').attr('val');
	$('[name="catalogue-form"] [name="s"]').val(s).change();
	$('[name="catalogue-form"] [name="k"]').val(k).change();
	$('[name="catalogue-form"] [name="key"]').val(key);
	render_catalogue_products('s='+s+'&k='+k+'&key='+key);	
}

function render_catalogue_products(sufix){
	var filter = '';
	if (sufix!=undefined || sufix=='') {
		filter = sufix;
	}
	var link_url = base_url+'json_data/catalogue?'+filter;
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			$('#render-catalogue-products').html(data);
			$('.lazy-load').loadScroll(1000);
		},error:function(data){
		  console.log(data.responseText);
		}
	})	
}

$(document).on('input',".MoneyIDR",function(){
  var input_val = $(this).val();
  if (input_val === "") { return; }
  if (input_val.indexOf(",") >= 0) {
    var decimal_pos = input_val.indexOf(".");
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);
    left_side = formatNumber(left_side);
    right_side = formatNumber(right_side);
    right_side = right_side.substring(0, 2);
    input_val = "Rp. " + left_side + "," + right_side;

  } else {
    input_val = formatNumber(input_val);
    input_val = "Rp. " + input_val;
  }
  $(this).val(input_val);
})

function formatNumber(n) {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


$(document).on('change','[name="check_out_transaction"] .courier_option',function(event){
	event.preventDefault();
	var destination = $('[name="check_out_transaction"] [name="subdistrict_id"]').val(),
		id_trans = $('[name="check_out_transaction"] [name="id_trans"]').val(),
		courier_id = $('[name="check_out_transaction"] [name="courier_id"]').val(),
		link_url = base_url+'json_data/cost?destination='+destination+'&destinationType=subdistrict&id_trans='+id_trans+'&courier_id='+courier_id,
		target_div = $('[load-courier-on-checkout]');
		target_div.html('<h5 class="col-abs-cc-then-normal text-center" style="opacity: .6"><label>Loading Data...</label></h5>');
  $.ajax({
    type:"GET",
    url:link_url,
    data:'',
    success:function(data){
    	var data = JSON.parse(data),
    		hasil = service_selection = '';
    	if (data.rajaongkir.status.code!=undefined && data.rajaongkir.status.code=='200') {
    		if (data.rajaongkir.results.length>0) {
    			service_selection = '';
				$.each(data.rajaongkir.results,function(key,val){
					if (val.costs.length>0) {
						hasil += '<div class="col-lg-12 text-info"><h4 align="center">'+val.code+' - '+val.name+'</h4></div>';
						hasil += '<div class="row">';
						var service = [];
						var tmp_num = 0;
						$.each(val.costs,function(key,val){
							var num = tmp_num++,
								active;
							if (num==0) {
								active = 'active';
								$('[courier-value-cart-check-out]').html(convert_Rp(val.cost[0].value));
							}
							service.push('<option value="'+num+'">'+num+'</option>');
							hasil += '<div class="col-lg-12 '+active+'" style="margin-bottom:4px" courier-selection tmp-num="'+num+'" value="'+val.cost[0].value+'"><div class="card"><div class="card-body"><table class="v-middle" style="width:100%"><tr><td>'+val.service+'<hr class="no-margin">'+val.description+'</td><td align="right"><h4 class="no-margin no-padding"><b>'+convert_Rp(val.cost[0].value)+'</b></h4></td></tr></table></div></div></div>';
						})
						service_selection = '<select name="service_id" style="display:none" class="form-control">'+service.join('')+'</select>';
						hasil += '</div>';
					}else{
						hasil += '<h4 class="text-info text-center">'+val.code+' - '+val.name+'</h4><h5 class="col-abs-cc-then-normal text-center" style="opacity: .6"><label>Ongkir Tidak Tersedia</label></h5>';
					}
				})
				hasil = '<div class="row" style="margin-top:20px">'+hasil+'</div>';
    		}
    		target_div.html(hasil+' '+service_selection)
    		sum_check_out_cost();
    	}
    },error:function(data){
      console.log(data.responseText);
    }
  })  
})
$(document).on('click','[courier-selection]',function(event){
	event.preventDefault();
	var value = convert_Rp($(this).attr('value')),
		tmp_num = $(this).attr("tmp-num");
	$('[name="service_id"]').val(tmp_num)
	$('[courier-selection]').removeClass("active");
	setTimeout(function(){
		$('[tmp-num="'+tmp_num+'"]').addClass("active");
		$('[courier-value-cart-check-out]').html(value).removeClass("fade-in-effect").addClass("fade-in-effect");
		sum_check_out_cost();
	},300);
})
function sum_check_out_cost(){
	if ($('[total-cart-check-out]').length>0 && $('[courier-value-cart-check-out]').length>0) {
		setTimeout(function(){
			var total = decodeURI(document.querySelector('[total-cart-check-out]').innerHTML).replace(/\D/g, ""),
				ongkir = decodeURI(document.querySelector('[courier-value-cart-check-out]').innerHTML).replace(/\D/g, "");
				$('[total-payment-cart-check-out]').html(convert_Rp(parseInt(total)+parseInt(ongkir)));
		},300)
	}
}
$(document).on('click','[buy-qty-minus],[buy-qty-plus]',function(event){
	event.preventDefault();
	var target = $('[name="buy_product"] [name="qty"]'),
	current = parseInt(target.val());
	if ($(this).attr('buy-qty-minus')!=undefined) {
		current -= 1;	
	}else{
		current += 1;
	};
	if (current>0) {
	}else{
		current = 1;
	}
	target.val(current);
})
$(document).on('input','[user-reg] [name="password"],[user-reg] [name="re_password"]',function(event){
	event.preventDefault();
	var cond = false,
		pass_result = $('[password-result]'),
		value = this.value,
		name = $(this).attr("name")
		length = value.split('').length;

	if (name=='password') {
		if (value==$('[user-reg] [name="re_password"]').val()) {
			cond = true;
		}
	}if (name=='re_password') {
		if (value==$('[user-reg] [name="password"]').val()) {
			cond = true;
		}
	}if(length<6){
		cond = false;
	};
	if (cond==true) {
		pass_result.html("Password sesuai.").removeClass('text-danger').addClass('text-success');
		$('[user-reg] [type="submit"]').prop('disabled',false);
	}else{
		var result = "",
			ps_length = $('[user-reg] [name="password"]').val().split('').length,
			kps_length = $('[user-reg] [name="password"]').val().split('').length;
		if (ps_length<6) {
			result += "Jumlah character minimal 6 character.";
		}if ($('[user-reg] [name="password"]').val()!=$('[user-reg] [name="re_password"]').val() && $('[user-reg] [name="re_password"]').val()) {
			result += " Password tidak sesuai.";
		}
		pass_result.html(result).addClass('text-danger').removeClass('text-success');
		$('[user-reg] [type="submit"]').prop('disabled',true);
	}
})

var required_folder = base_url+'user/required/',
	crud_file = required_folder+'crud?';
$(document).on('click','tr[data-href]',function(event){
	event.preventDefault();
	var link_url = $(this).attr('data-href');
	location.href = link_url;
})
$(document).on('submit','#show_per_page',function(event){
  event.preventDefault();
  var id = '#'+$(this).attr('id'),
    target_url = $(this).attr('action'),
    per_page = $(id+' [name="per_page"]').val(),
    get_url = decodeURI(window.location).split(AppClassName),
    link_url = get_url[0]+'required/'+AppClassName+'?per_page='+per_page,
    load_link = get_url[1]+'?per_page='+per_page;
  $.ajax({
    type:"GET",
    url:link_url,
    data:$(this).serialize(),
    success:function(data){
      default_func();
      new_state = refresh_location(0)+AppClassName+'/';
      if (window.location != new_state) {
        window.history.pushState({ path: new_state}, '', new_state);
      }
    },error:function(data){
      console.log(data.responseText);
    }
  })  
})
$(document).on('click','.pagination a',function(event){
  event.preventDefault();
  var href = $(this).attr('href');
  if (href=='') {
    href='/';
  };
  default_func(href);
  var get_url = decodeURI(window.location).split(AppClassName);
  var new_state =get_url[0]+AppClassName+href;
  if (window.location != new_state) {
    window.history.pushState({ path: new_state}, '', new_state);
  }
  return true;
});
$(document).on('input','.InputDec', function(){
  var split_str = decodeURI(this.value).split('.'),
    result = '';
  if (this.value.length==1 && this.value=='.') {
    result = '0.';
  }else if(this.value.length>1 && split_str.length==1){
    result = parseInt(this.value);
  }else if(split_str.length>1){
    ret = '';
    for (var i = 0; i < split_str.length ; i++) {
      if (i==0) {
        ret += parseInt(split_str[i])+'.';
      }else{
        ret += ''+split_str[i];        
      }
    }
    result = ret;
  }else{
    result = this.value;
  }
  this.value = decodeURI(result).replace(/[^0-9\.]/g,'');    
});
$(document).on('input','.InputInt', function(){
  var split_str = decodeURI(this.value).split('.'),
    result = '';
  if (this.value.length==1 && this.value=='.') {
    result = '0.';
  }else if(this.value.length>1 && split_str.length==1){
    result = parseInt(this.value);
  }else if(split_str.length>1){
    ret = '';
    for (var i = 0; i < split_str.length ; i++) {
      if (i==0) {
        ret += parseInt(split_str[i])+'.';
      }else{
        ret += ''+split_str[i];        
      }
    }
    result = ret;
  }else{
    result = this.value;
  }
  this.value = decodeURI(result).replace(/[^0-9]/g,'');    
});
$(document).on('input','.NumberOnly', function(event){
  var result = decodeURI(this.value).replace(/[^0-9]/g,''),
  	maxlenght = parseInt($(this).attr("maxlength"));
  if (maxlenght>0 || decodeURI(result.split('').length)<=decodeURI(maxlenght)) {
  	this.value = decodeURI(result).substr(0,maxlenght);
  }else{
  	this.value = result;
  }
      
});
$(document).on('focus','.NumberOnly', function(){
	$(this).attr("type","number");   
});

$(document).on('click','[re-type-password]',function(event){
	event.preventDefault();
	var target = $(this).attr('re-type-password');
		$(this).find('.fa').removeClass('fa-eye').removeClass('fa-eye-slash');
	if ($(target).attr('type')=='password') {
		$(target).attr('type','text');
		$(this).find('.fa').addClass('fa-eye');
	}else{
		$(target).attr('type','password');
		$(this).find('.fa').addClass('fa-eye-slash');
	}
})
$(document).on('click','[like-the-product]',function(event){
	var link_url = $(this).attr('data-href');
	$.ajax({
		type:"GET",
		url:link_url,
		data : '',
		success:function(data){
			var data = JSON.parse(data);
			if (data.result!=undefined) {
				if (data.result=='1') {
					$('[like-the-product]').removeClass('btn-outline-danger').addClass('btn-danger');
				}if (data.result=='11') {
					$('[like-the-product]').removeClass('btn-danger').addClass('btn-outline-danger');
				}				
			}if (data.count!=undefined) {
				$('[count-product-likes]').css({'opacity':'0','-webkit-animation':"die_time .3s"});
				setTimeout(function(){
					$('[count-product-likes]').html(data.count).css({'opacity':'1','-webkit-animation':"show_time .5s"});
				},400)
			}
		},error : function(data){
			console.log(data.responseText);
		}
	})

})
var product_in_cart = $('[product-in-chart]');
if (product_in_cart.length) {
	var id = product_in_cart.attr('id');
	get_product_in_cart(id)
}

function get_product_in_cart(id){
	var link_url = base_url+'json_data/product_in_cart?id='+id,
		items = 0;
	$.ajax({
		type:"GET",
		url:link_url,
		data : '',
		success:function(data){
			if (data!='') {
				var data = JSON.parse(data);
				result = '';
				if (data.length>0) {
					result += '<span class="btn btn-outline-secondary btn-block" style="width:90%;margin:0 5%" data-toggle="modal" data-target="#modal-cart-list">'+data.join(' ')+'</span>';
					product_in_cart.addClass('text-purple').addClass('text-center').addClass('text-white').html(result);
				}else{
					product_in_cart.removeClass('text-purple').removeClass('text-center').removeClass('text-white').html('');				
				}
			}
		},error : function(data){
			console.log(data.responseText);
		}
	})	
}
$(document).on('click','button[type="button"][href]',function(event){
	event.preventDefault();
	location.href = $(this).attr('href');
})
$(document).on('submit','[filter-box]',function(event){
	event.preventDefault();
	var data = $(this).serializeArray(),
		array = [],
		categories = [];
	if (data.length>0) {
		$.each(data,function(key,val){
			if (val.name!='c') {
				array.push(val.name+'='+val.value);
			}else{
				categories.push(val.value);
			}
		})
		if (categories.length>0) {
			array.push('c='+categories.join(','));
		}
	}if (array.length>0) {
		location.href=base_url+'search?'+array.join('&');
	}
})
function img_file(file_url,attc,real_file){
  var data_src = '';
  if (real_file!=undefined && real_file!='') {
    data_src = ' data-src="'+real_file+'" ';
  }
  return '<img class="lazy-load" src="'+file_url+'" '+data_src+attc+' data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="">';
}
$(document).on('click','.owl-carousel .item',function(event){
	event.preventDefault();
	var link_url = $(this).attr('href');
	if (link_url!=undefined && link_url!='' && link_url!='#') {
		location.href = link_url;
	}
})
if ($('.owl-carousel').length>0 || $('.responsive-owl-carousel').length>0) {
	open_script(base_url+'assets/dist/js/owl.carousel.min.js',1);
}
function open_script(file_url,do_after){
	$.getScript( file_url ).done(
		function( script, textStatus ) {
			if (do_after==1) {
				owlcar();
			}
		}
	).fail(function( jqxhr, settings, exception ) {open_script(file_url);});
}

function owlcar(){
	var owl = $('.home-owl-carousel'),
		owl_1 = $('.responsive-owl-carousel');
	if (owl.length>0) {
		owl.owlCarousel({
			autoWidth: false,
			autoHeight: true,
			items: 1,
			margin:0,
			loop:true,
			autoplay:true,
			dots:false,
			nav:false,
			autoplayHoverPause:true,
			smartSpeed:2500,
			responsive:{
				0:{
					items:1,
					nav:true
				},
				600:{
					items:1,
					nav:false
				},
				1000:{
					items:1,
					nav:true,
					loop:false
				}
			}
		})
	}if (owl_1.length>0) {
		owl_1.owlCarousel({
			autoWidth: false,
			autoHeight: true,
			items: 1,
			margin:0,
			loop:true,
			autoplay:true,
			dots:false,
			nav:false,
			autoplayHoverPause:false,
			smartSpeed:2000,
		    margin:10,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        600:{
		            items:1,
		            nav:false
		        },
		        1000:{
		            items:1,
		            nav:true,
		            loop:false
		        }
		    }
		})
	}

	owl.trigger('play.owl.autoplay',[4500]);
}


$(document).on('click','[all-product-images] [data-src]',function(event){
	event.preventDefault();
	if ($('[main-product-image]').length==1) {
		if ($('[main-product-image]').attr('src')!=$(this).attr('data-src')) {
			$('[main-product-image]').attr('src',$(this).attr('src'));
			$('[main-product-image]').attr('data-src',$(this).attr('data-src'));
			setTimeout(function(){
				$('[main-product-image]').loadScroll();
			},500)		
		}
	}
})
$('body').append('<div class="modal fade-in" id="peek-the-image"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body" style="padding:4px"><button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position:absolute;top:0px;right:6px;color:Tomato"><span aria-hidden="true">×</span></button><div view-image></div></div></div></div></div>')
$(document).on('click','[main-product-image]',function(event){
	event.preventDefault();
	if ($(this).attr('data-src')==undefined) {
		$('#peek-the-image').modal('show');
		$('#peek-the-image [view-image]').html('<img src="'+$(this).attr('src')+'" width="100%">');
	}else{
		$('#peek-the-image').modal('show');
		$('#peek-the-image [view-image]').html('<img src="'+$(this).attr('data-src')+'" width="100%">');
	}
})

  function convert_Rp(data){
    if (data!='' && data!=null) {
      var angkaStr = data.toString();
      var angkaStrRev = angkaStr.split('').reverse('').join('');
      var angkaStrRevTitik = '';
      for (var i = 0; i < angkaStrRev.length; i++) {
        angkaStrRevTitik += angkaStrRev[i];
        if ((i+1)%3 === 0 && i !== (angkaStrRev.length-1)) {
          angkaStrRevTitik += '.';
        }
      }
      var result = angkaStrRevTitik.split('').reverse('').join('');
      if (result=='') {
        return 'Rp. 0';
      }else{
        return 'Rp. '+result;
      }
    }else{
      return '';
    }
  }
$(document).on('click','[data-target="#modal-cart-list"]',function(event){
	event.preventDefault();
	render_cart_data();
})
function render_cart_data(){
	var target_div = $('#modal-cart-list .modal-body'),
		link_url = base_url+'json_data/cart',
		items = 0;
	$.ajax({
		type:"GET",
		url:link_url,
		data : '',
		success:function(data){
			var data = JSON.parse(data),
				hasil = "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
			if (data.login!=undefined) {
				hasil = '<p align="center"><label>Silahkan login terlebih dahulu untuk dapat berbelanja, klik tombol dibawah ini untuk login</label><br><a data-toggle="modal" data-target="#modal-user-reg" href>daftar</a> atau <a data-toggle="modal" data-target="#modal-user-log" href>login</a></p>';
				$('#modal-cart-list').modal('hide');
				$('#modal-user-log').modal('show');
			}else{
				if (data.length>0) {
					for (var i = 0; i < data.length; i++) {
						var product_list = data[i]['product_list']
							no = 1;
						if (product_list.length>0) {
							hasil += '<h5>Detail Pesanan</h5><h5><small><label>No. Inv : '+data[i]['trans_cd']+'</label> <label style="float:right">'+data[i].create_date+'</label></small></h5><div class="table-responsive"><table class="table table-striped table-bordered">';
							hasil += '<tr><th>Nama Item</th><th>Qty</th><th>Harga</th></tr>'
							grand_price = 0;
							$.each(product_list,function(key,val){
								var price = (val.price*val.qty);
									price -= (price/100)*val.discount;
									price = Math.ceil(price);
									grand_price += price;
								hasil += '<tr detail-item-in-cart-'+val.id+'><td><a href="'+val.link_url+'">'+val.product_name+' '+val.option_name+' '+val.variant_name+' </a></td><td align="right">'+val.qty+'</td><td align="right">'+convert_Rp(Math.ceil(price))+'</td></tr>';
							})
							hasil += '<tr><td align="right" colspan="2">Total</td><td align="right">'+convert_Rp(Math.ceil(grand_price))+'</td></tr></table></div><a href="'+base_url+'keranjang?inv='+data[i].trans_cd+'" class="btn btn-outline-success btn-sm">Check Out</a>';
							hasil += '<hr><h5 class="text-info text-center">Seluruh item dapat anda rubah ataupun hapus di halaman checkout transaksi</h5>';
						}
					}
				}else{
					hasil = '<h5 align="center" style="margin-top:10px"><label>Tidak Ada Item Dalam Keranjang</label></h5><p align="center"><a href="'+base_url+'user/transaksi/">Lihat Riwayat Transaksi</a></p>';
				}
			}
			target_div.html('<div class="fade-in-effect">'+hasil+'</div>');
		},error : function(data){
			console.log(data.responseText);
		}
	})	
}
var cart_btn = $('[header-count-cart-item]');
if (cart_btn.length==1) {
	render_cart_btn();
}
function render_cart_btn(){
	var link_url = base_url+'json_data/cart',
		items = 0;
	$.ajax({
		type:"GET",
		url:link_url,
		data : '',
		success:function(data){
			var data = JSON.parse(data);
			if (data.length>0) {
				for (var i = 0; i < data.length; i++) {
					items += data[i]['total_qty'];
				}
			}if (items>0) {
				$('[header-count-cart-item], [count-cart-item]').html('<b>'+items+'</b>');
			}if (items==0) {
				$('[header-count-cart-item], [count-cart-item]').html('');			
			}
		},error : function(data){
			console.log(data.responseText);
		}
	})	
}

var btn_form = $('[product-btn-form]');
if (btn_form.length==1) {
	render_form_btn();
}
function render_form_btn(){
	var id = btn_form.attr('id'),
		link_url = base_url+'json_data/product_btn?id='+id;
	$.ajax({
		type:"GET",
		url:link_url,
		data : '',
		success:function(data){
			btn_form.html(data);
		},error : function(data){
			console.log(data.responseText);
		}
	})	
}
$(document).on('click','.p-option',function(event){
	event.preventDefault();
	//[product-stock-display],
	$('.product-price , .product-price-before-discount').css({'opacity':'0','-webkit-animation':"die_time .3s"});
	var price = $(this).attr('price'),
		price_before_discount = $(this).attr('price-before-discount'),
		stock = $(this).attr('stock-option');
	setTimeout(function(){
		//, [product-stock-display]
		$('.product-price , .product-price-before-discount').css({'opacity':'1','-webkit-animation':"show_time .5s"});
		$('.product-price').html(price);
		$('.product-price-before-discount').html(price_before_discount);
		//$('[product-stock-display]').html(stock);
	},400);
	if ($('.p-option').hasClass('active')==true) {
		$('.p-option').removeClass('active');
	}
	$(this).addClass('active');
	$('[name="id_option"]').val($(this).attr('id-option')).change();
})

$(document).on('submit','[search-box]',function(event){
	event.preventDefault();
	var dataArray = $(this).serializeArray(),
	dataObj = {};
	$(dataArray).each(function(i, field){
		dataObj[field.name] = field.value;
	});
	if (dataObj['search']!=undefined) {
		location.href = base_url+'search?k='+dataObj['search'];
	}
})


$('.lazy-load').loadScroll(1000);
$('body').append("<div class='modal fade-in' id='view-detail-data'><div class='modal-content'><div class='modal-body'><button type='button' class='close' data-dismiss='modal'>&times;</button><div class='content-detail'></div></div></div></div>")
const navSlide = () => {
	const body = document.querySelector('body');
	const burger = document.querySelectorAll('.burger');
	const burger_close = document.querySelector('.burger_close');
	const burger_open = document.querySelector('.burger_open');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
	burger.forEach(item => {
		item.addEventListener('click',()=>{
			nav.classList.toggle('nav-active');
			navLinks.forEach((link, index) => {
				if (link.style.animation) {
					link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.2}s`;
				}else{
					link.style.animation = `navLinkFadeOut 0.5s ease forwards ${index / 7 + 0.2}s`;
				}
			})
			burger_open.classList.toggle('toggle');
			burger_close.classList.toggle('toggle');
			body.classList.toggle('modal-open');
		})
	})
	/*
	const open_add = document.querySelectorAll('li');
	open_add.forEach(item => {
			item.addEventListener('click',()=>{
				if (item.childNodes[3]!==undefined) {
					var text = item.childNodes[3].innerHTML;
					console.log(text);
					$('#view-detail-data').modal('show');
					$('#view-detail-data .content-detail').html("<h4 class='text-center no-margin no-padding'>"+text+"</h4>");
				}
			})
	})
	*/
}

$(document).on('submit','[user-reg]',function(event){
	event.preventDefault();
	var link_url = $(this).attr('href');
	$.ajax({
		type:"POST",
		url:link_url,
		data : $(this).serialize(),
		success:function(data){
			if (data!=undefined) {
				if (data=='1') {
					confirm_result("Pendaftaran berhasil silahkan lanjutkan ke form login",1,3000);
					$('#modal-user-reg').modal('hide');
					$('#modal-user-log').modal('show');
				}else{
					if (data=='9') {
						confirm_result("Email sudah digunakan",3,3000);
						$('[user-reg] [name="email"]').val('');
						$('[user-reg] [name="email"]').focus();
					}if (data=='8') {
						confirm_result("Username sudah digunakan",3,3000);
						$('[user-reg] [name="username"]').val('');
						$('[user-reg] [name="username"]').focus();
					}if (data=='7') {
						confirm_result("Password tidak sesuai",3,3000);
						$('[user-reg] [name="re_password"]').val('');
						$('[user-reg] [name="re_password"]').focus();
					}else{
						confirm_result("Maaf Pendaftaran Gagal",3,3000);					
					}
					open_captcha();
					$('[user-reg] [name="captcha"]').val('');
				}
			}
		},error : function(data){
			console.log(data.responseText);
		}
	})
})


navSlide();




var transaksi_tmp_chart_qty = 0
$(document).on('keyup','[transaksi-chate-qty-product-on-cart]',function(event){
	event.preventDefault();
	var new_val = this.value,
		id = $(this).attr('id');
	setTimeout(function(){
		if (new_val==0) {
			this.value = 1;
		}if (transaksi_tmp_chart_qty!=new_val) {
			transaksi_tmp_chart_qty = new_val;
			var link_url = crud_file+'function=change_qty&id='+id+'&qty='+new_val;
			$.ajax({
				type:"GET",
				url:link_url,
				data:'',
				success:function(data){
					var data = JSON.parse(data);
					if (data.result=='1' && data.result!=undefined) {
						this.value = data.qty;
						$('[render-single-price-item-on-cart-'+id+'],[total-cart-on-transaction-'+data.id_trans+'],[total-weight-cart-on-transaction-'+data.id_trans+']').css({'opacity':'0','-webkit-animation':"die_time .3s"});
						setTimeout(function(){						
							$('[render-single-price-item-on-cart-'+id+']').html(convert_Rp(data.total_price));
							$('[total-cart-on-transaction-'+data.id_trans+']').html(convert_Rp(data.cart_price));
							$('[total-weight-cart-on-transaction-'+data.id_trans+']').html(data.cart_weight);
							$('[render-single-price-item-on-cart-'+id+'],[total-cart-on-transaction-'+data.id_trans+'],[total-weight-cart-on-transaction-'+data.id_trans+']').css({'opacity':'1','-webkit-animation':"show_time .5s"});
						},300)
					}
				}
			})
		}	
	},500)
})
$(document).on('change','[variant-option-on-product]',function(){
	event.preventDefault();
	var id_option = $('[name="buy_product"]').find('.p-option.active').attr('id-option'),
		id_variant = $(this).val(),
		id_product = $('[name="buy_product"] [name="id_product"]').val();
		link_url = base_url+'json_data/get_stock?id_option='+id_option+'&id_variant='+id_variant+'&id_product='+id_product;
	$('[product-stock-display]').css({'opacity':'0','-webkit-animation':"die_time .3s"});
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			setTimeout(function(){
				$('[product-stock-display]').css({'opacity':'1','-webkit-animation':"show_time .5s"});
				$('[product-stock-display]').html(data);
			},400);
		}
	})
})

$(document).on('click','.p-option',function(event){
	event.preventDefault();
	var id_option = $('[name="buy_product"]').find('.p-option.active').attr('id-option'),
		id_variant = $('[variant-option-on-product]').val(),
		id_product = $('[name="buy_product"] [name="id_product"]').val();
		link_url = base_url+'json_data/get_stock?id_option='+id_option+'&id_variant='+id_variant+'&id_product='+id_product;
	$('[product-stock-display]').css({'opacity':'0','-webkit-animation':"die_time .3s"});
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			setTimeout(function(){
				$('[product-stock-display]').css({'opacity':'1','-webkit-animation':"show_time .5s"});
				$('[product-stock-display]').html(data);
			},400);
		}
	})
})
get_default_stock();
function get_default_stock(){
	$('[name="buy_product"] [type="submit"]').prop("disabled",true);
	if ($('[name="buy_product"]')!=undefined) {
		var id_option = $('[name="buy_product"]').find('.p-option.active').attr('id-option'),
			id_variant = $('[variant-option-on-product]').val(),
			id_product = $('[name="buy_product"] [name="id_product"]').val();
			link_url = base_url+'json_data/get_stock?id_option='+id_option+'&id_variant='+id_variant+'&id_product='+id_product;
		$('[product-stock-display]').css({'opacity':'0','-webkit-animation':"die_time .2s"});
		$.ajax({
			type:"GET",
			url:link_url,
			data:'',
			success:function(data){
				if (parseInt(data)>0) {
					//$('[name="buy_product"] [type="submit"]').removeAttr('disabled');
				}	
				setTimeout(function(){
					$('[product-stock-display]').css({'opacity':'1','-webkit-animation':"show_time .3s"});
					$('[product-stock-display]').html(data);
				},400);
			}
		})	
	}
}


function render_single_cart_item(val,trans_status){
	var btn = '',
		qty = val.qty+val.unit_cd;
	if ((trans_status=='1' || trans_status=='2' || trans_status=='3') && trans_status!=undefined) {
		btn = '<button type="button" class="btn btn-outline-danger btn-sm" id="DeleteData" confirm-msg="Hapus <b>'+val.product_name+'  <sup>('+val.qty+')</sup></b> dari keranjang?" name="delete_item_cart" data-href="'+crud_file+'function=delete_item_cart&id='+val.id+'"><i class="fa fa-trash"></i></button>';
		qty = '<input type="number" style="min-width:3em;max-width:5em;padding-left: 4px;padding-right: 4px" min="1" max="10000" class="InputInt form-control form-control-sm text-center" transaksi-chate-qty-product-on-cart id="'+val.id+'" value="'+val.qty+'">';
	}
	return '<tr single-item-on-cart-list-'+val.id+'><td style="width:80px"><div class="img-col" style="border:1px solid #ddd"><img src="'+val.small_file_url+'"></div></td><td class="text-uppercase"><a href="'+val.link_url+'">'+val.product_name+' '+val.option_name+' '+val.variant_name+'</a><span class="pull-right">'+btn+'</span></td><td style="width:6em">'+qty+'</td><td align="right" render-single-price-item-on-cart-'+val.id+'>'+convert_Rp(val.total_price)+'</td></tr>';
}
function render_single_cart_item_tipe_2(val,trans_status){
	var qty = val.qty+val.unit_cd;
	return '<tr single-item-on-cart-list-'+val.id+'><td class="text-uppercase"><a href="'+val.link_url+'">'+val.product_name+' '+val.option_name+' '+val.variant_name+'</a></td><td>'+qty+'</td><td align="right" render-single-price-item-on-cart-'+val.id+'>'+convert_Rp(val.total_price)+'</td></tr>';
}
if ($('[load-cart-list]').length>0) {
	home_cart_list($('[load-cart-list]').attr("data-href"),$('[load-cart-list]'));
}if (typeof AppClassName=='undefined') {
	if ($('.province_option').length>0) {
		province_option();
	}if ($('.city_option').length>0) {
		city_option();
	}if ($('.courier_option').length>0) {
		courier_option();
	}
}if ($('[check-out-courier-cart-detail]').length>0) {
	check_out_courier_cart_detail($('[check-out-courier-cart-detail]').attr("data-href"),$('[check-out-courier-cart-detail]'));	
}if ($('.categories_option').length>0) {
	categories_option();
}

var default_to_city = null;
$(document).on('change','[to-city]',function(event){
	event.preventDefault();
	var value = $(this).val(),
		target = $(this).attr('to-city'),
		target_div = $(target);
	if (default_to_city!=value && value!='') {
		default_to_city=value;
		target_div.find('option').remove().append();
		city_option(value,'',target_div);
	}else{
		target_div.val('').change();
	}
})
var default_subdistto_rict = null;
$(document).on('change','[to-subdistrict]',function(event){
	event.preventDefault();
	var value = $(this).val(),
		target = $(this).attr('to-subdistrict'),
		target_div = $(target);
	if (default_subdistto_rict!=value && value!='') {
		default_subdistto_rict=value;
		target_div.find('option').remove().append();
		subdistrict_option(value,target_div);
	}else{
		target_div.val('').change();
	}
})

function home_cart_list(link_url,target_div){
	var effect = 'fade-in-effect',
		hasil = '';
		target_div.html(hasil);
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var data = JSON.parse(data);
			if (data.id!=undefined && data.trans_status=='1') {
				if (data.items.length>0) {
					var table = '<tr><th colspan="2">Item</th><th>Qty</th><th>Harga</th></tr>';
					$.each(data.items,function(key,val){
						table += '<span render-single-cart-item-'+val.id+'>'+render_single_cart_item(val,data.trans_status)+'</span>';
					})
					table += '<tr><th colspan="3" class="text-left">Total</th><th class="text-right" total-cart-on-transaction-'+data.id+'>'+convert_Rp(data.total_cart)+'</th></tr>';
					table += '<tr><th colspan="3" class="text-left">Berat</th><th class="text-right"><span total-weight-cart-on-transaction-'+data.id+'>'+data.total_weight+'</span> gram</th></tr>';
					hasil += '<div class="table-responsive '+effect+'"><table class="v-middle checkout-table">'+table+'<table></di>';
					hasil += '<p><button type="button" class="btn btn-outline-info" href="'+base_url+'keranjang?inv='+data.trans_cd+'&checkout"><i class="fa fa-paper-plane"></i> Lanjut Pengiriman & Pembayaran</button></p>';
				}else{
					hasil += '<h5 align="center"><label>Tidak ada item dalam transaksi ini.</label></h5>';
				}
			}else{
				hasil = '<h4 align="center"><label>Maaf transaksi yang anda cari tidak ada di database kami.</label></h4>';
			}
			target_div.html(hasil);
		}
	});
}

function check_out_courier_cart_detail(link_url,target_div){
	var effect = 'fade-in-effect',
		hasil = '';
		target_div.html(hasil);
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var data = JSON.parse(data);
			if (data.id!=undefined) {
				if (data.items.length>0) {
					var table = '<tr><th>Item</th><th>Qty</th><th>Harga</th></tr>';
					$.each(data.items,function(key,val){
						table += '<span render-single-cart-item-'+val.id+'>'+render_single_cart_item_tipe_2(val,data.trans_status)+'</span>';
					})
					table += '<tr><td colspan="2">Total</td><td class="text-right" total-cart-on-transaction-'+data.id+'>'+convert_Rp(data.total_cart)+'</td></tr>';
					table += '<tr><td colspan="2">Berat</td><td class="text-right"><span total-weight-cart-on-transaction-'+data.id+'>'+data.total_weight+'</span> gram</td></tr>';
					hasil += '<div class="table-responsive '+effect+'"><table class="table v-middle" style="border:1px solid #dddd">'+table+'<table></di>';
					$('[total-cart-check-out]').html(convert_Rp(data.total_cart));
					sum_check_out_cost();					
				}else{
					hasil += '<h5 align="center"><label>Tidak ada item dalam transaksi ini.</label></h5>';
				}
			}else{
				hasil = '<h4 align="center"><label>Maaf transaksi yang anda cari tidak ada di database kami.</label></h4>';
			}
			target_div.html(hasil);
		}
	});
}















window.onresize = function(){
	/*
	const nav = document.querySelector('.nav-links');
	nav.style.top = (document.querySelector('.navbar-menu').clientHeight+2)+'px';
	*/
}
		document.addEventListener('DOMContentLoaded', function() {
			$(document).on('click','.sosmed-bar a',function(e){
				e.preventDefault();
				var id_contact = $(this).attr('contact-id'),
					location_href = $(this).attr('href'),
					rec_link = base_url+'crud_data?function=contact_hits&id='+id_contact;
				window.open(location_href, '_blank');
				$.ajax({
					type:"GET",
					url:rec_link,
					data:'',
					success:function(data){
					},error : function(data){
				        console.log(data.responseText);
					}
				})
			})

			function checkValue(str, max) {
				if (str.charAt(0) !== '0' || str == '00') {
					var num = parseInt(str);
					if (isNaN(num) || num <= 0 || num > max) num = 1;
					str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
				};
				return str;
			};
			$(document).on('input','.id-date-format', function(e) {
				this.type = 'text';
				var input = this.value;
				if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
					var values = input.split('-').map(function(v) {
					return v.replace(/\D/g, '')
				});
				if (values[0]) values[0] = checkValue(values[0], 31);
				if (values[1]) values[1] = checkValue(values[1], 12);
					var output = values.map(function(v, i) {
					return v.length == 2 && i < 2 ? v + '-' : v;
				});
				this.value = output.join('').substr(0, 10);
			});

			$(document).on('blur','.id-date-format', function(e) {
				this.type = 'text';
				var input = this.value;
				var values = input.split('-').map(function(v, i) {
				return v.replace(/\D/g, '')
				});
				var output = '';

				if (values.length == 3) {
				var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
				var month = parseInt(values[1]) - 1;
				var day = parseInt(values[0]);
				var d = new Date(year, month, day);
				if (!isNaN(d)) {
					var dates = [ d.getDate(), d.getMonth() + 1, d.getFullYear()];
					output = dates.map(function(v) {
					v = v.toString();
					return v.length == 1 ? '0' + v : v;
					}).join('-');
				};
				};
				this.value = output;
			});

			$('.modal').on('hidden.bs.modal', function (e) {
			  e.preventDefault();
			  var targetid = $(this).attr('id');
			  if ($(this).find('form')) {
			    $(this).find('form').trigger('reset');
			  };
			  if (targetid!=undefined) {
			  }if ($('.modal:visible').length>0) {
			    if ($('body').hasClass('modal-open')==false) {
			      $('body').addClass('modal-open');      
			    }
			  }else{
			    $('body').removeClass('modal-open');
			  }
			})
			var modal_img = $('#modal-open-file');
			if (modal_img.length==1) {
				$(document).on('click','.click-and-open img',function(e){
					var img_file = $(this).attr('src');
					modal_img.modal('show');
					modal_img.find('.modal-body').html('<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button><img src="'+img_file+'" style="max-width:auto;max-height:auto;float:left">');
				})
			}
			searchbox_main_home();
			function searchbox_main_home(){
				if ($('.search-form-top').length==1 && $('.navbar-menu').length==1) {
					var navbar_height = document.querySelector('.navbar-menu').clientHeight;
					$('.search-form-top').css({'padding-top':navbar_height+'px'});
				}
			}
			window.onresize = function(){
				searchbox_main_home();
			}
			var win_height = $(window).innerHeight()
				navbar_height = $('.navbar-menu').innerHeight();
			if ($(window).scrollTop()>=win_height) {
				floating_navbar();
			}else{
				static_navbar();
			}
			$(window).scroll(function() {    
				var scroll = $(window).scrollTop();
				if (scroll >= 50) {
					floating_navbar();
				}else{
					static_navbar();
				}
			});
			function floating_navbar(){
				/*
				$('.navbar-menu').css({'position':'fixed'});
				if ($('[navbar-ext] #navbar-ext').length==0) {
					$('[navbar-ext]').html('<p id="navbar-ext" style="height:'+navbar_height+'px;width:100%;margin:0;padding:0px"></p>');
				}
				*/
				$('.navbar-menu .navbar-search').css({'padding-top':'6px','padding-bottom':'0px','padding-left':'10%','padding-right':'10%','transition':'all .9s ease'});
				$('.navbar-menu').css({'box-shadow':'0px 0px 10px black','transition':'all .9s ease'});
				$('.navbar-menu .nav-links').css({'color': 'White','transition': 'all 0.3s ease'});
				$('.navbar-menu .site-name-header').css({'color': 'White','transition': 'all 0.3s ease'});
			}
			function static_navbar(){
				/*
				$('.navbar-menu').css({'position':'static'});
				if ($('[navbar-ext] #navbar-ext').length>0) {
					$('[navbar-ext]').html('');
				}
				*/
				$('.navbar-menu .navbar-search').css({'padding-top':'20px','padding-bottom':'0px','padding-left':'14%','padding-right':'14%','transition':'all .9s ease'});
				$('.navbar-menu').css({'box-shadow':'none','transition':'all .9s ease'});
				$('.navbar-menu .nav-links').css({'color': 'White','transition': 'all 0.3s ease'});
				$('.site-name-header').css({'color': 'White','transition': 'all 0.3s ease'});
			}
			function getOffset(el) {
				var _x = 0;
				var _y = 0;
				while( el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop )) {
					_x += el.offsetLeft - el.scrollLeft;
					_y += el.offsetTop - el.scrollTop;
					el = el.offsetParent;
				}
				return { top: _y, left: _x };
			}

			$(document).on('submit','#submitForm',function(event){
				event.preventDefault();
				var form_name = $(this).attr('name');
				$.ajax({
					type : $(this).attr('method'),
					url : $(this).attr('action'),
					data : $(this).serialize(),
					success:function(data){
						after_submit(form_name,data);
						return true;
					},error : function(data){
						if (data.responseText==undefined) {
						}else{
							console.log(data.responseText);
						}
						return true;
					}
				})
			})



		}, false);

			open_captcha();
			function open_captcha(){
				$('.image-captcha').fadeOut(100);
				var url = base_url+'render_captcha';
				$.ajax({
					type : 'GET',
					url : url,
					data : $(this).serialize(),
					success:function(data){
						$('.image-captcha').html(data);
						setTimeout(function(){$('.image-captcha').fadeIn();},1000)
					},error : function(data){
						console.log(data.responseText);
						return true;
					}
				})
			}
/*

function confirm_result(msg){
	var modal_id = $('#modal-function-result');
	modal_id.modal('show');
	interval = 2000;
	modal_id.find('[function-result]').html(msg);
	setTimeout(function(){ 
		modal_id.modal('hide');
	}, interval);
}
*/
function education_option(){
	var link_url = base_url+"json_data/education",
		target_div = $('.education_option');
		target_div.html('<option value="" selected disabled>Loading Data</option>')
	$.ajax({
		type:"GET",
		url:link_url,
		data:'',
		success:function(data){
			var result = JSON.parse(data),
				hasil = '';
			if (result.length>0) {
				hasil += '<option value="">Pilih Pendidikan</option>';
				$.each(result,function(key,val){
					hasil += '<option value="'+val.id+'">'+val.kd_edu+'</option>';
				});
			}else{
				hasil += '<option value="all" disabled>Tidak Ada Data</option>';				
			}
			target_div.html(hasil);
		}
	})
}


$(document).on('click','#DeleteData',function(event){
  event.preventDefault();
  type='alert';
  def_link_name = '';
  def_link_url = $(this).attr('data-href');
  confirm_msg='';
  if ($(this).attr('confirm-msg')!=undefined && $(this).attr('confirm-msg')!='') {
    confirm_msg = $(this).attr('confirm-msg');
  }if ($(this).attr('name')!=undefined && $(this).attr('name')!='') {
    def_link_name = $(this).attr('name');
  }
  cConfirm();
});


  $(document).on('click','#EditData',function(event){
    event.preventDefault();
    type='info';
    confirm_msg = $(this).attr('confirm-msg');
    def_link_name = $(this).attr('name');
    def_link_url = $(this).attr('data-href');
    if ($(this).attr('load-screen')!=undefined) {
      add_load($(this).attr('load-screen'));
    }

    if (confirm_msg!=undefined && confirm_msg!='') {
      cConfirm();
    }else{
      DoIt(def_link_name,def_link_url);
    }
  })
	active_select2();
	function active_select2(){
	  $(function () {
	    $.fn.modal.Constructor.prototype.enforceFocus = $.noop;
	    $('.select2').select2({
	        theme: 'bootstrap4',
	        dropdownAutoWidth : true,
	        width: '100%',
	    });
	    $('.select2').select2({}).focus(function () { $(this).select2('open'); });
	/*
	    $('.select2').on('select2:close', function (e){
	      e.preventDefault();
	      if ($(this).attr('go-to')!=undefined && $(this).attr('go-to')!==false && $(this).select2().val()!='' && $(this).select2().val()!='null' && $(this).attr('multiple')==undefined) {
	        var target = $(this).attr('go-to');
	          setTimeout(function() {
	          $(target).focus();      
	          },1)
	      };
	    })
	*/
	  });
	}

  $(document).on('click','[reset-form]',function(event){
    event.preventDefault();
    var reset_form = decodeURI($(this).attr('reset-form')).split(',');
    for (var i = 0; i < reset_form.length ; i++) {
      $('[name="'+reset_form[i]+'"]').trigger('reset');
      $('[name="'+reset_form[i]+'"] .select2').val('').trigger('change');
    }
  })

  var ocg = 1;
  $(document).on('click','[data-toggle="modal"]',function(){
    ocg = 0;
    reactive_ocg();
  })
  function reactive_ocg(){    
    setTimeout(function(){
      ocg = 1;
    },1000);
  }

  
function DoIt(def_link_name,def_link_url){
  if (def_link_url!=false) {
    $.ajax({
      type : 'GET',
      url : def_link_url,
      data : $(this).serialize(),
      success:function(data){
        after_submit(def_link_name,data);
        ocg = 0;
        reactive_ocg();       
      },error : function(data){
        if (data.responseText==undefined) {
          confirm_result('<h3 style="margin:0;padding:0">Periksa Koneksi Internet Anda.</h3>',3,3000);
        }else{
          console.log(data.responseText);
        }
      }
    });
  }
}
if ($('.courier_cd_option').length>0) {
	courier_cd_option();
}

$(document).on('submit','[shipment-tracking]',function(event){
	event.preventDefault();
	var link_url = $(this).attr('action')+'?waybill='+$(this).find('[name="waybill"]').val()+'&courier='+$(this).find('[name="courier"]').val();
    target_div = $('[shipment-tracking-result]').html('<h5 class="text-center text-info">Sedang Melacak...</h5>');
    $.ajax({
		type : 'GET',
		url : link_url,
		data : $(this).serialize(),
		success:function(data){
			if (data!='cURL Error #:Could not resolve host: pro.rajaongkir.com') {
				var data = JSON.parse(data),
					hasil = '';
				if (data.rajaongkir.status.code==200) {
					if (data.rajaongkir.result.summary.status!=undefined) {
						var manifest = data.rajaongkir.result.manifest;
						if (manifest.length>0 && manifest!=undefined) {
							hasil += '<div class="table-responsive"><table class="table table-bordered table-striped"><tr><th>Tanggal</th><th>Lokasi</th><th>Status</th></tr>';
							$.each(manifest,function(key,val){
								hasil += '<tr>';
								hasil += '<td>'+val.manifest_date+' - '+val.manifest_time+'</td>';
								hasil += '<td>'+val.city_name+'</td>';
								hasil += '<td>'+val.manifest_description+'</td>';
								hasil += '</tr>';
							})
							hasil += '</table></div>';
						}
					}
				}else{
					hasil = '<h5 class="text-center text-warning">Maaf paket yang anda cari tidak ditemukan</h5>';
				}
				province_ops = hasil;
				target_div.html(hasil);
			}else{
				target_div.html('<option disabled selected>data tidak ditemukan</option>');
			}   
		},error : function(data){
			if (data.responseText==undefined) {
			  confirm_result('<h3 style="margin:0;padding:0">Periksa Koneksi Internet Anda.</h3>',3,3000);
			}else{
			  console.log(data.responseText);
			}
		}
    });

})
