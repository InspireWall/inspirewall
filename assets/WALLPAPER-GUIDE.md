# 🎨 Wallpaper Guide - InspireWall

Guide for creating, optimizing, and adding wallpapers to your website.

---

## 📐 Specifications

### Required Files:
```
assets/
├── wallpaper-1.jpg    (Primary showcase wallpaper)
├── wallpaper-2.jpg    (Secondary showcase wallpaper)
├── wallpaper-3.jpg    (Tertiary showcase wallpaper)
```

### Dimensions:
- **Recommended:** 1080×1920px (9:16 aspect ratio)
- **Minimum:** 720×1280px
- **Maximum:** 1440×2560px

### File Format:
- **Best:** JPG (smaller file size)
- **Alternative:** PNG (if transparency needed)
- **Advanced:** WebP (best compression, modern browsers)

### File Size:
- **Target:** 200-500KB per image
- **Maximum:** 1MB per image
- **Total page weight:** Under 3MB

---

## 🎯 Content Guidelines

### Visual Style:
- **Dark backgrounds** (matches website aesthetic)
- **High contrast** (text readable on phones)
- **Cinematic lighting** (dramatic, professional)
- **Minimal clutter** (clean, focused)
- **Motivational themes** (inspiring, uplifting)

### Text Overlays (if any):
- **Font size:** Large and readable
- **Font weight:** Bold or semi-bold
- **Text position:** Center or lower third
- **Contrast:** Ensure text pops against background
- **Style:** Professional, not cheesy

### Color Palette:
- Deep blacks (#000000, #0a0a0a)
- Warm grays (#333333, #555555)
- Gold accents (#d4af37, #ffd700)
- White highlights (#ffffff, #f5f5f5)

---

## 🖼️ Where to Find Wallpapers

### Free Stock Photos:
1. **Unsplash** - https://unsplash.com
   - Search: "dark motivational", "minimal quote", "cinematic"
   - License: Free for commercial use
   - Quality: Professional grade

2. **Pexels** - https://pexels.com
   - Search: "inspirational", "motivation", "dark aesthetic"
   - License: Free for commercial use
   - Quality: High resolution

3. **Pixabay** - https://pixabay.com
   - Search: "minimalist", "dark background"
   - License: Free to use
   - Quality: Varied

### Design Your Own:

#### Tools:
- **Canva** (easiest) - https://canva.com
  - Templates: Phone wallpaper (1080×1920px)
  - Free elements and fonts
  - Export as JPG

- **Figma** (professional) - https://figma.com
  - Create custom designs
  - Export at 2x for crisp quality
  - Free for personal use

- **Adobe Photoshop** (advanced)
  - Full control
  - Professional tools
  - Subscription required

#### Design Tips:
1. Start with dark gradient background
2. Add subtle texture or noise
3. Place motivational quote (optional)
4. Add light source effect
5. Export optimized for web

---

## 🔧 Optimization Process

### Step 1: Resize
Ensure dimensions are correct:
- Online: https://imageresizer.com
- Mac: Preview → Tools → Adjust Size
- Windows: Paint → Resize

### Step 2: Compress
Reduce file size without losing quality:

#### Online Tools:
- **TinyPNG** - https://tinypng.com
  - Drag & drop
  - Reduces 50-70%
  - Maintains quality

- **Squoosh** - https://squoosh.app
  - Google's tool
  - Visual comparison
  - Advanced settings

- **ImageOptim** - https://imageoptim.com (Mac only)
  - Batch processing
  - Lossless compression

#### Target Sizes:
- 1080×1920px → aim for 200-400KB
- If over 1MB → compress more or reduce quality slightly

### Step 3: Format Conversion (Optional)
For better compression:

```bash
# Convert to WebP (best compression)
# Use online: https://convertio.co/jpg-webp/
```

Update `index.html` to support WebP with fallback:
```html
<picture>
    <source srcset="assets/wallpaper-1.webp" type="image/webp">
    <img src="assets/wallpaper-1.jpg" alt="InspireWall wallpaper 1">
</picture>
```

---

## 📝 Naming Convention

### Current Structure:
```
wallpaper-1.jpg    → Hero/Primary wallpaper
wallpaper-2.jpg    → Secondary wallpaper  
wallpaper-3.jpg    → Tertiary wallpaper
```

### If Adding More (Future):
```
wallpaper-4.jpg
wallpaper-5.jpg
...
```

### Best Practices:
- Use lowercase
- Hyphenated names
- Sequential numbering
- Consistent file extension

---

## 🎨 Design Templates

### Template 1: Minimalist Quote
```
Background: Dark gradient (#0a0a0a to #1a1a1a)
Text: "Here to Inspire."
Font: Inter Bold, 72pt
Color: #ffffff
Position: Center
Shadow: Subtle glow
```

### Template 2: Cinematic Landscape
```
Image: Dark mountain/city scene
Overlay: 30% black gradient from bottom
Text: Motivational quote
Position: Lower third
Style: Uppercase, bold
```

### Template 3: Abstract Minimal
```
Background: Solid #0a0a0a
Element: Single geometric shape (gold)
Text: Single word (e.g., "INSPIRE")
Style: Large, centered, minimal
```

---

## 🔄 How to Update Wallpapers

### Replace Existing:
1. Navigate to `assets/` folder
2. Delete old `wallpaper-1.jpg`
3. Add new image
4. Rename to `wallpaper-1.jpg`
5. Refresh browser (Ctrl+F5)

### Add More Wallpapers:
1. Update `index.html`:
```html
<div class="wallpaper-card reveal-up" data-delay="450">
    <div class="wallpaper-image">
        <img src="assets/wallpaper-4.jpg" alt="Wallpaper 4">
    </div>
</div>
```

2. Add image to `assets/` folder
3. Adjust grid if needed in `styles.css`

---

## ✅ Quality Checklist

Before adding wallpaper:

### Technical:
- [ ] Correct dimensions (1080×1920px)
- [ ] File size under 500KB
- [ ] Format: JPG or WebP
- [ ] High resolution (not pixelated)
- [ ] Optimized/compressed

### Visual:
- [ ] Dark aesthetic (matches brand)
- [ ] High quality (professional)
- [ ] Readable on small screens
- [ ] Motivational theme
- [ ] Cinematic lighting

### Performance:
- [ ] Fast loading (under 1 second)
- [ ] Works on mobile data
- [ ] Looks good on actual phone

---

## 🎯 Example Search Queries

When looking for images on Unsplash/Pexels:

### Motivational:
- "dark motivational quote"
- "minimal inspiration"
- "cinematic motivation"
- "black gold aesthetic"
- "professional wallpaper"

### Aesthetic:
- "dark gradient background"
- "minimal black texture"
- "cinematic lighting"
- "moody atmosphere"
- "premium dark aesthetic"

### Specific Themes:
- "success mindset dark"
- "discipline motivation"
- "focus productivity"
- "champion mentality"
- "hustle aesthetic"

---

## 💡 Pro Tips

### 1. Consistency is Key
All 3 wallpapers should feel like a cohesive collection:
- Similar color palette
- Consistent style
- Same vibe/mood
- Unified branding

### 2. Test on Actual Phones
- Transfer to phone
- Set as wallpaper
- Check with icons/widgets
- Ensure text readable

### 3. Seasonal Updates
- Rotate wallpapers monthly
- Keep content fresh
- Maintain email list engaged
- Build anticipation

### 4. User Feedback
- Ask beta users what they like
- A/B test different styles
- Track which wallpapers get most engagement
- Iterate based on data

---

## 📊 Performance Impact

### File Size → Load Time:
- 100KB → 0.1-0.3s
- 300KB → 0.3-0.9s
- 500KB → 0.5-1.5s
- 1MB → 1-3s

### Optimization Impact:
- Original: 2.5MB → Too slow
- Optimized: 400KB → Perfect
- Over-compressed: 50KB → Pixelated

**Sweet spot:** 200-400KB per wallpaper

---

## 🚀 Advanced: Lazy Loading

Already implemented in `index.html`:
```html
<img src="assets/wallpaper-1.jpg" loading="lazy">
```

Benefits:
- Faster initial page load
- Better performance
- Saves mobile data
- Loads as user scrolls

---

## 📞 Quick Reference

### Tools:
- **Find:** Unsplash, Pexels
- **Design:** Canva, Figma
- **Resize:** ImageResizer.com
- **Compress:** TinyPNG.com
- **Convert:** Convertio.co

### Specs:
- **Size:** 1080×1920px
- **Format:** JPG
- **Weight:** 200-500KB
- **Style:** Dark, cinematic, minimal

---

**Create stunning wallpapers!** 🎨  
*Here to Inspire.*
