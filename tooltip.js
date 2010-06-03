function simple_tooltip(selector, tooltip_class, attribute_name){
	// Generate code for each tooltip
	jQuery(selector).each(function(i){
		if(jQuery(this).attr(attribute_name) != ""){
			if(the_image = new RegExp(/^img:(.+)/).exec(jQuery(this).attr(attribute_name))){
				jQuery("body").append("<div class=\"" + tooltip_class + "\" id=\"" + tooltip_class + i + "\"><p><img src=\"" + the_image[1] + "\" alt=\"[image]\" /></p></div>");
			}else{
				jQuery("body").append("<div class=\"" + tooltip_class + "\" id=\"" + tooltip_class + i + "\"><p>" + jQuery(this).attr(attribute_name) + "</p></div>");
			}
			var my_tooltip = jQuery("#" + tooltip_class + i);
			jQuery(this).removeAttr(attribute_name).mouseover(function(){
				my_tooltip.css({opacity:0.8, display:"none"}).fadeIn(200);
				jQuery(this).addClass("hover");
			}).mousemove(function(kmouse){
				my_tooltip.css({left:kmouse.pageX+15, top:kmouse.pageY+15});
			}).mouseout(function(){
				my_tooltip.fadeOut(100);
				jQuery(this).removeClass("hover");
			});
		}
	});
}
jQuery(document).ready(function(){
	simple_tooltip("div", "tooltip", "title");
	simple_tooltip("span", "tooltip", "title");
});
