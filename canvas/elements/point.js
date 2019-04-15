var pointList = [];

function addPoint(x, y, color)
{
	var obj = {type: "ponto", x:0, y:0, color: "black"};
	obj.x = x;
	obj.y = y;
	obj.color = color;
	pointList.push(obj);
}

function drawPoint(x, y, color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x, y ,2,2);
	addPoint(x, y, color);
	return true;	
}

function drawAllPoints()
{
	for(var i = 0; i < pointList.length; i++)
	{
		var ponto = pointList[i];
		ctx.fillStyle = ponto.color;
		ctx.fillRect(ponto.x,ponto.y,2,2);
	}
}

function deletePoint()
{
	pointList.splice(0, pointList.length);
}

function pick(x, y)
{
	for(var i = 0; i < pointList.length; i++)
	{
		var obj = pointList[i];
		if(pickPoint(obj.x, obj.y, x, y, 3))
		{
			drawPoint(obj.x, obj.y, "red");
			return true;
		}
	}
}

function pickPoint(px, py, x, y, t)
{
	if(px < x + t && px > x - t)
	{
		if(py < y + t && py > y - t)
		{
			return true;
		}
	}
	return false;
}