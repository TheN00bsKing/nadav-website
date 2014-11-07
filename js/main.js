$(document).ready(function(){
	
	//show or hide the button
	
	$(window).scroll(Function(){
					
		if($(this).scrollTop() > 200){
		
			$('.go-top').fadeIn(200)
		
		}
					 
					 
	 });
	
});