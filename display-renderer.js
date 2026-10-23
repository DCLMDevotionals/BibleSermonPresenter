/* Shared display rendering primitives. Keep Display.html, live preview and thumbnails
   on the same CSS/configuration path. */
(function () {
  'use strict';
  function setScreenConfig(element, config, options) {
    if (!element || !config) return;
    var css = config.enabled === true ? config.fullCss : config.partCss;
    // cssText replacement is intentional: it removes declarations from the
    // previously selected mode before applying the newly selected mode.
    element.style.cssText = '';
    element.style.cssText = css || '';
    if (options && options.static) {
      // Thumbnails are static. Live preview passes static too, then restores
      // its configured transition duration immediately after this call.
      element.style.setProperty('opacity', '1', 'important');
      element.style.setProperty('visibility', 'visible', 'important');
      element.style.setProperty('transition', 'none', 'important');
    }
  }
  function setBackground(element, background, fallbackColor) {
    if (!element) return;
    if (background && background.enabled && background.dataUrl) {
      element.style.cssText = background.css || '';
      element.style.backgroundImage = "url('" + background.dataUrl + "')";
    } else {
      element.style.backgroundImage = 'none';
      element.style.backgroundColor = fallbackColor || '#121218';
      element.style.backgroundBlendMode = '';
      element.style.backgroundSize = '';
      element.style.backgroundPosition = '';
      element.style.backgroundRepeat = '';
    }
  }
  function setSlide(root, slide, config) {
    if (!root || !slide) return;
    var title = root.querySelector('.title');
    var content = root.querySelector('.content');
    if (title) {
      title.innerHTML = typeof slide.title === 'string' ? slide.title : '';
      title.style.textAlign = slide.align || 'center';
    }
    if (content) {
      content.innerHTML = typeof slide.content === 'string' ? slide.content : '';
      content.style.textAlign = slide.align || 'center';
    }
    if (config && config.screenConfig) setScreenConfig(root, config.screenConfig, config.static ? {static:true} : null);
    if (config && config.backgroundTarget) setBackground(config.backgroundTarget, config.background, config.fallbackColor);
  }
  window.BibleSermonDisplayRenderer = {
    setScreenConfig: setScreenConfig,
    setBackground: setBackground,
    setSlide: setSlide
  };
})();