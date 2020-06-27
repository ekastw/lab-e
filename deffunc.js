// Dynamically load images while scrolling
// Source: github.com/ByNathan/jQuery.loadScroll
// Version: 1.0.1

(function($) {
    $.fn.loadScroll = function(duration) {
        var $window = $(window),images = this,inview,loaded;
        images.one('loadScroll', function() {
            if (this.getAttribute('data-src')) {
                this.setAttribute('src',this.getAttribute('data-src'));
                this.removeAttribute('data-src');
                if (duration) {
                    $(this).hide().fadeIn(duration).removeAttr('style').addClass('lazy-out');
                    //$(this).hide().fadeIn(duration).add('img').removeAttr('style').addClass('lazy-out');
                } else return false;
            }
        });
        function lazy_load_image(){
            inview = images.filter(function() {
                var a = $window.scrollTop(),
                    b = $window.height(),
                    c = $(this).offset().top,
                    d = $(this).height();
                return c + d >= a && c <= a + b;
            });            
            loaded = inview.trigger('loadScroll');
            images = images.not(loaded);   
        }
        $window.scroll(function() {
            lazy_load_image();                  
        });
        $window.ready(function() {
            lazy_load_image();           
        })        
    };
    
})(jQuery);

// ----------- custom_confirm
var crm_res = '<div class="confirm-result" style="text-transform:capitalize;box-shadow:1px 1px rgba(0,0,0,0.6);display:none;position:fixed;padding:10px 20px;right:20px;top:20px;z-index:9999;color:White;opacity:0.9;font-size:1em">message after proccessing</div>',
    crm = '<div class="modal fade-in" id="modal-confirm"><div class="modal-dialog modal-sm"><div class="modal-content" style="width:100%"><div class="modal-body" style="border-radius:4px 4px 0px 0px;opacity:.9"><h4 style="padding:0px;margin:0px"><b modal-title>Warning !!!</b></h4><h5 modal-action>Delete Data?</h5><span class="fa fa-warning" style="font-size: 4em;position: absolute;right: 10px;top: 10px"></span><hr class="no-margin"><h6 modal-msg align="center" style="margin-top:14px"></h6></div><div class="modal-footer" style="padding:4px"><button class="btn btn-default btn-cancel" onclick="Cconfirm.no(event)">Cancel</button><button class="btn btn-light btn-confirm" onclick="Cconfirm.yes(event)">Hapus</button></div></div></div></div>',
    def_link_name,
    def_link_url,
    type,
    confirm_msg='',
    Cconfirm = new cConfirm();

$('body').append(crm_res+crm);



function cConfirm(){
  //bg color
  $('#modal-confirm .modal-body').removeClass('bg-warning').removeClass('bg-danger').removeClass('bg-info');
  //btn confirm
  $('#modal-confirm .btn-confirm').removeClass('btn-light');
  $('#modal-confirm .btn-confirm').removeClass('btn-danger');
  $('#modal-confirm .btn-confirm').removeClass('btn-warning');
  $('#modal-confirm .btn-confirm').removeClass('btn-primary');
  //confirm msg
  $('#modal-confirm [modal-msg]').html('');
  //confirm title
  $('#modal-confirm [modal-title]').html('');
  if (confirm_msg!='' && confirm_msg!=undefined) {
    $('#modal-confirm [modal-msg]').html(confirm_msg);
  }else{
    $('#modal-confirm [modal-msg]').html('Anda Akan Menghapus Data Ini?');    
  }if (type=='alert') {
    $('#modal-confirm .modal-body').addClass('bg-danger').addClass("text-white");
    $('#modal-confirm [modal-action]').html('<h4 class="no-margin no-padding">Delete</h4>');
    $('#modal-confirm [modal-title]').html('Warning !!!');

    $('#modal-confirm .btn-confirm').addClass('btn-danger');
    $('#modal-confirm .btn-confirm').html('Delete');
  }if (type=='info') {
    $('#modal-confirm .modal-body').addClass('bg-info').addClass("text-white");
    $('#modal-confirm [modal-action]').html('<h4 class="no-margin no-padding">Update</h4>');
    $('#modal-confirm [modal-title]').html('Change !!!');

    $('#modal-confirm .btn-confirm').addClass('btn-primary');
    $('#modal-confirm .btn-confirm').html('Update');
  }if (def_link_name!=null && def_link_url!=null) {
    $('#modal-confirm').modal('show');
    $('#modal-confirm .btn-confirm').focus();
    $('#modal-confirm .btn-confirm').css({'border':'1px solid rgba(255,255,255,.8)'});
  };
  this.yes = function(event){
    event.preventDefault();
    DoIt(def_link_name,def_link_url);
    $('#modal-confirm').modal('hide');
  }
  this.no = function(event){
    event.preventDefault();
    $('#modal-confirm').modal('hide');
  }
  confirm_msg='';
}

function confirm_result(msg,bg_color,interval_data){
  var target_id = $('.confirm-result');
  target_id.fadeIn();
  interval = 3000;
  target_id.css({'background':'DodgerBlue'});
  if (interval_data!=undefined || interval_data!=null || interval_data!='') {
    interval = interval_data;
  }if (bg_color!=undefined || bg_color!=null || bg_color!='') {
    target_id.css({'background':'red'}); 
    if (bg_color==1 || bg_color==11 || bg_color==111) {
      target_id.css({'background':'LimeGreen'});      
    }if (bg_color==2 || bg_color==22 || bg_color==222) {
      target_id.css({'background':'orange'});      
    }if (bg_color==3 || bg_color==33 || bg_color==333) {
      target_id.css({'background':'red'});      
    }
  }if (msg!=undefined || msg !=null || msg!='') {
    target_id.html(msg);
  }
  setTimeout(function(){ 
    target_id.fadeOut();
  }, interval);
}



$(document).on('click','[use-balance-for-payment]',function(){
	var target = $('[payment-with-or-without-balance]'),
		balance = target.attr('payment-without-balance');
	if ($(this).prop("checked")) {
		balance = target.attr('payment-with-balance');
	}
	target.html(balance);
	return true;
})


$(document).on('click','[toggle-coloumn]',function(event){
  event.preventDefault();
  var target = $(this).attr('toggle-coloumn');
  if (target!=undefined) {
    var target = decodeURI(target).split(','),
      length = target.length;
    if (length>0) {
      for (var i = 0; i < length ; i++) {
        console.log(target[i])
        if ($(target[i]).is(':visible')) {
          $(target[i]).slideUp();
        }else{
          $(target[i]).slideDown();
        }
      }
    }
  }
})

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
if ($('#render-catalogue-products').length>0 || $('[name="catalogue-form"]').length>0) {
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

$(document).on('submit','[name="check_out_transaction"]',function(event){
	event.preventDefault();
	var f_check = $('[name="check_out_transaction"] [name="service_id"]');
	if (f_check.length>0 && f_check.val()!=undefined && parseInt(f_check.val())>=0) {
		$.ajax({
			type:"POST",
			url:$(this).attr('action'),
			data:$(this).serialize(),
			success:function(data){
				after_submit("check_out_transaction",data);
			}
		})
	}else{
		$('[name="courier_id"]').focus().select2('open');
		confirm_result("Pilih Ekspedisi",2,1000);
	}
})


$(document).on('change','[name="check_out_transaction"] .courier_option',function(event){
	event.preventDefault();
	var id_trans = $('[name="check_out_transaction"] [name="id_trans"]').val(),
		courier_id = $('[name="check_out_transaction"] [name="courier_id"]').val(),
		city_id = $('[name="check_out_transaction"] [name="city_id"]').val(),
		subdistrict_id = $('[name="check_out_transaction"] [name="subdistrict_id"]').val(),
		link_url = base_url+'json_data/cost?destination='+city_id+'&destinationType=city&id_trans='+id_trans+'&courier_id='+courier_id,
		target_div = $('[load-courier-on-checkout]');

		if (parseInt(subdistrict_id)>0) {
			link_url = base_url+'json_data/cost?destination='+subdistrict_id+'&destinationType=subdistrict&id_trans='+id_trans+'&courier_id='+courier_id;			
		}if (parseInt(courier_id)>0 || parseInt(courier_id)=='') {
			load_courier_services(link_url);
		}else{
			target_div.html('<h5 class="col-abs-cc-then-normal text-center" style="opacity: .6"><label>Pilih Kurir</label></h5>');			
		}
})
function load_courier_services(link_url){
	var target_div = $('[load-courier-on-checkout]');
	target_div.html('<h5 class="col-abs-cc-then-normal text-center" style="opacity: .6"><label>Loading ...</label></h5>');
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
							service_selection = '<select name="service_id" class="form-control dis-0">'+service.join('')+'</select>';
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
}
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
	open_script('https://cdn.statically.io/gh/ekastw/lab-e/89b0f2a4/owl.carousel.min.js',1);
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
			lazyLoad: true,
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
			lazyLoad: true,
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


$(document).on('click','[all-product-images] [real-src]',function(event){
	event.preventDefault();
	var target = $('[main-product-image]'),
		real_pic = $(this).attr('real-src'),
		small_file_url = $(this).attr('src');
	target.addClass('lazy-in');
	setTimeout(function(){
		target.removeClass('lazy-in');
		if (target.length==1) {
			if (target.attr('src')!=real_pic) {
				target.attr('src',small_file_url);
				target.attr('data-src',real_pic);
				setTimeout(function(){
					target.loadScroll();
				},500)		
			}
		}
	},300)
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
var check_temporary_cart = '';
function render_cart_data(){
	var target_div = $('#modal-cart-list .modal-body'),
    top_cart_status = '',
		link_url = base_url+'json_data/cart',
		items = 0;
	$.ajax({
		type:"GET",
		url:link_url,
		data : '',
		success:function(data){
			var data = JSON.parse(data),
				hasil = "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
			if (data.login==false) {
		        top_cart_status = 'please-login';
				hasil = '<p align="center"><label>Silahkan login terlebih dahulu untuk dapat berbelanja, klik tombol dibawah ini untuk login</label><br><a data-toggle="modal" data-target="#modal-user-reg" href>daftar</a> atau <a data-toggle="modal" data-target="#modal-user-log" href>login</a></p>';
				$('#modal-cart-list').modal('hide');
				$('#modal-user-log').modal('show');
			}else{
				if (data.length>0) {
					for (var i = 0; i < data.length; i++) {
						var product_list = data[i]['product_list']
							no = 1;
			            top_cart_status += data[i]['trans_cd'];
						if (product_list.length>0) {
							hasil += '<div detail-tmp-cart-top-'+data[i]['id']+'><h5><i class="fa fa-cart-plus"></i> Detail Pesanan</h5><h5><small><label style="float:right">'+data[i].create_date+'</label></small></h5><div class="table-responsive"><table class="table table-striped table-bordered tmp-top-cart-table">';
							hasil += '<tr><th>Nama Item</th><th>Qty</th><th>Harga</th></tr>'
							grand_price = 0;
							$.each(product_list,function(key,val){
								items += parseInt(val.qty);
								top_cart_status += val.id+''+val.qty;
								hasil += '<tbody cart-detail-top-'+val.id+'>'+cart_detail_top(val)+'</tbody>';
							})
							hasil += '<tr><td align="right" colspan="2">Total</td><td align="right" detail-tmp-cart-top-grand-price>'+convert_Rp(Math.ceil(grand_price))+'</td></tr></table></div><a href="'+base_url+'keranjang?inv='+data[i].trans_cd+'" class="btn btn-outline-success btn-sm">Check Out</a><button type="button" class="btn btn-success pull-right" data-dismiss="modal">produk lain</button></div>';
						}
					}
				}else{
					top_cart_status = 'no-item';
					hasil = '<h5 align="center" style="margin-top:10px"><label>Tidak Ada Item Dalam Keranjang</label></h5><p align="center"><a href="'+base_url+'user/transaksi/">Lihat Riwayat Transaksi</a></p>';
				}
			};
			if (items>0) {
				$('[header-count-cart-item], [count-cart-item]').html('<b>'+items+'</b>');
			}if (items==0) {
				$('[header-count-cart-item], [count-cart-item]').html('');			
			}if (check_temporary_cart!=top_cart_status) {
				check_temporary_cart = top_cart_status;
				target_div.html('<div class="fade-in-effect">'+hasil+'</div>');
			}
		},error : function(data){
			console.log(data.responseText);
		}
	})	
}
function cart_detail_top(val){
  var price = (val.price*val.qty);
    price -= (price/100)*val.discount;
    price = Math.ceil(price);
    grand_price += price;
  var del_btn = '<button type="button" class="btn btn-danger btn-sm" id="DeleteData" confirm-msg="Hapus <b>'+val.product_name+'  <sup>('+val.qty+')</sup></b> dari keranjang?" name="delete_tmp_item_top_cart" data-href="'+crud_file+'function=delete_item_cart&id='+val.id+'"><i class="fa fa-trash"></i></button>',
      input_item = '<div class="input-group">';
      input_item += '<div class="input-group-prepend"><button class="btn btn-warning btn-sm" tmp-id="'+val.id+'" tmp-top-cart-minus>-</button></div>';
      input_item += '<input type="number" value="'+val.qty+'" tmp-cart-'+val.id+' id="'+val.id+'" class="form-control form-control-sm InputInt text-center" change-tmp-qty-product-on-cart>';
      input_item += '<div class="input-group-append"><button class="btn btn-success btn-sm" tmp-id="'+val.id+'" tmp-top-cart-plus>+</button></div>';
      input_item += '</div>';
  return '<tr detail-item-in-cart-'+val.id+'><td><a href="'+val.link_url+'">'+val.product_name+' '+val.option_name+' '+val.variant_name+'<span class="pull-right">'+del_btn+'</span></a></td><td align="right">'+input_item+'</td><td align="right" tmp-top-cart-price>'+convert_Rp(Math.ceil(price))+'</td></tr>';
}

$(document).on('click','[tmp-top-cart-minus],[tmp-top-cart-plus]',function(event){
  event.preventDefault();
  var id = $(this).attr('tmp-id'),
    target = $('[tmp-cart-'+id+']'),
  current = parseInt(target.val());
  if ($(this).attr('tmp-top-cart-minus')!=undefined) {
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

window.onload  = function () {
	if ($('.onload-mask').length>0) {
		$('.onload-mask').fadeOut(800)
		$('.lazy-load').loadScroll(1000);
	}else{
		$('.lazy-load').loadScroll(1000);  	
	}
};

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




var tmp_top_cart_qty = 0
$(document).on('click','[tmp-top-cart-minus],[tmp-top-cart-plus]',function(event){
  event.preventDefault();
  var id = $(this).attr('tmp-id'),
      new_val = $('[change-tmp-qty-product-on-cart][tmp-cart-'+id+']').val();
  setTimeout(function(){
    if (new_val==0) {
      this.value = 1;
    }if (tmp_top_cart_qty!=new_val) {
      tmp_top_cart_qty = new_val;
      var link_url = crud_file+'function=change_qty&id='+id+'&qty='+new_val;
      $.ajax({
        type:"GET",
        url:link_url,
        data:'',
        success:function(data){
          render_tmp_top_cart(id,data);
        }
      })
    } 
  },500)
})
$(document).on('keyup','[change-tmp-qty-product-on-cart]',function(event){
  event.preventDefault();
  var new_val = this.value,
    id = $(this).attr('id');
  setTimeout(function(){
    if (new_val==0) {
      this.value = 1;
    }if (tmp_top_cart_qty!=new_val) {
      tmp_top_cart_qty = new_val;
      var link_url = crud_file+'function=change_qty&id='+id+'&qty='+new_val;
      $.ajax({
        type:"GET",
        url:link_url,
        data:'',
        success:function(data){
          render_tmp_top_cart(id,data);
        }
      })
    } 
  },500)
})

function render_tmp_top_cart(id,data){
  var data = JSON.parse(data),
      target = $('[change-tmp-qty-product-on-cart][tmp-cart-'+id+']'),
      new_val = target.val();
  if (data.result=='1' && data.result!=undefined) {
    $(this).val(data.qty);
    $('[cart-detail-top-'+id+'] [tmp-top-cart-price],[detail-tmp-cart-top-'+data.id_trans+'] [detail-tmp-cart-top-grand-price]').css({'opacity':'0','-webkit-animation':"die_time .3s"});
    setTimeout(function(){
      $('[detail-tmp-cart-top-'+data.id_trans+'] [detail-tmp-cart-top-grand-price]').html(convert_Rp(data.cart_price));
      $('[cart-detail-top-'+id+'] [tmp-top-cart-price]').html(convert_Rp(data.total_price));
      $('[cart-detail-top-'+id+'] [tmp-top-cart-price],[detail-tmp-cart-top-'+data.id_trans+'] [detail-tmp-cart-top-grand-price]').css({'opacity':'1','-webkit-animation':"show_time .5s"});
    },300)
    if (new_val!=data.qty) {
      target.val(data.qty);
    }
  }
}

$(document).on('change','[variant-option-on-product]',function(){
	$('[name="buy_product"] [type="submit"]').prop("disabled",true);
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
			if (parseInt(data)>0) {
				$('[name="buy_product"] [type="submit"]').removeAttr('disabled');
			}	
			setTimeout(function(){
				$('[product-stock-display]').css({'opacity':'1','-webkit-animation':"show_time .5s"});
				$('[product-stock-display]').html(data);
			},400);
		}
	})
})
$(document).on('input','[name="buy_product"] [name="qty"]',function(event){
	event.preventDefault();
	get_real_live_limit();
})
$(document).on('keyup','[name="buy_product"] [name="qty"]',function(event){
	event.preventDefault();
	get_real_live_limit();
})
$(document).on('click','[name="buy_product"] [buy-qty-plus],[name="buy_product"] [buy-qty-minus]',function(event){
	event.preventDefault();
	get_real_live_limit();
})
function get_real_live_limit(){
	var qty_min = parseInt(document.querySelector('[product-stock-display]').innerHTML),
		value = parseInt($('[name="buy_product"] [name="qty"]').val());
	$('[name="buy_product"] [type="submit"]').prop("disabled",true);
	$("[responce-to-stock]").html("Beli");
	if (qty_min>0 && value>0 && qty_min>=value) {
		$("[responce-to-stock]").html("Beli");
		$('[name="buy_product"] [type="submit"]').removeAttr('disabled');
	}else{
		if (qty_min>0) {
			$("[responce-to-stock]").html("<span class='text-warnig text-bold'>Maks "+qty_min+"</span>");
		}else{
			$("[responce-to-stock]").html("Beli");			
		}
	}	
}
$(document).on('click','.p-option',function(event){
	$('[name="buy_product"] [type="submit"]').prop("disabled",true);
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
			if (parseInt(data)>0) {
				$('[name="buy_product"] [type="submit"]').removeAttr('disabled');
			}	
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
	if ($('[name="buy_product"]').length>0) {
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
					$('[name="buy_product"] [type="submit"]').removeAttr('disabled');
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
		btn = '<button type="button" class="btn btn-danger btn-sm" id="DeleteData" confirm-msg="Hapus <b>'+val.product_name+'  <sup>('+val.qty+')</sup></b> dari keranjang?" name="delete_item_cart" data-href="'+crud_file+'function=delete_item_cart&id='+val.id+'"><i class="fa fa-trash"></i></button>';
    if (trans_status=='1') {
      qty = '<input type="number" style="min-width:3em;padding-left: 4px;padding-right: 4px" min="1" max="10000" class="InputInt form-control form-control-sm text-center" transaksi-change-qty-product-on-cart id="'+val.id+'" value="'+val.qty+'">';
      qty = '<div class="input-group"><div class="input-group-prepend"><button type="button" class="btn btn-warning btn-sm" item-id="'+val.id+'" checkout-cart-minus>-</button></div>'+qty;
      qty += '<div class="input-group-append"><button type="button" class="btn btn-success btn-sm" item-id="'+val.id+'" checkout-cart-plus>+</button></div></div>';
    }
  }
	return '<tr single-item-on-cart-list-'+val.id+'><td style="width:80px"><div class="img-col" style="border:1px solid #ddd"><img src="'+val.small_file_url+'"></div></td><td class="text-uppercase"><a href="'+val.link_url+'">'+val.product_name+' '+val.option_name+' '+val.variant_name+'</a><span class="pull-right">'+btn+'</span></td><td style="width:9em" align="center">'+qty+'</td><td align="right" render-single-price-item-on-cart-'+val.id+'>'+convert_Rp(val.total_price)+'</td></tr>';
}
$(document).on("click","[checkout-cart-minus],[checkout-cart-plus]",function(event){
  event.preventDefault();
  var id = $(this).attr("item-id"),
    target = $('[single-item-on-cart-list-'+id+'] [transaksi-change-qty-product-on-cart]'),
    new_val = target.val();
  current = parseInt(target.val());
  if ($(this).attr('checkout-cart-minus')!=undefined) {
    current -= 1; 
  }else{
    current += 1;
  };
  if (current>0) {
  }else{
    current = 1;
  }
  target.val(current);
  change_checkout_qty_product(id);
})


var transaksi_tmp_cart_qty = 0
$(document).on('keyup','[transaksi-change-qty-product-on-cart]',function(event){
  event.preventDefault();
  var id = $(this).attr('id');
  change_checkout_qty_product(id);
})


function change_checkout_qty_product(id){
  var target = $('[single-item-on-cart-list-'+id+'] [transaksi-change-qty-product-on-cart]'),
    new_val = target.val();
  setTimeout(function(){
    if (new_val==0) {
      target.val(1);
    }if (transaksi_tmp_cart_qty!=new_val) {
      transaksi_tmp_cart_qty = new_val;
      var link_url = crud_file+'function=change_qty&id='+id+'&qty='+new_val;
      $.ajax({
        type:"GET",
        url:link_url,
        data:'',
        success:function(data){
          after_submit("transaksi-change-qty-product-on-cart",data);
          var data = JSON.parse(data);
          if (data.result=='1' && data.result!=undefined) {
            if ($('[header-count-cart-item]').length>0) {
              if (data.item_left>0) {
                $('[header-count-cart-item], [count-cart-item]').html('<b>'+data.item_left+'</b>'); 
              }else{
                $('[header-count-cart-item], [count-cart-item]').html('');  
              }              
            }

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
}

function render_single_cart_item_tipe_2(val,trans_status){
	var qty = val.qty+val.unit_cd;
	return '<tr single-item-on-cart-list-'+val.id+'><td class="text-uppercase"><a href="'+val.link_url+'">'+val.product_name+' '+val.option_name+' '+val.variant_name+'</a></td><td>'+qty+'</td><td align="right" render-single-price-item-on-cart-'+val.id+'>'+convert_Rp(val.total_price)+'</td></tr>';
}
if ($('[load-cart-list]').length>0) {
	home_cart_list($('[load-cart-list]').attr("data-href"),$('[load-cart-list]'));
}if (typeof AppClassName=='undefined') {
  /*
  if ($('.province_option').length>0) {
    province_option();
  }if ($('.city_option').length>0) {
    city_option();
  }
  */
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
			if (data.id!=undefined) {
				var trans_status = parseInt(data.trans_status);
				if (trans_status<=2) {
	  				if (data.items.length>0) {
	  					var table = '<tr><th colspan="2">Item</th><th>Qty</th><th>Harga</th></tr>';
	  					$.each(data.items,function(key,val){
	  						table += '<span render-single-cart-item-'+val.id+'>'+render_single_cart_item(val,data.trans_status)+'</span>';
	  					})
	  					table += '<tr><th colspan="3" class="text-left">Total</th><th class="text-right" total-cart-on-transaction-'+data.id+'>'+convert_Rp(data.total_cart)+'</th></tr>';
	  					table += '<tr><th colspan="3" class="text-left">Berat</th><th class="text-right"><span total-weight-cart-on-transaction-'+data.id+'>'+data.total_weight+'</span> gram</th></tr>';
	  					hasil += '<div class="table-responsive '+effect+'"><table class="v-middle checkout-table">'+table+'<table></di>';
	  					hasil += '<p><button type="button" class="btn btn-outline-info" href="'+base_url+'keranjang?inv='+data.trans_cd+'&courier"><i class="fa fa-paper-plane"></i> Lanjut Pengiriman & Pembayaran</button></p>';
	  				}else{
	  					hasil += '<h5 align="center"><label>Tidak ada item dalam transaksi ini.</label></h5>';
					}          
				}if(trans_status>2){
					location.href=base_url+'keranjang?inv='+data.trans_cd+'&finish';          
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

if ($("[cart-courier-active-address]").length>0) {
  var province_id_val = parseInt($('[cart-courier-active-address] [name="province_id"]').attr("active-value")),
      city_id_val = parseInt($('[cart-courier-active-address] [name="city_id"]').attr("active-value")),
      subdistrict_id_val = parseInt($('[cart-courier-active-address] [name="subdistrict_id"]').attr("active-value"));
      courier_id_val = parseInt($('[cart-courier-active-address] [name="courier_id"]').attr("active-value"));
  if (province_id_val>0){   
    province_option(null,'[cart-courier-active-address] [name="province_id"]',province_id_val);
  }else{
    province_option();
  };

  if (city_id_val>0){
    city_option(province_id_val,null,'[cart-courier-active-address] [name="city_id"]',city_id_val);
  }else{
    city_option();
  };

  if (subdistrict_id_val>0){
    subdistrict_option(city_id_val,'[cart-courier-active-address] [name="subdistrict_id"]',subdistrict_id_val);  
  }else{
    subdistrict_option();
  };

  if (courier_id_val>0){
    courier_option('[cart-courier-active-address] [name="courier_id"]',courier_id_val);
	var id_trans = $('[name="check_out_transaction"] [name="id_trans"]').val(),
		link_url = base_url+'json_data/cost?destination='+city_id_val+'&destinationType=city&id_trans='+id_trans+'&courier_id='+courier_id_val;
	if (parseInt(subdistrict_id_val)>0) {
		link_url = base_url+'json_data/cost?destination='+subdistrict_id_val+'&destinationType=subdistrict&id_trans='+id_trans+'&courier_id='+courier_id_val;
	}
    load_courier_services(link_url)
  }else{
    courier_option();
  };
}
if ($('.courier_option').length>0 && $('[cart-courier-active-address]')==undefined) {
  courier_option();
}


$(document).on('change','[cart-courier-active-address] [name="province_id"]',function(){
  $('[cart-courier-active-address] [name="city_id"]').html("")
  $('[cart-courier-active-address] [name="subdistrict_id"]').html("")
  $('[cart-courier-active-address] .courier_option').val("").change();
})
$(document).on('change','[cart-courier-active-address] [name="city_id"]',function(){
  $('[cart-courier-active-address] [name="subdistrict_id"]').html("")
  $('[cart-courier-active-address] .courier_option').val("").change();
})
$(document).on('change','[cart-courier-active-address] [name="subdistrict_id"]',function(){
  $('[cart-courier-active-address] .courier_option').val("").change();
})













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










/// result_msg
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
			get_cart_detail(tmp_link_url_detail_transaksi,true);
		}
	}if (form_name=='delete_item_cart') {
		var data = JSON.parse(data);
		if (data.result=='1' && data.result!=undefined) {
			if (typeof default_func=='function') {
				default_func(decodeURI(refresh_location(1)));
			};
			if (data.item_left==0) {
        if($('[header-count-cart-item]').length>0){
          $('[header-count-cart-item], [count-cart-item]').html('');        
        }
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
        if($('[header-count-cart-item]').length>0){
          $('[header-count-cart-item], [count-cart-item]').html('<b>'+data.item_left+'<b>');        
        }
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
			location.href = base_url+'keranjang?inv='+inv+'&payment'
		}
	}
	if (form_name=='delete_from_cart') {
		var data = JSON.parse(data);
		if (data.id!=undefined) {
			$('[detail-item-in-cart-'+data.id+']').remove();
			render_cart_data();
			render_cart_btn();					
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
		var data = JSON.parse(data);
		if (data.result!=undefined) {
			if (data.result=='1') {
				render_form_btn();
				render_cart_btn();
				render_cart_data();
				$('#modal-cart-list').modal('show');
			}			
		}
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
	}if (form_name=='transaksi-change-qty-product-on-cart') {
		var data = JSON.parse(data);
		if (data.result!=undefined) {
			var result = data.result;
			if (result=='6') {
				confirm_result("Maaf stok tidak tersedia",2,3000);				
			}else if (data.reach_limit=='1') {
				confirm_result("Anda hanya dapat memesan "+data.max_stock,2,3000);	
			}
		}
	}
  if (form_name=="payment_check_out") {
    var inv = $('[name="payment_check_out"]').attr("inv-num");
    if (data=='1' || data=='11') {
      location.href = base_url+'keranjang?inv='+inv+'&finish'
    }
  }if (form_name=='delete_tmp_item_top_cart') {
    var data = JSON.parse(data);
    if (data.result=='1' && data.result!=undefined) {
      if (typeof default_func=='function') {
        default_func(decodeURI(refresh_location(1)));
      };
      if (data.item_left==0) {
        if($('[header-count-cart-item]').length>0){
          $('[header-count-cart-item], [count-cart-item]').html('');        
        }if ($('#modal-cart-list').length>0) {
          render_cart_data();
        }if ($('#modal_cart_detail').length>0) {
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
        if($('[header-count-cart-item]').length>0){
          $('[header-count-cart-item], [count-cart-item]').html('<b>'+data.item_left+'</b>');        
        }confirm_result("Item berhasil dihapus",1,1000);
        if ($('[total-cart-on-transaction-'+data.id_trans+']').length>0) {
          var target = $('[total-cart-on-transaction-'+data.id_trans+'],[total-weight-cart-on-transaction-'+data.id_trans+']');
          target.css({'opacity':'0','-webkit-animation':"die_time .3s"});
          setTimeout(function(){  
            $('[single-item-on-cart-list-'+data.id+']').remove();
            $('[total-cart-on-transaction-'+data.id_trans+']').html(convert_Rp(data.cart_price));
            $('[total-weight-cart-on-transaction-'+data.id_trans+']').html(data.cart_weight);         
            target.css({'opacity':'1','-webkit-animation':"show_time .5s"});
          },300)
        }if ($('[detail-tmp-cart-top-'+data.id_trans+']').length>0) {
          $('[cart-detail-top-'+data.id+']').remove();
          $('[cart-detail-top-'+data.id+'] [tmp-top-cart-price],[detail-tmp-cart-top-'+data.id_trans+'] [detail-tmp-cart-top-grand-price]').css({'opacity':'0','-webkit-animation':"die_time .3s"});
          setTimeout(function(){
            $('[detail-tmp-cart-top-'+data.id_trans+'] [detail-tmp-cart-top-grand-price]').html(convert_Rp(data.cart_price));
            $('[cart-detail-top-'+data.id+'] [tmp-top-cart-price]').html(convert_Rp(data.total_price));
            $('[cart-detail-top-'+data.id+'] [tmp-top-cart-price],[detail-tmp-cart-top-'+data.id_trans+'] [detail-tmp-cart-top-grand-price]').css({'opacity':'1','-webkit-animation':"show_time .5s"});
          },300)          
        }
      }
    }
  }
}	

/*

html2canvas(document.querySelector("#html-capture")).then(canvas => {
    document.body.appendChild(canvas)
});

*/
