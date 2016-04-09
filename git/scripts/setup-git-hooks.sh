#!/bin/bash

sourceDir = "git/hooks/*"
targetDir = ".git/hooks"
echo "started copying from ${sourceDir} to ${targetDir} ..."
yes | cp "git/hooks/*" ".git/hooks"
chmod +x $targetDir
echo "finished successfully!"
