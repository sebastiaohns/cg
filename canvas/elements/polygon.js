var polyList = [];
var number = 0;
var check = 0;
var save = false;
var firstx, firsty;

function addPoly(x0, y0, x1, y1, color, number)
{
	var obj = {type: "poly", x0:0, y0:0, x1:0, y1:0, color: "black", number: 0};
	obj.x0 = x0;
	obj.y0 = y0;
	obj.x1 = x1;
	obj.y1 = y1;
	obj.color = color;
	obj.number = number;
	polyList.push(obj);
}

function drawPoly()
{
	c.addEventListener("mousedown", mouseDownPoly, true);
	c.addEventListener("mousemove", mouseMovePoly, true);
	c.addEventListener("dblclick", closePoly, true);
}

function mouseDownPoly(e)
{
	if(save)
	{
		addPoly(initx, inity, endx, endy, "black", number);
		initx = endx;
		inity = endy;
	}
	
	if(check == number)
	{
		firstx = e.offsetX;
		initx = e.offsetX;
		firsty = e.offsetY;
		inity = e.offsetY;
		check++;
	}
}

function mouseMovePoly(e)
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(initx, inity);
	endx = e.offsetX;
	endy = e.offsetY;
	ctx.lineTo(endx, endy);
	ctx.stroke();
	ctx.closePath();
	drawAllLines();
	drawAllPoints();
	drawAllPoly();
	save = true;
}

function closePoly(e)
{
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(firstx, firsty);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	ctx.closePath();
	addPoly(firstx, firsty, e.offsetX, e.offsetY, "black", number);	
	number++;
	firstx = undefined;
	firsty = undefined;
	initx = undefined;
	inity = undefined;
}

function drawAllPoly()
{
	for(var i = 0; i < polyList.length; i++)
	{
		var poly = polyList[i];
		ctx.beginPath();
		ctx.strokeStyle = poly.color;
		ctx.moveTo(poly.x0, poly.y0);
		ctx.lineTo(poly.x1, poly.y1);
		ctx.stroke();
		ctx.closePath();
	}
}

function deletePoly()
{
	polyList.splice(0, polyList.length);
}

function removePolyListeners()
{
	c.removeEventListener("mousedown", mouseDownPoly, true);
	c.removeEventListener("mousemove", mouseMovePoly, true);
	c.removeEventListener("dblclick", closePoly, true);
}