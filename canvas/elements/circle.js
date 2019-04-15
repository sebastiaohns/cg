var raio = 0;
var draw = false;

var circleList = [];

function addCircle(x, y, raio, color)
{
	var obj = {type: "circle", x:0, y:0, raio:0, color: "black"};
	obj.x = x;
	obj.y = y;
	obj.raio = raio;
	obj.color = color;
	circleList.push(obj);
}

function drawCirculo()
{
	c.addEventListener("mousedown", mouseDownCircle, true);
	c.addEventListener("mousemove", mouseMoveCircle, true);
	c.addEventListener("mouseup", mouseUpCircle, true);
}

function mouseDownCircle(e)
{
	prevx = e.offsetX;
	prevy = e.offsetY;
	draw = true;
}

function mouseMoveCircle(e)
{
	if(draw)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		endx = e.offsetX;
		endy = e.offsetY;
		if(Math.abs(prevx - endx) >= Math.abs(prevy - endy))
		{
			raio = Math.abs(prevx - endx);
		}
		else
		{
			raio = Math.abs(prevy - endy);
		}
		ctx.arc(prevx, prevy, raio, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
		drawAllLines();
		drawAllPoints();
		drawAllPoly();
		drawAllCircles();
		drawAllBezier();
	}
}

function mouseUpCircle(e)
{
	addCircle(prevx, prevy, raio, "black");
	draw = false;
}

function drawAllCircles()
{
	for(var i = 0; i < circleList.length; i++)
	{
		var circle = circleList[i];
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.raio, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
}

function deleteCircle()
{
	circleList.splice(0, circleList.length);
}

function removeCircleListeners()
{
	c.removeEventListener("mousedown", mouseDownCircle, true);
	c.removeEventListener("mousemove", mouseMoveCircle, true);
	c.removeEventListener("mouseup", mouseUpCircle, true);
}