var DOCS = (function($) {

    /* ********** INIT ********** */
    /* Self-executing constructor */
    /* ************************** */
    (function init() {
        $('.rootNode').children(":nth-child(2)").addClass("collapsibleList");
        CollapsibleLists.apply(); 
    })();

    /*
    $(document).on('click', '.inline-links a', (function(event) {
        if ($(this).parent().attr('class') != 'inline-links') {
            return true;
        }

        event.preventDefault();

        $link = $(this);
        $ajax = $link.next();

        if (!$ajax.hasClass('ajax')) {
            $ajax = $('<div>').addClass('ajax').hide();
            $link.after($ajax);
        }

        if ($ajax.is(':visible')) {
            $ajax.hide();
            return false;
        } else {
            if ($ajax.html().length == 0) {
                $.get($link.attr('href'), function(data) {
                    $ajax.html($(data).filter('.content'));
                });
            }
            $ajax.show();
        }
    }));
    */
	
	return { }

})($);

