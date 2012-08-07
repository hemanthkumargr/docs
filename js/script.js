// Bind links that can be animated to use HTML5 history if the browser supports it
if (window.history && window.history.pushState) {
    $(document).on('click', 'a', (function(event) {
        var linkUrl = $(this).attr('href');

        if (linkUrl.indexOf('http') != -1) {
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
    var $window = $(window);
    var $stickyEl;
    var $rightColumn;

    function updateHeights() {
        var $leftColumn = $('#left_column');

        $stickyEl.css('height', '');
        $leftColumn.css('min-height', Math.min($window.height() - 10, $stickyEl.height()));
        $stickyEl.css('height', Math.min($window.height() - 40
             - Math.max($stickyEl.offset().top - $window.scrollTop(), 0)
                , $stickyEl.height()));

        if ($rightColumn) {
            $rightColumn.mCustomScrollbar("update");
        }
    }

    $(document).ready(function() {
        $stickyEl = $("#right_column_container");
        $rightColumn = $('#right_column');
        elTop = $stickyEl.offset().top;

        $rightColumn.mCustomScrollbar({set_height: "100%"});

        $('.rootNode').children(":nth-child(1)").addClass("collapsibleList").addClass("firstNode");
        CollapsibleLists.apply(); 
        updateTree();
        updateHeights();

        $(window).scroll(function() { 
            var windowTop = $window.scrollTop();
            $stickyEl.toggleClass('sticky', windowTop > elTop - 10);
            updateHeights();
        });
    });

    $('body').on('click', 'li.collapsibleListClosed, li.collapsibleListOpen', function() {
        updateHeights();
    });

    /**
     * The function called by the fired statechange event
     */
    function navigate(State) {
        $.get(State.url, function(data) {
            var newLeftColumn = $(data).filter("div").find("#left_column");
            $('#left_column').replaceWith(newLeftColumn);

            updateTree();
            updateHeights();
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

        if ($rightColumn) {
            var currentLinkOffset = $currentLink.position().top;
            $rightColumn.mCustomScrollbar("scrollTo", currentLinkOffset);
        }

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

	return {
        navigate: navigate,
        updateTree: updateTree
    }

})($);

