export function openPopup(markup) {
  const popup = document.createElement('div');
  popup.className = 's3d2-popup-overlay';
  popup.innerHTML = markup;

  document.body.appendChild(popup);

  popup.addEventListener('click', e => {
    if (
      e.target.classList.contains('s3d2-popup-overlay') ||
      e.target.closest('[data-popup-close]')
    ) {
      popup.remove();
    }
  });
}