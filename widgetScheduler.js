export const isVisibleTime = (brandSetting) => {
    const { timeZone = 'Europe/Paris' } = brandSetting;
    const offDayStart = brandSetting.offDayStart;
    const offDayEnd = brandSetting.offDayEnd;
    const offTimeStart = brandSetting.offTimeStart;
    const offTimeEnd = brandSetting.offTimeEnd;

    // Get current date and time in the specified timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const now = new Date();
    const parts = formatter.formatToParts(now);

    const currentDay = parts.find(part => part.type === 'weekday').value;
    const currentHour = parts.find(part => part.type === 'hour').value;
    const currentMinute = parts.find(part => part.type === 'minute').value;

    // 🛑 Only check offDays if ALL offDay/offTime values exist
    if (offDayStart && offDayEnd && offTimeStart && offTimeEnd) {
      // todo: will it not be off then if no off days specified?
      // Turn off during weekends (Sat, Sun)
      if (currentDay === 'Sat' || currentDay === 'Sun') {
        return false;
      }

      // Turn off after offTimeStart on offDayStart
      if (currentDay === offDayStart) {
        const [offHour, offMinute] = offTimeStart.split(':');
        if (parseInt(currentHour) > parseInt(offHour) ||
          (parseInt(currentHour) === parseInt(offHour) && parseInt(currentMinute) >= parseInt(offMinute))) {
          return false;
        }
      }

      // Turn off before offTimeEnd on offDayEnd
      if (currentDay === offDayEnd) {
        const [onHour, onMinute] = offTimeEnd.split(':');
        if (parseInt(currentHour) < parseInt(onHour) ||
          (parseInt(currentHour) === parseInt(onHour) && parseInt(currentMinute) < parseInt(onMinute))) {
          return false;
        }
      }
    }

    // Otherwise, widget is visible
    return true;
}