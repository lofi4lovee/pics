const templates = [
    { id: 1, name: 'Template 1', image: 'template1.jpg' },
    { id: 2, name: 'Template 2', image: 'template2.jpg' },
    { id: 3, name: 'Template 3', image: 'template3.jpg' },
    { id: 4, name: 'Template 4', image: 'template4.jpg' },
    { id: 5, name: 'Template 5' },
];

let currentTemplateId = 1;
let currentSize = { width: 1080, height: 1920 };
let currentFont = "'Noto Sans Devanagari', sans-serif";

const hindiFonts = [
    { name: 'Noto Sans Devanagari', css: "'Noto Sans Devanagari', sans-serif", sample: 'नमस्ते भारत' },
    { name: 'Mukta', css: "'Mukta', sans-serif", sample: 'नमस्ते भारत' },
    { name: 'Poppins', css: "'Poppins', sans-serif", sample: 'नमस्ते भारत' },
    { name: 'Yatra One', css: "'Yatra One', cursive", sample: 'नमस्ते भारत' },
    { name: 'Kalam', css: "'Kalam', cursive", sample: 'नमस्ते भारत' },
    { name: 'Rozha One', css: "'Rozha One', serif", sample: 'नमस्ते भारत' },
    { name: 'Khand', css: "'Khand', sans-serif", sample: 'नमस्ते भारत' },
    { name: 'Teko', css: "'Teko', sans-serif", sample: 'नमस्ते भारत' },
    { name: 'Rajdhani', css: "'Rajdhani', sans-serif", sample: 'नमस्ते भारत' },
    { name: 'Hind', css: "'Hind', sans-serif", sample: 'नमस्ते भारत' }
];

const englishFonts = [
    { name: 'Roboto', css: "'Roboto', sans-serif", sample: 'Hello World' },
    { name: 'Open Sans', css: "'Open Sans', sans-serif", sample: 'Hello World' },
    { name: 'Montserrat', css: "'Montserrat', sans-serif", sample: 'Hello World' },
    { name: 'Lato', css: "'Lato', sans-serif", sample: 'Hello World' },
    { name: 'Oswald', css: "'Oswald', sans-serif", sample: 'Hello World' },
    { name: 'Playfair Display', css: "'Playfair Display', serif", sample: 'Hello World' },
    { name: 'Merriweather', css: "'Merriweather', serif", sample: 'Hello World' },
    { name: 'Nunito', css: "'Nunito', sans-serif", sample: 'Hello World' },
    { name: 'Raleway', css: "'Raleway', sans-serif", sample: 'Hello World' },
    { name: 'Ubuntu', css: "'Ubuntu', sans-serif", sample: 'Hello World' }
];

document.addEventListener('DOMContentLoaded', () => {
    initTemplates();
    initSizeSelector();
    initDownloadBtn();
    initFontModal();
    
    // Initial render
    renderPreview();
    updateScale();
    
    // Handle window resize for scaling preview
    window.addEventListener('resize', updateScale);
});

function initTemplates() {
    const grid = document.getElementById('template-grid');
    grid.innerHTML = '';
    
    templates.forEach(t => {
        const isSelected = t.id === currentTemplateId;
        const card = document.createElement('div');
        card.className = `relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all duration-200 ${isSelected ? 'border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'border-gray-200 hover:border-gray-300'}`;
        card.onclick = () => selectTemplate(t.id);
        
        card.innerHTML = `
            <div class="h-20 bg-gray-50 flex items-center justify-center p-2 text-center">
                <span class="font-medium text-gray-700">${t.name}</span>
            </div>
            ${isSelected ? `
                <div class="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            ` : ''}
        `;
        grid.appendChild(card);
    });
}

function selectTemplate(id) {
    currentTemplateId = id;
    initTemplates(); // Re-render grid to update checkmarks
    renderPreview();
}

function initSizeSelector() {
    const radios = document.querySelectorAll('input[name="size"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const [w, h] = e.target.value.split('x').map(Number);
            currentSize = { width: w, height: h };
            renderPreview();
            updateScale();
        });
    });
}

function renderPreview() {
    const wrapper = document.getElementById('preview-wrapper');
    const renderTarget = document.getElementById('render-target');
    const template = templates.find(t => t.id === currentTemplateId);
    
    wrapper.style.width = `${currentSize.width}px`;
    wrapper.style.height = `${currentSize.height}px`;
    
    if (currentTemplateId === 1) {
        // Template 1 Design (Solid top, faded image bottom)
        renderTarget.innerHTML = `
            <div id="t1-bg" class="w-full h-full relative overflow-hidden flex flex-col justify-between items-center" 
                 style="background-color: #fcf4e8;">
                
                <!-- Text Container -->
                <div class="w-[90%] mt-[25%] z-10 text-center text-black relative">
                    <h1 id="preview-text" class="text-[60px] font-black leading-[1.4] whitespace-pre-wrap font-['Noto_Sans_Devanagari']">सरकारी स्कूलों में 86 लाख छात्र घटे<br>प्राइवेट स्कूलों में 86 लाख से ज्यादा बढ़े</h1>
                </div>
                
                <!-- Image Container with Top Fade -->
                <div class="absolute bottom-0 w-full h-[65%] flex justify-center items-end">
                    <div class="w-full h-full relative">
                        <!-- Fade overlay matching bg color to blend image -->
                        <div id="t1-fade" class="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#fcf4e8] to-transparent z-10"></div>
                        <div id="preview-image" style="background-image: url('https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); background-size: cover; background-position: top center; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%); mask-image: linear-gradient(to bottom, transparent 0%, black 20%);" class="w-full h-full"></div>
                    </div>
                </div>
            </div>
        `;
    } else if (currentTemplateId === 2) {
        // Template 2 Design (Heavy Text, Pill Badge, Top Shadow)
        renderTarget.innerHTML = `
            <div class="w-full h-full relative overflow-hidden flex flex-col items-center">
                <!-- Full background image -->
                <div id="preview-image" style="background-image: url('https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); background-size: cover; background-position: center;" class="absolute inset-0 z-0"></div>
                
                <!-- Top Gradient Shadow overlay -->
                <div id="t3-fade" class="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-black to-transparent z-10" style="opacity: 0.7;"></div>
                
                <!-- Text Container -->
                <div id="preview-text-container" class="w-[95%] mt-[15%] z-20 text-center flex flex-col items-center relative" style="margin-top: 250px;">
                    <div id="preview-text" class="flex flex-col items-start leading-[0.85] font-['Noto_Sans_Devanagari'] drop-shadow-2xl font-bold" style="font-weight: 900 !important;">
                        <!-- Line 1 -->
                        <h1 id="t3-line1" class="text-[170px] mb-1" style="color: #ffcd94; text-shadow: -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, 2px 0 0 #000, 2px 2px 0 #000, 0 2px 0 #000, -2px 2px 0 #000, -2px 0 0 #000, 6px 6px 0 #000, 0px 10px 20px rgba(0,0,0,0.9); z-index: 2; transform: scaleY(1.05); font-weight: 900 !important;">तुलसी</h1>
                        
                        <!-- Line 2 -->
                        <h1 id="t3-line2" class="text-[180px] mb-1 ml-[40%]" style="color: #ffffff; text-shadow: -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, 2px 0 0 #000, 2px 2px 0 #000, 0 2px 0 #000, -2px 2px 0 #000, -2px 0 0 #000, 6px 6px 0 #000, 0px 10px 20px rgba(0,0,0,0.9); z-index: 1; transform: scaleY(1.05); font-weight: 900 !important;">माला</h1>
                        
                        <!-- Third Line (Direct Text instead of Badge) -->
                        <div id="t3-pill-bg" class="mt-4 ml-[40%] self-start whitespace-nowrap" style="z-index: 10;">
                            <h2 id="t3-pill-text" class="text-[40px] leading-none whitespace-nowrap" style="color: #ff3333; text-shadow: -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000, 3px 3px 6px rgba(0,0,0,0.8); font-weight: 900 !important;">पहनने पर छात्रा को TC</h2>
                        </div>
                    </div>
                </div>
            </div> 
        `;
    } else if (currentTemplateId === 3) {
        // Template 3 Design (Two lines, line 2 has two parts)
        renderTarget.innerHTML = `
            <div class="w-full h-full relative overflow-hidden flex flex-col items-center">
                <!-- Full background image -->
                <div id="preview-image" style="background-image: url('https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); background-size: cover; background-position: center;" class="absolute inset-0 z-0"></div>
                
                <!-- Top Gradient Shadow overlay -->
                <div id="tpl3-fade" class="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-black to-transparent z-10" style="opacity: 0.7;"></div>
                
                <!-- Text Container -->
                <div id="preview-text-container" class="w-[95%] mt-[15%] z-20 text-center flex flex-col items-center relative" style="margin-top: 250px;">
                    <div id="preview-text" class="flex flex-col items-center font-['Noto_Sans_Devanagari'] drop-shadow-2xl font-bold" style="font-weight: 900 !important; line-height: 0.85;">
                        <!-- Line 1 -->
                        <h1 id="tpl3-line1" class="text-[190px] m-0" style="color: #fffae6; text-shadow: -4px -4px 0 #000, 0 -4px 0 #000, 4px -4px 0 #000, 4px 0 0 #000, 4px 4px 0 #000, 0 4px 0 #000, -4px 4px 0 #000, -4px 0 0 #000, 10px 10px 0 #000, 0px 15px 20px rgba(0,0,0,0.9); z-index: 2; transform: scaleY(1.05); font-weight: 900 !important;">बारिश</h1>
                        
                        <!-- Line 2 Container -->
                        <div class="flex flex-row items-baseline justify-center -mt-6" style="z-index: 1;">
                            <h1 id="tpl3-line2-p1" class="text-[130px] m-0 mr-2" style="color: #ffffff; text-shadow: -3px -3px 0 #000, 0 -3px 0 #000, 3px -3px 0 #000, 3px 0 0 #000, 3px 3px 0 #000, 0 3px 0 #000, -3px 3px 0 #000, -3px 0 0 #000, 8px 8px 0 #000, 0px 10px 20px rgba(0,0,0,0.9); transform: scaleY(1.05); font-weight: 900 !important;">का</h1>
                            <h1 id="tpl3-line2-p2" class="text-[190px] m-0" style="color: #cc0000; text-shadow: -8px -8px 0 #660000, 0 -8px 0 #660000, 8px -8px 0 #660000, 8px 0 0 #660000, 8px 8px 0 #660000, 0 8px 0 #660000, -8px 8px 0 #660000, -8px 0 0 #660000, 12px 12px 0 #000, 0px 15px 20px rgba(0,0,0,0.9); transform: scaleY(1.05); font-weight: 900 !important;">कहर</h1>
                        </div>
                    </div>
                </div>
            </div> 
        `;
    } else if (currentTemplateId === 4) {
        // Template 4 Design (Image top, white box bottom, two lines of text, no red dashed line)
        renderTarget.innerHTML = `
            <div class="w-full h-full relative overflow-hidden flex flex-col bg-white">
                <!-- Image Section (Top ~75%) -->
                <div class="relative w-full" style="height: 75%;">
                    <div id="preview-image" style="background-image: url('https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); background-size: cover; background-position: center;" class="absolute inset-0"></div>
                </div>
                
                <!-- Text Container (Bottom ~25%) -->
                <div id="preview-text-container" class="w-full flex-grow bg-white flex flex-col justify-center items-center z-20" style="padding-top: 1rem; padding-bottom: 1rem;">
                    <div id="preview-text" class="flex flex-col items-center font-['Noto_Sans_Devanagari'] font-bold text-center leading-tight">
                        <!-- Line 1 -->
                        <h1 id="tpl4-line1" class="text-[44px] m-0" style="color: #000000; font-weight: 900 !important;">प्रयागराज की 7 वर्षीय समृद्धि ने</h1>
                        <!-- Line 2 -->
                        <h1 id="tpl4-line2" class="text-[52px] m-0 mt-2" style="color: #cc0000; font-weight: 900 !important;">17 मिनट में पार की यमुना;</h1>
                    </div>
                </div>
            </div> 
        `;
    } else if (currentTemplateId === 5) {
        // Template 5 Design (Solid Black Background, Text 1, Text 2, Thick Line)
        renderTarget.innerHTML = `
            <div id="tpl5-bg" class="w-full h-full relative overflow-hidden flex flex-col justify-center items-center" style="background-color: #000000;">
                <div id="preview-text-container" class="w-[95%] z-20 flex flex-row justify-center items-center relative">
                    <!-- Thick Vertical Line -->
                    <div id="tpl5-line" class="mr-8" style="width: 16px; height: 220px; background-color: #ff0000; border-radius: 8px;"></div>
                    
                    <!-- Text Block -->
                    <div id="preview-text" class="flex flex-col items-start font-['Noto_Sans_Devanagari'] font-bold text-left leading-tight">
                        <!-- Line 1 -->
                        <h1 id="tpl5-line1" class="text-[90px] m-0" style="color: #ffffff; font-weight: 900 !important;">Headline Text 1</h1>
                        <!-- Line 2 -->
                        <h1 id="tpl5-line2" class="text-[90px] m-0 mt-2" style="color: #ff0000; font-weight: 900 !important;">Headline Text 2</h1>
                    </div>
                </div>
            </div> 
        `;
    } else {
        // Fallback for other templates before they are built
        renderTarget.innerHTML = `
            <div class="w-full h-full absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p class="text-4xl font-bold text-gray-500">Template ${currentTemplateId} Not Yet Built</p>
            </div>
        `;
    }
    
    renderDynamicInputs();
    enableTextDrag();
}

function enableTextDrag() {
    const textEl = document.getElementById('preview-text');
    if (!textEl) return;
    
    // Target the parent container which is being manipulated by marginTop and marginLeft
    const container = textEl.parentElement;
    container.style.cursor = 'move'; // Indicate omnidirectional draggability
    container.style.userSelect = 'none'; // Prevent text selection while dragging
    
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startMarginTop = 0;
    let startMarginLeft = 0;

    const onPointerDown = (e) => {
        isDragging = true;
        // Support both mouse and touch
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        // Get current computed margins in pixels
        const style = window.getComputedStyle(container);
        startMarginTop = parseFloat(style.marginTop) || 0;
        startMarginLeft = parseFloat(style.marginLeft) || 0;
        
        e.preventDefault(); 
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        
        const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        // The preview wrapper is scaled via CSS transform. 
        // We need to account for this scale so the drag matches 1:1 with the mouse movement.
        const wrapper = document.getElementById('preview-wrapper');
        const transformMatch = wrapper.style.transform.match(/scale\(([^)]+)\)/);
        const scale = transformMatch ? parseFloat(transformMatch[1]) : 1;
        
        // Calculate new margins based on scaled mouse movement
        const newMarginTop = startMarginTop + (deltaY / scale);
        const newMarginLeft = startMarginLeft + (deltaX / scale);
        
        container.style.marginTop = `${newMarginTop}px`;
        container.style.marginLeft = `${newMarginLeft}px`;
    };

    const onPointerUp = () => {
        isDragging = false;
    };

    // Attach listeners
    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('touchstart', onPointerDown, { passive: false });
    
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
}

function renderDynamicInputs() {
    const container = document.getElementById('dynamic-fields');
    
    if (currentTemplateId === 2) {
        container.innerHTML = `
            <div class="mt-4 flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700">Enable Black Shadow</label>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="input-toggle-fade-t3" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Shadow Position</label>
                <select id="input-fade-pos-t3" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white text-gray-700">
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </select>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Shadow Opacity</label>
                <input type="range" id="input-fade-opacity-t3" min="0" max="100" value="70" class="custom-slider">
            </div>
            
            <hr class="my-6 border-gray-200">
            
            <!-- Text Line 1 -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 1</label>
                <input type="text" id="input-t3-l1-text" value="तुलसी" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 1 Color</label>
                <label for="input-t3-l1-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-t3-l1-color" value="#ffcd94" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Text Line 2 -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 2</label>
                <input type="text" id="input-t3-l2-text" value="माला" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 Color</label>
                <label for="input-t3-l2-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-t3-l2-color" value="#ffffff" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Pill Badge -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                <input type="text" id="input-t3-pill-text" value="पहनने पर छात्रा को TC" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 3 Color</label>
                <label for="input-t3-pill-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-t3-pill-color" value="#ff3333" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <hr class="my-6 border-gray-200">
            
            <!-- Global Font and Adjustments -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                <button id="btn-open-font-modal" class="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg shadow-sm transition-colors text-left flex justify-between items-center">
                    <span id="current-font-name">Noto Sans Devanagari</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                    <input type="range" id="input-text-size-t3" min="0.5" max="2" step="0.05" value="1" class="custom-slider">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Up/Down</label>
                    <input type="range" id="input-text-pos-t3" min="10" max="600" value="250" class="custom-slider">
                </div>
            </div>
            
            <hr class="my-6 border-gray-200">

            <!-- Background Image -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" id="input-img-url-t3" value="https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white" placeholder="https://...">
            </div>
            <div class="relative mt-4">
                <div class="absolute inset-0 flex items-center" aria-hidden="true"><div class="w-full border-t border-gray-300"></div></div>
                <div class="relative flex justify-center"><span class="bg-white px-2 text-sm text-gray-500">OR</span></div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input type="file" id="input-img-file-t3" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-2 bg-white">
            </div>
        `;
        
        // Template 3 Event Listeners
        document.getElementById('input-toggle-fade-t3').addEventListener('change', (e) => {
            document.getElementById('t3-fade').style.display = e.target.checked ? 'block' : 'none';
        });
        document.getElementById('input-fade-pos-t3').addEventListener('change', (e) => {
            const fade = document.getElementById('t3-fade');
            if (e.target.value === 'top') {
                fade.className = 'absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-black to-transparent z-10';
            } else {
                fade.className = 'absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black to-transparent z-10';
            }
        });
        document.getElementById('input-fade-opacity-t3').addEventListener('input', (e) => {
            document.getElementById('t3-fade').style.opacity = e.target.value / 100;
        });

        document.getElementById('input-t3-l1-text').addEventListener('input', (e) => {
            document.getElementById('t3-line1').textContent = e.target.value;
        });
        document.getElementById('input-t3-l1-color').addEventListener('input', (e) => {
            document.getElementById('t3-line1').style.color = e.target.value;
        });

        document.getElementById('input-t3-l2-text').addEventListener('input', (e) => {
            document.getElementById('t3-line2').textContent = e.target.value;
        });
        document.getElementById('input-t3-l2-color').addEventListener('input', (e) => {
            document.getElementById('t3-line2').style.color = e.target.value;
        });

        document.getElementById('input-t3-pill-text').addEventListener('input', (e) => {
            document.getElementById('t3-pill-text').textContent = e.target.value;
        });
        document.getElementById('input-t3-pill-color').addEventListener('input', (e) => {
            document.getElementById('t3-pill-text').style.color = e.target.value;
        });

        document.getElementById('input-text-size-t3').addEventListener('input', (e) => {
            document.getElementById('preview-text').style.transform = `scale(${e.target.value})`;
        });
        document.getElementById('input-text-pos-t3').addEventListener('input', (e) => {
            document.getElementById('preview-text-container').style.marginTop = `${e.target.value}px`;
        });

        document.getElementById('input-img-url-t3').addEventListener('input', (e) => {
            if(e.target.value) {
                document.getElementById('preview-image').style.backgroundImage = `url('${e.target.value}')`;
            }
        });
        document.getElementById('input-img-file-t3').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('preview-image').style.backgroundImage = `url('${ev.target.result}')`;
                    document.getElementById('input-img-url-t3').value = ''; 
                };
                reader.readAsDataURL(file);
            }
        });
        
    } else if (currentTemplateId === 3) {
        container.innerHTML = `
            <div class="mt-4 flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700">Enable Black Shadow</label>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="input-toggle-fade-tpl3" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Shadow Position</label>
                <select id="input-fade-pos-tpl3" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white text-gray-700">
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </select>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Shadow Opacity</label>
                <input type="range" id="input-fade-opacity-tpl3" min="0" max="100" value="70" class="custom-slider">
            </div>
            
            <hr class="my-6 border-gray-200">
            
            <!-- Text Line 1 -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 1</label>
                <input type="text" id="input-tpl3-l1-text" value="बारिश" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 1 Color</label>
                <label for="input-tpl3-l1-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl3-l1-color" value="#fffae6" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Text Line 2 Part 1 -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 (Left Part)</label>
                <input type="text" id="input-tpl3-l2p1-text" value="का" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 (Left) Color</label>
                <label for="input-tpl3-l2p1-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl3-l2p1-color" value="#ffffff" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Text Line 2 Part 2 -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 (Right Part)</label>
                <input type="text" id="input-tpl3-l2p2-text" value="कहर" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 (Right) Color</label>
                <label for="input-tpl3-l2p2-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl3-l2p2-color" value="#cc0000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <hr class="my-6 border-gray-200">
            
            <!-- Global Font and Adjustments -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                <button id="btn-open-font-modal" class="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg shadow-sm transition-colors text-left flex justify-between items-center">
                    <span id="current-font-name">Noto Sans Devanagari</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                    <input type="range" id="input-text-size-tpl3" min="0.5" max="2" step="0.05" value="1" class="custom-slider">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Up/Down</label>
                    <input type="range" id="input-text-pos-tpl3" min="10" max="600" value="250" class="custom-slider">
                </div>
            </div>
            
            <hr class="my-6 border-gray-200">

            <!-- Background Image -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" id="input-img-url-tpl3" value="https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white" placeholder="https://...">
            </div>
            <div class="relative mt-4">
                <div class="absolute inset-0 flex items-center" aria-hidden="true"><div class="w-full border-t border-gray-300"></div></div>
                <div class="relative flex justify-center"><span class="bg-white px-2 text-sm text-gray-500">OR</span></div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input type="file" id="input-img-file-tpl3" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-2 bg-white">
            </div>
        `;
        
        // Template 3 Event Listeners
        document.getElementById('input-toggle-fade-tpl3').addEventListener('change', (e) => {
            document.getElementById('tpl3-fade').style.display = e.target.checked ? 'block' : 'none';
        });
        document.getElementById('input-fade-pos-tpl3').addEventListener('change', (e) => {
            const fade = document.getElementById('tpl3-fade');
            if (e.target.value === 'top') {
                fade.className = 'absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-black to-transparent z-10';
            } else {
                fade.className = 'absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black to-transparent z-10';
            }
        });
        document.getElementById('input-fade-opacity-tpl3').addEventListener('input', (e) => {
            document.getElementById('tpl3-fade').style.opacity = e.target.value / 100;
        });

        document.getElementById('input-tpl3-l1-text').addEventListener('input', (e) => {
            document.getElementById('tpl3-line1').textContent = e.target.value;
        });
        document.getElementById('input-tpl3-l1-color').addEventListener('input', (e) => {
            document.getElementById('tpl3-line1').style.color = e.target.value;
        });

        document.getElementById('input-tpl3-l2p1-text').addEventListener('input', (e) => {
            document.getElementById('tpl3-line2-p1').textContent = e.target.value;
        });
        document.getElementById('input-tpl3-l2p1-color').addEventListener('input', (e) => {
            document.getElementById('tpl3-line2-p1').style.color = e.target.value;
        });

        document.getElementById('input-tpl3-l2p2-text').addEventListener('input', (e) => {
            document.getElementById('tpl3-line2-p2').textContent = e.target.value;
        });
        document.getElementById('input-tpl3-l2p2-color').addEventListener('input', (e) => {
            document.getElementById('tpl3-line2-p2').style.color = e.target.value;
        });

        document.getElementById('input-text-size-tpl3').addEventListener('input', (e) => {
            document.getElementById('preview-text').style.transform = `scale(${e.target.value})`;
        });
        document.getElementById('input-text-pos-tpl3').addEventListener('input', (e) => {
            document.getElementById('preview-text-container').style.marginTop = `${e.target.value}px`;
        });

        document.getElementById('input-img-url-tpl3').addEventListener('input', (e) => {
            if(e.target.value) {
                document.getElementById('preview-image').style.backgroundImage = `url('${e.target.value}')`;
            }
        });
        document.getElementById('input-img-file-tpl3').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('preview-image').style.backgroundImage = `url('${ev.target.result}')`;
                    document.getElementById('input-img-url-tpl3').value = ''; 
                };
                reader.readAsDataURL(file);
            }
        });
        
    } else if (currentTemplateId === 4) {
        container.innerHTML = `
            <!-- Text Line 1 -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 1</label>
                <input type="text" id="input-tpl4-l1-text" value="प्रयागराज की 7 वर्षीय समृद्धि ने" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 1 Color</label>
                <label for="input-tpl4-l1-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl4-l1-color" value="#000000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Text Line 2 -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 2</label>
                <input type="text" id="input-tpl4-l2-text" value="17 मिनट में पार की यमुना;" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 Color</label>
                <label for="input-tpl4-l2-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl4-l2-color" value="#cc0000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <hr class="my-6 border-gray-200">
            
            <!-- Global Font and Adjustments -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                <button id="btn-open-font-modal" class="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg shadow-sm transition-colors text-left flex justify-between items-center">
                    <span id="current-font-name">Noto Sans Devanagari</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                <input type="range" id="input-text-size-tpl4" min="0.5" max="2" step="0.05" value="1" class="custom-slider">
            </div>
            
            <hr class="my-6 border-gray-200">

            <!-- Background Image -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" id="input-img-url-tpl4" value="https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white" placeholder="https://...">
            </div>
            <div class="relative mt-4">
                <div class="absolute inset-0 flex items-center" aria-hidden="true"><div class="w-full border-t border-gray-300"></div></div>
                <div class="relative flex justify-center"><span class="bg-white px-2 text-sm text-gray-500">OR</span></div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input type="file" id="input-img-file-tpl4" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-2 bg-white">
            </div>
        `;
        
        // Template 4 Event Listeners
        document.getElementById('input-tpl4-l1-text').addEventListener('input', (e) => {
            document.getElementById('tpl4-line1').textContent = e.target.value;
        });
        document.getElementById('input-tpl4-l1-color').addEventListener('input', (e) => {
            document.getElementById('tpl4-line1').style.color = e.target.value;
        });

        document.getElementById('input-tpl4-l2-text').addEventListener('input', (e) => {
            document.getElementById('tpl4-line2').textContent = e.target.value;
        });
        document.getElementById('input-tpl4-l2-color').addEventListener('input', (e) => {
            document.getElementById('tpl4-line2').style.color = e.target.value;
        });

        document.getElementById('input-text-size-tpl4').addEventListener('input', (e) => {
            document.getElementById('preview-text').style.transform = `scale(${e.target.value})`;
        });

        document.getElementById('input-img-url-tpl4').addEventListener('input', (e) => {
            if(e.target.value) {
                document.getElementById('preview-image').style.backgroundImage = `url('${e.target.value}')`;
            }
        });
        document.getElementById('input-img-file-tpl4').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('preview-image').style.backgroundImage = `url('${ev.target.result}')`;
                    document.getElementById('input-img-url-tpl4').value = ''; 
                };
                reader.readAsDataURL(file);
            }
        });
        
    } else if (currentTemplateId === 5) {
        container.innerHTML = `
            <!-- Background Color -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <label for="input-tpl5-bg-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl5-bg-color" value="#000000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <hr class="my-6 border-gray-200">
            
            <!-- Text Line 1 -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 1</label>
                <input type="text" id="input-tpl5-l1-text" value="Headline Text 1" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 1 Color</label>
                <label for="input-tpl5-l1-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl5-l1-color" value="#ffffff" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Text Line 2 -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Line 2</label>
                <input type="text" id="input-tpl5-l2-text" value="Headline Text 2" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white">
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Line 2 Color</label>
                <label for="input-tpl5-l2-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl5-l2-color" value="#ff0000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <!-- Thick Line -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Thick Line Color</label>
                <label for="input-tpl5-line-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-tpl5-line-color" value="#ff0000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>

            <hr class="my-6 border-gray-200">
            
            <!-- Global Font and Adjustments -->
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                <button id="btn-open-font-modal" class="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg shadow-sm transition-colors text-left flex justify-between items-center">
                    <span id="current-font-name">Noto Sans Devanagari</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                <input type="range" id="input-text-size-tpl5" min="0.5" max="2" step="0.05" value="1" class="custom-slider">
            </div>
        `;
        
        // Template 5 Event Listeners
        document.getElementById('input-tpl5-bg-color').addEventListener('input', (e) => {
            document.getElementById('tpl5-bg').style.backgroundColor = e.target.value;
        });

        document.getElementById('input-tpl5-l1-text').addEventListener('input', (e) => {
            document.getElementById('tpl5-line1').textContent = e.target.value;
        });
        document.getElementById('input-tpl5-l1-color').addEventListener('input', (e) => {
            document.getElementById('tpl5-line1').style.color = e.target.value;
        });

        document.getElementById('input-tpl5-l2-text').addEventListener('input', (e) => {
            document.getElementById('tpl5-line2').textContent = e.target.value;
        });
        document.getElementById('input-tpl5-l2-color').addEventListener('input', (e) => {
            document.getElementById('tpl5-line2').style.color = e.target.value;
        });

        document.getElementById('input-tpl5-line-color').addEventListener('input', (e) => {
            document.getElementById('tpl5-line').style.backgroundColor = e.target.value;
        });

        document.getElementById('input-text-size-tpl5').addEventListener('input', (e) => {
            document.getElementById('preview-text').style.transform = `scale(${e.target.value})`;
        });
        
    } else if (currentTemplateId === 1) {
        container.innerHTML = `
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <label for="input-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-color" value="#fcf4e8" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
                <p class="text-xs text-gray-500 mt-1">Pick a color that matches the top of your image for a seamless fade.</p>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Headline Text</label>
                <textarea id="input-text" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white" rows="3">सरकारी स्कूलों में 86 लाख छात्र घटे\nप्राइवेट स्कूलों में 86 लाख से ज्यादा बढ़े</textarea>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                <label for="input-text-color" class="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer hover:bg-gray-50">
                    <div class="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-inner flex-shrink-0 cursor-pointer">
                        <input type="color" id="input-text-color" value="#000000" class="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0">
                    </div>
                    <span class="text-sm font-medium text-gray-600 uppercase tracking-wide pointer-events-none">Pick Color</span>
                </label>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                <button id="btn-open-font-modal" class="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg shadow-sm transition-colors text-left flex justify-between items-center">
                    <span id="current-font-name">Noto Sans Devanagari</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                    <input type="range" id="input-text-size" min="30" max="120" value="60" class="custom-slider">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Up/Down</label>
                    <input type="range" id="input-text-pos" min="5" max="80" value="25" class="custom-slider">
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Image Height</label>
                <input type="range" id="input-img-height" min="30" max="90" value="65" class="custom-slider">
            </div>
            <div class="mt-4 flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700">Image Top Fade</label>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="input-toggle-fade" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bottom Image URL</label>
                <input type="text" id="input-img-url" value="https://images.pexels.com/photos/8617899/pexels-photo-8617899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border bg-white" placeholder="https://...">
            </div>
            <div class="relative mt-4">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center">
                    <span class="bg-white px-2 text-sm text-gray-500">OR</span>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Upload Bottom Image</label>
                <input type="file" id="input-img-file" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-2 bg-white">
            </div>
        `;

        // Event listeners
        document.getElementById('input-color').addEventListener('input', (e) => {
            const color = e.target.value;
            document.getElementById('t1-bg').style.backgroundColor = color;
            document.getElementById('t1-fade').className = `absolute top-0 left-0 w-full h-48 z-10`; // Reset classes
            document.getElementById('t1-fade').style.background = `linear-gradient(to bottom, ${color} 0%, transparent 100%)`;
        });

        document.getElementById('input-text').addEventListener('input', (e) => {
            document.getElementById('preview-text').innerHTML = e.target.value.replace(/\\n/g, '<br>');
        });

        document.getElementById('input-text-color-t1')?.addEventListener('input', (e) => {
            document.getElementById('preview-text').style.color = e.target.value;
        });
        
        document.getElementById('input-text-color')?.addEventListener('input', (e) => {
            document.getElementById('preview-text').style.color = e.target.value;
        });

        document.getElementById('input-text-size').addEventListener('input', (e) => {
            document.getElementById('preview-text').style.fontSize = `${e.target.value}px`;
        });

        document.getElementById('input-text-pos').addEventListener('input', (e) => {
            document.getElementById('preview-text').parentElement.style.marginTop = `${e.target.value}%`;
        });

        document.getElementById('input-img-height').addEventListener('input', (e) => {
            document.getElementById('preview-image').parentElement.parentElement.style.height = `${e.target.value}%`;
        });

        document.getElementById('input-toggle-fade').addEventListener('change', (e) => {
            const isFaded = e.target.checked;
            const fadeOverlay = document.getElementById('t1-fade');
            const previewImage = document.getElementById('preview-image');
            
            if (isFaded) {
                fadeOverlay.style.display = 'block';
                previewImage.style.webkitMaskImage = 'linear-gradient(to bottom, transparent 0%, black 20%)';
                previewImage.style.maskImage = 'linear-gradient(to bottom, transparent 0%, black 20%)';
            } else {
                fadeOverlay.style.display = 'none';
                previewImage.style.webkitMaskImage = 'none';
                previewImage.style.maskImage = 'none';
            }
        });

        document.getElementById('input-img-url').addEventListener('input', (e) => {
            if(e.target.value) {
                document.getElementById('preview-image').style.backgroundImage = `url('${e.target.value}')`;
            }
        });

        document.getElementById('input-img-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('preview-image').style.backgroundImage = `url('${e.target.result}')`;
                    document.getElementById('input-img-url').value = '';
                };
                reader.readAsDataURL(file);
            }
        });
    } else {
        container.innerHTML = `<p class="text-gray-500 italic text-sm">Inputs for this template are not configured yet.</p>`;
    }
}

function updateScale() {
    const wrapper = document.getElementById('preview-wrapper');
    const container = wrapper.parentElement;
    
    const containerWidth = container.clientWidth - 64; // 32px padding each side
    const containerHeight = container.clientHeight - 64;
    
    const scaleX = containerWidth / currentSize.width;
    const scaleY = containerHeight / currentSize.height;
    
    const scale = Math.min(scaleX, scaleY, 1); // Never scale up above 1, just fit
    wrapper.style.transform = `scale(${scale})`;
}

function initDownloadBtn() {
    document.getElementById('download-btn').addEventListener('click', async () => {
        const wrapper = document.getElementById('preview-wrapper');
        const originalTransform = wrapper.style.transform;
        
        // Reset scale before taking screenshot to ensure full resolution
        wrapper.style.transform = 'scale(1)';
        
        try {
            const canvas = await html2canvas(wrapper, {
                scale: 4, // 4x scale for maximum Ultra HD crispness
                useCORS: true,
                backgroundColor: null, // Transparent/null background to keep design
                logging: false,
                allowTaint: true,
                onclone: (clonedDoc) => {
                    // Fix HTML2Canvas text squishing bug for line 3
                    const line3 = clonedDoc.getElementById('t3-pill-bg');
                    if (line3) {
                        line3.style.marginTop = '60px'; // Push down in canvas only
                    }
                }
            });
            
            const link = document.createElement('a');
            link.download = `template_${currentTemplateId}_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. See console for details.');
        } finally {
            // Restore scale
            wrapper.style.transform = originalTransform;
        }
    });
}

function initFontModal() {
    const modal = document.getElementById('font-modal');
    const closeBtn = document.getElementById('close-font-modal');
    const hindiList = document.getElementById('hindi-font-list');
    const englishList = document.getElementById('english-font-list');
    
    // Close modal logic
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.add('hidden');
    });

    // Populate Fonts
    const createFontCard = (font) => {
        const card = document.createElement('button');
        card.className = "flex flex-col text-left p-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all";
        card.innerHTML = `
            <span class="text-xs text-gray-500 font-sans mb-1">${font.name}</span>
            <span class="text-xl text-gray-900" style="font-family: ${font.css}">${font.sample}</span>
        `;
        card.onclick = () => {
            currentFont = font.css;
            const previewText = document.getElementById('preview-text');
            if(previewText) {
                previewText.style.fontFamily = currentFont;
            }
            const fontNameLabel = document.getElementById('current-font-name');
            if(fontNameLabel) {
                fontNameLabel.textContent = font.name;
            }
            modal.classList.add('hidden');
        };
        return card;
    };

    hindiFonts.forEach(f => hindiList.appendChild(createFontCard(f)));
    englishFonts.forEach(f => englishList.appendChild(createFontCard(f)));
}

// Global hook to attach font modal open button after dynamic inputs render
const originalRenderDynamicInputs = renderDynamicInputs;
renderDynamicInputs = function() {
    originalRenderDynamicInputs();
    
    // Wire up the open modal button
    const openBtn = document.getElementById('btn-open-font-modal');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            document.getElementById('font-modal').classList.remove('hidden');
        });
        
        // Restore label
        const fontObj = [...hindiFonts, ...englishFonts].find(f => f.css === currentFont);
        if(fontObj) {
            document.getElementById('current-font-name').textContent = fontObj.name;
        }
        
        // Restore font to preview text
        const previewText = document.getElementById('preview-text');
        if(previewText && currentFont) {
            previewText.style.fontFamily = currentFont;
        }
    }
};
