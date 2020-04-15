@echo off
REM Change working directory to wherever the batch script is installed, to ensure that the npm command will work
cd %~dp0
REM Keep the window open to help peruse the logs
cmd /k npm start
