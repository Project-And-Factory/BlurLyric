@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
set ENABLE_FLAC=true
set ENABLE_LOCAL_VIP=true
set MIGU_COOKIE="migu_cn_cookie_id=a610d27a-60ad-4550-9ddd-4d6eb99890c3; mg_uem_user_id_4124BC0A9335C27F086F24BA207A4912=7DFxts-LVYKS0wfNspYrfvfvthBzEdr81662197557675; mg_uem_session_id_4124BC0A9335C27F086F24BA207A4912=O0xu6wiDyAfQ7x7_OF9DHXFJqurbumCP1662197557675; mg_uem_user_id_9fbe6599400e43a4a58700a822fd57f8=45b5fa18-bf5f-45c3-a5da-3a9f463bd28b; cookieId=DwXnuPxAoAO08w20Z5QXymxlcUgg9dg1662197558098; WT_FPC=id=2e5a396135b40c7baa51662197558133:lv=1662197558133:ss=1662197558133"
npm run test --no-sandbox
pasue