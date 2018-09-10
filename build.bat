set MVD_DESKTOP_DIR=..\..\zlux-app-manager\virtual-desktop

copy .\com.rs.mvd.dependency-graph.json ..\zlux-example-server\plugins\com.rs.mvd.dependency-graph.json
copy .\com.rs.mvd.dependency-graph.json ..\zlux-example-server\deploy\instance\ZLUX\plugins

pushd .\nodeServer
call npm install && call npm run build
popd

pushd .\webClient
call npm install && call npm run build
popd

pause