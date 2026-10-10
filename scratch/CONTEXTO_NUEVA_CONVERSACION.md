# Estado del Proyecto y Contexto para la Nueva Conversación

## 🎯 Objetivo Principal
Generar y publicar automáticamente el paquete APK nativo de Android (`DaleTePido.apk`) para la plataforma **Dale! Te Pido / Clickapp** a través de **GitHub Actions** con Google Play Services / Trusted Web Activity (TWA).

---

## 📌 Trabajo Realizado Hasta el Momento

1. **Reemplazo de Bubblewrap CLI:**
   - Previamente se usaba Bubblewrap, el cual fallaba por requerir entradas interactivas de terminal (TTY / prompts interactivos desatendidos).
   - Se migró a un **Proyecto Android Nativo estándar con Gradle** en la carpeta `android/`.

2. **Estructura del Proyecto Android (`android/`):**
   - `android/settings.gradle`: Configurado con `rootProject.name = "DaleTePido"` e `include ':app'`.
   - `android/build.gradle`: Plugin Android Gradle `com.android.tools.build:gradle:8.2.2`, repositorios `google()` y `mavenCentral()`.
   - `android/app/build.gradle`:
     - `namespace 'ar.com.daletepido.app'`, `compileSdk 34`, `minSdk 21`.
     - Dependencias: `androidx.appcompat:appcompat:1.6.1`, `androidx.browser:browser:1.8.0`, `com.google.androidbrowserhelper:androidbrowserhelper:2.5.0`.
     - Firma configurada para usar `signingConfigs.debug` tanto en `debug` como en `release` (permite generar APK instalable sin fallas de keystore en CI).
   - `android/app/src/main/java/ar/com/daletepido/app/MainActivity.java`:
     - Creado y extiende `com.google.androidbrowserhelper.trusted.LauncherActivity`.
   - `android/app/src/main/AndroidManifest.xml`:
     - Actividad principal configurada con `DEFAULT_URL = https://daletepido.com.ar/dashboard.html` y esquemas de intento para TWA.
   - Recursos visuales: Íconos mipmap (`ic_launcher.png`, `ic_launcher_round.png`) en todas las densidades y splash screen.

3. **Workflow de GitHub Actions (`.github/workflows/build-apk.yml`):**
   - Trigger configurado en `push` (rama `main`) y `workflow_dispatch`.
   - JDK 17 (Temurin) + Gradle 8.5 vía `gradle/actions/setup-gradle@v4`.
   - SDK Android enlazado con `local.properties`.
   - Paso de subida de artefacto con `actions/upload-artifact@v4` con nombre `DaleTePido-Android-APK`.

---

## 🔍 Estado Actual y Siguiente Paso Inmediato

- **Último Commit:** `f856c4d` (*fix(ci): simplify android gradle build with debug signing and update workflow*)
- **Último Run:** `#38009335316` falló en el paso `gradle assembleRelease --no-daemon`.
- **Acción Inmediata para la Nueva Conversación:**
  1. En `.github/workflows/build-apk.yml`, cambiar la invocación a:
     ```bash
     gradle :app:assembleRelease --stacktrace --no-daemon
     ```
     o generar el gradle wrapper (`gradle wrapper`) para asegurar reproducibilidad total.
  2. Agregar visualización del error en caso de fallo:
     ```yaml
     - name: Compilar APK con Gradle
       working-directory: android
       run: |
         gradle :app:assembleRelease --stacktrace --no-daemon 2>&1 | tee build.log
     - name: Diagnóstico en caso de error
       if: failure()
       run: |
         cat android/build.log | tail -n 100
     ```
  3. Ejecutar la regla obligatoria: `node scratch/sync_folders.js`, `git add .`, `git commit` y `git push origin main`.
