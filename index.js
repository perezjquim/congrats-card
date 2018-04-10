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
const DEFAULT_TXT1_X = 250;
const DEFAULT_TXT1_Y = 50;
const DEFAULT_TXT2_X = 250;
const DEFAULT_TXT2_Y = 150;

// Parameters
const IMAGE_WIDTH = "image_width";
const IMAGE_HEIGHT = "image_height";
const TXT1_X = "txt1_x";
const TXT1_Y = "txt1_y";
const TXT2_X = "txt2_x";
const TXT2_Y = "txt2_y";

$(document).ready(function()
{
	var currentURL = purl(window.location.href);
	var params = currentURL.param();

	if(isNaN(params[IMAGE_WIDTH])) params[IMAGE_WIDTH] 		= String(DEFAULT_IMAGE_WIDTH);
	if(isNaN(params[IMAGE_HEIGHT]))  params[IMAGE_HEIGHT] 	= String(DEFAULT_IMAGE_HEIGHT);
	if(isNaN(params[TXT1_Y])) params[TXT1_Y] 						= String(DEFAULT_TXT1_Y);
	if(isNaN(params[TXT1_X])) params[TXT1_X] 						= String(DEFAULT_TXT1_X);
	if(isNaN(params[TXT2_Y])) params[TXT2_Y] 						= String(DEFAULT_TXT2_Y);
	if(isNaN(params[TXT2_X])) params[TXT2_X] 						= String(DEFAULT_TXT2_X);

	/* Dropdown */
	types.forEach(function(type)
	{
		$(".dropdown-menu").append("<li><a href='#'>"+type["label"]+"</a></li>");
	});

	/* Background image */
	$(".img").attr('width',params[IMAGE_WIDTH]);
	$(".img").attr('height',params[IMAGE_HEIGHT]);
	$("#txt1").css('top',params[TXT1_Y]+'px');
	$("#txt1").css('left',params[TXT1_X]+'px');
	$("#txt2").css('top',params[TXT2_Y]+'px');
	$("#txt2").css('left',params[TXT2_X]+'px');
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