const types =
[
	{
		label: "Casamento",
		image: "http://pulpitocristao.com/wp-content/uploads/2017/05/up_cerimonia.jpg"
	},
	{
		label: "Aniversário",
		image: "https://www.baixarvideosgratis.com.br/imagens/mensagens/feliz-aniversario/mensagem-de-aniversario-para-amiga-especial-perfeito-para-enviar-pelo-whatsapp-800x400.jpg"
	}
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
		/* Dropdown */
		$(".container").append('<br><div class="dropdown">');
			$(".dropdown").append('<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> Tipo de postal');
				$(".dropdown").append('<span class="caret"></span></button>');			
				$(".dropdown").append('<ul class="dropdown-menu">');
					types.forEach(function(type)
					{
						$(".dropdown-menu").append("<li><a href='#'>"+type["label"]+"</a></li>");
					});				
			          	$(".dropdown-menu").append('</ul>');
		$(".container").append('</div>');

		/* Background image */
		$(".container").append('<br><div class="img-container" id="canvas" >');
			$(".img-container").append('<img src="" id="bg" width="500" class="img" height="500">');
			$(".img-container").append('<div class="img-overlay">');
				$(".img-overlay").append('<textarea class="form-control" id="msg1">');
				$(".img-overlay").append('<textarea class="form-control" id="msg2">');				
			$(".img-container").append('</div>');
		$(".container").append('</div>');
		$("#bg").hide();		
		$("#bg").attr('src',types[0]["image"]);
		$("#bg").fadeIn();

		/* Dropdown action */
		$(".dropdown-menu > li > a").click(function(e)
		{
			var index = $(this).parent().index();
			$("#bg").hide();						
			$("#bg").attr('src',types[index]["image"]);
			$("#bg").fadeIn();
		});

		/* Generate card */
		$(".container").append("<br><button class='btn btn-default center-block' type='button' id='generate'>Generate card</button><br><br>");
		$("#generate").click(function(e)
		{
		    html2canvas($("#canvas"), 
		    {
		        onrendered: function(canvas) 
		        {
		            var image = canvas.toDataURL("image/png");
		            window.open(image);
		        }
		    });
		});		
	          
		/*$(".container").append("<input type='radio' value='")
		$(".container").append("<button class='btn btn-default' type='button' >Ola1</button><br><br>");
		$(".container").append("<button class='btn btn-default' type='button' value='ola2'>Ola2</button><br><br>");
		$(".container").append("<button class='btn btn-default' type='button' value='ola3'>Ola3</button><br><br>");		*/
	//}
});
