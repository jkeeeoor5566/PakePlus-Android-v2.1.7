window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});window.addEventListener("DOMContentLoaded",()=>{
    const t=document.createElement("script");
    t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893";
    t.async=!0;
    document.head.appendChild(t);
    const n=document.createElement("script");
    n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');";
    document.body.appendChild(n);
    
    // 添加所有功能按钮
    setTimeout(createControlButtons, 100);
});

// 链接重定向处理（保持原样）
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ============ 新增的控制按钮功能 ============

// 全局变量
let currentZoomLevel = 1;
let isZoomApplied = false;
let buttonsVisible = false; // 修改：默认设置为false，只显示眼睛按钮

// 创建所有控制按钮 - 右上角横排排列
function createControlButtons() {
    console.log('正在创建控制按钮...');
    
    // 先移除可能存在的旧按钮
    const oldButtons = [
        'control-buttons-container',
        'toggle-buttons-button',
        'refresh-button',
        'forward-button', 
        'back-button',
        'zoom-out-button',
        'zoom-in-button',
        'dark-mode-toggle'
    ];
    
    oldButtons.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
    });
    
    // 创建全局样式
    if (!document.getElementById('control-buttons-style')) {
        const style = document.createElement('style');
        style.id = 'control-buttons-style';
        style.textContent = `
            /* 按钮容器 - 右上角横排排列 */
            #control-buttons-container {
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                display: flex !important;
                flex-direction: row !important;
                gap: 10px !important;
                z-index: 999999 !important;
                align-items: center !important;
                background: rgba(0, 0, 0, 0.6) !important;
                backdrop-filter: blur(10px) !important;
                border-radius: 25px !important;
                padding: 5px !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
                transition: all 0.3s ease !important;
            }
            
            /* 容器折叠状态 - 只显示切换按钮 */
            #control-buttons-container.collapsed {
                padding: 5px !important;
                background: rgba(0, 0, 0, 0.8) !important;
            }
            
            #control-buttons-container.collapsed .control-button:not(#toggle-buttons-button) {
                display: none !important;
            }
            
            #control-buttons-container.collapsed #dark-mode-toggle {
                display: none !important;
            }
            
            /* 所有按钮基础样式 */
            .control-button {
                width: 44px !important;
                height: 44px !important;
                border-radius: 50% !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                color: white !important;
                font-size: 22px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                outline: none !important;
                user-select: none !important;
                z-index: 999999 !important;
                position: relative !important;
            }
            
            /* 切换按钮特殊样式 */
            #toggle-buttons-button {
                background: linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%) !important;
                font-size: 20px !important;
            }
            
            /* 刷新按钮 */
            #refresh-button {
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%) !important;
            }
            
            /* 前进后退按钮 */
            #forward-button, #back-button {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
                font-size: 0 !important;
            }
            
            /* 缩放按钮 */
            #zoom-out-button, #zoom-in-button {
                background: linear-gradient(135deg, #fa709a 0%, #fee140 100%) !important;
                font-size: 26px !important;
            }
            
            /* 关灯按钮 */
            #dark-mode-toggle {
                width: 44px !important;
                height: 44px !important;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                color: white !important;
                font-size: 20px !important;
                cursor: pointer !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
                z-index: 999999 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                outline: none !important;
                user-select: none !important;
                border-radius: 50% !important;
            }
            
            /* 前进后退图标 */
            .back-icon, .forward-icon {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }
            
            /* 通知动画 */
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-20px); }
                15% { opacity: 1; transform: translateY(0); }
                85% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(20px); }
            }
            
            /* 暗黑模式 - 完全保持原样，不修改图片相关样式 */
            body.dark-mode {
                background-color: #121212 !important;
                color: #e0e0e0 !important;
            }
            
            body.dark-mode div:not(#control-buttons-container):not(#dark-mode-toggle) {
                background-color: #1e1e1e !important;
                color: #e0e0e0 !important;
            }
            
            body.dark-mode p,
            body.dark-mode span,
            body.dark-mode h1,
            body.dark-mode h2,
            body.dark-mode h3,
            body.dark-mode h4,
            body.dark-mode h5,
            body.dark-mode h6,
            body.dark-mode li {
                color: #e0e0e0 !important;
            }
            
            body.dark-mode a {
                color: #90caf9 !important;
            }
            
            /* 只添加这个缩放相关的样式，不影响其他功能 */
            .zoomed-page-content {
                transform-origin: top left !important;
                transition: transform 0.2s ease !important;
                position: relative !important;
            }
            
            /* 缩放包装器 */
            #zoom-wrapper {
                position: relative !important;
                transform-origin: top left !important;
                width: 100% !important;
                min-height: 100% !important;
            }
            
            #control-notification {
                position: fixed !important;
                top: 100px !important;
                right: 20px !important;
                z-index: 1000000 !important;
            }
            
            /* 按钮悬停效果 */
            .control-button:hover,
            #dark-mode-toggle:hover {
                transform: scale(1.15) !important;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
                border-color: rgba(255, 255, 255, 0.5) !important;
            }
            
            /* 切换按钮特殊悬停效果 */
            #toggle-buttons-button:hover {
                transform: scale(1.15) rotate(90deg) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'control-buttons-container';
    buttonContainer.classList.add('collapsed'); // 修改：默认添加collapsed类
    
    // 按钮配置 - 现在有7个按钮：1切换 2刷新 3前进 4后退 5缩小 6放大 7关灯
    const buttons = [
        { id: 'toggle-buttons-button', title: '显示按钮', content: createToggleIcon(), onClick: toggleButtonsVisibility },
        { id: 'refresh-button', title: '刷新页面', content: createRefreshIcon(), onClick: refreshPage },
        { id: 'forward-button', title: '前进', content: createForwardIcon(), onClick: goForward },
        { id: 'back-button', title: '后退', content: createBackIcon(), onClick: goBack },
        { id: 'zoom-out-button', title: '缩小', content: '−', onClick: zoomOut },
        { id: 'zoom-in-button', title: '放大', content: '+', onClick: zoomIn },
        { id: 'dark-mode-toggle', title: '关灯/开灯', content: createDarkModeIcon(), onClick: toggleDarkMode }
    ];
    
    // 创建并添加按钮
    buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.id = buttonConfig.id;
        
        if (buttonConfig.id === 'toggle-buttons-button') {
            button.className = 'control-button';
        } else if (buttonConfig.id === 'dark-mode-toggle') {
            button.className = 'dark-mode-toggle';
        } else {
            button.className = 'control-button';
        }
        
        button.title = buttonConfig.title;
        
        if (typeof buttonConfig.content === 'string') {
            button.textContent = buttonConfig.content;
        } else {
            button.appendChild(buttonConfig.content);
        }
        
        // 悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = button.id === 'toggle-buttons-button' ? 'scale(1.15) rotate(45deg)' : 'scale(1.15)';
            button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
        
        button.addEventListener('click', buttonConfig.onClick);
        buttonContainer.appendChild(button);
    });
    
    document.body.appendChild(buttonContainer);
    
    // 恢复设置
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        updateButtonIcon(true);
    }
    
    // 恢复按钮可见性状态
    if (localStorage.getItem('buttons-visible') !== null) {
        buttonsVisible = localStorage.getItem('buttons-visible') === 'true';
        // 延迟一小会儿等按钮创建完成
        setTimeout(() => {
            const buttonContainer = document.getElementById('control-buttons-container');
            const toggleButton = document.getElementById('toggle-buttons-button');
            
            if (buttonContainer && toggleButton) {
                if (!buttonsVisible) {
                    buttonContainer.classList.add('collapsed');
                    updateToggleIcon(false);
                } else {
                    buttonContainer.classList.remove('collapsed');
                    updateToggleIcon(true);
                }
            }
        }, 100);
    } else {
        // 修改：默认状态设置为只显示眼睛按钮
        setTimeout(() => {
            updateToggleIcon(false);
        }, 100);
    }
}

// 创建切换按钮图标 - 眼睛图标
function createToggleIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('viewBox', '0 0 18 18');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // 修改：默认使用闭眼图标（表示当前只显示眼睛按钮）
    path.setAttribute('d', 'M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z');
    svg.appendChild(path);
    return svg;
}

// 创建刷新按钮图标
function createRefreshIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('viewBox', '0 0 18 18');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z');
    svg.appendChild(path);
    return svg;
}

function createForwardIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'forward-icon');
    svg.setAttribute('viewBox', '0 0 18 18');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z');
    svg.appendChild(path);
    return svg;
}

function createBackIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'back-icon');
    svg.setAttribute('viewBox', '0 0 18 18');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z');
    svg.appendChild(path);
    return svg;
}

function createDarkModeIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('viewBox', '0 0 18 18');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z');
    svg.appendChild(path);
    return svg;
}

// ============ 新增的切换按钮功能 ============
function toggleButtonsVisibility(initialLoad = false) {
    const buttonContainer = document.getElementById('control-buttons-container');
    const toggleButton = document.getElementById('toggle-buttons-button');
    
    if (!buttonContainer || !toggleButton) return;
    
    buttonsVisible = !buttonsVisible;
    
    if (buttonsVisible) {
        // 显示所有按钮
        buttonContainer.classList.remove('collapsed');
        updateToggleIcon(true);
        showNotification('显示控制按钮');
    } else {
        // 隐藏其他按钮，只保留切换按钮
        buttonContainer.classList.add('collapsed');
        updateToggleIcon(false);
        showNotification('隐藏控制按钮');
    }
    
    // 保存状态到localStorage（不是初始加载时）
    if (!initialLoad) {
        localStorage.setItem('buttons-visible', buttonsVisible);
    }
}

// 更新切换按钮图标
function updateToggleIcon(visible) {
    const toggleButton = document.getElementById('toggle-buttons-button');
    if (!toggleButton) return;
    
    const svg = toggleButton.querySelector('svg');
    if (!svg) return;
    
    const path = svg.querySelector('path');
    if (!path) return;
    
    if (visible) {
        // 睁开眼睛图标（显示所有按钮的状态）
        path.setAttribute('d', 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z');
        toggleButton.title = '隐藏按钮';
    } else {
        // 闭眼图标（只显示眼睛按钮的状态）
        path.setAttribute('d', 'M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z');
        toggleButton.title = '显示按钮';
    }
}

// 按钮功能实现 - 前进后退刷新保持原样
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        showNotification('已经是第一页了');
    }
}

function goForward() {
    if (window.history.length > 1) {
        window.history.forward();
    } else {
        showNotification('无法前进');
    }
}

function zoomOut() {
    const newZoom = Math.max(0.5, currentZoomLevel - 0.1);
    applyZoom(newZoom);
    showNotification(`缩小至 ${Math.round(newZoom * 100)}%`);
}

function zoomIn() {
    const newZoom = Math.min(2.0, currentZoomLevel + 0.1);
    applyZoom(newZoom);
    showNotification(`放大至 ${Math.round(newZoom * 100)}%`);
}

// 刷新页面功能 - 完全保持原样
function refreshPage() {
    showNotification('刷新页面...');
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

// ============ 修复的缩放函数 ============
function applyZoom(zoomLevel, silent = false) {
    currentZoomLevel = zoomLevel;
    localStorage.setItem('page-zoom', zoomLevel.toString());
    
    // 查找现有的缩放包装器
    const wrapper = document.getElementById('zoom-wrapper');
    
    // 如果缩放级别为1，则移除缩放效果
    if (zoomLevel === 1) {
        if (wrapper) {
            // 将内容移回body
            while (wrapper.firstChild) {
                document.body.insertBefore(wrapper.firstChild, wrapper);
            }
            wrapper.remove();
            isZoomApplied = false;
            document.body.classList.remove('zoomed');
        }
        return;
    }
    
    // 如果没有包装器，创建一个
    let zoomWrapper = wrapper;
    if (!zoomWrapper) {
        zoomWrapper = document.createElement('div');
        zoomWrapper.id = 'zoom-wrapper';
        zoomWrapper.className = 'zoomed-page-content';
        
        // 获取除控制按钮外的所有body子元素
        const bodyChildren = Array.from(document.body.children);
        const elementsToZoom = bodyChildren.filter(child => {
            const childId = child.id || '';
            return ![
                'control-buttons-container', 
                'control-notification',
                'zoom-wrapper'
            ].includes(childId) && !child.classList.contains('control-button') && !child.classList.contains('dark-mode-toggle');
        });
        
        // 将需要缩放的元素移动到包装器中
        elementsToZoom.forEach(element => {
            zoomWrapper.appendChild(element);
        });
        
        // 将包装器添加到body中，放在控制按钮之前
        const buttonsContainer = document.getElementById('control-buttons-container');
        if (buttonsContainer) {
            document.body.insertBefore(zoomWrapper, buttonsContainer);
        } else {
            document.body.appendChild(zoomWrapper);
        }
        
        isZoomApplied = true;
        document.body.classList.add('zoomed');
    }
    
    // 应用缩放
    zoomWrapper.style.transform = `scale(${zoomLevel})`;
    zoomWrapper.style.transformOrigin = 'top left';
    
    // 调整包装器大小以适应缩放
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    zoomWrapper.style.width = `${viewportWidth / zoomLevel}px`;
    zoomWrapper.style.minHeight = `${viewportHeight / zoomLevel}px`;
    zoomWrapper.style.overflow = 'visible';
    
    // 确保控制按钮在顶层
    protectButtonsFromZoom();
    
    if (!silent) {
        console.log('缩放应用完成，当前级别:', currentZoomLevel);
    }
}

// 获取主要内容元素 - 保持原样
function getMainContentElement() {
    const possibleSelectors = [
        'main',
        '#main',
        '.main',
        '#content',
        '.content',
        '#app',
        '#root',
        '#__next'
    ];
    
    for (const selector of possibleSelectors) {
        const element = document.querySelector(selector);
        if (element && element.offsetHeight > 0) {
            return element;
        }
    }
    
    return null;
}

// 保护按钮不被缩放 - 修复版本
function protectButtonsFromZoom() {
    const elements = [
        'control-buttons-container',
        'control-notification'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.transform = 'none';
            element.style.transformOrigin = 'unset';
            element.style.position = 'fixed';
            element.style.zIndex = '999999';
            
            // 确保按钮不在缩放包装器中
            const wrapper = document.getElementById('zoom-wrapper');
            if (wrapper && wrapper.contains(element)) {
                document.body.appendChild(element);
            }
        }
    });
}

// 显示通知 - 调整到右上角
function showNotification(message) {
    const oldNotification = document.getElementById('control-notification');
    if (oldNotification) oldNotification.remove();
    
    const notification = document.createElement('div');
    notification.id = 'control-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000000;
        max-width: 200px;
        text-align: center;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        animation: fadeInOut 2s ease-in-out;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => { if (notification.parentNode) notification.remove(); }, 2000);
}

// 暗黑模式功能 - 完全保持原样，一个字都不改
function toggleDarkMode() {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'false');
        updateButtonIcon(false);
        showNotification('切换到明亮模式');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'true');
        updateButtonIcon(true);
        showNotification('切换到暗黑模式');
    }
}

function updateButtonIcon(isDark) {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (!toggleBtn) return;
    
    const svg = toggleBtn.querySelector('svg');
    const path = svg.querySelector('path');
    
    if (isDark) {
        // 开灯图标
        path.setAttribute('d', 'M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z');
        toggleBtn.title = '开灯';
        toggleBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important';
    } else {
        // 关灯图标
        path.setAttribute('d', 'M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z');
        toggleBtn.title = '关灯';
        toggleBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important';
    }
}