/*
Many thanks to:
https://github.com/matijagaspar/ws-avc-player
https://www.npmjs.com/package/raspivid-stream
 */
const tempBars = {
	'airTemp': {
		min: 80,
		max: 105
	},
	'waterTemp':{
		min: 67,
		max: 87
	}
}

$(document).ready(function () {
    var feed = document.getElementById("liveFeed");
    var wsavc = new WSAvcPlayer(feed, "webgl");
    var protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    wsavc.connect(protocol + '//' + window.location.host + '/stream');
    monitorTemp("airTemp");
    monitorTemp("waterTemp");

    $("#toggleIRButton").click(function () {
        $.ajax({
            method: 'get',
            url: '/toggleIR'
        })
    });
});

async function monitorTemp(tempString) {
    grabTemp(tempString);
    setInterval(() => {
        grabTemp(tempString);
    }, 2000);
}

function grabTemp(tempString) {

    $.ajax({
        method: "get",
        url: `/${tempString}`,
        success: function (res, status) {

        	let numerator = res.temp - tempBars[tempString].min;
        	let denominator = tempBars[tempString].max - tempBars[tempString].min;
        	let percent = (numerator/denominator) * 100;
        	let color;
        	let distanceFromGood = Math.abs(percent - 50);
        	if (distanceFromGood < 10){
        		color = "bg-info";
			}
        	else if (distanceFromGood < 30){
        		color = "bg-warning";
			}
        	else{
        		color = "bg-danger";
			}
        	console.log(percent);
        	console.log(res.temp);
			console.log(tempBars[tempString].min)
			console.log(tempBars[tempString].max)
			console.log(color)

            $(`#${tempString}`).html(`
			<div class="progress">
  				<div class="progress-bar ${color}" style="width: ${percent}%" role="progressbar" aria-valuenow="${res.temp}" aria-valuemin="${tempBars[tempString].min}" aria-valuemax="${tempBars[tempString].max}"></div>
			</div>
			 `);
        }
    })
}
$(`#${'airTemp'}`).html(`
			<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 20%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
</div>`);