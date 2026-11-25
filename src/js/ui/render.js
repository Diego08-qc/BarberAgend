
export function renderServices(services) {
  const container = document.querySelector('#services-container');

  const html = services.map(service => `
    <article class="service-card">
      <div class="service-icon">✂</div>

      <h3>${service.name}</h3>

      <p>${service.description}</p>

      <div class="service-details">
        <span>$${service.price} MXN</span>
        <span>${service.duration} min</span>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}


export function renderBarbers(barbers) {
  const container = document.querySelector('#barbers-container');

  const html = barbers.map(barber => `
    <article class="barber-card">
      <div class="barber-avatar">
        ${barber.name.charAt(0)}
      </div>

      <h3>${barber.name}</h3>

      <p>${barber.specialty}</p>

      <span class="barber-status">
        ${barber.active ? 'Disponible' : 'No disponible'}
      </span>
    </article>
  `).join('');

  container.innerHTML = html;
}


function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);
}

export function renderAppointments(appointments) {
  const container = document.querySelector('#appointments-container');
  const counter = document.querySelector('#appointments-count');

  counter.textContent = appointments.length;

  if (appointments.length === 0) {
    container.innerHTML = `
      <p class="empty-state">
        Todavía no hay reservaciones registradas.
      </p>
    `;
    return;
  }

  const html = appointments.map(appointment => `
    <article class="appointment-card">
      <h3>${escapeHTML(appointment.clientName)}</h3>

      <p>Teléfono: ${escapeHTML(appointment.clientPhone)}</p>
      <p>Servicio: ${escapeHTML(appointment.serviceName)}</p>
      <p>Barbero: ${escapeHTML(appointment.barberName)}</p>
      <p>Fecha: ${escapeHTML(appointment.date)}</p>
      <p>Horario: ${escapeHTML(appointment.time)} - ${escapeHTML(appointment.endTime)}</p>

      <span class="appointment-status">
        Confirmada
      </span>
    </article>
  `).join('');

  container.innerHTML = html;
}


export function renderBookingOptions(services, barbers) {
  const serviceSelect = document.querySelector('#serviceId');
  const barberSelect = document.querySelector('#barberId');

  serviceSelect.innerHTML += services
    .filter(service => service.active !== false)
    .map(service => `
      <option value="${service.id}">
        ${service.name} - $${service.price} MXN
      </option>
    `)
    .join('');

  barberSelect.innerHTML += barbers
    .filter(barber => barber.active)
    .map(barber => `
      <option value="${barber.id}">
        ${barber.name}
      </option>
    `)
    .join('');
}

