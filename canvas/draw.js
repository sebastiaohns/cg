var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var linectx = c.getContext("2d");

c.addEventListener("click", eventClick, true);

var bool = true;
var option = 0;
var prevx = 0;
var prevy = 0;
var beginx;
var beginy;
var beginx1;
var beginy1;
var endx, endy;

c.width = (window.innerWidth/100) * 90;
c.height = (window.innerHeight/100) * 80;

function ponto() { option = 0; removeLineListeners(); removePolyListeners(); }
function linha() { option = 1; removePolyListeners();}
function poligono() { option = 2; removeLineListeners(); }
function circulo() { option = 3; }
function bezier() { option = 4; }
function selecionar() { option = 5; removeLineListeners(); removePolyListeners();}

function eventClick(e)
{
	switch(option)
	{
		case 0:
			drawPoint(e.offsetX, e.offsetY, "black");
			break;
		case 1:
			drawLine();
			break;
		case 2:
			drawPoly();
			break;
		case 3:
			drawCirculo(e.offsetX, e.offsetY);
			break;
		case 4:
			drawBezier(e.offsetX, e.offsetY);
			break;
		case 5:
			pick(e.offsetX, e.offsetY);
			pickLine(e.offsetX, e.offsetY, 5);
			pickArea(e.offsetX, e.offsetY);
			break;
		default:
			break;
	}
}

function drawCirculo(x, y)
{
	if(bool == true)
	{
		prevx = x;
		prevy = y;
		ctx.beginPath();
		bool = false;
	}
	else
	{
		var raio = 0;
		if(Math.abs(prevx - x) >= Math.abs(prevy - y))
		{
			raio = Math.abs(prevx - x);
		}
		else
		{
			raio = Math.abs(prevy - y);
		}

		ctx.arc(prevx, prevy, raio, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
		bool = true;
	}
}

function drawBezier(x, y)
{
	if(bool == true)
	{
		ctx.beginPath();
		ctx.moveTo(x, y);
		bool = false;
		prevx = 0;
		prevy = 0;
	}
	else
	{
		if(prevx == 0 && prevy == 0)
		{
			prevx = x;
			prevy = y;
		}
		else
		{
			ctx.quadraticCurveTo(prevx, prevy, x, y);
			ctx.stroke();
			ctx.closePath();
			bool = true;
		}
	}
}

function limpar()
{
	ctx.clearRect(0, 0, c.width, c.height);
	document.getElementById("ponto").checked = true;
	deletePoint();
	deleteLine();
	deletePoly();
	option = 0;
}