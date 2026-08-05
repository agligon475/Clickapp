import os
from PIL import Image

brain_dir = r"C:\Users\agust\.gemini\antigravity-ide\brain\8012ee28-ceb2-42b4-8c58-0bb9a7e85cc5"
target_dir = r"c:\Users\agust\Documents\trabajos\Clickapp-main\img\jaime"
os.makedirs(target_dir, exist_ok=True)

mapping = [
    ("media__1785927702501.png", "jaime-mobile-buenaonda.png"),
    ("media__1785927702632.png", "jaime-mobile-resolucion.png"),
    ("media__1785927702700.png", "jaime-mobile-empatia.png"),
    ("media__1785927702731.png", "jaime-mobile-pensando.png"),
    ("media__1785927702822.png", "jaime-mobile-alegria.png")
]

for src_name, dst_name in mapping:
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(target_dir, dst_name)
    
    img = Image.open(src_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        r, g, b, a = item
        # If pixel is white or near-white background outside circular crop, turn transparent
        if r > 240 and g > 240 and b > 240:
            newData.append((255, 255, 255, 0))
        elif r > 220 and g > 220 and b > 220:
            factor = (240 - ((r + g + b) / 3.0)) / 20.0
            alpha = int(255 * max(0.0, min(1.0, factor)))
            newData.append((r, g, b, alpha))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(dst_path, "PNG")
    print(f"Processed Mobile Avatar: {src_name} -> {dst_name} ({img.size})")

print("Mobile assets processing complete!")
