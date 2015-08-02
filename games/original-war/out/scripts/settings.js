/**
 * Created by Sascha on 25.07.15.
 */
(function () {

    var SETTINGS_COOKIE_NAME = 'cyoa-press-cookie';

    var DEFAULT_PAGE_WIDTH = 700;
    var DEFAULT_FONT_SIZE = 16;

    $(document).ready(function () {

        var settings = null;

        var container = $('div.container');
        var popup = $('#settings-popup');
        var inputPageWidth = popup.find('#inputPageWidth');
        var inputFontSize = popup.find('#inputFontSize');
        var buttonReset = popup.find('button.btn-reset');

        // Init form
        loadSettings();
        applySettings();
        writeSettings();

        // Watch changes
        inputPageWidth.change(function() {
            readSettings();
            applySettings();
            saveSettings();
        });

        inputFontSize.change(function() {
            readSettings();
            applySettings();
            saveSettings();
        });

        // Reset
        buttonReset.click(function() {
            defaultSettings();
            writeSettings();
            applySettings();
            saveSettings();
        });

        function saveSettings() {
            Cookies.set(SETTINGS_COOKIE_NAME, settings);
        }

        function defaultSettings() {
            settings = {
                pageWidth: DEFAULT_PAGE_WIDTH,
                fontSize: DEFAULT_FONT_SIZE
            }
        }

        function loadSettings() {

            settings = Cookies.getJSON(SETTINGS_COOKIE_NAME);

            if(!settings) defaultSettings();
        }

        function readSettings() {
            settings.pageWidth = parseFloat(inputPageWidth.val()) || DEFAULT_PAGE_WIDTH;
            settings.fontSize = parseFloat(inputFontSize.val()) || DEFAULT_PAGE_WIDTH;
        }

        function writeSettings() {
            inputPageWidth.val(settings.pageWidth);
            inputFontSize.val(settings.fontSize);
        }

        function applySettings() {
            container.css('width', settings.pageWidth + 'px');
            container.css('fontSize', settings.fontSize + 'px');
        }
    });
})();