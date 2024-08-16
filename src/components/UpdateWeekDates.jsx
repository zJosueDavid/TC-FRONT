import  { useEffect } from 'react';

export const UpdateWeekDates = () => {
  useEffect(() => {
    updateWeekDates();
  }, []);

  const updateWeekDates = () => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1)));
    const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
    const formattedFirstDay = firstDayOfWeek.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedLastDay = lastDayOfWeek.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('week-dates').innerText = 'Semana del ' + formattedFirstDay + ' al ' + formattedLastDay;
  };

  return <div className="fecha" id="week-dates"></div>;
};

export default UpdateWeekDates;
