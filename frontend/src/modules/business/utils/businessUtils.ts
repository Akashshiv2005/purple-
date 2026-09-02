export const getBusinessStatus = (opening: string | null, closing: string | null) => {
  if (!opening || !closing) {
    return { isOpen: true, text: "Open", colorClass: "text-green-600 bg-green-50 border border-green-200" };
  }

  try {
    const parseTimeToMinutes = (timeStr: string) => {
      const cleaned = timeStr.trim().toLowerCase();
      const isPm = cleaned.includes('pm');
      const isAm = cleaned.includes('am');
      
      let [hoursStr, minutesStr] = cleaned.replace(/[ap]m/, '').trim().split(':');
      let hours = parseInt(hoursStr, 10);
      let minutes = parseInt(minutesStr || '0', 10);

      if (isNaN(hours)) return null;

      if (isPm && hours < 12) hours += 12;
      if (isAm && hours === 12) hours = 0;
      
      return hours * 60 + minutes;
    };

    const openMin = parseTimeToMinutes(opening);
    const closeMin = parseTimeToMinutes(closing);

    if (openMin === null || closeMin === null) {
      return { isOpen: true, text: `Open until ${closing}`, colorClass: "text-green-600 bg-green-50 border border-green-200" };
    }

    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    const format12Hour = (timeStr: string) => {
      const minutesSinceMidnight = parseTimeToMinutes(timeStr);
      if (minutesSinceMidnight === null) return timeStr;
      
      const h24 = Math.floor(minutesSinceMidnight / 60);
      const m = minutesSinceMidnight % 60;
      
      const period = h24 >= 12 ? 'PM' : 'AM';
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
      
      return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
    };

    const prettyOpen = format12Hour(opening);
    const prettyClose = format12Hour(closing);

    let isOpen = false;
    if (closeMin > openMin) {
      isOpen = currentMin >= openMin && currentMin <= closeMin;
    } else {
      isOpen = currentMin >= openMin || currentMin <= closeMin;
    }

    if (isOpen) {
      return { 
        isOpen: true, 
        text: `Open now • Closes at ${prettyClose}`,
        colorClass: 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
      };
    } else {
      return { 
        isOpen: false, 
        text: `Closed • Opens at ${prettyOpen}`,
        colorClass: 'text-rose-700 bg-rose-50 border border-rose-200' 
      };
    }
  } catch (e) {
    return { isOpen: true, text: `Open until ${closing}`, colorClass: "text-green-650 bg-green-50 border border-green-200" };
  }
};

export const formatTimeDisplay = (timeStr: string | null | undefined) => {
  if (!timeStr) return 'Not Listed';
  const cleaned = timeStr.trim().toLowerCase();
  const isPm = cleaned.includes('pm');
  const isAm = cleaned.includes('am');
  
  let [hoursStr, minutesStr] = cleaned.replace(/[ap]m/, '').trim().split(':');
  let hours = parseInt(hoursStr, 10);
  let minutes = parseInt(minutesStr || '0', 10);

  if (isNaN(hours)) return timeStr;

  if (isPm && hours < 12) hours += 12;
  if (isAm && hours === 12) hours = 0;
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  
  return `${h12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const formatWorkingDays = (days: string | null) => {
  if (!days) return "Mon - Sat";
  if (days.includes('-') && (days.toLowerCase().includes('am') || days.toLowerCase().includes('pm'))) {
    return "Mon - Sat";
  }
  try {
    const parsed = JSON.parse(days);
    if (Array.isArray(parsed)) {
      return parsed.join(', ');
    }
    if (typeof parsed === 'object') {
      return Object.keys(parsed).filter(k => parsed[k]).join(', ');
    }
    return days;
  } catch (e) {
    return days;
  }
};

