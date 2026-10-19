package ar.com.daletepido.app;

/**
 * MainActivity actúa como el punto de entrada principal de DaleTePido en Android.
 * Extiende WebViewActivity para garantizar una experiencia 100% nativa,
 * fluida, a pantalla completa y sin barra de navegación URL del navegador.
 *
 * Si se desea alternar al modo Trusted Web Activity (TWA) con Chrome Custom Tabs validado:
 * simplemente cambiar la herencia a: extends TwaActivity
 */
public class MainActivity extends WebViewActivity {
}
