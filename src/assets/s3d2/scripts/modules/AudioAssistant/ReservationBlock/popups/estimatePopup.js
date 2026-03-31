export function estimatePopup(i18n, flat) {
  const t = key => i18n?.t?.(key) || key;

  return `
    <div class="s3d2-popup help-popup">
        <button data-popup-close class="popup-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17.707 8L13.207 12.5L17.707 17L17 17.707L12.5 13.207L8 17.707L7.29297 17L11.793 12.5L7.29297 8L8 7.29297L12.5 11.793L17 7.29297L17.707 8Z" fill="#1A1E21"/>
</svg>
</button>

        <h2 class="reservation-title">${t('What is Estimated annual income?')}</h2>
        <p class="reservation-text"> ${t('Estimated annual income is an approximate calculation of the potential rental income an apartment may generate over one year. This figure is provided as a reference to help you understand possible returns based on current market data.')} </p> 
        <p class="reservation-text"> ${t('Actual income may vary depending on factors such as rental demand, market conditions, seasonality, apartment type, and individual management decisions. This estimate is not a guarantee of future performance but an illustrative example to support comparison and planning.')} </p> 
        <p class="reservation-text"> ${t('The estimate is calculated using average rental rates for similar apartments, expected occupancy levels, and typical operating assumptions.')} <span class="reservation-important-span">${t('It reflects gross income before taxes, maintenance costs, management fees, or other expenses.')} </span> </p> 
        <p class="reservation-text"> ${t('The purpose of this figure is to give you a clearer picture of how a unit may perform as an income-generating asset under normal market conditions.')}</p>
        <button data-action="reserve-unit" class="btn-primary">
            ${t('Reserve Unit')}
        </button>
    </div>
  `;
}
