# 🎯 QR Code Generator

> A powerful, feature-rich QR code generator that works completely offline with professional design presets and extensive customization options.

[![QR Code Generator](https://img.shields.io/badge/QR%20Code-Generator-brightgreen)](https://iamsamk.github.io/QR/)
[![Offline Ready](https://img.shields.io/badge/Offline-Ready-blue)](https://iamsamk.github.io/QR/)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-green)](https://iamsamk.github.io/QR/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🌐 Live Demo

**Try it now:** [https://iamsamk.github.io/QR/](https://iamsamk.github.io/QR/)

---

## ✨ Key Features

### 🎨 **Professional Design Presets**
Choose from 8 beautifully crafted presets for instant professional results:

| Preset             | Description                              | Best For                     |
| ------------------ | ---------------------------------------- | ---------------------------- |
| 🎯 **Classic**      | Traditional black and white              | Business cards, documents    |
| 💼 **Professional** | Sleek cream background with dark pattern | Corporate use, presentations |
| 🎨 **Modern**       | Clean contemporary design                | Tech companies, startups     |
| ⚡ **Neon**         | Vibrant cyan glow effect                 | Gaming, entertainment        |
| 🕰️ **Vintage**      | Warm sepia tones                         | Retro brands, art projects   |
| ✨ **Minimal**      | Ultra-clean aesthetic                    | Minimalist designs           |
| 🌙 **Dark Mode**    | Perfect for dark themes                  | Apps, websites               |
| 🎭 **Creative**     | Eye-catching gradient design             | Marketing, social media      |

### 🎛️ **Advanced Customization Options**

#### **Color & Style Controls**
- 🎨 **Custom Colors** - Full color picker for background and foreground
- 🌈 **Gradient Support** - Linear and radial gradients with 4 directions
- 📏 **Dot Size Control** - Adjustable from 20% to 100%
- 🔲 **Shape Styles** - Square, rounded, circle, and diamond patterns
- 🔷 **Corner Styles** - Square, rounded, extra-rounded, and dot corners

#### **Size & Layout**
- 📐 **Size Control** - Scalable from 200px to 800px
- 🖼️ **Center Image Support** - Add logos with adjustable size (10-30%)
- 📱 **Mobile Responsive** - Perfect on all devices

#### **User Experience**
- ⚡ **Real-time Preview** - Instant updates as you customize
- 💾 **Download Support** - High-quality PNG export
- 🔄 **Offline Functionality** - Works completely without internet
- ⌨️ **Keyboard Shortcuts** - Ctrl+Enter to generate

---

## 🚀 Quick Start

### **Method 1: Direct Use (Recommended)**
1. Visit [https://iamsamk.github.io/QR/](https://iamsamk.github.io/QR/)
2. Enter your URL
3. Choose a preset or customize
4. Download your QR code

### **Method 2: Local Installation**
```bash
# Clone the repository
git clone https://github.com/iamsamk/QR.git

# Navigate to the project
cd QR

# Open in your browser
open index.html
# or
start index.html
# or simply double-click index.html
```

---

## 📖 Detailed Usage Guide

### **Step 1: Enter Your URL**
```
Example URLs:
✅ https://www.google.com
✅ https://github.com/iamsamk/QR
✅ https://example.com/path?param=value
❌ google.com (will be auto-fixed)
```

### **Step 2: Choose Your Style**

#### **Quick Presets**
Click any preset button for instant professional results:
- **Classic** - Perfect for business use
- **Professional** - Corporate and formal applications
- **Modern** - Contemporary and clean
- **Neon** - Eye-catching and vibrant
- **Vintage** - Retro and artistic
- **Minimal** - Simple and elegant
- **Dark Mode** - For dark-themed applications
- **Creative** - Bold and gradient-based

#### **Custom Styling**
1. **Colors**: Use the color pickers to set background and foreground colors
2. **Gradients**: Enable gradient mode and choose start/end colors
3. **Shapes**: Select dot and corner styles for unique looks
4. **Size**: Adjust QR code size (200px-800px) and dot size (20%-100%)

### **Step 3: Add Center Image (Optional)**
1. Click "Choose File" and select an image
2. Adjust image size (10%-30% of QR code)
3. Image will be displayed in a circular frame with border
4. Click "Remove Image" to clear

### **Step 4: Download**
- Click "Download" to save as high-quality PNG
- File will be saved as "qr-code.png"

---

## 🛠️ Technical Specifications

### **Core Technology**
- **Framework**: Vanilla JavaScript (No dependencies)
- **QR Library**: Custom implementation in `qr-core.js`
- **Rendering**: HTML5 Canvas for high-quality output
- **Offline Support**: Service Worker implementation
- **Error Correction**: High level (ERROR_CORRECT_H) for maximum reliability

### **Browser Compatibility**
| Browser         | Version | Status         |
| --------------- | ------- | -------------- |
| Chrome          | 60+     | ✅ Full Support |
| Firefox         | 55+     | ✅ Full Support |
| Safari          | 12+     | ✅ Full Support |
| Edge            | 79+     | ✅ Full Support |
| Mobile Browsers | Modern  | ✅ Full Support |

### **QR Code Specifications**
- **Error Correction Level**: High (30% damage tolerance)
- **Supported Types**: 1-10 (handles most URLs and text)
- **Maximum Data**: ~2,953 bytes (version 10)
- **Format**: PNG with transparent background support

---

## 📁 Project Structure

```
QR/
├── 📄 index.html          # Main application interface
├── 🎨 styles.css          # Responsive styling and themes
├── ⚙️ script.js           # Core application logic
├── 🔧 qr-core.js          # QR code generation library
├── 🔄 sw.js              # Service Worker for offline support
└── 📖 README.md          # This documentation
```

### **File Descriptions**

| File         | Purpose           | Key Features                     |
| ------------ | ----------------- | -------------------------------- |
| `index.html` | Main interface    | Responsive design, accessibility |
| `styles.css` | Styling           | CSS Grid, Flexbox, animations    |
| `script.js`  | Application logic | QR generation, customization     |
| `qr-core.js` | QR library        | Self-contained, no dependencies  |
| `sw.js`      | Offline support   | Service Worker implementation    |

---

## 🔧 Customization Guide

### **Modifying Default Settings**

#### **Change Default Colors**
```javascript
// In script.js, modify setDefaultStyles()
this.bgColorInput.value = '#your-color';
this.fgColorInput.value = '#your-color';
```

#### **Adjust Size Limits**
```html
<!-- In index.html, modify the range inputs -->
<input type="range" id="qr-size" min="100" max="1000" value="400">
<input type="range" id="dot-size" min="10" max="100" value="70">
```

#### **Add New Presets**
```javascript
// In script.js, add to the presets object
const presets = {
    yourPreset: {
        bgColor: '#ffffff',
        fgColor: '#000000',
        cornerStyle: 'square',
        dotStyle: 'square',
        gradient: false
    }
};
```

### **Styling Customization**
```css
/* In styles.css, modify CSS variables */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --border-radius: 8px;
}
```

---

## 🔒 Security & Privacy

### **Privacy Features**
- ✅ **100% Local Processing** - No data sent to external servers
- ✅ **No Internet Required** - Works completely offline
- ✅ **No Analytics** - No tracking or data collection
- ✅ **No Dependencies** - No external libraries or CDNs

### **Data Handling**
- All QR code generation happens locally in your browser
- URLs and images never leave your device
- No data is stored or transmitted
- Complete privacy and security

---

## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### **QR Code Not Generating**
```
Problem: QR code doesn't appear
Solution: 
1. Check URL format (add https:// if missing)
2. Ensure JavaScript is enabled
3. Try refreshing the page
```

#### **Center Image Not Showing**
```
Problem: Uploaded image doesn't display
Solution:
1. Check file format (PNG, JPG, GIF supported)
2. Reduce image size percentage
3. Try a smaller image file
```

#### **Download Not Working**
```
Problem: Can't download QR code
Solution:
1. Generate QR code first
2. Check browser download permissions
3. Try different browser
```

#### **Styling Issues**
```
Problem: Custom styles not applying
Solution:
1. Clear browser cache
2. Check for JavaScript errors in console
3. Ensure all files are present
```

### **Browser-Specific Issues**

| Browser | Common Issue     | Solution                    |
| ------- | ---------------- | --------------------------- |
| Chrome  | None             | ✅ Works perfectly           |
| Firefox | Download blocked | Allow downloads in settings |
| Safari  | Canvas issues    | Update to latest version    |
| Edge    | None             | ✅ Works perfectly           |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Ways to Contribute**
1. 🐛 **Report Bugs** - Open an issue with detailed description
2. 💡 **Suggest Features** - Propose new ideas and improvements
3. 🔧 **Submit Code** - Fork and create pull requests
4. 📖 **Improve Docs** - Help enhance this documentation
5. 🌟 **Star the Repo** - Show your support

### **Development Setup**
```bash
# Fork and clone the repository
git clone https://github.com/your-username/QR.git

# Make your changes
# Test thoroughly

# Submit a pull request
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Benefits:**
- ✅ Free to use for commercial and personal projects
- ✅ Modify and distribute freely
- ✅ No attribution required (though appreciated)
- ✅ No warranty provided

---

## 🙏 Acknowledgments

- **QR Code Standards** - Based on ISO/IEC 18004
- **Canvas API** - For high-quality rendering
- **Service Workers** - For offline functionality
- **Open Source Community** - For inspiration and support

---

### **Getting Help**
- 📖 **Documentation**: This README file
- 🐛 **Issues**: [GitHub Issues](https://github.com/iamsamk/QR/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/iamsamk/QR/discussions)

### **Quick Links**
- 🌐 **Live Demo**: [https://iamsamk.github.io/QR/](https://iamsamk.github.io/QR/)
- 📦 **Download**: [Latest Release](https://github.com/iamsamk/QR/releases)
- ⭐ **Star**: [GitHub Repository](https://github.com/iamsamk/QR)

---



**Made with ❤️ by [iamsamk](https://github.com/iamsamk)**

[![GitHub stars](https://img.shields.io/github/stars/iamsamk/QR?style=social)](https://github.com/iamsamk/QR)
[![GitHub forks](https://img.shields.io/github/forks/iamsamk/QR?style=social)](https://github.com/iamsamk/QR)
[![GitHub issues](https://img.shields.io/github/issues/iamsamk/QR)](https://github.com/iamsamk/QR/issues)