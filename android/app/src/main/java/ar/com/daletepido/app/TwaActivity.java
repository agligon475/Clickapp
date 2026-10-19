package ar.com.daletepido.app;

import com.google.androidbrowserhelper.trusted.LauncherActivity;

/**
 * TwaActivity proporciona el modo Trusted Web Activity (TWA) oficial con Chrome Custom Tabs.
 * Requiere que https://daletepido.com.ar/.well-known/assetlinks.json coincida con el SHA-256
 * del keystore para que Chrome elimine la barra de direcciones automáticamente.
 */
public class TwaActivity extends LauncherActivity {
}
