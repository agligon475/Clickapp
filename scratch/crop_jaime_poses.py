import os
from PIL import Image

src_path = r"C:\Users\agust\.gemini\antigravity-ide\brain\8012ee28-ceb2-42b4-8c58-0bb9a7e85cc5\media__1785896952797.png"
out_dir = r"c:\Users\agust\Documents\trabajos\Clickapp-main\img\jaime"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path)
w, h = img.size
print(f"Original image size: {w}x{h}")

col_width = w / 5.0

poses = [
    ("jaime-pensando.png", 0),
    ("jaime-alegria.png", 1),
    ("jaime-empatia.png", 2),
    ("jaime-resolucion.png", 3),
    ("jaime-buenaonda.png", 4)
]

for name, idx in poses:
    left = int(idx * col_width)
    right = int((idx + 1) * col_width)
    bottom = int(h * 0.82)
    cropped = img.crop((left, 0, right, bottom))
    out_file = os.path.join(out_dir, name)
    cropped.save(out_file, "PNG")
    print(f"Saved {out_file} - size: {cropped.size}")

print("Cropping complete!")
