
import { getAppointments, saveAppointments } from '../storage/storage.js';
import { services } from '../services/services.js';
import { barbers } from '../services/barber.js';

// Obtener todas las reservaciones
export function getAllAppointments() {
  return getAppointments();
}

// Registrar una reservación
export function createAppointment(data) {
  const service = services.find(
    item => String(item.id) === String(data.serviceId)
  );

  const barber = barbers.find(
    item => String(item.id) === String(data.barberId)
  );

  if (!service || !barber || !barber.active) {
    return {
      success: false,
      message: 'El servicio o barbero seleccionado no está disponible.'
    };
  }

  const appointments = getAppointments();

  const start = getMinutes(data.time);
  const end = start + service.duration;

  // Comprobar si el horario está ocupado
  const occupied = appointments.some(appointment => {
    if (
      appointment.date !== data.date ||
      String(appointment.barberId) !== String(data.barberId) ||
      appointment.status === 'cancelled'
    ) {
      return false;
    }

    const existingStart = getMinutes(appointment.time);
    const existingEnd = getMinutes(appointment.endTime);

    return start < existingEnd && end > existingStart;
  });

  if (occupied) {
    return {
      success: false,
      message: 'Este barbero ya tiene una reservación en ese horario.'
    };
  }

  const appointment = {
    id: Date.now(),
    clientName: data.clientName.trim(),
    clientPhone: data.clientPhone.trim(),
    serviceId: service.id,
    serviceName: service.name,
    barberId: barber.id,
    barberName: barber.name,
    date: data.date,
    time: data.time,
    endTime: getTimeString(end),
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  appointments.push(appointment);

  const saved = saveAppointments(appointments);

  if (!saved) {
    return {
      success: false,
      message: 'No fue posible guardar la reservación.'
    };
  }

  return {
    success: true,
    message: '¡Tu reservación fue confirmada!',
    appointment
  };
}

// Convertir una hora HH:MM a minutos
function getMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
}

// Convertir minutos a formato HH:MM
function getTimeString(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}
