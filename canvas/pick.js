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