// Bind links that can be animated to use HTML5 history if the browser supports it
if (window.history && window.history.pushState) {
    $(document).on('click', 'a', (function(event) {
        var linkUrl = $(this).attr('href');

        if (linkUrl.indexOf('http') != -1) {
            return true;
        } else if (linkUrl.indexOf('#') != -1) {
            return true;
        } else {
            event.preventDefault();
            History.pushState({}, null, linkUrl); 
        }
    }));
}

// Forward our captured statechange to the navigate function
$(window).bind('statechange',function(e){
    DOCS.navigate(History.getState());
});

var DOCS = (function($) {

    $(document).ready(function() {
        $('.rootNode').children(":nth-child(2)").addClass("collapsibleList");
        CollapsibleLists.apply(); 
        updateTree();
    });

    /**
     * The function called by the fired statechange event
     */
    function navigate(State) {
        $.get(State.url, function(data) {
            var newLeftColumn = $(data).filter("div").find("#left_column");
            $('#left_column').replaceWith(newLeftColumn);
            window.scrollTo(0,0);
        });
        updateTree();
    }

    function updateTree() {
        // Identify the current node in the sidebar based on the active window
        var $currentLink = $('#right_column').find('a').filter(function() { 
            return $(this).attr('href') == window.location.pathname; 
        });

        $('#right_column').find('.active').removeClass('active');
        $currentLink.addClass('active');

        // If this node has children, open it so that they're visible
        if ($currentLink.next()[0] != undefined && $currentLink.next()[0].tagName == "UL") {
            $currentLink.next().css('display', 'block');
        }

        var $currentNode = $currentLink.parent();
        if ($currentNode.hasClass('collapsibleListClosed')) {
            $currentNode.removeClass('collapsibleListClosed');
            $currentNode.addClass('collapsibleListOpen');
        }

        while ($currentNode.parent().hasClass('rootNode') == false) {
            var $currentNode = $currentNode.parent();

            if ($currentNode[0].tagName == "UL") {
                $currentNode.css('display', 'block');
                continue;
            } else if ($currentNode[0].tagName != "LI") {
                continue;
            }

            if ($currentNode.hasClass('collapsibleListClosed')) {
                $currentNode.removeClass('collapsibleListClosed');
                $currentNode.addClass('collapsibleListOpen');
            }
        }

        $('.treeView').show();
    }

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
	
	return {
        navigate: navigate,
        updateTree: updateTree
    }

})($);

