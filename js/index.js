var CloudOS = (function () {

    var $mainContent;
    var $currentOperatingWindow;

    var windowMoveEnabled = false;
    var relativeX = 0;
    var relativeY = 0;
    var windowResizeEnabled = false;
    return {
        init: function () {
            $mainContent = $(".main-content");
            initMouseControl();
        }
    };

    function OSWindow(config) {
        /*
            properties of the config may include:
            id, title, width, height, top, left
         */
        this.html = "<div class=\"window\">" +
            "<div class=\"header\">" +
            "</div>" +
            "<div class=\"content\"></div>" +
            "<div class=\"resize-handle\"></div>" +
            "</div>";
    }

    function initMouseControl() {
        $mainContent.on("mousemove", function (event) {
            var x = event.pageX;
            var y = event.pageY;
            if (windowMoveEnabled) {
                $currentOperatingWindow.css({
                    "left": (x - relativeX) + "px",
                    "top": (y - relativeY) + "px"
                });
            } else if (windowResizeEnabled) {
                var offset = $currentOperatingWindow.offset();
                $currentOperatingWindow.css({
                    "width": (x - offset.left) + "px",
                    "height": (y - offset.top) + "px"
                });
            }
        });
        $mainContent.on("mousedown", function (event) {
            var $target = $(event.target);
            if ($target.is(".window .header")) {
                windowMoveEnabled = true;
                relativeX = event.pageX - $target.offset().left;
                relativeY = event.pageY - $target.offset().top;
                $currentOperatingWindow = $target.parent();
            } else if ($target.is(".window .resize-handle")) {
                windowResizeEnabled = true;
                $currentOperatingWindow = $target.parent();
            }
            $(".window").removeClass("top-level");
            $currentOperatingWindow.addClass("top-level");
        });
        $mainContent.on("mouseup", function (event) {
            if (windowMoveEnabled) windowMoveEnabled = false;
            if (windowResizeEnabled) windowResizeEnabled = false;
        });
    }
})();