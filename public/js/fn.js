$(document).ready(function () {
	var feed = document.getElementById("liveFeed");
	var wsavc = new WSAvcPlayer(feed, "webgl");
	var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
	wsavc.connect(protocol + '//' + window.location.host + '/stream');
	monitorTemp("airTemp");
	monitorTemp("waterTemp");

});


function monitorTemp(tempString) {
	setInterval(()=>{
		$.ajax({
			method: "get",
			url: `/${tempString}`,
			success: function (res, status) {
				$(`#${tempString}`).html(`${res.temp} F`);
			}
		})
	}, 3000)
}
