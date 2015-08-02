/**
 * Created by Sascha on 01.08.15.
 */
(function () {

    $(document).ready(function () {

        rangy.init();
        var cssApplier = rangy.createClassApplier('editor-highlight', { normalize: true });
        var highlighter = rangy.createHighlighter(document);
        highlighter.addClassApplier(cssApplier);

        $('#button_edit_add').click(function () {

            highlighter.highlightSelection('editor-highlight');

        });
        $('#button_edit_save').click(function () {

            var highlights =highlighter.serialize();

            console.log(highlights);
        });
    });


    function storeRange() {

        var sel = rangy.getSelection();

        if (sel.rangeCount) {

            var range = sel.getRangeAt(0),
                commonAncestor = $(range.commonAncestorContainer),
                startContainer = $(range.startContainer),
                endContainer = $(range.endContainer);

            var article = commonAncestor.is('article') ? commonAncestor : commonAncestor.closest('article');

            if (!article.length) return;

            var chapterDiv = article.closest('div.chapter');
            var contentDiv = article.find('div.content');
            var chapterIndex = chapterDiv.find('> a').attr('name');

            var startElementPath = getPath(startContainer, contentDiv);
            var endElementPath = getPath(endContainer, contentDiv);
            var startOffset = range.startOffset;
            var endOffset = range.endOffset;

            var rangeConfig = {
                partId: chapterIndex,
                startElementPath: startElementPath,
                startOffset: startOffset,
                endElementPath: endElementPath,
                endOffset: endOffset
            };


            console.dir(JSON.stringify(rangeConfig));
            //range.deleteContents();
        }
    }

    function selectPath(element, path) {

        path = path.slice();

        while (path.length) {

            var index = path.shift();
            var contents = element.contents();

            element = $(contents[index]);
        }

        return element;
    }

    function getPath(element, root, path) {

        path || (path = []);

        if (element[0] == root[0]) return path;

        var parent = element.parent();
        var index = Array.prototype.indexOf.call(parent[0].childNodes, element[0]);

        path.unshift(index);

        return getPath(parent, root, path);
    }
})();