
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

document.getElementById("canvas").addEventListener("click", pickReta, true);

var x1 = 50, y1 = 50, x2 = 300, y2 = 290;

ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

function pickReta(e)
{
	var equax = Math.round(((e.clientX - x1) * ((x2 - x1)/(y2 - y1))) + x1);
	var equay = Math.round(((e.clientY - y1) * ((x2 - x1)/(y2 - y1))) + y1);

	if((equax/equay) <= 1.02 && (equax/equay) > 1)
	{
		console.log("pick");
	}
}