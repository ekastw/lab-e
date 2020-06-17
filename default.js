/*
var top_init_height = document.getElementById('navbar-top-init').clientHeight;
if (top_init_height>0 && $('#navbar-separator').length>0) {
  $('#navbar-separator').css({'float':'left','width':'100vw','height':top_init_height+4});
}
*/
var crm_res = '<div class="confirm-result" style="text-transform:capitalize;box-shadow:1px 1px rgba(0,0,0,0.6);display:none;position:fixed;padding:10px 20px;right:20px;top:20px;z-index:9999;color:White;opacity:0.9;font-size:1em">message after proccessing</div>',
    crm = '<div class="modal fade-in" id="modal-confirm"><div class="modal-dialog modal-sm"><div class="modal-content" style="width:100%"><div class="modal-body" style="border-radius:4px 4px 0px 0px;opacity:.9"><h4 style="padding:0px;margin:0px"><b modal-title>Warning !!!</b></h4><h5 modal-action>Delete Data?</h5><span class="fas fa-exclamation-triangle" style="font-size: 4em;position: absolute;right: 10px;top: 10px"></span><hr class="no-margin"><h6 modal-msg align="center" style="margin-top:14px"></h6></div><div class="modal-footer" style="padding:4px"><button class="btn btn-default btn-cancel" onclick="Cconfirm.no(event)">Cancel</button><button class="btn btn-light btn-confirm" onclick="Cconfirm.yes(event)">Hapus</button></div></div></div></div>',
    def_link_name,
    def_link_url,
    type,
    confirm_msg='',
    Cconfirm = new cConfirm();

$('body').append(crm_res+crm);



function cConfirm(){
  //bg color
  $('#modal-confirm .modal-body').removeClass('bg-orange');
  $('#modal-confirm .modal-body').removeClass('bg-red');
  $('#modal-confirm .modal-body').removeClass('bg-aqua');
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
    $('#modal-confirm .modal-body').addClass('bg-red');
    $('#modal-confirm [modal-action]').html('<h4 class="no-margin no-padding">Delete</h4>');
    $('#modal-confirm [modal-title]').html('Warning !!!');

    $('#modal-confirm .btn-confirm').addClass('btn-danger');
    $('#modal-confirm .btn-confirm').html('Delete');
  }if (type=='info') {
    $('#modal-confirm .modal-body').addClass('bg-aqua');
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








$.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
  icons: {
      time: 'fa fa-clock',
      date: 'fa fa-calendar',
      up: 'fa fa-arrow-up',
      down: 'fa fa-arrow-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-calendar-check-o',
      clear: 'fa fa-trash',
      close: 'fa fa-times'
  }
});
$(function () {
  $('.date-time').datetimepicker({
      format: 'LT',
      format: 'DD-MM-YYYY HH:mm',
      ignoreReadonly: true,
  });
  $('.date-only').datetimepicker({
      format: 'L',
      format: 'DD-MM-YYYY',
      ignoreReadonly: true,
  });
  $('.month-only').datetimepicker({
      format: 'L',
      format: 'MM-YYYY',
      ignoreReadonly: true,
  });
});

$("body").click(function(){ 
   var container = $('.bootstrap-datetimepicker-widget');
   container.parent().datetimepicker('hide');
});

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
$(document).on('click','[check_box_sel]',function(){
  var target = $(this).attr('check_box_sel');
  $(target).prop('checked', this.checked);
});
var tmp_src_file = null;
$(document).on('click','[data-target="#modal_edit_io_file"]',function(event){
  event.preventDefault();
  var src_file = $(this).attr('src'),
    data_src = $(this).attr('data-src');
  if (data_src!=undefined && data_src!='') {
    src_file = data_src;
  };
  if (tmp_src_file!=src_file) {
    $('#modal_edit_io_file .modal-body').html('<p align="center" style="margin:20vh 0px;color:DarkSlateGrey">Loading Image</p>');
    tmp_src_file = src_file;
    $('#modal_edit_io_file .modal-body').html('<img src="'+src_file+'" style="width:100%">');
  }
})
$(document).on('click','[navbar-href]',function(event){
  event.preventDefault();
  open_js($(this).attr('navbar-href'),false,$(this).attr('suffix-href'));
});
open_js(AppClassName,true);
$(document).on('click','#sidebar-main-menu [data-href]',function(event){
  event.preventDefault();
  var file_location = $(this).attr('data-href');
  $('#sidebar-main-menu li').removeClass('active');
  $('#sidebar-main-menu .'+$(this).attr('active-target')).addClass('active');
  window.history.pushState(null, null, base_url+controller_name+'/'+file_location);
  open_js(file_location);
});
$(document).on('click','[profile-href]',function(event){
  event.preventDefault();
  var file_location = $(this).attr('profile-href');
  window.history.pushState(null, null, base_url+controller_name+'/'+file_location);
  open_js(file_location);
});
active_select2();
function open_js(file,load_cond,suffix_url){
  AppClassName = file;
  file_url = base_url+'application/views/assets/js/'+controller_name+'/'+file+'.js';
  if (load_cond==true) {
    open_script(file_url);
  }else{
    $('.loading-screen').slideDown(500);
    $('#main-content-data').slideUp(400);
    setTimeout(function(){
      $('#onload-loading-bg').load(base_url+'application/views/include/loading_db_bg.php');
    },410);
    $.ajax({
      type : 'GET',
      url : refresh_location(0)+'load_page/'+file,
      data : '',
      success:function(data){
        $('#main-content-data').html(data);
        $('#main-content-data').slideDown(500);
        setTimeout(function(){
          open_script(file_url,suffix_url);
          active_select2();    
          $('.loading-screen').slideUp(800);
        },1050);
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
function open_script(file_url,suffix_data){
  $.getScript( file_url ).done(function( script, textStatus ) {/*if(typeof default_func=='function'){default_func(suffix_data);}*/}).fail(function( jqxhr, settings, exception ) {open_script(file_url);});
}
function checkValue(str, max) {
  if (str.charAt(0) !== '0' || str == '00') {
    var num = parseInt(str);
    if (isNaN(num) || num <= 0 || num > max) num = 1;
    str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
  };
  return str;
};

$(document).on('input','.inddate', function(e) {
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

$(document).on('blur','.inddate', function(e) {
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

$(window).scroll(function(event){
  event.preventDefault();
//  querySelector('body').scrollTop();
});

function add_load(target_div){
  var  target_height = $(target_div).outerHeight();
  var loading_data = '<div style="float:left;top:0;background:rgba(0,0,0,0.1);position:absolute;width:100%;min-height:100px;height:'+target_height+'px;text-align:center;z-index:999;color:White"><div style="-ms-transform: translateX(-50%) translateY(-50%);-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);position:absolute;top:50%;left:50%;width: auto;height:auto;font-size:1.3em;text-shadow:1px 1.4px rgba(0,0,0,0.5)">loading</div></div>';
    $(target_div).css({'min-height':'100px'});
    $(target_div).append(loading_data);
}

function refresh_location(array){
  var check_location = decodeURI(window.location).split(AppClassName);
  return check_location[array];
};
if (refresh_location(1)=='') {
  location.href=window.location+'/';
};



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
  var onchangeGoTo = true;
  $(document).on('change','[go-to]',function(event){
    event.preventDefault();
    if (onchangeGoTo==true) {
      if (ocg==1) {
        var target = $(this).attr('go-to'),
          value = $(this).val();
        if (value!=null && value!='') {
          setTimeout(function() {
            $(target).focus();      
          },1)
        }
      }
    }
  })

  $(document).on('click','[auto-focus]',function(event){
    event.preventDefault();
    var target_focus = $(this).attr('auto-focus');
    //alert(target_focus);
    setTimeout(function(){
      $(target_focus).focus();
    },500)
  })
  $(document).on('click','[input-reset]',function(event){
    var target = $(this).attr('input-reset');
    $(target).val('').trigger('change');    
  })

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

window.onload = function(){
  setTimeout(function(){
    $('.wrapper').fadeIn();
    $('.progress-bar').css({'width':'100%'});
    $('.progress-bar .sr-only').html('100% Complete');
  },100);  
}
  
  $(document).on('click','.sidebar-toggle',function(event){
    event.preventDefault();
    var fil = $(this).attr('href'),
      data_url = decodeURI(window.location).split('?')[0]+fil;
    $.ajax({
      type:'GET',
      url:data_url,
      data:$(this).serialize(),
      success:function(data){
      },error:function(data){
        console.log('navbar toggle failed');
      }
    })
  })

  $(document).on('submit','#submitForm',function(event){
    event.preventDefault();
    var form_name = $(this).attr('name'),
        cond = true,
        input_check = $(this).find('[input-check]').length;
    $('[name="'+form_name+'"] #submit_result').html('<span class="text-info">prosses sedang berjalan.</span>');
    $('.loading-screen').show();
    $('.progress-bar').css({'width':'1%'});
    $('.progress-bar .sr-only').html('1% Complete');
    if (input_check>0) {
      var no = 0;
      for (var i = 0; i < input_check ; i++) {
        var val_data = $(this).find('[input-check]')[i].value.split().length,
            val_target = $($(this).find('[input-check]')[i].attributes.getNamedItem("input-check").nodeValue)[0].value;
        if (val_target==="" && val_data>0) {
//          cond = false;
          var nop = no++;
          if (nop==0) {
//            $($(this).find('[input-check]')[i].attributes.getNamedItem("input-check").nodeValue)[0].focus();
          }
        }
      }
    }if (cond==true) {
      $.ajax({
        type : $(this).attr('method'),
        url :$(this).attr('action'),
        data : $(this).serialize(),
        success:function(data){
          if (data==911) {
            confirm_result('<h3 style="margin:0" align="center">Akun Anda Dalam Perubahan Data.<br>Anda Harus Login Ulang.<br><div id="logout-timeout"></div></h3>',3,6000);

            setTimeout(function(){req_to -= 1;document.querySelector("#logout-timeout").innerHTML = req_to;},4000);
            setTimeout(function(){$('html').fadeOut(1000);},6000);
            setTimeout(function(){location.href = window.location;},6000);
          }else{
            after_submit(form_name,data);
          }
          return true;
        },error : function(data){
          if (data.responseText==undefined) {
            confirm_result('<h3 style="margin:0;padding:0">Periksa Koneksi Internet Anda.</h3>',3,3000);
          }else{
            console.log(data.responseText);
          }
          return true;
        }
      })
    }
    $('.loading-screen').hide();
    $('.progress-bar').css({'width':'100%'});
    $('.progress-bar .sr-only').html('100% Complete');
  })


  $(document).on('click','#logout',function(event){
    event.preventDefault();
    var cobadeh = 
      $.ajax({
        type : 'GET',
        url : $(this).attr('href'),
        data : '',
        success:function(data){
          var result = JSON.parse(data);
          if (result.status_id=='konsumen') {
            confirm_result('Terimakasih Atas Kunjungannya<br>Anda Akan Keluar Dari Halaman Konsumen','1',1000);
          }
          $('html').fadeOut(1500);
          setTimeout(function(){
            location.href = result.base_url;
          },1500);
        },error : function(data){
          cobadeh;
        }
      });
    cobadeh;
  })

$(document).on('click','#resetForm',function(event){
  event.preventDefault();
    var form_name = $(this).attr('target-name');
    $('[name="'+form_name+'"]').trigger('reset');
    after_submit(form_name+'_reset');
});


  var digitsOnly = /[1234567890]/g;
  var integerOnly = /[0-9\.]/g;
  var alphaOnly = /[A-Za-z]/g;
  var usernameOnly = /[0-9A-Za-z\._-]/g;

  function restrictInput(myfield, e, restrictionType, checkdot){
      if (!e) var e = window.event
      if (e.keyCode) code = e.keyCode;
      else if (e.which) code = e.which;
      var character = String.fromCharCode(code);

      // if user pressed esc... remove focus from field...
      if (code==27) { this.blur(); return false; }

      // ignore if the user presses other keys
      // strange because code: 39 is the down key AND ' key...
      // and DEL also equals .
      if (!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40) {
          if (character.match(restrictionType)) {
              if(checkdot == "checkdot"){
                  return !isNaN(myfield.value.toString() + character);
              } else {
                  return true;
              }
          }if (e.keyCode==13) {
            return true;
          }else {
              return false;
          }
      }
  }

$(document).on('blur','.OutFocusRp', function(){
  console.log(this)
  this.value = convert_Rp(this.value);
})
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
$(document).on('keydown','.PhoneNumber', function(){
  var result = pnonly(this.value);
  this.value = result;
});
$(document).on('keypress','.PhoneNumber', function(){
  var result = pnonly(this.value);
  this.value = result;
});
$(document).on('keyup','.PhoneNumber', function(){
  var result = pnonly(this.value);
  this.value = result;
});
function pnonly(data){
  result = decodeURI(data).replace(/\D/g,''),
  str_length = result.length;
  if (str_length>14) {
    var expl = result.split('');
    result_1 = '';
    for (var i = 0; i <= 14 ; i++) {
      result_1 += ''+expl[i];
    }
    result = result_1;
  }
  return decodeURI(result).replace(/\D/g,'');  
}
$(document).on('focus',".Percent",function(){
  $(this).maskMoney({thousands:'.', decimal:'.', suffix: ' %'});
});

function convert_Diskon(data,percent=true){
  persuffix = ' %';
  if (percent==false) {
    persuffix = ''; 
  }
  var target = decodeURI(data).replace(' %',''),
      split = target.split('.');
  if (split.length>0 && parseInt(split[1])>0) {
    return split[0]+'.'+split[1].substring(0,1)+persuffix;
  }else{
    return target+persuffix;
  }
}
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
      return 'Rp. 0';
    }
  }


  $(document).on('focus','#reservation',function(){
    $(this).daterangepicker();
    $(this).daterangepicker({format: 'MM/DD/YYYY' });
  })
  $(document).on('focus','#inreservation',function(){
    $(this).daterangepicker();
    $(this).daterangepicker({format: 'DD/MM/YYYY' });
  })
  /*
  $(function () {
    $('#reservation').daterangepicker()
    $('#reservationTime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
  })
  */
  
  $(document).on('focus','#mypicker',function(){
    var my_format = $(this).attr('date-format');
    if (my_format==undefined||my_format=='') {my_format="yyyy-mm"};
    $(this).datepicker({
      autoclose: true,
      format: my_format,
      viewMode: "months", 
      minViewMode: "months"
    })
  })


  $(document).on('focus','.timepicker',function(){
    $(this).timepicker({
      showInputs: false, meridian:false
    })
  })

function active_select2(){
  $(function () {
    $.fn.modal.Constructor.prototype.enforceFocus = $.noop;
    $('.select2').select2({
        theme: 'bootstrap4',
        dropdownAutoWidth : true,
        width: '100%',
    });
/*
    $('.select2').select2({}).focus(function () { $(this).select2('open'); });
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

  $(document).on('change','[kd-satuan]',function(event){
    event.preventDefault();
    var check = $(this).val();
    if (check>0 && check!=null && check!=undefined) {
      var kd_satuan = this.options[this.selectedIndex].getAttribute("kd-satuan"),
        target = $(this).attr('kd-satuan');
      $(target).html(kd_satuan);
    }
  })

function PrintElem(elem){
    var mywindow = window.open('', 'PRINT', ''),def_lok = decodeURI(window.location).split(controller_name)[0];

    mywindow.document.write('<!DOCTYPE html><html><head><link rel="stylesheet" href="'+def_lok+'assets/bower_components/font-awesome/css/font-awesome.min.css"><link rel="stylesheet" href="'+def_lok+'assets/dist/css/style.css"><style type="text/css">table{border-collapse: collapse;width:100%} .btn{display:none}  .table-bordered{border-collapse: collapse;width: 100%} .table-bordered td{border: 1px solid black;padding: 4px} .th-DodgerBlue tr th{border:1.5px solid black;color:black} a{text-decoration:none;color:black} .text-capitalize{text-transform:capitalize} .text-uppercase{text-transform:uppercase}</style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(function(){mywindow.print();},1000);
    return true;
}


  function printDiv_v01(div){
      var mywindow = window.open('', 'PRINT', 'height=auto,width=auto');
      var data = document.getElementById(div).innerHTML;
      mywindow.document.write('<html><head><title></title><style type="text/css">body,html{padding:0;margin:0;width:800px;height:auto;font-size:11px} table{width:100%} table tr td,table tr th{font-size:11px} @page {size: 5cm 0 ;size: portrait;padding:0;margin:0} @media print {html, body {width: auto;height: auto;overflow: hidden;}}</style></head><body>'+data+'</body></html>');
      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
  }


function change_color(div_target,data){
  if (data=='' || data==undefined) {
      $(div_target).html('');
  }else{
    if (data==1 || data==11) {
      $(div_target).addClass('text-success');
      $(div_target).removeClass('text-warning');
      $(div_target).removeClass('text-danger');
    }if (data==2 || data==22) {
      $(div_target).removeClass('text-success');
      $(div_target).addClass('text-warning');
      $(div_target).removeClass('text-danger');
    }if (data==33 || data==33) {
      $(div_target).removeClass('text-success');
      $(div_target).addClass('text-warning');
      $(div_target).removeClass('text-danger');
    }if (data==4 || data==44) {
      $(div_target).removeClass('text-success');
      $(div_target).removeClass('text-warning');
      $(div_target).addClass('text-danger');
    }
  }
}


function set_filter(){
  if (document.getElementById('filter_menu')!=undefined) {
    var target = '#filter_menu';
    var get_filter = decodeURI(window.location).split(AppClassName+'/filter');
    if (get_filter[1]!=undefined) {
      filter = decodeURI(get_filter[1]).split('/');
      for (var i = 1 ; i <= filter.length; i++) {
        var fil_type = $(target+' [name="fil_'+i+'"]').attr('type'),
            fil_select2 = $(target+' [name="fil_'+i+'"]').hasClass('select2');
            fil_multiple = $(target+' [name="fil_'+i+'"]').attr('multiple');
        if (fil_type!='text') {
          $(target+' [name="fil_'+i+'"]').val(filter[i]);
        }if(fil_select2==true){
          if (fil_multiple=='multiple') {
            var filter_mul = JSON.parse('["'+decodeURI(filter[i]).split(',').join('","')+'"]');
//            console.log(filter_mul);
            $(target+' [name="fil_'+i+'"]').val(filter_mul).trigger('change');
          }else{
            $(target+' [name="fil_'+i+'"]').val(filter[i]).trigger('change');            
          }
        }else {
          if (filter[i]!='all' && filter[i]!='null' && filter[i]!='') {
            var check = decodeURI(filter[i]).split('{{slz}}');
            if (check.length>1) {
              filter[i] = check.join('/');
            }
            $(target+' [name="fil_'+i+'"]').val(filter[i]);            
          }
        }
      }   
    }
  }
}

function selOrderBy(param){
  if (param!='') {
    document.getElementById('OrderBy').value = param;
  }
}

$(document).on('change','#OrderBy',function(event){
  event.preventDefault();
  var target = refresh_location(1)+$(this).val();
  default_func(target);
});

$(document).on('click','.sort-data',function(event){
  event.preventDefault();
  var link_url = $(this).attr('data-href');
  $.ajax({
    type:"GET",
    url:link_url,
    data:'',
    success:function(data){
      default_func(decodeURI(refresh_location(1)));
    },error:function(data){
      console.log(data.responseText);
    }    
  })
})

$(document).on('submit','#show_per_page',function(event){
  event.preventDefault();
  var id = '#'+$(this).attr('id'),
    target_url = $(this).attr('action'),
    per_page = $(id+' [name="per_page"]').val(),
    get_url = decodeURI(window.location).split(AppClassName),
    link_url = get_url[0]+target_url+'?per_page='+per_page,
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

//filter_menu

$(document).on('submit','#filter_menu',function(event){
  event.preventDefault();
  var filter = 'filter/';

  for (var i = 1; i <= 10; i++) {
    var input_data =  $(this).find('[name="fil_'+i+'"]').val();
    var fil = '';
    if (input_data===undefined) {
      fil = '';
    }else{
      if (input_data == '' || input_data =='null' || input_data==null) {
        fil='all/';
      }else{
        if ( $(this).find('[name="fil_'+i+'"]').attr('type')=='text') {
          var check = input_data.split('/');
          if (check.length>1) {
            fil = check.join("{{slz}}")+'/';
          }else{
            fil = input_data+'/';      
          }        
        }else{
          fil = input_data+'/';
        }
      }
    }
    filter += fil;
  }
//    console.log(filter);

  new_state = refresh_location(0)+AppClassName+'/'+filter;

  if (window.location != new_state) {
    window.history.pushState({ path: new_state}, '', new_state);
    default_func('/'+filter);
  }
});
  
var default_link = decodeURI(window.location).split(controller_name)[0]+'default_func/index/',
    crud_link = decodeURI(window.location).split(controller_name)[0]+'default_func/crud',
    loading_gif = decodeURI(window.location).split(controller_name)[0].replace('index.php/','')+'assets/dist/img/loading.gif';
$(document).on('click','.myfiledownload',function(event){
  event.preventDefault();
  var db = decodeURI($(this).attr('data-array')),
  split_db = decodeURI(db).split(','),
  c_db = split_db.length;
  for (var i = 0; i < c_db; i++) {
    window.open(decodeURI(window.location).split(controller_name)[0]+'default_func/export_excel/'+split_db[i]);
  }
})

$('.modal').on('hidden.bs.modal', function (e) {
  e.preventDefault();
  var targetid = $(this).attr('id');
  if ($(this).find('form')) {
    $(this).find('form').trigger('reset');
  };
  if (targetid!=undefined) {
    $(targetid+' .select2').val('').trigger('change');    
    $('.modal .select2').select2().trigger('select2:close');
  }if ($('.modal:visible').length>0) {
    if ($('body').hasClass('modal-open')==false) {
      $('body').addClass('modal-open');      
    }
  }else{
    $('body').removeClass('modal-open');
  }
})
$(document).on('click','#checkedAll',function(event){
  event.preventDefault();
  var target = $(this).attr('check-id');
    $('body').find(target).prop('checked', true);
})
$(document).on('click','#uncheckedAll',function(event){
  event.preventDefault();
  var target = $(this).attr('check-id');
    $('body').find(target).prop('checked', false);
})
$(document).on('click','.toggleCheck',function(event){
  var checked = $(this).prop('checked'),
    target = $(this).attr('toggle-checked');
    $('body').find(target).prop('checked', checked);
})

$(document).on('click','[clear-cache]',function(event){
  event.preventDefault();
  $.ajax({
    data:'',
    url:$(this).attr('href'),
    type:'GET',
    success:function(data){
      confirm_result('Cache Berhasil Dibersihkan',1,1000);
    },error:function(data){
      console.log(data.responseText);
    }
  })
})

$(document).on('click','[table-target]',function(event){
  event.preventDefault();
  var table_target = $(this).attr('table-target');
  if ($('body').find(table_target).length==0) {
    confirm_result('Tabel Yand Anda Maksud Tidak Ditemukan!!',3,1000);
  }else{
    $(table_target).table2excel({
      exclude: ".noExl",
      name: AppClassName,
      filename: AppClassName+".xls",
      fileext: ".xls",
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true
    });
  }
})

$(document).on('click','[slide-toggle]',function(event){
  var target_div = decodeURI($(this).attr('slide-toggle')).split(',');
  for (var i = 0; i < target_div.length ; i++) {
    if ($(target_div[i]).is(':visible')) {
      $(target_div[i]).slideUp();
    }else{
      $(target_div[i]).slideDown();
    }
  }
})


function img_file(file_url,attc,real_file){
  var data_src = '';
  if (real_file!=undefined && real_file!='') {
    data_src = ' data-src="'+real_file+'" ';
  }
  return '<img class="lazy img-fluid" src="'+file_url+'" '+data_src+attc+' data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="">';
}
if ($('.resize_textarea').length>0) {
var resize_textarea = document.querySelector('.resize-textarea');
resize_textarea.addEventListener('keydown', autosize_textarea);
function autosize_textarea(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto';
    el.style.cssText = 'height:' +el.scrollHeight+'px;';
  },10);
}
}



function get_browser_info(){
  var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
  if(/trident/i.test(M[1])){
    tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
    return {name:'IE ',version:(tem[1]||'')};
  }if(M[1]==='Chrome'){
    tem=ua.match(/\bOPR\/(\d+)/)
    if(tem!=null)   {
      return {name:'Opera', version:tem[1]};}
    }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
    name: M[0],
    version: M[1]
  };
}
$(document).on('click','[btn-to-pdf]',function(event){
  var doc = new jsPDF(),
    target_div = $(this).attr('[btn-to-pdf]');
  specialElementHandlers = {
    target_div: function (element, renderer) {
      return true;
    }
  };
  event.preventDefault();
  doc.fromHTML($(target_div).html(), 15, 15, {
    'width': 170,'elementHandlers': specialElementHandlers
  });
  doc.save('sample-file.pdf');
});

var required_folder = decodeURI(refresh_location(0))+'required/',
    crud_file = required_folder+'crud?';