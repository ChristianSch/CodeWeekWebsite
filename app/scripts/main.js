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

        // show modal
        $('button.signupButton').click(function() {
            // show either the `sign up` modal or the `cancel attendance modal`
            if ($.cookie('oid')) {
                $('#dropoutModal').modal('show');
            } else {
                $('#signupModal').modal('show');
            }
        });

        // sign up form
        $('button#signupButton').click(function() {
            var nameVal = $('input#signup-name').val();
            if (nameVal === undefined || nameVal.length <= 4) {
                $('#signupFormWarnings').html('<div class="alert alert-danger">Wir benötigen mindestens einen Namen von Dir.</div>');
                console.log('invalid');
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:3333/attendee',
                    data: $('form-signup').serialize(),
                    success: function(res) {
                        if (res.oid) {
                            // show success info by replacing the form with it
                            $('#modalBody').html('<div class="alert alert-success">Du bist erfolgreich angemeldet. Wir freuen uns auf Dich!</div');
                            // replace buttons with one close button
                            $('#modalFooter').html('<button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>');

                            // set cookie with object id to cancel the attandance
                            $.cookie('oid', res.oid, { expire: 30 });
                        } else {
                            $('#signupFormWarnings').html('<div class="alert alert-danger">Bei der Anmeldung ist ein Fehler aufgetreten, versuche es doch später noch einmal.</div>');
                        }
                    },
                    error: function(res) {
                        console.log(res);
                        // show error
                        $('#signupFormWarnings').html('<div class="alert alert-danger">Bei der Anmeldung ist ein Fehler aufgetreten, versuche es doch später noch einmal.</div>');
                    }
                });
            }
        });

        // cancel attendance button
        $('button#cancelAttendance').click(function() {
            $.ajax({
                type: 'DELETE',
                url: 'http://127.0.0.1:3333/attendee/' + $.cookie('oid'),
                success: function() {
                    $('#cancelAttendanceWarnings').html('<div class="alert alert-success">Du wurdest erfolgreich abgemeldet.</div>');
                    $('#dropoutModalFooter').html('<button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>');
                    $.removeCookie('oid');
                },
                error: function() {
                    $('#cancelAttendanceWarnings').html('<div class="alert alert-danger">Leider ist beim Abmelden ein Problem aufgetreten. Du kannst es gerne später noch einmal versuchen, jedoch ist das auch kein Problem denn die Anmeldung ist unverbindlich. Danke für dein Interesse.');
                }
            });
        });
    });
})(jQuery);