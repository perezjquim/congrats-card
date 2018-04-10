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

// Default values
const DEFAULT_TYPE = 0;
const DEFAULT_IMAGE_WIDTH = 500;
const DEFAULT_IMAGE_HEIGHT = 250;

// Parameters
const IMAGE_WIDTH = "image_width";
const IMAGE_HEIGHT = "image_height";

$(document).ready(function()
{
	var currentURL = purl(window.location.href);
	var params = currentURL.param();

	if(isNaN(params[IMAGE_WIDTH])) params[IMAGE_WIDTH] 	= String(DEFAULT_IMAGE_WIDTH);
	if(isNaN(params[IMAGE_HEIGHT]))  params[IMAGE_HEIGHT] = String(DEFAULT_IMAGE_HEIGHT);

	/* Dropdown */
	types.forEach(function(type)
	{
		$(".dropdown-menu").append("<li><a href='#'>"+type["label"]+"</a></li>");
	});

	/* Background image */
	$(".img").attr('width',params[IMAGE_WIDTH]);
	$(".img").attr('height',params[IMAGE_HEIGHT]);
	$(".img-overlay").css('top',params[IMAGE_HEIGHT]*0.09+"%");
	$(".img-overlay").css('left',params[IMAGE_WIDTH]*0.05+"%");
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
	    	  width: params[IMAGE_WIDTH],
	    	  height: params[IMAGE_HEIGHT],
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