
import './css/variables.css';
import './css/global.css';
import './css/components.css';
import './css/responsive.css';

import { services } from './js/services/services.js';
import { barbers } from './js/services/barber.js';

import {
  renderServices,
  renderBarbers,
  renderAppointments,
  renderBookingOptions
} from './js/ui/render.js';

import {
  getAllAppointments,
  createAppointment
} from './js/appointments/appointments.js';

// Elementos del DOM
const appointmentForm = document.querySelector('#appointment-form');
const formMessage = document.querySelector('#form-message');
const dateInput = document.querySelector('#appointmentDate');
const phoneInput = document.querySelector('#clientPhone');

// Obtener fecha local actual
function getLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Establecer fecha mínima
dateInput.min = getLocalDate();

// Renderizado inicial
renderServices(services);
renderBarbers(barbers);
renderBookingOptions(services, barbers);
renderAppointments(getAllAppointments());

// Mostrar mensajes
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = type;
}

// Evento de envío del formulario
appointmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    clientName: document.querySelector('#clientName').value,
    clientPhone: phoneInput.value,
    serviceId: document.querySelector('#serviceId').value,
    barberId: document.querySelector('#barberId').value,
    date: dateInput.value,
    time: document.querySelector('#appointmentTime').value
  };

  // Validar teléfono mexicano de 10 dígitos
  if (!/^\d{10}$/.test(data.clientPhone.trim())) {
    showMessage('El teléfono debe contener exactamente 10 dígitos.', 'error');
    return;
  }

  // Validar fecha y hora
  const appointmentDate = new Date(`${data.date}T${data.time}:00`);

  if (appointmentDate <= new Date()) {
    showMessage('Selecciona una fecha y hora futura.', 'error');
    return;
  }

  // Crear reservación
  const result = createAppointment(data);

  if (!result.success) {
    showMessage(result.message, 'error');
    return;
  }

  showMessage(result.message, 'success');

  appointmentForm.reset();

  dateInput.min = getLocalDate();

  renderAppointments(getAllAppointments());
});

console.log('BarberAgend iniciado correctamente');
