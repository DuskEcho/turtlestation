$(document).ready(function(){
$("#feed").html("hi");
console.log("HELLO");
$("#showPicBtn").click(function(){
$.ajax({
	method: 'post',
	url:'/api/showpic',
	success: function(res, status){
		console.log(res);
		$("#feed").html(`<img src='/img/tempPic.jpg' alt='turtleCapture'/>`);
		
	}
});
});


});
