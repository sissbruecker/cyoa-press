/**
 * Created by Sascha on 25.07.15.
 */
(function () {

    var BUTTON_TEMPLATE = '<p><button class="btn" type="button"</button></p>';
    var SPOILER_TEMPLATE = '<div class="collapse"><div class="well"></div></div>';

    $(document).ready(function () {

        var spoilerBlocks = $('div.bbmSpoilerBlock');

        spoilerBlocks.each(initializeSpoiler);

        function initializeSpoiler(index, block) {

            block = $(block);

            var visible = false;

            // Get quote contents
            var contents = block.find('> div.quotecontent > div.bbm_spoiler_noscript > blockquote').html();

            // Create bootstrap collapsible
            var spoilerButton = $(BUTTON_TEMPLATE);
            var spoilerDiv = $(SPOILER_TEMPLATE);

            spoilerButton.find('button').text('Show spoiler');
            spoilerButton.find('button').click(function() {

                if(visible) {
                    spoilerButton.find('button').text('Show spoiler');
                    spoilerDiv.collapse('hide');
                } else {
                    spoilerButton.find('button').text('Hide spoiler');
                    spoilerDiv.collapse('show');
                }

                visible = !visible;
            });

            spoilerDiv.find('div.well').html(contents);

            block.before(spoilerButton);
            block.before(spoilerDiv);

            // Remove original spoiler div
            block.remove();
        }
    });
})();