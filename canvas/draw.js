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

function ponto() { option = 0; removeLineListeners(); removePolyListeners(); removeCircleListeners(); }
function linha() { option = 1; removePolyListeners(); removeCircleListeners(); }
function poligono() { option = 2; removeLineListeners(); removeCircleListeners(); }
function circulo() { option = 3; removeLineListeners(); removePolyListeners(); }
function bezier() { option = 4; removeLineListeners(); removePolyListeners(); removeCircleListeners(); }
function selecionar() { option = 5; removeLineListeners(); removePolyListeners(); removeCircleListeners(); }

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
			drawCirculo();
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
	deleteCircle();
	option = 0;
}