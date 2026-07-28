import zlib
import struct

def create_png(width, height, color_bg=(37, 99, 235), color_fg=(255, 255, 255)):
    # Create raw RGBA image data
    raw_data = bytearray()
    
    # Simple icon: blue background with a white square / letter motif in the middle
    border_x = width // 4
    border_y = height // 4
    
    for y in range(height):
        raw_data.append(0)  # Filter type 0 (None)
        for x in range(width):
            # Check if pixel is inside central icon area or border
            is_fg = (border_x <= x < width - border_x) and (border_y <= y < height - border_y)
            # Add rounded corners effect or subtle inner shape
            if is_fg:
                raw_data.extend(color_fg + (255,))  # White
            else:
                raw_data.extend(color_bg + (255,))  # Blue #2563eb

    compressed = zlib.compress(bytes(raw_data), 9)

    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    png_bytes = bytearray(b'\x89PNG\r\n\x1a\n')
    # IHDR chunk
    png_bytes.extend(chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)))
    # IDAT chunk
    png_bytes.extend(chunk(b'IDAT', compressed))
    # IEND chunk
    png_bytes.extend(chunk(b'IEND', b''))
    return bytes(png_bytes)

# Generate 192x192 and 512x512
with open('icon-192.png', 'wb') as f:
    f.write(create_png(192, 192))

with open('icon-512.png', 'wb') as f:
    f.write(create_png(512, 512))

print("Icons generated successfully!")
