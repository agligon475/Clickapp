import os
from PIL import Image

brain_dir = r"C:\Users\agust\.gemini\antigravity-ide\brain\8012ee28-ceb2-42b4-8c58-0bb9a7e85cc5"
target_dir = r"c:\Users\agust\Documents\trabajos\Clickapp-main\img\jaime"
os.makedirs(target_dir, exist_ok=True)

# The 5 media files corresponding to user upload
# Order of user uploads: Buena Onda, Empatía, Resolución, Pensando, Alegría
# Let's inspect their sizes/aspect ratios to match precisely:
files = [
    "media__1785897889223.png", # Buena Onda
    "media__1785897889407.png", # Empatía
    "media__1785897889527.png", # Resolución
    "media__1785897889550.png", # Pensando
    "media__1785897889693.png"  # Alegría
]

mapping = [
    ("media__1785897889223.png", "jaime-buenaonda.png"),
    ("media__1785897889407.png", "jaime-empatia.png"),
    ("media__1785897889527.png", "jaime-resolucion.png"),
    ("media__1785897889550.png", "jaime-pensando.png"),
    ("media__1785897889693.png", "jaime-alegria.png")
]

for src_name, dst_name in mapping:
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(target_dir, dst_name)
    
    img = Image.open(src_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        r, g, b, a = item
        # If pixel is white or near-white background, turn transparent
        if r > 240 and g > 240 and b > 240:
            newData.append((255, 255, 255, 0))
        elif r > 220 and g > 220 and b > 220:
            # Smooth transparent edge transition
            factor = (240 - ((r + g + b) / 3.0)) / 20.0
            alpha = int(255 * max(0.0, min(1.0, factor)))
            newData.append((r, g, b, alpha))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(dst_path, "PNG")
    print(f"Processed {src_name} -> {dst_name} ({img.size})")

print("Processing complete!")
