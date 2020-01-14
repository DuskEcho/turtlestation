$(document).ready(function () {
	var feed = document.getElementById("liveFeed");
	var wsavc = new WSAvcPlayer(feed, "webgl");
	var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
	wsavc.connect(protocol + '//' + window.location.host + '/stream');
});
