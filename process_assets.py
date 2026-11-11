import os
import io
import base64
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs('public/assets/brand', exist_ok=True)
os.makedirs('public/assets/images', exist_ok=True)
os.makedirs('public/assets/projects', exist_ok=True)

PORTRAIT_SRC = r'C:/Users/prakh/.gemini/antigravity/brain/9e12d335-aa8a-485b-a587-cea1539fe0f7/.user_uploaded/media_1794410485547_e285f30d.jpg'
LOGO_SRC = r'C:/Users/prakh/.gemini/antigravity/brain/9e12d335-aa8a-485b-a587-cea1539fe0f7/.user_uploaded/media_1794410493921_8e5d8c3a.jpg'

# 1. Save original files
logo_img = Image.open(LOGO_SRC).convert('RGBA')
logo_img.save('public/assets/brand/logo-original.png', 'PNG')

portrait_img = Image.open(PORTRAIT_SRC)
portrait_img.save('public/assets/images/prakhar-portrait-original.jpg', 'JPEG', quality=95)

# 2. Crop portrait to 4:5 centered on face and shoulders, thumbs-up hands visible
# Source image dimensions
pw, ph = portrait_img.size
print(f"Portrait source size: {pw}x{ph}")

# Target aspect ratio 4:5
target_aspect = 4.0 / 5.0
current_aspect = pw / ph

if current_aspect > target_aspect:
    new_w = int(ph * target_aspect)
    left = (pw - new_w) // 2
    crop_box = (left, 0, left + new_w, ph)
else:
    new_h = int(pw / target_aspect)
    # Head and shoulders, thumbs up are in the upper-mid area (about top 15% to 80%)
    # Let's crop starting around top 200px or so
    top = int(ph * 0.22)
    if top + new_h > ph:
        top = ph - new_h
    crop_box = (0, top, pw, top + new_h)

cropped_portrait = portrait_img.crop(crop_box)
# Resize to 1400w max if larger
if cropped_portrait.width > 1400:
    h1400 = int(1400 / target_aspect)
    p_1400 = cropped_portrait.resize((1400, h1400), Image.Resampling.LANCZOS)
else:
    p_1400 = cropped_portrait

p_1400.save('public/assets/images/prakhar-portrait.webp', 'WEBP', quality=85)

# 700px version
h700 = int(700 / target_aspect)
p_700 = cropped_portrait.resize((700, h700), Image.Resampling.LANCZOS)
p_700.save('public/assets/images/prakhar-portrait-700.webp', 'WEBP', quality=85)

# 20px blur placeholder
blur_20 = cropped_portrait.resize((20, int(20 / target_aspect)), Image.Resampling.BOX)
blur_buffer = io.BytesIO()
blur_20.save(blur_buffer, format="JPEG", quality=60)
b64_blur = base64.b64encode(blur_buffer.getvalue()).decode('utf-8')
with open('public/assets/images/portrait-blur.txt', 'w') as f:
    f.write(f"data:image/jpeg;base64,{b64_blur}")
print("Portrait processed successfully")

# 3. Create logo-bone-on-transparent.png
# Pure Pillow implementation without numpy dependency
# Logo has cream background (~#F4EFE4 or #f6f1e8), black lettering, red K
# We remove cream background and turn dark text into bone (#F4EFE4) while preserving red K.
lw, lh = logo_img.size
src_pixels = logo_img.load()
bone_logo = Image.new('RGBA', (lw, lh))
dst_pixels = bone_logo.load()

for y in range(lh):
    for x in range(lw):
        p = src_pixels[x, y]
        r, g, b = p[0], p[1], p[2]
        is_red = (r > 130) and (r - g > 50) and (r - b > 50)
        brightness = (r + g + b) / 3.0

        if is_red:
            dst_pixels[x, y] = (r, g, b, 255)
        elif brightness <= 215:
            # Dark text pixel -> bone #F4EFE4 (244, 239, 228) with proportional alpha
            alpha = int(max(0, min(255, (220 - brightness) / 140.0 * 255.0)))
            dst_pixels[x, y] = (244, 239, 228, alpha)
        else:
            # Cream background -> transparent
            dst_pixels[x, y] = (0, 0, 0, 0)

bone_logo.save('public/assets/brand/logo-bone-on-transparent.png', 'PNG')
print("logo-bone-on-transparent.png created")

# 4. Create OG Image (1200x630)
og = Image.new('RGBA', (1200, 630), (10, 10, 11, 255))
# Add subtle radial glow
draw = ImageDraw.Draw(og)
# Paste bone logo resized
logo_aspect = bone_logo.width / bone_logo.height
lw = 460
lh = int(lw / logo_aspect)
bl_resized = bone_logo.resize((lw, lh), Image.Resampling.LANCZOS)
og.paste(bl_resized, (70, (630 - lh) // 2), bl_resized)

# Draw text on right
# We can draw stylized lines
draw.text((600, 260), "Prakhar Kaushik", fill=(244, 239, 228, 255))
draw.text((600, 310), "Builder of Interfaces", fill=(224, 27, 36, 255))
draw.text((600, 360), "prikaushion — Studio & Portfolio 2026", fill=(244, 239, 228, 160))
og.save('public/assets/brand/og-image.png', 'PNG')
print("og-image.png created")

# 5. Favicon 32
fav = Image.new('RGBA', (32, 32), (10, 10, 11, 255))
draw_fav = ImageDraw.Draw(fav)
# Draw rounded square and crimson K shape
draw_fav.rounded_rectangle([0, 0, 31, 31], radius=6, fill=(10, 10, 11, 255), outline=(224, 27, 36, 255), width=1)
# Draw a stylized K
draw_fav.line([(9, 7), (9, 25)], fill=(224, 27, 36, 255), width=3)
draw_fav.line([(9, 16), (22, 7)], fill=(224, 27, 36, 255), width=3)
draw_fav.line([(12, 14), (23, 25)], fill=(224, 27, 36, 255), width=3)
fav.save('public/favicon-32.png', 'PNG')
print("favicon-32.png created")

