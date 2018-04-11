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

// Default values
const DEFAULT_TYPE = 0;
const DEFAULT_IMAGE_WIDTH = 500;
const DEFAULT_IMAGE_HEIGHT = 250;

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

// Textboxes' events (move events)
var border_left, border_right, border_top, border_bottom;

$("document").ready(function(e)
{
	// Fills the dropdown
	fillDropdown();

	// Card is positioned and sized
	prepareCard();

	// Updates the image borders (to define the textboxes' bounds)
	updateBorders();			

	// Textboxes are positioned
	prepareTextboxes();

	// Clears previous data
	clearData();

	// Dropdown action
	$(".dropdown-menu > li > a").click(function(e)
	{
		var index = $(this).parent().index();
		setImage(index);
	});

	// Disables click/drag action on the card's background
	$("#img").on('dragstart',function(e)
	{
		e.preventDefault();
	});

	// Textboxes events
	$(".img-overlay").on('mousedown',function(e)
	{
		var textbox = $("#"+e.target.id);		
		$("body").bind('mousemove',function(e)
		{
			var newpos_x = e.pageX;
			var newpos_y = e.pageY;
			setLocation(textbox,newpos_x,newpos_y);
		});
		$("body").one('mouseup', function() 
		{
			$("body").unbind("mousemove");
	      });
	});

	// Generate card
	$("#generate").click(function(e)
	{



		html2canvas(document.querySelector("#card")).then(canvas => {
		    document.body.appendChild(canvas)
		});


	});

	// Background image customization
	$("#upload").change(function()
	{
		var reader = new FileReader();
            reader.onload = function (e) 
            {
                $('#img').attr('src', e.target.result);
            };
            reader.readAsDataURL($("#upload")[0].files[0]);
	});	

	// Window resize (zoom in/zoom out) event
	$(window).resize(function()
	{
	 	updateBorders();
	 	var txt1 = $("#txt1");
	 	setLocation(txt1,txt1.offset().left,txt1.offset().top);
	 	var txt2 = $("#txt2");
	 	setLocation(txt2,txt2.offset().left,txt2.offset().top);	 		 	
	});	
});

/* Checks the image parameters given in the URL (or lack of) */
function checkImageParameters()
{
	if(isNaN(params[IMAGE_WIDTH])) params[IMAGE_WIDTH] 		= String(DEFAULT_IMAGE_WIDTH);
	if(isNaN(params[IMAGE_HEIGHT]))  params[IMAGE_HEIGHT] 	= String(DEFAULT_IMAGE_HEIGHT);
}

/* Checks the textboxes' parameters given in the URL (or lack of) */
function checkTxtParameters()
{
	if(isNaN(params[TXT1_X])) params[TXT1_X] 						= String(border_right);
	if(isNaN(params[TXT1_Y])) params[TXT1_Y] 						= String(border_top);	
	if(isNaN(params[TXT2_X])) params[TXT2_X] 						= String(border_right);
	if(isNaN(params[TXT2_Y])) params[TXT2_Y] 						= String(border_bottom);	
}

/* Changes the card's image */
function setImage(index)
{
	$("#img").hide();						
	$("#img").attr('src',types[index]["image"]);
	$("#img").fadeIn();
}

/* Fills the dropdown with options */
function fillDropdown()
{
	types.forEach(function(type)
	{
		$(".dropdown-menu").append("<li><a href='#'>"+type["label"]+"</a></li>");
	});
}

/* Sets up the textboxes position */
function prepareTextboxes()
{
	checkTxtParameters();	
	setLocation($("#txt1"),params[TXT1_X],params[TXT1_Y]);	
	setLocation($("#txt2"),params[TXT2_X],params[TXT2_Y]);
}

/* Sets up the card's size and initial image */
function prepareCard()
{
	// Checks the image parameters
	checkImageParameters();

	$("#img").attr('width',params[IMAGE_WIDTH]);
	$("#img").attr('height',params[IMAGE_HEIGHT]);

	// Draws the default image
	setImage(DEFAULT_TYPE);	
}

/* Updates the image borders (for the textboxes' bounds) */
function updateBorders()
{
	border_left = $("#img").offset().left;
	border_top = $("#img").offset().top;
	border_right = (border_left + $("#img").outerWidth()) - $(".img-overlay").outerWidth();
	border_bottom = (border_top + $("#img").outerHeight()) - $(".img-overlay").outerHeight();
}

/* Sets the location for a textboxes, being given X and Y */
function setLocation(element,x,y)
{
	var _x = x;
	var _y = y;

	if(_x < border_left)
	{
		_x = border_left;
	}
	else if(_x > border_right)
	{
		_x = border_right;
	}

	if(_y < border_top)
	{
		_y = border_top;
	}
	else if(_y > border_bottom)
	{
		_y = border_bottom;						
	}

	element.css('left',_x + 'px');
	element.css('top',_y + 'px');		
}

/* Clears data from the image uploader and the textboxes */
function clearData()
{
	$("#upload").val('');
	$("#txt1").val('');
	$("#txt2").val('');
}