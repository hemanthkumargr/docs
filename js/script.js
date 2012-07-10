var DOCS = (function($) {

    /* ********** INIT ********** */
    /* Self-executing constructor */
    /* ************************** */
    (function init() {
        $('.rootNode').children(":nth-child(2)").addClass("collapsibleList");
        CollapsibleLists.apply(); 

        // Identify the current node in the sidebar based on the active window
        var $currentLink = $('#right_column').find('a').filter(function() { 
            return $(this).attr('href') == window.location.pathname; 
        });

        // If this node has children, open it so that they're visible
        if ($currentLink.next()[0].tagName == "UL") {
            $currentLink.next().css('display', 'block');
        }

        var $currentNode = $currentLink.parent();
        while ($currentNode.parent().hasClass('rootNode') == false) {
            var $currentNode = $currentNode.parent();

            if ($currentNode[0].tagName == "UL") {
                $currentNode.css('display', 'block');
                continue;
            } else if ($currentNode[0].tagName != "LI") {
                continue;
            }

            $currentNode.removeClass('collapsibleListClosed');
            $currentNode.addClass('collapsibleListOpen');
        }
    })();

    /*
    $(document).on('click', 'a', (function(event) {
        // We don't want to intercept links that are going
        // off site
        if ($(this).attr('href').indexOf('http') != -1) {
            return true;
        }

        event.preventDefault();

        $link = $(this);
        $.get($link.attr('href'), function(data) {
            var newLeftColumn = $(data).filter("div").find("#left_column");
            $('#left_column').replaceWith(newLeftColumn);
        });
    }));
    */


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

