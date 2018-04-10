const types =
[
	{
		label: "Casamento",
		image: "casamento.jpg"
	},
	{
		label: "Aniversário",
		image: "aniversario.jpg"
	},
	{
		label: "Dia de São Valentim",
		image: "valentim.jpg"
	}
];

const DEFAULT_TYPE = 0;
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 250;

$(document).ready(function()
{
	var currentURL = purl(window.location.href);
	var params = currentURL.param();

	if(isNaN(params["w"])) params["w"] = String(DEFAULT_WIDTH);
	if(isNaN(params["h"]))  params["h"] = String(DEFAULT_HEIGHT);

	/* Dropdown */
	types.forEach(function(type)
	{
		$(".dropdown-menu").append("<li><a href='#'>"+type["label"]+"</a></li>");
	});				
      $(".dropdown-menu").append('</ul>');

	/* Background image */
	$(".img-container").append('<img src="" class="img" width="'+params["w"]+'" height="'+params["h"]+'">');
	$(".img-container").append('<div class="img-overlay" id="overlay">');
		$(".img-overlay").css('top',params["h"]*0.09+"%");
		$(".img-overlay").css('left',params["w"]*0.05+"%");
		$(".img-overlay").append('<textarea class="form-control" id="msg1">');
		$(".img-overlay").append('<textarea class="form-control" id="msg2">');		
				
	setImage(DEFAULT_TYPE);

	/* Dropdown action */
	$(".dropdown-menu > li > a").click(function(e)
	{
		var index = $(this).parent().index();
		setImage(index);
	});

	/* Generate card */
	$("#generate").click(function(e)
	{
	    html2canvas($(".img-container"), 
	    {
	    	  width: params["w"],
	    	  height: params["h"],
	        onrendered: function(canvas) 
	        {
	            var image = canvas.toDataURL("image/png");
	            window.open(image);
	        }
	    });
	});
});

function setImage(index)
{
	$(".img").hide();						
	$(".img").attr('src',types[index]["image"]);
	$(".img").fadeIn();
}