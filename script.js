class QRCodeGenerator {
    constructor() {
        this.canvas = document.getElementById('qr-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.centerImage = null;
        this.currentQRDataURL = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDotSizeValue(); // Initialize dot size display
        this.setDefaultStyles();
        this.generateQRCode(); // Generate initial QR code
    }
    
    setDefaultStyles() {
        this.bgColorInput.value = '#F4F1EA';
        this.fgColorInput.value = '#3D3D3D';
        this.cornerStyleSelect.value = 'rounded';
        this.dotStyleSelect.value = 'circle';
        this.dotSizeInput.value = '70'; // Increased default dot size for better scanning
        this.updateColorValue('bg');
        this.updateColorValue('fg');
        this.updateDotSizeValue();
    }
    
    initializeElements() {
        this.urlInput = document.getElementById('url-input');
        this.bgColorInput = document.getElementById('bg-color');
        this.fgColorInput = document.getElementById('fg-color');
        this.qrSizeInput = document.getElementById('qr-size');
        this.centerImageInput = document.getElementById('center-image');
        this.imageSizeInput = document.getElementById('image-size');
        this.generateBtn = document.getElementById('generate-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.clearImageBtn = document.getElementById('clear-image-btn');
        this.urlDisplay = document.getElementById('url-display');
        this.bgColorValue = document.getElementById('bg-color-value');
        this.fgColorValue = document.getElementById('fg-color-value');
        this.sizeValue = document.getElementById('size-value');
        this.dotSizeInput = document.getElementById('dot-size');
        this.dotSizeValue = document.getElementById('dot-size-value');
        this.imageSizeValue = document.getElementById('image-size-value');
        this.imageControls = document.getElementById('image-controls');
        
        // Preset buttons
        this.presetButtons = document.querySelectorAll('.preset-btn');

        // New style elements
        this.cornerStyleSelect = document.getElementById('corner-style');
        this.dotStyleSelect = document.getElementById('dot-style');
        this.enableGradientCheckbox = document.getElementById('enable-gradient');
        this.gradientControls = document.getElementById('gradient-controls');
        this.gradientStartInput = document.getElementById('gradient-start');
        this.gradientEndInput = document.getElementById('gradient-end');
        this.gradientDirectionSelect = document.getElementById('gradient-direction');
        
    }
    
    bindEvents() {
        // Generate QR code on input changes
        this.urlInput.addEventListener('input', () => this.generateQRCode());
        this.bgColorInput.addEventListener('input', () => this.updateColorValue('bg'));
        this.fgColorInput.addEventListener('input', () => this.updateColorValue('fg'));
        this.qrSizeInput.addEventListener('input', () => this.updateSizeValue());
        this.dotSizeInput.addEventListener('input', () => this.updateDotSizeValue());
        this.imageSizeInput.addEventListener('input', () => this.updateImageSizeValue());
        
        // Generate button
        this.generateBtn.addEventListener('click', () => this.generateQRCode());
        
        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadQRCode());
        
        // Center image handling
        this.centerImageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.clearImageBtn.addEventListener('click', () => this.clearCenterImage());
        
        // Real-time updates
        this.bgColorInput.addEventListener('input', () => this.generateQRCode());
        this.fgColorInput.addEventListener('input', () => this.generateQRCode());
        this.qrSizeInput.addEventListener('input', () => this.generateQRCode());
        this.dotSizeInput.addEventListener('input', () => this.generateQRCode());
        this.imageSizeInput.addEventListener('input', () => this.generateQRCode());
        
        // Style controls
        this.cornerStyleSelect.addEventListener('change', () => this.generateQRCode());
        this.dotStyleSelect.addEventListener('change', () => this.generateQRCode());
        this.enableGradientCheckbox.addEventListener('change', () => this.toggleGradient());
        this.gradientStartInput.addEventListener('input', () => this.generateQRCode());
        this.gradientEndInput.addEventListener('input', () => this.generateQRCode());
        this.gradientDirectionSelect.addEventListener('change', () => this.generateQRCode());
        
        // Preset buttons
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.applyPreset(e.target.dataset.preset));
        });
    }
    
    applyPreset(presetName) {
        // Remove active class from all buttons
        this.presetButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        event.target.classList.add('active');
        
        const presets = {
            classic: {
                bgColor: '#ffffff',
                fgColor: '#000000',
                cornerStyle: 'square',
                dotStyle: 'square',
                gradient: false
            },
            professional: {
                bgColor: '#F4F1EA',
                fgColor: '#3D3D3D',
                cornerStyle: 'rounded',
                dotStyle: 'circle',
                gradient: false
            },
            modern: {
                bgColor: '#ffffff',
                fgColor: '#495057',
                cornerStyle: 'rounded',
                dotStyle: 'rounded',
                gradient: false
            },
            neon: {
                bgColor: '#0a0a0a',
                fgColor: '#00ff88',
                cornerStyle: 'rounded',
                dotStyle: 'circle',
                gradient: true,
                gradientStart: '#00ff88',
                gradientEnd: '#00ccff',
                gradientDirection: '45deg'
            },
            vintage: {
                bgColor: '#f5f5dc',
                fgColor: '#8b4513',
                cornerStyle: 'rounded',
                dotStyle: 'square',
                gradient: false
            },
            minimal: {
                bgColor: '#ffffff',
                fgColor: '#333333',
                cornerStyle: 'square',
                dotStyle: 'square',
                gradient: false
            },
            dark: {
                bgColor: '#1a1a1a',
                fgColor: '#ffffff',
                cornerStyle: 'rounded',
                dotStyle: 'rounded',
                gradient: false
            },
            creative: {
                bgColor: '#ffffff',
                fgColor: '#e74c3c',
                cornerStyle: 'extra-rounded',
                dotStyle: 'circle',
                gradient: true,
                gradientStart: '#e74c3c',
                gradientEnd: '#f39c12',
                gradientDirection: 'radial'
            }
        };
        
        const preset = presets[presetName];
        if (preset) {
            this.bgColorInput.value = preset.bgColor;
            this.fgColorInput.value = preset.fgColor;
            this.cornerStyleSelect.value = preset.cornerStyle;
            this.dotStyleSelect.value = preset.dotStyle;
            this.enableGradientCheckbox.checked = preset.gradient;
            
            if (preset.gradient) {
                this.gradientStartInput.value = preset.gradientStart;
                this.gradientEndInput.value = preset.gradientEnd;
                this.gradientDirectionSelect.value = preset.gradientDirection;
                this.gradientControls.style.display = 'grid';
            } else {
                this.gradientControls.style.display = 'none';
            }
            
            this.updateColorValue('bg');
            this.updateColorValue('fg');
            this.generateQRCode();
        }
    }
    


    toggleGradient() {
        if (this.enableGradientCheckbox.checked) {
            this.gradientControls.style.display = 'grid';
        } else {
            this.gradientControls.style.display = 'none';
        }
        this.generateQRCode();
    }
    
    drawStyledQRCode(qrModel, options) {
        const ctx = this.canvas.getContext('2d');
        const moduleCount = qrModel.getModuleCount();
        const cellSize = Math.floor(options.size / (moduleCount + 8)); // Increased margin for better scanning
        const margin = (options.size - (moduleCount * cellSize)) / 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, options.size, options.size);
        
        // Fill background
        ctx.fillStyle = options.bgColor;
        ctx.fillRect(0, 0, options.size, options.size);
        
        // Create gradient if enabled
        let fillStyle;
        if (options.useGradient) {
            if (options.gradientDirection === 'radial') {
                const centerX = options.size / 2;
                const centerY = options.size / 2;
                const radius = options.size / 2;
                fillStyle = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            } else {
                fillStyle = ctx.createLinearGradient(0, 0, 
                    options.gradientDirection.includes('right') ? options.size : 0,
                    options.gradientDirection.includes('bottom') || options.gradientDirection.includes('45deg') ? options.size : 0
                );
            }
            fillStyle.addColorStop(0, options.gradientStart);
            fillStyle.addColorStop(1, options.gradientEnd);
        } else {
            fillStyle = options.fgColor;
        }
        
        ctx.fillStyle = fillStyle;
        
        // Draw all modules first to ensure proper QR structure
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qrModel.isDark(row, col)) {
                    const x = margin + col * cellSize;
                    const y = margin + row * cellSize;
                    
                    // Use different styling for finder patterns vs data modules
                    if (this.isFinderPattern(row, col, moduleCount)) {
                        this.drawFinderPattern(ctx, x, y, cellSize, options.cornerStyle, fillStyle);
                    } else {
                        this.drawModule(ctx, x, y, cellSize, options.dotStyle, fillStyle, options.dotSize);
                    }
                }
            }
        }
    }
    
    isFinderPattern(row, col, moduleCount) {
        // Top-left finder pattern
        if (row < 9 && col < 9) return true;
        // Top-right finder pattern
        if (row < 9 && col >= moduleCount - 8) return true;
        // Bottom-left finder pattern
        if (row >= moduleCount - 8 && col < 9) return true;
        return false;
    }
    
    drawFinderPatterns(ctx, qrModel, moduleCount, cellSize, margin, style, fillStyle, bgColor) {
        ctx.fillStyle = fillStyle;
        
        // Define finder pattern positions and their components
        const finderPatterns = [
            { startRow: 0, startCol: 0 }, // Top-left
            { startRow: 0, startCol: moduleCount - 7 }, // Top-right
            { startRow: moduleCount - 7, startCol: 0 } // Bottom-left
        ];
        
        finderPatterns.forEach(pattern => {
            // Draw outer 7x7 square
            const outerX = margin + pattern.startCol * cellSize;
            const outerY = margin + pattern.startRow * cellSize;
            const outerSize = 7 * cellSize;
            
            this.drawStyledRect(ctx, outerX, outerY, outerSize, outerSize, style, fillStyle);
            
            // Draw inner white 5x5 square (background color)
            ctx.fillStyle = bgColor;
            const innerX = outerX + cellSize;
            const innerY = outerY + cellSize;
            const innerSize = 5 * cellSize;
            
            this.drawStyledRect(ctx, innerX, innerY, innerSize, innerSize, style, ctx.fillStyle);
            
            // Draw center 3x3 square (foreground color)
            ctx.fillStyle = fillStyle;
            const centerX = outerX + 2 * cellSize;
            const centerY = outerY + 2 * cellSize;
            const centerSize = 3 * cellSize;
            
            this.drawStyledRect(ctx, centerX, centerY, centerSize, centerSize, style, fillStyle);
        });
    }
    
    drawStyledRect(ctx, x, y, width, height, style, fillStyle) {
        ctx.fillStyle = fillStyle;
        
        switch (style) {
            case 'rounded':
                this.drawRoundedRect(ctx, x, y, width, height, width * 0.15);
                break;
            case 'extra-rounded':
                this.drawRoundedRect(ctx, x, y, width, height, width * 0.25);
                break;
            case 'dots':
                this.drawCircle(ctx, x + width/2, y + height/2, width * 0.4);
                break;
            default:
                ctx.fillRect(x, y, width, height);
        }
    }
    
    drawFinderPattern(ctx, x, y, cellSize, style, fillStyle) {
        ctx.fillStyle = fillStyle;
        
        switch (style) {
            case 'rounded':
                // Less rounded for better scanning
                this.drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.15);
                break;
            case 'extra-rounded':
                // Moderately rounded for scanning compatibility
                this.drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.25);
                break;
            case 'dots':
                this.drawCircle(ctx, x + cellSize/2, y + cellSize/2, cellSize * 0.4);
                break;
            default:
                // Square is most reliable for scanning
                ctx.fillRect(x, y, cellSize, cellSize);
        }
    }
    
    drawModule(ctx, x, y, cellSize, style, fillStyle, dotSizePercent = 45) {
        ctx.fillStyle = fillStyle;
        const dotSize = Math.max(dotSizePercent / 100, 0.6); // Minimum 60% size for better scanning
        
        switch (style) {
            case 'rounded':
                // Less rounded for better scanning
                const padding = cellSize * (1 - dotSize) / 2;
                const size = cellSize * dotSize;
                this.drawRoundedRect(ctx, x + padding, y + padding, size, size, size * 0.2);
                break;
            case 'circle':
                // Perfect spherical dots
                this.drawCircle(ctx, x + cellSize/2, y + cellSize/2, cellSize * dotSize * 0.5);
                break;
            case 'diamond':
                const diamondPadding = cellSize * (1 - dotSize) / 2;
                const diamondSize = cellSize * dotSize;
                this.drawDiamond(ctx, x + diamondPadding, y + diamondPadding, diamondSize);
                break;
            default:
                // Square dots - most reliable for scanning
                const squarePadding = cellSize * (1 - dotSize) / 2;
                const squareSize = cellSize * dotSize;
                ctx.fillRect(x + squarePadding, y + squarePadding, squareSize, squareSize);
        }
    }
    
    drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }
    
    drawCircle(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    drawDiamond(ctx, x, y, size) {
        const halfSize = size / 2;
        ctx.beginPath();
        ctx.moveTo(x + halfSize, y);
        ctx.lineTo(x + size, y + halfSize);
        ctx.lineTo(x + halfSize, y + size);
        ctx.lineTo(x, y + halfSize);
        ctx.closePath();
        ctx.fill();
    }
    
    updateColorValue(type) {
        if (type === 'bg') {
            this.bgColorValue.textContent = this.bgColorInput.value;
        } else {
            this.fgColorValue.textContent = this.fgColorInput.value;
        }
    }
    
    updateSizeValue() {
        this.sizeValue.textContent = this.qrSizeInput.value + 'px';
    }
    
    updateDotSizeValue() {
        this.dotSizeValue.textContent = this.dotSizeInput.value + '%';
    }
    
    updateImageSizeValue() {
        this.imageSizeValue.textContent = this.imageSizeInput.value + '%';
    }
    
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.centerImage = img;
                    this.imageControls.style.display = 'block';
                    this.clearImageBtn.style.display = 'inline-block';
                    this.generateQRCode();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    
    clearCenterImage() {
        this.centerImage = null;
        this.centerImageInput.value = '';
        this.imageControls.style.display = 'none';
        this.clearImageBtn.style.display = 'none';
        this.generateQRCode();
    }
    
    generateQRCode() {
        // Check if local QRCode library is available
        if (typeof QRCodeCore === 'undefined') {
            this.urlDisplay.textContent = 'Local QRCode library not loaded. Please refresh the page.';
            this.canvas.style.display = 'none';
            this.downloadBtn.style.display = 'none';
            return;
        }
        

        
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.canvas.style.display = 'none';
            this.downloadBtn.style.display = 'none';
            this.urlDisplay.textContent = 'Please enter a URL';
            return;
        }
        
        // Validate URL
        if (!this.isValidURL(url)) {
            this.urlDisplay.textContent = 'Please enter a valid URL';
            this.urlDisplay.classList.add('error');
            this.canvas.style.display = 'none';
            this.downloadBtn.style.display = 'none';
            return;
        } else {
            this.urlDisplay.classList.remove('error');
        }
        
        try {
            const size = parseInt(this.qrSizeInput.value);
            const bgColor = this.bgColorInput.value;
            const fgColor = this.fgColorInput.value;
            const cornerStyle = this.cornerStyleSelect.value;
            const dotStyle = this.dotStyleSelect.value;
            const useGradient = this.enableGradientCheckbox.checked;
            
            // Set canvas size
            this.canvas.width = size;
            this.canvas.height = size;
            
<<<<<<< HEAD
            // Generate QR code using our local library with fallback error correction
            const qrCore = new QRCodeCore();
            let qrModel;
            
            // Try different error correction levels (L = lowest, M = medium, Q, H = highest)
            // Lower error correction = more data capacity
            const errorLevels = [
                qrCore.ERROR_CORRECT_L,  // Lowest (7% correction)
                qrCore.ERROR_CORRECT_M,  // Medium (15% correction)
                qrCore.ERROR_CORRECT_Q,  // Quartile (25% correction)
                qrCore.ERROR_CORRECT_H   // High (30% correction)
            ];
            
            let lastError;
            for (const errorLevel of errorLevels) {
                try {
                    qrModel = qrCore.generateQR(url, errorLevel);
                    break; // Success!
                } catch (error) {
                    lastError = error;
                    continue; // Try next level
                }
            }
            
            if (!qrModel) {
                throw new Error(`Unable to generate QR code: URL may be too long. ${lastError?.message || ''}`);
            }
=======
            // Generate QR code using our local library with high error correction for better scanning
            const qrCore = new QRCodeCore();
            const qrModel = qrCore.generateQR(url, qrCore.ERROR_CORRECT_H);
>>>>>>> ea97537d04da234338851a38a1527f2448027755
            
            // Calculate cell size based on canvas size and QR module count
            const moduleCount = qrModel.getModuleCount();
            const cellSize = Math.floor(size / (moduleCount + 4)); // +4 for margin
            const margin = Math.floor((size - (moduleCount * cellSize)) / 2);
            
            // Custom drawing with advanced styles
            this.drawStyledQRCode(qrModel, {
                size: size,
                cellSize: cellSize,
                margin: Math.floor(margin / cellSize),
                bgColor: bgColor,
                fgColor: fgColor,
                cornerStyle: cornerStyle,
                dotStyle: dotStyle,
                dotSize: parseInt(this.dotSizeInput.value),
                useGradient: useGradient,
                gradientStart: this.gradientStartInput.value,
                gradientEnd: this.gradientEndInput.value,
                gradientDirection: this.gradientDirectionSelect.value
            });
            
            // Add center image if available
            if (this.centerImage) {
                this.addCenterImage();
            }
            
            // Show canvas and download button
            this.canvas.style.display = 'block';
            this.downloadBtn.style.display = 'inline-block';
            this.urlDisplay.textContent = `QR Code for: ${url}`;
            
            // Store current QR data URL for download
            this.currentQRDataURL = this.canvas.toDataURL('image/png');
            
        } catch (error) {
            console.error('Error generating QR code:', error);
<<<<<<< HEAD
            
            // More helpful error messages
            if (url.length > 500) {
                this.urlDisplay.textContent = `Error: URL is too long (${url.length} characters). QR codes work best with URLs under 500 characters. Try using a URL shortener.`;
            } else {
                this.urlDisplay.textContent = `Error generating QR code: ${error.message}. Please try a shorter URL.`;
            }
            
=======
            this.urlDisplay.textContent = 'Error generating QR code. Please try again.';
            this.urlDisplay.classList.add('error');
>>>>>>> ea97537d04da234338851a38a1527f2448027755
            this.canvas.style.display = 'none';
            this.downloadBtn.style.display = 'none';
        }
    }
    
    addCenterImage() {
        if (!this.centerImage) return;
        
        const size = parseInt(this.qrSizeInput.value);
        const imageSize = (parseInt(this.imageSizeInput.value) / 100) * size;
        const x = (size - imageSize) / 2;
        const y = (size - imageSize) / 2;
        
        // Create a circular clipping path for the center image
        this.ctx.save();
        
        // Create circular background
        const radius = imageSize / 2;
        const centerX = x + radius;
        const centerY = y + radius;
        
        // Draw white background circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.bgColorInput.value;
        this.ctx.fill();
        
        // Draw border circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 3, 0, 2 * Math.PI);
        this.ctx.strokeStyle = this.fgColorInput.value;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Clip to circle for image
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.clip();
        
        // Draw the image
        this.ctx.drawImage(this.centerImage, x, y, imageSize, imageSize);
        
        this.ctx.restore();
    }
    
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    downloadQRCode() {
        if (!this.currentQRDataURL) {
            alert('Please generate a QR code first');
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = this.currentQRDataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Additional utility functions
class QRCodeUtils {
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
    static shareQRCode(dataURL, url) {
        if (navigator.share) {
            navigator.share({
                title: 'QR Code',
                text: `QR Code for: ${url}`,
                url: dataURL
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            QRCodeUtils.copyToClipboard(url);
        }
    }
    
    static validateURL(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    }
}

// Initialize the QR Code Generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing QR generator');
    initializeGenerator();
});

function initializeGenerator() {
    const generator = new QRCodeGenerator();
    
    // Add some additional features
    const urlInput = document.getElementById('url-input');
    
    // Add keyboard shortcut for generation
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            generator.generateQRCode();
        }
    });
    
    // Add URL validation feedback
    urlInput.addEventListener('blur', (e) => {
        const url = e.target.value.trim();
        if (url && !generator.isValidURL(url)) {
            e.target.style.borderColor = '#dc3545';
            e.target.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        } else {
            e.target.style.borderColor = '#e1e1e1';
            e.target.style.boxShadow = 'none';
        }
    });
    
    // Add copy URL functionality
    const urlDisplay = document.getElementById('url-display');
    urlDisplay.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            QRCodeUtils.copyToClipboard(url);
        }
    });
    urlDisplay.style.cursor = 'pointer';
    urlDisplay.title = 'Click to copy URL';
}

// Service Worker registration for offline functionality (only for HTTP/HTTPS)
if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
