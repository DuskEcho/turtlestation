$(document).ready(function () {
	var feed = document.getElementById("liveFeed");
	var wsavc = new WSAvcPlayer(feed, "webgl");
	var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
	wsavc.connect(protocol + '//' + window.location.host + '/stream');
	monitorTemp("airTemp");
	monitorTemp("waterTemp");

	$("#toggleIRButton").click(function(){
	$.ajax({
		method:'get',
		url:'/toggleIR'	
	})
	
	});

});


function monitorTemp(tempString) {
	grabTemp(tempString);
	setInterval(()=>{grabTemp(tempString);}, 10000);
}

function grabTemp(tempString) {
$.ajax({
		method: "get",
		url: `/${tempString}`,
		success: function (res, status) {
			$(`#${tempString}`).html(`${res.temp} F`);
		}
	})
}
