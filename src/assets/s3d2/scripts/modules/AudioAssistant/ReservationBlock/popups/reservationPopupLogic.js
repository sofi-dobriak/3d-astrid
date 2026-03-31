import * as yup from 'yup';

export function initReservationPopup(i18n, flat) {
  
  let currentStep = 1;
  
  const form = document.getElementById('reservation-form');
  const steps = document.querySelectorAll('.reservation-step');
  const progressFill = document.querySelector('.progress-fill');
  const stepText = document.querySelector('[data-step-text]');
  const pdfFrame = document.getElementById('generated-pdf');
  const stepDescr = document.querySelector('[data-step-descr]');
  const schema = yup.object().shape({
    name: yup.string().required('Required'),
    phone: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
  });

  document.addEventListener('click', function(event) {
    // Шукаємо кнопку або її найближчого батька з класом .pay-btn
    const button = event.target.closest('[data-payload-btn]');
    // Якщо клік був не по кнопці (або не всередині неї) — ігноруємо
    if (!button || button.disabled) return;
    // 2. Блокуємо кнопку
    button.disabled = true;
    const originalText = button.innerHTML; // Зберігаємо HTML (на випадок іконок)
    button.innerText = 'Wait...';

    // 3. Рахуємо 1%
    const amount = flat.price * 0.01;

    // 4. Формуємо дані
    const bodyParams = new URLSearchParams();
    bodyParams.append('action', 'payload_start');
    bodyParams.append('amount', amount);

    fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyParams.toString()
    })
    .then(r => {
        if (!r.ok) throw new Error('Network error');
        return r.json();
    })
    .then(d => {
        if (d.url) {
            // ВІДКРИВАЄМО В НОВІЙ ВКЛАДЦІ
            window.open(d.url, '_blank');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Помилка при спробі оплати');
    })
    .finally(() => {
        // Повертаємо кнопку до ладу
        button.disabled = false;
        button.innerHTML = originalText;
    });
});

document.addEventListener('change', function(event) {
    if (event.target.classList.contains('reservation-checkbox')) {
        const wrapper = event.target.closest('.reservation-step__form-wrap');
        const payBtn = wrapper.querySelector('[data-payload-btn]');
        
        // Кнопка активна тільки якщо чекбокс відмічено
        payBtn.disabled = !event.target.checked;
    }
});

  function updateStep(step) {
    currentStep = step;

    steps.forEach(s => s.classList.remove('active'));
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    progressFill.style.width = `${(step / 3) * 100}%`;
    stepText.innerText = `${i18n.t('Reservation.reservationPopup.Step')} ${step} ${i18n.t('Reservation.reservationPopup.of')} 3`;
    stepDescr.innerText = `${i18n.t(`Reservation.reservationPopup.descr.${step}`)}`;
    
  }

  form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
  };

  // Знаходимо або створюємо елемент прелоадера
  const preloader = document.getElementById('form-preloader-docusign');
  const submitBtn = form.querySelector('button[type="submit"]');

  try {
    // ✅ Валідація
    await schema.validate(formData, { abortEarly: false });
    document.querySelectorAll('.error').forEach(el => el.innerText = '');

    // 🚀 ЗАПУСК ПРЕЛОАДЕРА
    preloader.classList.add('active');
    submitBtn.disabled = true; // Блокуємо кнопку

    // ✅ Запит в WordPress AJAX (DocuSign)
    const response = await fetch("/wp-admin/admin-ajax.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        action: "docusign_start",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        id: flat.id,
        flyby_img: 'https://dev-3d-version4-us.smarto.com.ua/wp-content/themes/3d/assets/s3d/images/flyby/masterplan/1.jpg',
        flyby_width: "1920",
        flyby_height: "1080",
        flyby_points: "1109.7999979655,614.06667073568,1110.7999979655,669.06667073568,1220.1333312988,677.40000406901,1220.1333312988,658.06667073568,1194.7999979655,655.06667073568,1194.7999979655,627.40000406901,1215.1333312988,624.40000406901"
      })
    });
    
    const data = await response.json();
    
    if (data.url) {
      pdfFrame.src = data.url;
      updateStep(2);
    } else {
      console.error("DocuSign error:", data);
      alert("Error generating document");
    }

  } catch (err) {
    // ❌ Вивід помилок валідації
    if (err.inner) {
      err.inner.forEach(error => {
        const input = form.querySelector(`[name="${error.path}"]`);
        if (input?.nextElementSibling) {
          input.nextElementSibling.innerText = error.message;
        }
      });
    } else {
      console.error(err);
    }
  } finally {
    // 🏁 ВИМКНЕННЯ ПРЕЛОАДЕРА (спрацює і при успіху, і при помилці)
    preloader.classList.remove('active');
    submitBtn.disabled = false;
  }
});

window.addEventListener('message', (event) => {
    // Перевірка безпеки (не обов'язково, але бажано)
    if (event.origin !== window.location.origin) return;

    if (event.data.type === 'DOCUSIGN_COMPLETED') {
        console.log('Статус підпису:', event.data.status);
        
        if (event.data.status === 'signing_complete') {
            // Переводимо клієнта на наступний крок
            updateStep(3);
        } else {
            alert("Підпис не було завершено.");
        }
    }
});
  document.querySelector('[data-action="sign"]')
    .addEventListener('click', () => {
      updateStep(3);
    });
}
