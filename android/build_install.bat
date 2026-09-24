@echo off
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "CLASSPATH="
cd /d "d:\Canary-All-Project\FinalFarmerBox\FarmerBoxAdminPanel\android"
call gradlew.bat assembleDebug
if %ERRORLEVEL% NEQ 0 (
    echo Gradle build failed!
    exit /b %ERRORLEVEL%
)

echo Installing APK to device 95c19714...
"C:\Users\Pushpak\AppData\Local\Android\Sdk\platform-tools\adb.exe" -s 95c19714 install -r -d "app\build\outputs\apk\debug\app-debug.apk"
if %ERRORLEVEL% NEQ 0 (
    echo ADB install failed!
    exit /b %ERRORLEVEL%
)

echo Launching app on device...
"C:\Users\Pushpak\AppData\Local\Android\Sdk\platform-tools\adb.exe" -s 95c19714 shell am start -n com.farmerbox.joiner/.MainActivity
echo Done!
