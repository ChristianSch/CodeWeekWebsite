'use strict';


(function($) {
    $(document).ready(function() {
    	// bootstrap <select>
    	$('select').selectpicker();

    	// scrolling animations like parallax
        var scrollorama = $.scrollorama({
            blocks: '.scrollblock',
            enablePin: false
        });

        // parallax background
        // position
        scrollorama.animate('#parallax-2', {
            duration: 600,
            property: 'top',
            start: 0,
            end: -100
        });

        // opacity
        scrollorama.animate('#parallax-2', {
        	duration: 150,
        	property: 'opacity',
        	start: 1,
        	end: 0
        });
    });
})(jQuery);