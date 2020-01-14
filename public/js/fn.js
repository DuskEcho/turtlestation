$(document).ready(function () {
	var feed = document.getElementById("liveFeed");
	var wsavc = new WSAvcPlayer(feed, "webgl");
	var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
	wsavc.connect(protocol + '//' + window.location.host + '/stream');
	monitorTemp("airTemp");

});


function monitorTemp(tempTypeString) {
	setInterval(()=>{
		$.ajax({
			method: "get",
			url: `/${tempTypeString}`,
			success: function (res, status) {
				#(`#${tempTypeString}`).html(`${res} F`);
			}
		})
	})
}
