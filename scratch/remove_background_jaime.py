import os
from PIL import Image

jaime_dir = r"c:\Users\agust\Documents\trabajos\Clickapp-main\img\jaime"

for fname in os.listdir(jaime_dir):
    if fname.endswith(".png"):
        fpath = os.path.join(jaime_dir, fname)
        img = Image.open(fpath).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            # If the pixel is near white (background), make it transparent
            if r > 230 and g > 230 and b > 230:
                newData.append((255, 255, 255, 0))
            elif r > 215 and g > 215 and b > 215:
                # Feathering / semi-transparent edges
                alpha = int(255 * (1 - (r - 215) / 15.0))
                newData.append((r, g, b, max(0, min(255, alpha))))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(fpath, "PNG")
        print(f"Removed background from {fname}")

print("Background removal complete!")
