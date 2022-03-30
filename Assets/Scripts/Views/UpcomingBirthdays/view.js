const { DateTime } = dv.luxon;

dv.table(["Name", "Birthday", "Time Until"], dv.pages('"People"')
    .sort(p => daysUntil(p.birthday))
    .filter(p => p.birthday)
    .map(p => [
        p.alias[0] || p.file.name,
        formatBDay(p.birthday),
        formattedDaysUntil(p.birthday)
    ]))

function formatBDay(birthday) {
    return DateTime.fromISO(birthday)
        .toLocaleString({ weekday: 'short', month: 'long', day: '2-digit' });
}

function parseBDayCurrentYear(birthday) {
    return DateTime.fromISO(birthday).set({ year: DateTime.now().year });
}

function hasPassed(birthday) {
    return parseBDayCurrentYear(birthday).diffNow().toMillis() < 0;
}

function daysUntil(birthday) {
    var currentYearBirthday = parseBDayCurrentYear(birthday);

    var nextBirthdayDate = hasPassed(birthday)
        ? currentYearBirthday.plus({ year: 1 })
        : currentYearBirthday;

    return DateTime.now().until(nextBirthdayDate);
}

function formattedDaysUntil(birthday) {
    var timeUntil = daysUntil(birthday);
    if (timeUntil.count('days') > 42)
        return (timeUntil.count('months') - 1) + " Months";
    else if (timeUntil.count('days') > 28)
        return (timeUntil.count('weeks') - 1) + " Weeks";
    else if (timeUntil.count('days') > 2)
        return (timeUntil.count('days') - 1) + " Days";
    else if (timeUntil.count('days') > 1)
        return "Tomorrow!";
    else return "Today!!!";
}