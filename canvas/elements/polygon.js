var polyList = [];
var areas = [], areaCoord = [];
var number = 0;
var check = 0;
var save = false;
var firstx, firsty, first = true;

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
	c.addEventListener("click", closePoly, true);
}

function mouseDownPoly(e)
{
	if(first)
	{
		firstx = e.offsetX;
		firsty = e.offsetY;
		initx = firstx;
		inity = firsty;
		first = false;
	}

	if(save == true && initx != endx)
	{
		addPoly(initx, inity, endx, endy, "black", number);
		initx = endx;
		inity = endy;
	}
}

function mouseMovePoly(e)
{
	endx = e.offsetX;
	endy = e.offsetY;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(initx, inity);
	ctx.lineTo(endx, endy);
	ctx.stroke();
	ctx.closePath();

	drawAllLines();
	drawAllPoints();
	drawAllPoly();
	drawAllBezier();
	drawAllCircles();

	save = true;
}

function closePoly(e)
{
	if(e.ctrlKey)
	{
		ctx.beginPath();
		ctx.moveTo(firstx, firsty);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		ctx.closePath();

		addPoly(e.offsetX, e.offsetY, firstx, firsty, "black", number);	

		number++;
		firstx = undefined;
		firsty = undefined;
		initx = undefined;
		inity = undefined;
		first = true;
	}
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
	c.removeEventListener("click", closePoly, true);
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

function polyArea()
{
	var esq = 0, dir = 0;
	var area = 0;

	for (var i = 0; i < polyList.length-1; i++) {

		esq += Math.abs(polyList[i].x0 * polyList[i+1].y0);
		dir += Math.abs(polyList[i].y0 * polyList[i+1].x0);
		// console.log("X0 = " + polyList[i].x0 + " Y1 = " + polyList[i+1].y0 + " R = " + esq);
		// console.log("Y0 = " + polyList[i].y0 + " X1 = " + polyList[i+1].x0 + " R = " + dir);

		if(polyList[i].number != polyList[i+1].number || i == polyList.length - 2)
		{
			esq += Math.abs(polyList[i+1].x0 * polyList[i+1].y1);
			dir += Math.abs(polyList[i+1].y0 * polyList[i+1].x1);
			// console.log("X0 = " + polyList[i+1].x0 + " FIRST Y = " + polyList[i+1].y1 + " R = " + esq);
			// console.log("Y0 = " + polyList[i+1].y0 + " FIRST Y = " + polyList[i+1].x1 + " R = " + dir);
			area = Math.abs((esq - dir)/2);
			var obj = {area:0, number: 0};
			obj.area = area;
			obj.number = polyList[i].number;
			areas.push(obj);
			area = 0;
			esq = 0;
			dir = 0;
		}
	}

	centroid();

	for (var i = 0; i < areas.length; i++) {
		console.log(i);
		console.log("O poligono " + areas[i].number + " tem área de " + areas[i].area);
	}
}

function centroid()
{
	var x=0, y=0, number = 0, count=0;
	for (var i = 0; i < polyList.length; i++)
	{
		x += polyList[i].x0;
		y += polyList[i].y0;

		count++;

		if(number < polyList[i].number || i == polyList.length - 1)
		{
			ctx.font = "10px Arial";
			ctx.fillText(number+1, (x/count), y/count);

			number = polyList[i].number;
			x = 0;
			y = 0;
			count = 0;
		}
	}
}