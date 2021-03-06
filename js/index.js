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
const DEFAULT_TEXT1 = "(texto1)";
const DEFAULT_TEXT2 = "(texto2)";

// Parameters
const IMAGE_WIDTH = "image_width";
const IMAGE_HEIGHT = "image_height";
const TXT1_X = "txt1_x";
const TXT1_Y = "txt1_y";
const TXT2_X = "txt2_x";
const TXT2_Y = "txt2_y";
const TXT1_TEXT = "txt1_txt";
const TXT2_TEXT="txt2_txt";

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

	// Clears previous data
	clearData();	

	// Textboxes are positioned
	prepareTextboxes();

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
		var textbox = $(this);			
		var isResizing = 
			Math.abs(e.pageX - (textbox.offset().left + textbox.outerWidth())) < 10
			&& 
		   	Math.abs(e.pageY - (textbox.offset().top + textbox.outerHeight())) < 10;

		if(!isResizing)
		{
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
		}
		else
		{
			$("body").bind('mousemove',function(e)
			{
				updateBorders();				
			});
			$("body").one('mouseup', function() 
			{
				$("body").unbind("mousemove");				
				updateBorders();
      });
		}
	});

	// Generate card
	$("#generate").click(function(e)
	{
		try 
		{
			html2canvas($("#card"),
			{
				width:$("#card").outerWidth(),
				height:$("#card").outerHeight()
			}).then(canvas => 
			{
				try
				{
					canvas.toBlob(function (blob) 
					{
		        saveAs(blob,"card.png");
		      });		
				}
				catch(err)
				{
					alert(err.message);
				}
			});
		}
		catch(err) 
		{
		    alert(err.message);
		}
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
	if(isNaN(params[TXT1_X])) 
	{
		params[TXT1_X] = String(border_right);
		paramAlert(TXT1_X,border_right);
	}
	if(isNaN(params[TXT1_Y])) 
	{
		params[TXT1_Y] = String(border_top);
		paramAlert(TXT1_Y,border_top);
	}	
	if(isNaN(params[TXT2_X])) 
	{
		params[TXT2_X] = String(border_right);
		paramAlert(TXT2_X,border_right);
	}	
	if(isNaN(params[TXT2_Y])) 
	{
		params[TXT2_Y] = String(border_bottom);
		paramAlert(TXT2_Y,border_bottom);
	}	
	if(typeof params[TXT1_TEXT] === 'undefined') 
	{
		params[TXT1_TEXT] 	= DEFAULT_TEXT1;
		paramAlert(TXT1_TEXT,DEFAULT_TEXT1);
	}	
	if(typeof params[TXT2_TEXT] === 'undefined') 
	{
		params[TXT2_TEXT] 	= DEFAULT_TEXT2;
		paramAlert(TXT2_TEXT,DEFAULT_TEXT2);
	}			
}

/* Alerts the lack of a value for a certain parameter */
function paramAlert(param,value)
{
	alert("No value given for parameter '"+param+"'. Assuming its value as '"+value+"'.");
}

/* Changes the card's image */
function setImage(index)
{
	$("#img").hide();						
	$("#img").attr('src',"images"+"/"+types[index]["image"]);
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
	setText($("#txt1"),params[TXT1_TEXT]);
	setText($("#txt2"),params[TXT2_TEXT]);
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
function setLocation(textbox,x,y)
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

	textbox.css('left',_x + 'px');
	textbox.css('top',_y + 'px');		
}

/* Sets the text of a given textbox */
function setText(textbox,text)
{
	textbox.val(text);
}

/* Clears data from the image uploader and the textboxes */
function clearData()
{
	$("#upload").val('');
	$("#txt1").val('');
	$("#txt2").val('');
}