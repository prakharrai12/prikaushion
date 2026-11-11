import os
from PIL import Image, ImageDraw

os.makedirs('public/assets/projects', exist_ok=True)

projects = [
    {
        "slug": "hacks-2026",
        "initials": "H26",
        "title": "Hacks 2026 — NARI Hackathon",
        "category": "EVENT WEBSITE",
        "accent": (224, 27, 36),
        "tag": "thehacks.in"
    },
    {
        "slug": "vipra-pulse",
        "initials": "VP",
        "title": "VipraPulse",
        "category": "AI BRAND INTELLIGENCE",
        "accent": (255, 90, 54),
        "tag": "RAG & Sentiment"
    },
    {
        "slug": "finculator",
        "initials": "FC",
        "title": "Finculator",
        "category": "SECURE FINANCIAL APP",
        "accent": (224, 27, 36),
        "tag": "Cloudflare Pages"
    },
    {
        "slug": "radix-aroma",
        "initials": "RA",
        "title": "Radix Aroma",
        "category": "BRAND & CONTRACT FARMING",
        "accent": (190, 30, 45),
        "tag": "Next.js & Tailwind"
    },
    {
        "slug": "nooq",
        "initials": "NQ",
        "title": "nooq",
        "category": "STUDENT HOUSING PLATFORM",
        "accent": (122, 15, 24),
        "tag": "Deep Indigo & React"
    },
    {
        "slug": "amisphere",
        "initials": "AS",
        "title": "Amisphere",
        "category": "COLLEGE CAMPUS PORTAL",
        "accent": (224, 27, 36),
        "tag": "Hardened Frontend"
    },
    {
        "slug": "desical",
        "initials": "DC",
        "title": "DesiCal",
        "category": "INDIAN FOOD CALORIE TRACKER",
        "accent": (255, 90, 54),
        "tag": "Python / Flet Mobile"
    },
    {
        "slug": "nova",
        "initials": "NV",
        "title": "NOVA AI Companion Robot",
        "category": "HARDWARE & DESKTOP AI",
        "accent": (224, 27, 36),
        "tag": "ESP32-S3 + Ollama"
    },
    {
        "slug": "access-control",
        "initials": "P4",
        "title": "P4-EYE Access Control",
        "category": "IOT MULTI-FACTOR SYSTEM",
        "accent": (160, 20, 30),
        "tag": "Face + Morse Challenge"
    },
    {
        "slug": "joyra",
        "initials": "JY",
        "title": "Joyra",
        "category": "E-COMMERCE & GIFTING",
        "accent": (224, 27, 36),
        "tag": "Brand Identity & Web"
    },
    {
        "slug": "akansha-demo",
        "initials": "AK",
        "title": "Wellness Creator Suite",
        "category": "CREATOR MEDIA PLATFORM",
        "accent": (200, 30, 40),
        "tag": "Booking & Media Kit"
    }
]

W, H = 1440, 900

for p in projects:
    img = Image.new('RGB', (W, H), (10, 10, 11))
    draw = ImageDraw.Draw(img)
    
    # 1. Atmospheric radial glow in corner
    accent = p["accent"]
    for rad in range(600, 0, -30):
        alpha = int(35 * (1 - rad / 600))
        glow_color = (
            int(10 + (accent[0] - 10) * (alpha / 255.0)),
            int(10 + (accent[1] - 10) * (alpha / 255.0)),
            int(11 + (accent[2] - 11) * (alpha / 255.0))
        )
        draw.ellipse([W - rad, -rad // 2, W + rad, rad * 1.5], fill=glow_color)
    
    # 2. Subtle architectural grid / hairlines
    for x in range(120, W, 240):
        draw.line([(x, 0), (x, H)], fill=(244, 239, 228), width=1)
    for y in range(90, H, 180):
        draw.line([(0, y), (W, y)], fill=(244, 239, 228), width=1)
        
    # Dim the grid lines with overlay
    grid_mask = Image.new('RGBA', (W, H), (10, 10, 11, 238))
    img.paste(Image.blend(img.convert('RGBA'), grid_mask, 0.92).convert('RGB'))
    draw = ImageDraw.Draw(img)
    
    # 3. Inner card frame
    draw.rectangle([60, 60, W - 60, H - 60], outline=(244, 239, 228), width=1)
    
    # Browser chrome mockup inside preview
    draw.rectangle([60, 60, W - 60, 120], fill=(15, 14, 16), outline=(244, 239, 228), width=1)
    # Three dots
    draw.ellipse([85, 85, 97, 97], fill=(244, 239, 228))
    draw.ellipse([108, 85, 120, 97], fill=(244, 239, 228))
    draw.ellipse([131, 85, 143, 97], fill=(244, 239, 228))
    
    # URL pill
    draw.rounded_rectangle([200, 76, 680, 104], radius=14, fill=(22, 20, 23), outline=(244, 239, 228), width=1)
    draw.text((220, 83), f"https://prikaushion.studio/work/{p['slug']}", fill=(244, 239, 228))
    
    # Category tag on top right
    draw.text((W - 320, 83), p["category"], fill=(224, 27, 36))
    
    # 4. Large initials in background
    # Approximate giant text with polygons / outline
    draw.text((120, 240), p["initials"], fill=(22, 20, 23))
    
    # 5. Card text inside
    draw.text((120, 520), p["category"], fill=(224, 27, 36))
    draw.text((120, 560), p["title"], fill=(244, 239, 228))
    draw.text((120, 640), p["tag"], fill=(244, 239, 228))
    
    # Draw four-point sparkle in accent color
    sx, sy = W - 240, 360
    s_size = 48
    draw.polygon([
        (sx, sy - s_size),
        (sx + 14, sy - 14),
        (sx + s_size, sy),
        (sx + 14, sy + 14),
        (sx, sy + s_size),
        (sx - 14, sy + 14),
        (sx - s_size, sy),
        (sx - 14, sy - 14)
    ], fill=p["accent"])
    
    img.save(f'public/assets/projects/{p["slug"]}.webp', 'WEBP', quality=88)

print("All 11 project covers generated successfully!")

