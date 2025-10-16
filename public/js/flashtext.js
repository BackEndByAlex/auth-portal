setTimeout(() => {
  const flash = document.querySelector('#flash-message')
  if (flash) {
    flash.style.transition = 'opacity 0.5s ease'
    flash.style.opacity = '0'
    setTimeout(() => flash.remove(), 500)
  }
}, 8000)