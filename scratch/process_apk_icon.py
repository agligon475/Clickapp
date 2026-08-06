import os
from PIL import Image

image_path = r"C:\Users\agust\.gemini\antigravity-ide\brain\00468912-7c46-4938-98cf-46c120f9ff6f\media__1785985555435.jpg"
workspace_dir = r"c:\Users\agust\Documents\trabajos\Clickapp-main"

if not os.path.exists(image_path):
    print("No se encontró el archivo de origen:", image_path)
    exit(1)

img = Image.open(image_path).convert("RGBA")
print("Imagen cargada exitosamente. Tamaño original:", img.size)

# Generar variantes de iconos en la raíz del proyecto
icon_sizes = {
    "icon-512.png": (512, 512),
    "icon-192.png": (192, 192),
    "apple-touch-icon.png": (180, 180),
    "favicon.png": (64, 64),
    "dashboard-icon.png": (128, 128)
}

for filename, size in icon_sizes.items():
    resized = img.resize(size, Image.LANCZOS)
    out_path = os.path.join(workspace_dir, filename)
    resized.save(out_path, "PNG", quality=100)
    print(f"Generado {filename} ({size[0]}x{size[1]}) en {out_path}")

# Para maskable, creamos una versión con margen seguro (safe area = 80% del centro)
maskable_bg = Image.new("RGBA", (512, 512), (215, 38, 56, 255)) # Rojo Daletepido #D72638
inner_img = img.resize((410, 410), Image.LANCZOS)
maskable_bg.paste(inner_img, (51, 51), inner_img)

maskable_512_path = os.path.join(workspace_dir, "icon-512-maskable.png")
maskable_bg.save(maskable_512_path, "PNG", quality=100)

maskable_192_bg = maskable_bg.resize((192, 192), Image.LANCZOS)
maskable_192_path = os.path.join(workspace_dir, "icon-192-maskable.png")
maskable_192_bg.save(maskable_192_path, "PNG", quality=100)

print("¡Iconos generados exitosamente para APK / PWABuilder!")
