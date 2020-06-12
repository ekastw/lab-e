/*
var top_init_height = document.getElementById('navbar-top-init').clientHeight;
if (top_init_height>0 && $('#navbar-separator').length>0) {
  $('#navbar-separator').css({'float':'left','width':'100vw','height':top_init_height+4});
}
*/
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
