		$('.image-captcha').hide();	
		open_captcha();
		function open_captcha(){
			$('.image-captcha').fadeOut(100);
			var url = $('.image-captcha').attr('data');
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