var lineList = [];
var initx, inity, endx, endy;

function addLine(x0, y0, x1, y1, color)
{
	var obj = {type: "line", x0:0, y0:0, x1:0, y1:0, color: "black"};
	obj.x0 = x0;
	obj.y0 = y0;
	obj.x1 = x1;
	obj.y1 = y1;
	obj.color = color;
	lineList.push(obj);
}

function drawLine()
{
	c.addEventListener("mousedown", mouseDown, true);
	c.addEventListener("mousemove", mouseMove, true);
	c.addEventListener("mouseup", mouseUp, true);
}

function mouseDown(e)
{
	initx = e.offsetX;
	inity = e.offsetY;
}

function mouseMove(e)
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
}

function mouseUp(e)
{
	addLine(initx, inity, endx, endy, "black");
	initx = undefined;
	inity = undefined;
}

function drawOneLine(x0, y0, x1, y1, color)
{
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
	ctx.closePath();
	addLine(x0, y0, x1, y1, color);
}

function drawAllLines()
{
	for(var i = 0; i < lineList.length; i++)
	{
		var line = lineList[i];
		ctx.beginPath();
		ctx.strokeStyle = line.color;
		ctx.moveTo(line.x0, line.y0);
		ctx.lineTo(line.x1, line.y1);
		ctx.stroke();
		ctx.closePath();
	}
}

function deleteLine()
{
	lineList.splice(0, lineList.length);
}

function pickCode(x, y, xmin, xmax, ymin, ymax, cod)
{
	cod[0] = x < xmin;
	cod[1] = x > xmax;
	cod[2] = y < ymin;
	cod[3] = y > ymax;
}

function pickLine(x, y, tol)
{
	var cod0 = [], cod1 = [], x0, y0, x1, y1, xmin, xmax, ymin, ymax;

	xmin = x - tol;
	xmax = x + tol;
	ymin = y - tol;
	ymax = y + tol;

	for(var i = 0; i < lineList.length; i++)
	{
		var obj = lineList[i];
		x0 = obj.x0;
		y0 = obj.y0;
		x1 = obj.x1;
		y1 = obj.y1;

		pickCode(x1, y1, xmin, xmax, ymin, ymax, cod1);

		do
		{
			pickCode(x0, y0, xmin, xmax, ymin, ymax, cod0);

			for(var j = 0; j < 4; j++)
			{
				if(cod0[j] && cod1[j])
				{
					break;
				}
			}
			if(j != 4)
			{
				break;
			}
			if(cod0[0])
			{
				y0 += (xmin - x0)*(y1 - y0)/(x1 - x0);
				x0 = xmin;
			}
			else if(cod0[1])
			{
				y0 += (xmax - x0)*(y1 - y0)/(x1 - x0);
				x0 = xmax;
			}
			else if (cod0[2])
			{
				x0 += (ymin - y0)*(x1 - x0)/(y1 - y0);
				y0 = ymin;
			}
			else if (cod0[3])
			{
				x0 += (ymax - y0)*(x1 - x0)/(y1 - y0);
				y0 = ymax;
			}
			else
			{
				drawOneLine(obj.x0, obj.y0, obj.x1, obj.y1, "red");
				return true;
			}
		}while(1);
	}
	return false;
}

function removeLineListeners()
{
	c.removeEventListener("mousedown", mouseDown, true);
	c.removeEventListener("mousemove", mouseMove, true);
	c.removeEventListener("mouseup", mouseUp, true);
}

// function angleLine()
// {
// 	if(lineList.length <= 1)
// 	{
// 		return false;
// 	}

// 	for (var i = 0; i < lineList.length - 1; i++) {
// 		console.log("Y2 = " + lineList[i+1].y1 + " Y1 = " + lineList[i].y1 + " \nX2 = " + lineList[i+1].x1 + " X0 = " + lineList[i].x1);
// 		console.log(Math.atan2(lineList[i+1].y1 - lineList[i].y1, lineList[i+1].x1 - lineList[i].x1)*180/Math.PI);
// 	}
// }