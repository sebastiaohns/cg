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
	drawAllCircles();
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

function pickArea(mx, my)
{
	var ni = 0;
	var xc, p1 = {x:0, y:0}, p2 = {x:0, y:0};

	for(var i = 0; i < polyList.length; i++)
	{
		p1.x = polyList[i].x0;
		p1.y = polyList[i].y0;
		p2.x = polyList[i].x1;
		p2.y = polyList[i].y1;

		if(!(p1.y == p2.y) && !((p1.y > my) && (p2.y > my)) && !((p1.y < my) && (p2.y < my)) && !((p1.x < mx) && (p2.x < mx)))
		{
            if(p1.y == my)
            {
                if((p1.x > mx) && (p2.y > my))
                    ni++;
            }
            else
            {
                if(p2.y == my)
                {
                    if((p2.x > mx) && (p1.y > my))
                        ni++;
                }
                else
                {
                    if((p1.x > mx) && (p2.x > mx))
                    {
                        ni++;
                    }
                    else
                    {
                        var dx = p1.x - p2.x;
                        xc = p1.x;
                        if( dx != 0)
                        {
                            xc += (my - p1.y) * dx / (p1.y - p2.y);
                            if(xc > mx)
                                ni++;
                		}		
                	}
            	}
        	}
        }
    	fst = i;
    }
    if(ni%2 == 1)
    {
    	alert("o poligono aí foi selecionado!");
    	return true;
    }
    else
    {
    	return false;
    }
} 

function removePolyListeners()
{
	c.removeEventListener("mousedown", mouseDownPoly, true);
	c.removeEventListener("mousemove", mouseMovePoly, true);
	c.removeEventListener("dblclick", closePoly, true);
}