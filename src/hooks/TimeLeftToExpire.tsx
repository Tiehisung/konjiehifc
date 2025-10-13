// import { useState, useEffect } from 'react';
// import { differenceInSeconds } from 'date-fns';

// function useCountdown(expirationDate: string ) {
//   const calculateDurationLeft = () => {
//     const now = new Date();
//     const eventDate = new Date(expirationDate);

//     const secondsLeft = differenceInSeconds(eventDate, now);
//     const years = Math.floor(secondsLeft / (60 * 60 * 24 * 365));
//     const months = Math.floor((secondsLeft % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
//     const days = Math.floor((secondsLeft % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
//     const hours = Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60));
//     const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
//     const seconds = secondsLeft % 60;

//     return { years, months, days, hours, minutes, seconds };
//   };

//   const [timeString, setTimeString] = useState('');
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const duration = calculateDurationLeft();
//       if (duration.years) {
//         setTimeString(duration.years + ' yrs ' + duration.months + 'months left');
//       } else if (duration.months) {
//         setTimeString(duration.months + 'm ' + duration.days + 'd left');
//       } else if (duration.days) {
//         setTimeString(duration.days + 'd ' + duration.hours + 'hr left');
//       } else if (duration.hours) {
//         setTimeString(duration.hours + 'hr ' + duration.minutes + 'm left');
//       } else if (duration.minutes) {
//         setTimeString(duration.minutes + 'm ' + duration.seconds + 's left');
//       } else {
//         setTimeString('Closed');
//       }
//     }, 1000);

//     return () => clearInterval(timer); // Clean up timer on component unmount
//   }, [expirationDate]);

//   if (new Date() >= new Date(expirationDate)) {
//     return 'Closed';
//   }

//   return timeString;
// }

// export default useCountdown;
