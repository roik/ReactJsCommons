var fs = require('fs');
var path = require( 'path' );

var SEPARATOR = "/";
var sourceDir = "git/hooks";
var targetDir = ".git/hooks";

fs.readdir( sourceDir, function( err, files ) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
    console.log("source dir is  : %s", sourceDir);
    console.log("target dir is  : %s", targetDir);
    files.forEach(function (file, index) {
        var fromPath = sourceDir.concat(SEPARATOR, file);
        var toPath = targetDir.concat(SEPARATOR,file);

        copyHook(fromPath, toPath, false);

    });
});
function copyHook(sourceFile, targetFile, cbCalled) {
        console.log("source to copy git hooks from is : %s", sourceFile);
        console.log("target to copy git hooks to is : %s", targetFile);

        var rd = fs.createReadStream(sourceFile);

        rd.on("error", function (err) {
            fileCopyFailed("read-stream", err);
        });

        rd.on("close", function () {
            console.log('closed read stream!');
        });

        var wr = fs.createWriteStream(targetFile, {flags: 'w+', mode: 755});

        wr.on("error", function (err) {
            fileCopyFailed("write-stream", err);
        });

        wr.on("close", function () {
            console.log('closed write stream!');
        });

        wr.on('finish', function () {
            console.log( "Moved file '%s' to '%s'.", sourceFile, targetFile );
        });

        rd.pipe(wr);
        console.log("Copied git hooks successfully! (can copied files watch in root/.git/hooks)");

        function fileCopyFailed(process, err) {
            if (!cbCalled) {
                console.error("Failed to copy git hooks from : %s , to : %s", sourceFile, targetFile);
                console.error(" in : %s because of : %s", process, err);
                cbCalled = true;
                process.exit(1);
            }
        }
    }