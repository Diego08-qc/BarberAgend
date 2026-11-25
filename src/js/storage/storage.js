
const STORAGE_KEY = 'barberagend_appointments';

export function getAppointments() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];

  } catch (error) {
    console.error('Error al recuperar reservaciones:', error);
    return [];
  }
}

export function saveAppointments(appointments) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(appointments)
    );

    return true;

  } catch (error) {
    console.error('Error al guardar reservaciones:', error);
    return false;
  }
}
