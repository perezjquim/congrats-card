$(document).ready(function()
{
	var currentURL = purl(window.location.href);
	var params = currentURL.param();
	alert(params["w"]);
});
