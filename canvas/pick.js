var pointList = [];

function addPoint(x, y)
{
	var obj = {type: "ponto", x:0, y:0};
	obj.x = x;
	obj.y = y;
	pointList.push(obj);
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

var lineList = [];

function addLine(x0, y0, x1, y1)
{
	var obj = {type: "line", x0:0, y0:0, x1:0, y1:0};
	obj.x0 = x0;
	obj.y0 = y0;
	obj.x1 = x1;
	obj.y1 = y1;
	lineList.push(obj);
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
				drawLinha(obj.x0, obj.y0, "red");
				drawLinha(obj.x1, obj.y1, "red");
				return true;
			}
		}while(1);
	}
	return false;
}

function pickArea(mx, my)
{
	var ni = 0, fst = lineList.length - 1;
	var xc, p1 = {x:0, y:0}, p2 = {x:0, y:0};

	for(var i = 0; i < lineList.length; i++)
	{
		p1.x = lineList[i].x0;
		p1.y = lineList[i].y0;
		p2.x = lineList[i].x1;
		p2.y = lineList[i].y1;

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
    	alert("esse poligono aí foi selecionado!");
    	return true;
    }
    else
    {
    	return false;
    }
}
        