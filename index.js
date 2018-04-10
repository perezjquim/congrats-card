// Card types
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

// Mouse fix
const MOUSE_FIX_X = 150;
const MOUSE_FIX_Y = 25;

// Default values
const DEFAULT_TYPE = 0;
const DEFAULT_IMAGE_WIDTH = 500;
const DEFAULT_IMAGE_HEIGHT = 250;
const DEFAULT_TXT1_X = 325;
const DEFAULT_TXT1_Y = 120;
const DEFAULT_TXT2_X = 325;
const DEFAULT_TXT2_Y = 220;

// Parameters
const IMAGE_WIDTH = "image_width";
const IMAGE_HEIGHT = "image_height";
const TXT1_X = "txt1_x";
const TXT1_Y = "txt1_y";
const TXT2_X = "txt2_x";
const TXT2_Y = "txt2_y";

// URL
var currentURL = purl(window.location.href);
var params = currentURL.param();

$(document).ready(function(e)
{
	// Checks the URL parameters
	checkParameters();

	// Fills the dropdown
	fillDropdown();

	// Card's background is drawn
	prepareBackground();

	// Draws the default image
	setImage(DEFAULT_TYPE);

	// Clears the image uploader
	$("#upload").val('');

	// Dropdown action
	$(".dropdown-menu > li > a").click(function(e)
	{
		var index = $(this).parent().index();
		setImage(index);
	});

	// Textboxes' events (move events)
	var canMove = [];
	var border_left = $(".img")[0].offsetLeft;
	var border_top = $(".img")[0].offsetTop;
	var border_right = (border_left + $(".img").outerWidth()) - $(".img-overlay").outerWidth();
	var	border_bottom = (border_top + $(".img").outerHeight()) - $(".img-overlay").outerHeight();

	$(".img-overlay").on('mousedown',function(e)
	{
		canMove[e.target.id] = true;
	});
	$(".img-overlay").on('mouseup',function(e)
	{
		canMove[e.target.id] = false;
	});
	$(".img-overlay").on('mousemove',function(e)
	{
		if(canMove[e.target.id])
		{
			var newpos_x = e.pageX;
			var newpos_y = e.pageY;

			var textbox = $("#"+e.target.id);
			textbox.css('left',newpos_x + 'px');
			textbox.css('top',newpos_y + 'px');		

			if(newpos_x < border_left)
			{
				textbox.css('left',border_left + 'px');
			}
			else
			{
				if(newpos_x > border_right)
				{
					textbox.css('left', border_right + 'px');		
				}
			}

			if(newpos_y < border_top)
			{
				textbox.css('top',border_top + 'px');
			}
			else
			{
				if(newpos_y > border_bottom)
				{
					textbox.css('top',border_bottom + 'px');						
				}
			}	
		}
	});

	// Generate card
	$("#generate").click(function(e)
	{
	    html2canvas($("#img-container"), 
	    {
	    	  width: params[IMAGE_WIDTH],
	    	  height: params[IMAGE_HEIGHT],
	        onrendered: function(canvas) 
	        {
			var image  = canvas.toDataURL();
			$("#dlcard").attr('href',image);
			$("#dlcard")[0].click();
	        }
	    });
	});

	// Background image customization
	$("#upload").change(function()
	{
		var reader = new FileReader();
		console.log($("#upload")[0].files);
            reader.onload = function (e) 
            {
                $('.img').attr('src', e.target.result);
            };
            reader.readAsDataURL($("#upload")[0].files[0]);
	});	

	$(window).resize(function()
	{
	 	border_left = $(".img")[0].offsetLeft;
		border_top = $(".img")[0].offsetTop;
		border_right = (border_left + $(".img").outerWidth()) - $(".img-overlay").outerWidth();
		border_bottom = (border_top + $(".img").outerHeight()) - $(".img-overlay").outerHeight();
	});	
});



/* Checks the URL parameters (or lack of) */
function checkParameters()
{
	if(isNaN(params[IMAGE_WIDTH])) params[IMAGE_WIDTH] 		= String(DEFAULT_IMAGE_WIDTH);
	if(isNaN(params[IMAGE_HEIGHT]))  params[IMAGE_HEIGHT] 	= String(DEFAULT_IMAGE_HEIGHT);
	if(isNaN(params[TXT1_X])) params[TXT1_X] 						= String(DEFAULT_TXT1_X);
	if(isNaN(params[TXT1_Y])) params[TXT1_Y] 						= String(DEFAULT_TXT1_Y);	
	if(isNaN(params[TXT2_X])) params[TXT2_X] 						= String(DEFAULT_TXT2_X);
	if(isNaN(params[TXT2_Y])) params[TXT2_Y] 						= String(DEFAULT_TXT2_Y);	
}

/* Changes the card's image */
function setImage(index)
{
	$(".img").hide();						
	$(".img").attr('src',types[index]["image"]);
	$(".img").fadeIn();
}

/* Fills the dropdown with options */
function fillDropdown()
{
	types.forEach(function(type)
	{
		$(".dropdown-menu").append("<li><a href='#'>"+type["label"]+"</a></li>");
	});
}

/* Draws the background at a initial position */
function prepareBackground()
{
	$(".img").attr('width',params[IMAGE_WIDTH]);
	$(".img").attr('height',params[IMAGE_HEIGHT]);
	$("#txt1").css('left',params[TXT1_X]+'px');
	$("#txt1").css('top',params[TXT1_Y]+'px');	
	$("#txt2").css('left',params[TXT2_X]+'px');
	$("#txt2").css('top',params[TXT2_Y]+'px');	
}