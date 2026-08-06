import os
from PIL import Image, ImageDraw, ImageFont

workspace_dir = r"c:\Users\agust\Documents\trabajos\Clickapp-main"
logo_path = r"C:\Users\agust\.gemini\antigravity-ide\brain\00468912-7c46-4938-98cf-46c120f9ff6f\media__1785985555435.jpg"

logo = Image.open(logo_path).convert("RGBA")

# 1. Screenshot Wide (1280x720)
wide_bg = Image.new("RGBA", (1280, 720), (14, 12, 12, 255))
draw_wide = ImageDraw.Draw(wide_bg)

# Red header bar
draw_wide.rectangle([(0, 0), (1280, 70)], fill=(215, 38, 56, 255))

# Paste logo in header
logo_wide = logo.resize((50, 50), Image.LANCZOS)
wide_bg.paste(logo_wide, (20, 10), logo_wide)

# Mock cards on dark background
draw_wide.rectangle([(40, 100), (400, 320)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)
draw_wide.rectangle([(440, 100), (800, 320)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)
draw_wide.rectangle([(840, 100), (1240, 320)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)
draw_wide.rectangle([(40, 350), (1240, 680)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)

wide_path = os.path.join(workspace_dir, "screenshot-wide.png")
wide_bg.save(wide_path, "PNG", quality=100)
print("Screenshot Wide generado:", wide_path)

# 2. Screenshot Narrow (750x1334)
narrow_bg = Image.new("RGBA", (750, 1334), (14, 12, 12, 255))
draw_narrow = ImageDraw.Draw(narrow_bg)

# Red header bar
draw_narrow.rectangle([(0, 0), (750, 90)], fill=(215, 38, 56, 255))

# Paste logo in header
logo_narrow = logo.resize((60, 60), Image.LANCZOS)
narrow_bg.paste(logo_narrow, (25, 15), logo_narrow)

# Mock mobile cards
draw_narrow.rectangle([(30, 120), (720, 320)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)
draw_narrow.rectangle([(30, 350), (720, 550)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)
draw_narrow.rectangle([(30, 580), (720, 1200)], fill=(26, 26, 30, 255), outline=(50, 50, 56, 255), width=2)
# Bottom nav
draw_narrow.rectangle([(0, 1240), (750, 1334)], fill=(20, 17, 17, 255), outline=(40, 40, 45, 255), width=2)

narrow_path = os.path.join(workspace_dir, "screenshot-narrow.png")
narrow_bg.save(narrow_path, "PNG", quality=100)
print("Screenshot Narrow generado:", narrow_path)
