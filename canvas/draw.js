document.getElementById("canvas").addEventListener("click", eventClick, true);
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var bool = true;
var option = 0;

c.width = (window.innerWidth/100) * 85;
c.height = (window.innerHeight/100) * 80;

/*
	Funções para desenhar ponto ponto
*/

function ponto()
{
	option = 0;
}

function drawPonto(x, y)
{
	ctx.fillRect(x,y,2,2);
}

/*
	Funções para desenhar linha
*/

function linha()
{
	option = 1;
}

function drawLinha(x, y)
{
	if(bool == true)
	{
		ctx.moveTo(x, y);
		bool = false;
	}
	else
	{
		ctx.lineTo(x, y);
		ctx.stroke();
		bool = true;
	}
}

/*
	Funções para desenhar poligono
*/

function poligono()
{
	option = 2;
	ctx.beginPath();
}

var prevx = 0;
var prevy = 0;

function drawPoligono(x, y, button)
{
	if(prevx == 0 && prevy == 0)
	{
		prevx = x;
		prevy = y;
		ctx.moveTo(x, y);
		drawPonto(x, y);
	}

	if(button == true)
	{
		ctx.closePath();
		ctx.fill();
		prevx = 0;
		prevy = 0;

		return 0;
	}

	ctx.lineTo(x, y);
	ctx.stroke();
}

/*
	Funções para desenhar circulo
*/

function circulo()
{
	option = 3;
	
}

function drawCirculo(x, y)
{
	if(bool == true)
	{
		prevx = x;
		prevy = y;
		ctx.beginPath();
		bool = false;
	}
	else
	{
		var raio = 0;
		if(prevx >= x)
		{
			raio = prevx - x;
		}
		else
		{
			raio = x - prevx;
		}

		ctx.arc(prevx, prevy, raio, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
		bool = true;
	}
}

/*
	Funções para desenhar curva de bezier
*/

function bezier()
{
	option = 4;
	
}

function drawBezier(x, y)
{
	if(bool == true)
	{
		ctx.beginPath();
		ctx.moveTo(x, y);
		bool = false;
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
			bool = true;
		}
	}
}

function limpar()
{
	ctx.clearRect(0, 0, c.width, c.height);
}

function eventClick(e)
{
	console.log(e);
	var correcao = 0; // e.clientX - e.offsetX;

	if(option == 0)
	{
		drawPonto(e.offsetX - correcao, e.offsetY - correcao);
	}
	if(option == 1)
	{
		drawLinha(e.offsetX - correcao, e.offsetY - correcao);
	}
	if(option == 2)
	{
		drawPoligono(e.offsetX - correcao, e.offsetY - correcao, e.ctrlKey);
	}
	if(option == 3)
	{
		drawCirculo(e.offsetX - correcao, e.offsetY - correcao);
	}
	if(option == 4)
	{
		drawBezier(e.offsetX - correcao, e.offsetY - correcao);
	}	
}