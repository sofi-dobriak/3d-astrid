export function VillaExplicationPropertyRow(title, value, i18n, order) {
  return `
      <div class="s3d-villa__floor-explication-screen-info-row">
        <div class="s3d-villa__floor-explication-screen-info-row-title">${order}. ${title}</div>
        <div class="s3d-villa__floor-explication-screen-info-row-blank"></div>
        <div class="s3d-villa__floor-explication-screen-info-row-value">
          ${value}  ${i18n.t('area_unit')}
        </div>
      </div>
    `;
}
