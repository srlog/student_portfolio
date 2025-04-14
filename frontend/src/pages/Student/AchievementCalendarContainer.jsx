import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  addMonths,
  isSameWeek
} from 'date-fns';

// Helper to get ISO date string
const toISODate = (date) => format(new Date(date), 'yyyy-MM-dd');


const calculateWeeklyStreak = (achievementDates) => {
  const sortedDates = [...achievementDates].sort((a, b) => new Date(a) - new Date(b));

  const weekMap = {}; // Map weekStart -> Set of weekdays with achievements

  sortedDates.forEach((dateStr) => {
    const date = new Date(dateStr);
    const weekStart = toISODate(startOfWeek(date));
    const dayOfWeek = date.getDay(); // 0 to 6

    if (!weekMap[weekStart]) {
      weekMap[weekStart] = new Set();
    }
    weekMap[weekStart].add(dayOfWeek);
  });

  // Sort weeks
  const weekStarts = Object.keys(weekMap).sort((a, b) => new Date(a) - new Date(b));

  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < weekStarts.length; i++) {
    const currentWeek = new Date(weekStarts[i]);
    const nextExpectedWeek = addDays(currentWeek, 7);
    const thisWeekFull = weekMap[weekStarts[i]].size >= 2 ;

    if (!thisWeekFull) {
      currentStreak = 0;
      continue;
    }

    if (i === 0 || isSameWeek(currentWeek, addDays(new Date(weekStarts[i - 1]), 7))) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }

    maxStreak = Math.max(maxStreak, currentStreak);
  }

  return maxStreak;
};

const AchievementCalendar = ({ achievementsData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [weeklyStreak, setWeeklyStreak] = useState(0);

  const achievementMap = {};
  const allAchievementDates = [];

  Object.keys(achievementsData).forEach((key) => {
    if (Array.isArray(achievementsData[key])) {
      achievementsData[key].forEach((item) => {
        const day = format(new Date(item.issued_date), 'yyyy-MM-dd');
        allAchievementDates.push(day);
        if (!achievementMap[day]) {
          achievementMap[day] = [];
        }
        achievementMap[day].push(item);
      });
    }
  });

  useEffect(() => {
    const streak = calculateWeeklyStreak(allAchievementDates);
    setWeeklyStreak(streak);
  }, [achievementsData]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl overflow-x-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-green-600 mb-2 md:mb-0">
          Weekly Streak: {weeklyStreak} week{weeklyStreak !== 1 ? 's' : ''}
        </h3>
        <div className="flex space-x-4">
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="text-blue-500 hover:text-blue-600 focus:outline-none transition-colors"
          >
            &lt;
          </button>
          <span className="text-xl font-bold text-gray-800">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-blue-500 hover:text-blue-600 focus:outline-none transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((dayName, idx) => (
              <th key={idx} className="py-2 border-b border-gray-200 text-gray-700">
                {dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((dayItem, colIndex) => {
                const formattedDate = format(dayItem, 'yyyy-MM-dd');
                const isCurrent = isSameMonth(dayItem, currentMonth);
                const achievements = achievementMap[formattedDate] || [];
                const hasAchievement = achievements.length > 0;

                return (
                  <td 
                    key={colIndex} 
                    className={`py-2 border-t border-gray-100 relative ${
                      !isCurrent ? 'bg-gray-50 text-gray-400' : 'bg-white'
                    }`}
                  >
                    <div className="relative group">
                      <span
                        className={`inline-block w-8 h-8 leading-8 rounded-full transition-colors ${
                          hasAchievement
                            ? 'bg-blue-500 text-white font-semibold'
                            : ''
                        }`}
                      >
                        {format(dayItem, 'd')}
                      </span>
                      {hasAchievement && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                          <div className="font-semibold mb-1">Achievements:</div>
                          <ul>
                            {achievements.map((ach) => (
                              <li key={ach.id} className="whitespace-normal break-words">
                                • {ach.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AchievementCalendarContainer = ({achievements}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Achievement Calendar</h2>
      <div className='md:w-full md:transform md:translate-x-0 '>
        <AchievementCalendar achievementsData={achievements} />
      </div>
    </div>
  );
};

export default AchievementCalendarContainer;
