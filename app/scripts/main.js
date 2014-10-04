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

        // sign up form
        $('button#signupButton').click(function() {
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:3333/attendee',
                data: $('form-signup').serialize(),
                success: function() {
                    // show success info
                    $('#modalBody').html('<div class="alert alert-success">Du bist erfolgreich angemeldet. Wir freuen uns auf Dich!</div');
                    // replace buttons with one close button
                    $('#modalFooter').html('<button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>');
                },
                error: function(res) {
                    console.log(res);
                    // show error
                    $('#modalBody').html('<div class="alert alert-danger">Bei der Anmeldung ist ein Fehler aufgetreten, versuche es doch später noch einmal.</div>' + $('#modalBody').html());
                }
            });
        });
    });
})(jQuery);