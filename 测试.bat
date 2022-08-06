@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
set ENABLE_FLAC=true
set ENABLE_LOCAL_VIP=true
npm run test --no-sandbox
pasue