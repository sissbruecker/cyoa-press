/**
 * Created by Sascha on 05.07.15.
 */
module.exports = {
    fileNameByIndex: function (chapter) {
        return chapter.index + '.html';
    },
    replaceParam: function (content, paramName, value) {
        return content.replace(new RegExp('{{' + paramName + '}}', 'g'), value);
    }
};