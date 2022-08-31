//need log in script
// var path = window.location.pathname;
// var page = path.split("/").pop();
// //console.log( path );
// //console.log( {auth} );
// xauth=document.getElementById("auth").value;
// if(xauth=="" && page!="login" && page!="register" && page!="policy"){
//   location.replace("login");
// }


// $(function () {
//   var auth = jQuery('#auth').val();
//   var win_width = jQuery(window).width();
  
//   jQuery('.register_form .submit').onClick(function (data) {
//   if (data.code) {
//   // fail
//   swal({
//   title: data.text,
  
//   html: true,
//   customClass: 'swalPopup'
//   });
//   // reload
//   jQuery('.captcha').trigger('click');
  
//   } else {
//   swal({
//   title: data.text,
//   html: true,
//   customClass: 'swalPopup'
//   }, function () {
//   location.reload();
//   });
//   }
//   // jQuery(this).button('reset');
//   jQuery(this).prop('disabled', false);
//   }, function () {
//   // jQuery(this).button('loading');
//   jQuery(this).prop('disabled', true);
//   });
  
//   jQuery('.captcha').click(function () {
//   jQuery(this).find('img').attr('src', 'captcha/?rand=' + Math.random());
//   });
//   setTimeout(function () {
//   jQuery('.captcha').click();
//   }, 2000);
  
//   jQuery('.login_form button .submit').onClick(function (data) {
//   if (data.code) {
//   swal({
//   title: data.text,
  
//   html: true,
//   customClass: 'swalPopup'
//   });
//   } else {
//   swal({
//   title: data.text,
//   html: true,
//   customClass: 'swalPopup'
//   }, function () {
//   location.reload();
//   });
//   }
//   // jQuery(this).button('reset');
//   jQuery(this).prop('disabled', false);
//   }, function () {
//   // jQuery(this).button('loading');
//   jQuery(this).prop('disabled', true);
//   });
//   });
  
//   // 完整重新命名列表
//   $(document).ready(function () {
//   gName = {
//   1: "Electronic wallet",
//   33: "Roulette",
//   34: "Binary Option",
//   };
//   var options = $('.withdraw_form [name="src_id"] option');
//   $(options).each(function (index) {
//   $(this).text(gName[$(this).val()]);
//   });
  
//   var options = $('.transfer_form [name="src_id"] option, .transfer_form [name="tar_id"] option');
//   $(options).each(function (index) {
//   $(this).text(gName[$(this).val()]);
//   });
  
//   var bNames = $('b[att-id]');
//   $(bNames).each(function (index) {
//   $(this).html(gName[$(this).attr("att-id")]);
//   });
//   var tdNames = $('td[att-id]');
//   $(tdNames).each(function (index) {
//   $(this).html(gName[$(this).attr("att-id")]);
//   });
//   var liNames = $('li div[att-id]');
//   $(liNames).each(function (index) {
//   $(this).html(gName[$(this).attr("att-id")]);
//   });
  
//   });
  