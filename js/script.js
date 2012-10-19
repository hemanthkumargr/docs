// Bind links that can be animated to use HTML5 history if the browser supports it
if (window.history && window.history.pushState) {
    $(document).on('click', 'a', (function(event) {
        var linkUrl = $(this).attr('href');

        if (linkUrl.indexOf('http') != -1) {
            return true;
        } else if (linkUrl.indexOf('.png') != -1) {
            return true;
        } else {
            event.preventDefault();
            var opts = {};
            if (linkUrl.indexOf("#") > -1) {
                opts = {anchor: linkUrl.substring(linkUrl.indexOf("#") + 1)};
                linkUrl = linkUrl.substring(0, linkUrl.indexOf("#"));
            }
            History.pushState(opts, null, linkUrl); 
        }
    }));
}

// Forward our captured statechange to the navigate function
$(window).bind('statechange',function(e){
    DOCS.navigate(History.getState());
});

var DOCS = (function($) {
    var $window = $(window);
    var $rightColumn;

    $(document).ready(function() {
        $rightColumn = $('#right_column');

        // Initialize the collapsible list
        $('.rootNode').children(":nth-child(1)").addClass("collapsibleList").addClass("firstNode");
        CollapsibleLists.apply(); 
        updateTree();

    });

    /**
     * The function called by the fired statechange event
     */
    function navigate(State) {
        $.get(State.url, function(data) {
            _gaq.push(['_trackPageview', State.hash]);

            var newLeftColumn = $(data).filter("div").find("#left_column");
            $('#left_column').replaceWith(newLeftColumn);

            updateTree();

            if (State.data['anchor'] != undefined) {
                $('html, body').animate({
                    scrollTop: $('a[name=' + State.data['anchor'] + ']').offset().top - 10
                }, 300);
            } else if ($window.scrollTop() > 135) {
                $('html, body').animate({
                    scrollTop: 135
                }, 300);
            }

        });
    }

    /**
     * Select the correct node to highlight based on the URL
     */
    function updateTree() {
        // Identify the current node in the sidebar based on the active window
        var $currentLink = $('#right_column').find('a').filter(function() { 
            return $(this).attr('href') == window.location.pathname; 
        });

        $rightColumn.find('.active').removeClass('active');
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

	return {
        navigate: navigate,
        updateTree: updateTree
    }

})($);

