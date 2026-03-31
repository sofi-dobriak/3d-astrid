export function helpPopup(i18n, flat) {
  const t = key => i18n?.t?.(key) || key;

  return `
    <div class="s3d2-popup  help-popup">
        <button data-popup-close class="popup-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17.707 8L13.207 12.5L17.707 17L17 17.707L12.5 13.207L8 17.707L7.29297 17L11.793 12.5L7.29297 8L8 7.29297L12.5 11.793L17 7.29297L17.707 8Z" fill="#1A1E21"/>
</svg>
</button>

        <h2 class="reservation-title">${t('What is Reserve Unit?')}</h2>
        <p class="reservation-strong"> ${t('Reserving a unit temporarily secures it for you or for the person whose details you provide.')} </p> 
        <ul class="help-list"> 
            <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.0405 3.29297C13.6501 2.90259 13.017 2.90264 12.6265 3.29297L5.99951 9.91895L3.37354 7.29297C2.983 6.90253 2.34997 6.90247 1.95947 7.29297C1.56905 7.68347 1.56906 8.31653 1.95947 8.70703L5.29248 12.04C5.68298 12.4305 6.31601 12.4305 6.70654 12.04L14.0405 4.70703C14.4308 4.31655 14.4308 3.68345 14.0405 3.29297Z" fill="#83AF8D"/>
                    </svg> 
                <span>${t('The unit is removed from public availability')}</span>
            </li>
            <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.0405 3.29297C13.6501 2.90259 13.017 2.90264 12.6265 3.29297L5.99951 9.91895L3.37354 7.29297C2.983 6.90253 2.34997 6.90247 1.95947 7.29297C1.56905 7.68347 1.56906 8.31653 1.95947 8.70703L5.29248 12.04C5.68298 12.4305 6.31601 12.4305 6.70654 12.04L14.0405 4.70703C14.4308 4.31655 14.4308 3.68345 14.0405 3.29297Z" fill="#83AF8D"/>
                    </svg> 
                <span>${t('The price is fixed for the reservation period')}</span>
            </li>
            <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.0405 3.29297C13.6501 2.90259 13.017 2.90264 12.6265 3.29297L5.99951 9.91895L3.37354 7.29297C2.983 6.90253 2.34997 6.90247 1.95947 7.29297C1.56905 7.68347 1.56906 8.31653 1.95947 8.70703L5.29248 12.04C5.68298 12.4305 6.31601 12.4305 6.70654 12.04L14.0405 4.70703C14.4308 4.31655 14.4308 3.68345 14.0405 3.29297Z" fill="#83AF8D"/>
                    </svg> 
                <span>${t('The reservation is backed by a signed agreement')}</span>
            </li>
            </ul>
        <p class="reservation-text"> ${t("This is not a final purchase. The reservation amount is held securely and applied to the purchase if you proceed.")}</p>
        <button data-action="reserve-unit" class="btn-primary">
            ${t('Reserve Unit')}
        </button>
    </div>
  `;
}
