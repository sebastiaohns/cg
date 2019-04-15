
function drawBezier(x, y)
{
	if(bool == true)
	{
		ctx.beginPath();
		ctx.moveTo(x, y);
		bool = false;
		beginx = x;
		beginy = y;
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
			addBezier(beginx, beginy,prevx, prevy, x, y, "black");
			bool = true;
		}
	}
}

var bezierList = [];

function addBezier(x0, y0, p1, p2, x1, y1, color)
{
	var obj = {type: "bezier", x0:0, y0:0, p1:0, p2:0, x1:0, y1:0, color: "black"};
	obj.x0 = x0;
	obj.y0 = y0;
	obj.p1 = p1;
	obj.p2 = p2;
	obj.x1 = x1;
	obj.y1 = y1;
	obj.color = color;
	bezierList.push(obj);
}


function drawAllBezier()
{
	for(var i = 0; i < bezierList.length; i++)
	{
		var bezier = bezierList[i];
		ctx.beginPath();
		ctx.strokeStyle = bezier.color;
		ctx.moveTo(bezier.x0, bezier.y0);
		ctx.quadraticCurveTo(bezier.p1, bezier.p2, bezier.x1, bezier.y1);
		ctx.stroke();
		ctx.closePath();
	}
}
