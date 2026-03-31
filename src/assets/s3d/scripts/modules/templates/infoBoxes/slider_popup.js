import $closeBtn from './$closeBtn';
import { isMobile, isTablet } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';

function renderSliderPopup(i18n, data) {
  return `
      ${
        isMobile() || isTablet()
          ? `
            <div class="s3d-infoBox__flat-overlay" data-s3d-event="closed"></div>
          `
          : ''
      }
      <div class="s3d-infoBox__infrastructure">
          ${$closeBtn()}
          <span class="s3d-infoBox__title">
            ${i18n.t([`slider_popup.${data.id}`, 'slider_popup.default'])}
          </span>
      </div>`;
}

export default renderSliderPopup;
