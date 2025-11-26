# 🚀 InspireWall Setup Guide

## Step-by-Step Instructions

### ✅ Current Status
All core files are created and ready:
- ✅ `index.html` - Main landing page
- ✅ `styles.css` - Cinematic styling
- ✅ `script.js` - Smooth animations
- ✅ `README.md` - Full documentation
- ✅ `server-launcher.html` - Development helper
- ✅ `assets/` folder - Ready for wallpapers

---

## 🎨 **STEP 1: Add Your Wallpapers**

You need to add 3 wallpapers to the `assets/` folder:

### Method 1: Copy Files Manually
1. Find your 3 best motivational wallpapers
2. Copy them to: `C:\Users\mambo\OneDrive\Desktop\InspireWall\Website\assets\`
3. Rename them to:
   - `wallpaper-1.jpg`
   - `wallpaper-2.jpg`
   - `wallpaper-3.jpg`

### Method 2: Use PowerShell
```powershell
# Navigate to assets folder
cd "C:\Users\mambo\OneDrive\Desktop\InspireWall\Website\assets"

# Copy your wallpapers here and rename them
# Example:
# copy "C:\Path\To\Your\Image1.jpg" wallpaper-1.jpg
```

### 📐 Recommended Specifications:
- **Dimensions**: 1080×1920px (9:16 aspect ratio)
- **Format**: JPG or PNG (JPG recommended for smaller size)
- **Size**: Under 500KB each (compressed for web)
- **Style**: Dark, motivational, cinematic aesthetic

### 🎯 Need Placeholder Images?
If you don't have wallpapers ready, you can use temporary placeholders:
1. Download free motivational images from:
   - Unsplash.com
   - Pexels.com
   - Pixabay.com
2. Search for: "dark motivational", "cinematic quote", "minimal inspiration"

---

## 🌐 **STEP 2: Open the Website**

### Option A: Direct Open (Simplest)
1. Navigate to: `C:\Users\mambo\OneDrive\Desktop\InspireWall\Website\`
2. Double-click `index.html`
3. Opens in your default browser

### Option B: Development Helper
1. Double-click `server-launcher.html`
2. Click "Open InspireWall" button
3. See setup checklist

### Option C: From Browser
1. Open any browser (Chrome, Edge, Firefox)
2. Press `Ctrl + O` (Open File)
3. Navigate to and select `index.html`

---

## 📱 **STEP 3: Test Responsive Design**

### Desktop Testing:
1. Open the website
2. Scroll through all sections
3. Check smooth animations and parallax

### Mobile Testing (Chrome):
1. Press `F12` to open DevTools
2. Click the **Device Toolbar** icon (phone/tablet icon)
3. Select device:
   - iPhone 12 Pro / 13 Pro (recommended)
   - Samsung Galaxy S21
   - Pixel 5
4. Test in portrait mode

### What to Check:
- ✅ Hero section centered and readable
- ✅ Wallpapers display in single column
- ✅ Email form thumb-friendly
- ✅ Smooth scrolling
- ✅ All text legible

---

## 📧 **STEP 4: Email Integration (Optional)**

### Current Status:
- Form validates emails
- Shows success message
- Logs to browser console

### To Connect Real Backend:

#### Option 1: Mailchimp
```javascript
// In script.js, replace submitEmail function:
async function submitEmail(email) {
    const response = await fetch('YOUR_MAILCHIMP_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: email,
            status: 'subscribed'
        })
    });
    return response.json();
}
```

#### Option 2: Google Sheets (Free & Simple)
1. Use Google Apps Script as webhook
2. Stores emails directly in spreadsheet
3. Tutorial: Search "Google Sheets email form"

#### Option 3: Firebase (Free Tier)
1. Create Firebase project
2. Use Firestore database
3. Add emails to collection

#### Option 4: Simple Backend
```javascript
async function submitEmail(email) {
    const response = await fetch('https://yourdomain.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return response.json();
}
```

---

## 🎨 **STEP 5: Customization (Optional)**

### Change Colors:
Edit `styles.css` line 15-20:
```css
:root {
    --bg-primary: #0a0a0a;        /* Main background */
    --text-primary: #ffffff;       /* Main text color */
    --accent-primary: #ffffff;     /* Button/accent color */
}
```

### Change Logo Text:
Edit `index.html` line 18:
```html
<h1 class="logo">InspireWall</h1>
<!-- Change "InspireWall" to your text -->
```

### Change Tagline:
Edit `index.html` line 20:
```html
<p class="tagline fade-in delay-1">Here to Inspire.</p>
<!-- Change "Here to Inspire." to your tagline -->
```

---

## 🚀 **STEP 6: Deploy Online**

### Option 1: Netlify (Recommended - FREE)
1. Go to https://netlify.com
2. Drag and drop your entire `Website` folder
3. Get instant live URL: `yoursite.netlify.app`
4. Custom domain: Settings → Domain Management

### Option 2: Vercel (FREE)
1. Go to https://vercel.com
2. Import from Git or upload folder
3. Auto-deploy on changes
4. Custom domain available

### Option 3: GitHub Pages (FREE)
1. Create GitHub repository
2. Upload all files
3. Enable Pages in Settings
4. URL: `username.github.io/inspirewall`

### Option 4: Custom Hosting
Upload files via FTP to your web host:
- All `.html`, `.css`, `.js` files
- Entire `assets/` folder
- Maintain folder structure

---

## ✅ **Testing Checklist**

Before going live, test:

### Functionality:
- [ ] All 3 wallpapers load
- [ ] Smooth scroll animations work
- [ ] Parallax effect on hero
- [ ] Wallpaper hover effects
- [ ] Email form accepts valid emails
- [ ] Email form rejects invalid emails
- [ ] Success message appears
- [ ] Mobile menu/navigation works

### Performance:
- [ ] Page loads under 3 seconds
- [ ] Images compressed/optimized
- [ ] No console errors (F12)
- [ ] Smooth on mobile devices

### Design:
- [ ] Everything centered properly
- [ ] Text readable on all devices
- [ ] Consistent spacing
- [ ] Professional appearance

---

## 🐛 **Common Issues & Solutions**

### Issue: Images Don't Show
**Solution:**
- Check file names match exactly: `wallpaper-1.jpg`, `wallpaper-2.jpg`, `wallpaper-3.jpg`
- Ensure files are in `assets/` folder
- Check file extensions (.jpg not .jpeg)
- Hard refresh: `Ctrl + F5`

### Issue: Animations Don't Work
**Solution:**
- Open browser console (F12)
- Check for JavaScript errors
- Ensure `script.js` is loading
- Try different browser

### Issue: Email Form Doesn't Submit
**Solution:**
- Check browser console for logs
- It's working! It logs to console
- Connect real backend for actual emails

### Issue: Mobile View Looks Wrong
**Solution:**
- Use browser DevTools (F12 → Device Toolbar)
- Test actual mobile device
- Clear cache and reload

---

## 📞 **Next Steps**

1. **Add wallpapers** → Test locally
2. **Customize branding** → Colors, text, logo
3. **Connect email backend** → Start collecting subscribers
4. **Deploy online** → Share with the world!

---

## 💡 **Pro Tips**

### Optimize Images:
- Use https://tinypng.com to compress
- Convert to WebP for better performance
- Use 1080×1920px for phones

### SEO Optimization:
- Add meta description in `<head>`
- Add Open Graph tags for social sharing
- Use meaningful alt text on images

### Analytics:
Add Google Analytics or Plausible to track:
- Visitor count
- Email signups
- Time on page
- Device breakdown

---

**Questions or Issues?**
Check `README.md` for detailed documentation.

**Ready to launch InspireWall!** 🎉
*Here to Inspire.*
