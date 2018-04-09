const types =
[
	"Casamento",
	"Aniversário"
];

$(document).ready(function()
{
	var currentURL = purl(window.location.href);
	var params = currentURL.param();
	console.log(params);
	//if(params["w"] && params["h"])
	//{
		
	//}
	//else
	//{
		$(".container").append('<div class="dropdown">');
			$(".dropdown").append('<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> Tipo de postal');
				$(".dropdown").append('<span class="caret"></span></button>');			
				$(".dropdown").append('<ul class="dropdown-menu">');
					types.forEach(function(t)
					{
						$(".dropdown-menu").append("<li><a href='#'>"+t+"</a></li>");
					});				
			          	$(".dropdown-menu").append('</ul>');
		$(".container").append('</div');
	          
		/*$(".container").append("<input type='radio' value='")
		$(".container").append("<button class='btn btn-default' type='button' >Ola1</button><br><br>");
		$(".container").append("<button class='btn btn-default' type='button' value='ola2'>Ola2</button><br><br>");
		$(".container").append("<button class='btn btn-default' type='button' value='ola3'>Ola3</button><br><br>");		*/
	//}
});
