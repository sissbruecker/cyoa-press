/**
 * Created by Sascha on 29.07.15.
 */
module.exports = function getArg(argName) {

    var argValue;

    process.argv.forEach(function (val) {

        var parts = val.split('=');

        if (!parts.length > 1) return;
        if (!parts[0] == argName) return;

        argValue = parts[1];
    });

    return argValue;
};