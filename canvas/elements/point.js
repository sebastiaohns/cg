var pointList = [];

function addPoint(x, y, color)
{
	var obj = {type: "ponto", x:0, y:0, color: "black"};
	obj.x = x;
	obj.y = y;
	obj.color = color;
	pointList.push(obj);
	drawPonto(x, y, color);
}

function drawPonto()
{
	for(var i = 0; i < pointList.length; i++)
	{
		var ponto = pointList[i];
		ctx.fillStyle = ponto.color;
		ctx.fillRect(ponto.x,ponto.y,2,2);
	}
}

function pick(mx, my)
{
	var len = pointList.length;
	for(var i = 0; i < len; i++)
	{
		var obj = pointList[i];
		if(obj.type == "ponto")
		{
			if(pickPoint(obj.x, obj.y, mx, my, 3))
			{
				drawPonto(obj.x, obj.y, "red");
				return true;
			}
		}
	}
}

function pickPoint(px, py, mx, my, t)
{
	if(px < mx + t && px > mx - t)
	{
		if(py < my + t && py > my - t)
		{
			return true;
		}
	}
	return false;
}