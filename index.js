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

// Borders
const BORDER_X = 30;
const BORDER_Y = 90;

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

$("document").ready(function(e)
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

	// Textboxes' events (move events)
	var canMove = [];
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
			var newpos_x = e.pageX-MOUSE_FIX_X;
			var newpos_y = e.pageY-MOUSE_FIX_Y;

			if(newpos_x < BORDER_X)
			{
				$("#"+e.target.id).css('left',BORDER_X+'px');
			}
			else
			{
				if(newpos_x > params[IMAGE_WIDTH] - BORDER_X - 45)
				{
					$("#"+e.target.id).css('left',params[IMAGE_WIDTH] - BORDER_X - 45 + 'px');		
				}
				else
				{
					$("#"+e.target.id).css('left',newpos_x + 'px');	
				}
			}

			if(newpos_y < BORDER_Y)
			{
				$("#"+e.target.id).css('top',BORDER_Y+'px');
			}
			else
			{
				if(newpos_y > params[IMAGE_HEIGHT])
				{
					$("#"+e.target.id).css('top',params[IMAGE_HEIGHT] - 10 + 'px');						
				}
				else
				{
					$("#"+e.target.id).css('top',newpos_y + 'px');
				}
			}	
		}
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