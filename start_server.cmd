@echo off
REM Change working directory to wherever the batch script is installed, to ensure that the npm command will work
cd %~dp0
:START
REM Keep the window open to help peruse the logs
cmd /k npm start

REM If the server fails at any point, wait for 5 seconds and restart the server
ping 127.0.0.1 -n 6 > nul
GOTO :START