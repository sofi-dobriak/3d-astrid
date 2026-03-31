import c3 from 'c3';

export function priceDynamicsPopup(i18n, flat) {
  const t = key => i18n?.t?.(key) || key;
 const chartId = 'priceDynamicsChart';

  // --- MOCK ДАНІ ДЛЯ LOCALHOST ---
  const isLocalhost = true;
  
  // Якщо ми на локалхості і даних немає, створюємо фейкову історію
  let historyData = flat?.price_history || [];
  
  if (isLocalhost && historyData.length === 0) {
    historyData = [
      { date: "2023-01-15 10:00:00", price_usd: "135000" },
      { date: "2023-04-20 12:30:00", price_usd: "141000" },
      { date: "2023-08-10 09:15:00", price_usd: "139500" },
      { date: "2023-12-05 15:45:00", price_usd: "146786" }
    ];
  }

  // Сортуємо дані за часом
  const sortedHistory = [...historyData].sort((a, b) => new Date(a.date) - new Date(b.date));
  const dates = sortedHistory.map(item => item.date);
  const prices = sortedHistory.map(item => parseFloat(item.price_usd));

  setTimeout(() => {
    c3.generate({
      bindto: `#${chartId}`,
      padding: {
    top: 20,
    right: 40,  // Додаємо відступ справа, щоб остання дата не зникала
    bottom: 10, // Більше місця для дати
    left: 80,   // Більше місця для ціни (особливо якщо там цифри на кшталт $140,000)
  },
      data: {
    x: 'x',
    xFormat: '%Y-%m-%d %H:%M:%S', // ДОДАЙ ЦЕЙ РЯДОК
    columns: [
      ['x', ...dates],
      ['Price', ...prices]
    ],
    type: 'area-spline',
  },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%d.%m.%Y',
            outer: false
          }
        },
        y: {
          tick: {
            format: d => `$${d.toFixed(0)}`,
            outer: false,
            count: 3
          },
          min: Math.min(...prices), 
          max: Math.max(...prices),// Починаємо трохи нижче мінімальної ціни
       
        },
      },
      point: {
        show: true,
        r: 3,
        focus: { expand: { r: 5 } }
      },
      legend: { show: false },
      
      tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
          const data = d[0];
          return `
            <div class="custom-c3-tooltip">
                <div class="tooltip-val">$${data.value.toLocaleString()}</div>
                <div class="tooltip-date">${defaultTitleFormat(data.x)}</div>
            </div>
          `;
        }
      }
    });
  }, 100);

  return `
    
    <svg width="0" height="0" style="position:absolute; visibility: hidden;">
        <defs>
            <linearGradient id="chart-gradient" x1="568.5" y1="0" x2="568.5" y2="463" gradientUnits="userSpaceOnUse">
                <stop stop-color="#83AF8D"/>
                <stop offset="1" stop-color="#FAFBFE" stop-opacity="0"/>
            </linearGradient>
        </defs>
    </svg>

    <div class="s3d2-popup">
        <button data-popup-close class="popup-close" style="position:absolute; right:15px; top:15px; border:none; background:none; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.707 8L13.207 12.5L17.707 17L17 17.707L12.5 13.207L8 17.707L7.29297 17L11.793 12.5L7.29297 8L8 7.29297L12.5 11.793L17 7.29297L17.707 8Z" fill="#1A1E21"/>
            </svg>
        </button>

        <h2 class="reservation-title">${t('Apartment price dynamics')}</h2>

        <div id="${chartId}" style="height:250px;"></div>
        
       
            <button data-action="reserve-unit" class="btn-primary">
                ${t('Reserve Unit')}
            </button>
        
    </div>
  `;
}