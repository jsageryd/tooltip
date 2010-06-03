function simple_tooltip(selector, tooltip_class, attribute_name){

	// Initialise variables
	tt_offset = 15;
	tt_safetymargin = 10;
	animating_tooltip = false;
	first_hover = true;
	tt_height = 0;
	tt_width = 0;
	border_bottom = 0;
	border_right = 0;
	last_top_delta = 0;
	last_left_delta = 0;

	jQuery(selector).each(function(i){
		if(jQuery(this).attr(attribute_name) != ""){
			if(the_image = new RegExp(/^img:(.+)/).exec(jQuery(this).attr(attribute_name))){
				jQuery("body").append("<div class=\"" + tooltip_class + "\" id=\"" + tooltip_class + i + "\"><img src=\"" + the_image[1] + "\" alt=\"[image]\" /></div>");
			}else{
				jQuery("body").append("<div class=\"" + tooltip_class + "\" id=\"" + tooltip_class + i + "\"><p>" + jQuery(this).attr(attribute_name) + "</p></div>");
			}
			var my_tooltip = jQuery("#" + tooltip_class + i);
			jQuery(this).removeAttr(attribute_name).mouseover(function(){
				my_tooltip.css({opacity:0.9, display:"none"}).fadeIn(150);

				// Add the hover class to enable styling the element on hover
				jQuery(this).addClass("hover");

				// Get window measurements
				border_bottom = jQuery(window).scrollTop() + jQuery(window).height();
				border_right = jQuery(window).scrollLeft() + jQuery(window).width();

				// Get height and width of the tooltip
				tt_height = my_tooltip.height();
				tt_width = my_tooltip.width();

				// Set first_hover to prevent animation
				first_hover = true;
			}).mousemove(function(kmouse){
				// If animating, don't move the tooltip (it would flicker)
				if(animating_tooltip) return;

				// Get mouse position
				my = kmouse.pageY;
				mx = kmouse.pageX;

				// Determine where to place the tooltip (above or below cursor?)
				if(my + tt_offset + tt_height + tt_safetymargin < border_bottom){
					top_delta = tt_offset;
				}else{
					top_delta = -tt_height - tt_offset;
				}

				// Determine where to place the tooltip (left or right of cursor?)
				if(mx + tt_offset + tt_width + tt_safetymargin < border_right){
					left_delta = tt_offset;
				}else{
					left_delta = -tt_width - tt_offset;
				}

				// Set tooltip position
				top_pos = my + top_delta;
				left_pos = mx + left_delta;

				// Animate if the relative position of the tooltip has changed
				if(!first_hover && (top_delta != last_top_delta || left_delta != last_left_delta)){
					animating_tooltip = true;
					my_tooltip.animate({left:left_pos, top:top_pos}, 80, 'swing', function(){ animating_tooltip = false; });
				}else{
					my_tooltip.css({left:left_pos, top:top_pos});
				}

				first_hover = false;
				last_top_delta = top_delta;
				last_left_delta = left_delta;
			}).mouseout(function(){
				my_tooltip.fadeOut(100);
				jQuery(this).removeClass("hover");
			});
		}
	});
}
jQuery(document).ready(function(){
	simple_tooltip("span", "tooltip", "title");
});
