const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('originalImage');
const invertedImage = document.getElementById('invertedImage');
const dropZone = document.getElementById('dropZone');
let imageName = '';
let currentEffect = "invert";
let effectFileNameChange = "inverted";
let lastEvent = null;

imageInput.addEventListener('change', handleFile);

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        
        imageInput.files = dataTransfer.files;
        
        // Pass the correct event object to handleFile
        handleFile({ target: { files: dataTransfer.files } });
    }
});

function handleFile(e) {
    if ((!e.target.files || !e.target.files[0])) {
        console.log('Selection was canceled');
        originalImage.classList.add('invisible');
        invertedImage.classList.add('invisible');
        invertedImage.classList.remove("cursorIcon")
        updateCursorLists()
        return;
    }
    if (!e.target.files[0].type.startsWith('image/')) {
        imageInput.style.color = "var(--red-error)"
        imageInput.style.borderColor = "var(--red-error)"
    }
    else {
        imageInput.style.color = "var(--green-color)"
        imageInput.style.borderColor = "var(--green-color)"
    }
    lastEvent = e;
    invertedImage.classList.add('invisible');
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                imageName = file.name;
                originalImage.classList.remove('invisible');
                // Calculate optimal layout
                const viewport = {
                    width: window.innerWidth * 0.9,  // 90% of viewport width
                    height: window.innerHeight * 0.7 // 70% of viewport height
                };
                
                const horizontalSpace = {
                    width: viewport.width / 2,  // Split width for side-by-side
                    height: viewport.height     // Full height available
                };
                
                const verticalSpace = {
                    width: viewport.width,      // Full width available
                    height: viewport.height / 2 // Split height for stacking
                };
                
                // Calculate scale ratios for both layouts
                const horizontalScale = Math.min(
                    horizontalSpace.width / img.width,
                    horizontalSpace.height / img.height
                );
                
                const verticalScale = Math.min(
                    verticalSpace.width / img.width,
                    verticalSpace.height / img.height
                );
                
                // Choose layout based on which gives larger image
                const imageContainer = document.getElementById('imageContainer');
                if (verticalScale > horizontalScale) {
                    imageContainer.style.flexDirection = 'column';
                    originalImage.style.maxWidth = '90vw';
                    originalImage.style.maxHeight = 'calc(45vh - 70px)';
                    invertedImage.style.maxWidth = '90vw'; 
                    invertedImage.style.maxHeight = 'calc(45vh - 70px)';
                } else {
                    imageContainer.style.flexDirection = 'row';
                    originalImage.style.maxWidth = '45vw';
                    originalImage.style.maxHeight = 'calc(90vh - 150px)';
                    invertedImage.style.maxWidth = '45vw';
                    invertedImage.style.maxHeight = 'calc(90vh - 150px)';
                }
                originalImage.src = event.target.result;
                if (currentEffect == "invert") {
                    invertImage(event.target.result);
                }
                else if (currentEffect == "decolor") {
                    noColorImage(event.target.result)
                }
                setTimeout(() => {
                    invertedImage.classList.remove('invisible');
                    invertedImage.classList.add("cursorIcon")
                    updateCursorLists()
                }, 50);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function noColorImage(src) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Invert brightness while preserving colors
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            let pixelvalue;
            
            const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;


            if (grayscale/255 > Math.random()) {
                pixelvalue = 255
            }
            else {
                pixelvalue = 0
            }
                
            // Set RGB values to grayscale
            data[i] = pixelvalue;     // Red
            data[i + 1] = pixelvalue; // Green
            data[i + 2] = pixelvalue; // Blue
        }
        
        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Update inverted image
        invertedImage.src = canvas.toDataURL();
    };
    
    img.src = src;
}

function invertImage(src) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Invert brightness while preserving colors
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Convert to HSL
            const [h, s, l] = rgbToHsl(r, g, b);
            
            // Invert lightness
            const newL = 1 - l;
            
            // Convert back to RGB
            const [newR, newG, newB] = hslToRgb(h, s, newL);
            
            data[i] = newR;
            data[i + 1] = newG;
            data[i + 2] = newB;
        }
        
        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Update inverted image
        invertedImage.src = canvas.toDataURL();
    };
    
    img.src = src;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function downloadInvertedImage() {
    const a = document.createElement('a');
    a.href = invertedImage.src;
    let fileType = (imageName.split('.').pop() == "svg") ? "png" : imageName.split('.').pop()
    a.download = imageName.split('.').slice(0, -1).join('.') + '-' + effectFileNameChange + '.' + fileType;
    a.click();
}

function changeEffect(newEffect) {
    Array.from(document.getElementById("effects").children).forEach(child => {
        child.classList.remove("activeEffect")
    });
    currentEffect = newEffect
    if (currentEffect == "invert") {
        effectFileNameChange = "inverted"
        document.getElementById("effects").children[0].classList.add("activeEffect")

    }
    else if (currentEffect == "decolor") {
        effectFileNameChange = "decolored"
        document.getElementById("effects").children[1].classList.add("activeEffect")
    }
    if (lastEvent != null) {
        handleFile(lastEvent)
    }
}