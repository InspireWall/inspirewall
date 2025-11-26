# InspireWall - Cinematic Landing Page

A premium, minimalist landing page for InspireWall's motivational wallpaper brand.

## 🎨 Features

- **Cinematic Design**: Dark, elegant aesthetic with subtle animations
- **Smooth Parallax**: Hero section with gentle parallax scrolling
- **Interactive Showcase**: Three wallpaper cards with hover effects
- **Email Capture**: Clean wishlist signup with validation
- **Mobile-First**: Fully responsive, optimized for phone wallpaper viewing
- **Performance**: Lazy loading, intersection observers, smooth animations

## 📁 Project Structure

```
Website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
├── README.md           # Documentation
└── assets/             # Wallpaper images folder
    ├── wallpaper-1.jpg
    ├── wallpaper-2.jpg
    └── wallpaper-3.jpg
```

## 🚀 Setup Instructions

### 1. Add Your Wallpapers

Place your three best wallpapers in the `assets/` folder with these names:
- `wallpaper-1.jpg`
- `wallpaper-2.jpg`
- `wallpaper-3.jpg`

**Recommended dimensions**: 1080x1920px (9:16 aspect ratio for phones)

### 2. Open the Website

Simply open `index.html` in your browser. No build process needed!

### 3. Test Responsive Design

- Desktop: Full three-column grid
- Tablet: Two columns or single column
- Mobile: Single column, perfectly optimized

## 📧 Email Integration

The email form currently logs to the console. To connect to a real backend:

1. Open `script.js`
2. Find the `submitEmail()` function
3. Replace the simulated API call with your actual endpoint:

```javascript
async function submitEmail(email) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return response.json();
}
```

### Popular Email Services:

- **Mailchimp**: Use their API for list subscriptions
- **ConvertKit**: Simple subscriber API
- **EmailOctopus**: Lightweight alternative
- **Custom Backend**: Node.js/Firebase/Supabase

## 🎯 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --text-primary: #ffffff;
    /* Modify as needed */
}
```

### Typography

The site uses **Inter** from Google Fonts. To change:

1. Update the Google Fonts link in `index.html`
2. Change `--font-family` in `styles.css`

### Animation Speed

Adjust transition durations in `:root`:

```css
--transition-fast: 0.2s ease;
--transition-medium: 0.4s ease;
--transition-slow: 0.8s ease;
```

## 🌐 Deployment

### Option 1: Netlify (Recommended)
1. Drag and drop the entire folder
2. Instant deployment with HTTPS

### Option 2: Vercel
1. Import GitHub repository
2. Auto-deploy on push

### Option 3: GitHub Pages
1. Push to GitHub
2. Enable Pages in repository settings

### Option 4: Custom Hosting
Upload all files via FTP to your web server

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format for smaller file sizes
2. **Compress**: Run images through TinyPNG or similar
3. **CDN**: Host images on a CDN for faster loading
4. **Caching**: Enable browser caching on your server

## 📱 Mobile Testing

Test on actual devices or use:
- Chrome DevTools (F12 → Device Toolbar)
- Firefox Responsive Design Mode
- Safari Web Inspector

## 🎨 Design Philosophy

**InspireWall's aesthetic:**
- Minimal: Less is more
- Cinematic: Movie-quality lighting
- Calm: Gentle animations
- Premium: Apple-level polish
- Inspirational: Motivational at core

## 📝 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile Safari: ✅ Optimized
- Samsung Internet: ✅ Works great

## 🐛 Troubleshooting

**Images not loading?**
- Check file paths in `index.html`
- Ensure images are in `assets/` folder
- Verify correct file extensions

**Animations not working?**
- Check browser console for errors
- Ensure `script.js` is loading
- Try hard refresh (Ctrl+F5)

**Form not submitting?**
- Open browser console to see logs
- Check `submitEmail()` function
- Verify email validation

## 📄 License

All rights reserved - InspireWall Brand

---

**Built with ❤️ for InspireWall**  
*Here to Inspire.*
