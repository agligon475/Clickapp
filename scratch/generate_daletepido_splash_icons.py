import os
from PIL import Image, ImageDraw

logo_path = r"c:\Users\agust\Documents\trabajos\Clickapp-main\img-default\daletepido-logo-white-hq.png"
if not os.path.exists(logo_path):
    print("Logo not found at", logo_path)
    exit(1)

logo = Image.open(logo_path).convert("RGBA")

def create_splash_icon(size):
    # Canvas background #0A0A0C
    canvas = Image.new("RGBA", (size, size), (10, 10, 12, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Calculate dimensions
    padding = int(size * 0.12)
    card_box = [padding, padding, size - padding, size - padding]
    corner_radius = int(size * 0.16)
    
    # Draw rounded dark card #141416 with red accent border #D72638
    draw.rounded_rectangle(card_box, radius=corner_radius, fill=(20, 20, 22, 255), outline=(215, 38, 56, 180), width=int(size * 0.015))
    
    # Scale logo into safe interior area of card
    max_logo_w = int(size * 0.60)
    max_logo_h = int(size * 0.40)
    
    logo_ratio = logo.width / logo.height
    if max_logo_w / max_logo_h > logo_ratio:
        target_h = max_logo_h
        target_w = int(target_h * logo_ratio)
    else:
        target_w = max_logo_w
        target_h = int(target_w / logo_ratio)
        
    resized_logo = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Center logo on canvas
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    
    canvas.paste(resized_logo, (pos_x, pos_y), resized_logo)
    return canvas.convert("RGB")

icon_192 = create_splash_icon(192)
icon_192.save(r"c:\Users\agust\Documents\trabajos\Clickapp-main\icon-192.png", "PNG")
print("Generated icon-192.png")

icon_512 = create_splash_icon(512)
icon_512.save(r"c:\Users\agust\Documents\trabajos\Clickapp-main\icon-512.png", "PNG")
print("Generated icon-512.png")

# Also save splash icon
icon_512.save(r"c:\Users\agust\Documents\trabajos\Clickapp-main\dashboard-icon.png", "PNG")
print("Generated dashboard-icon.png")
