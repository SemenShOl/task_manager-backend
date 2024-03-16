const daySchedule = {
  1: ["09:00", "10:20"],
  2: ["10:30", "12:00"],
  3: ["12:00 12:30", "13:20 13:50"],
  4: ["14:00", "15:20"],
  5: ["15:30", "16:50"],
  6: ["17:00", "18:20"],
  7: ["18:30", "19:50"],
  8: ["20:00", "21:20"],
};

function getTimeOfLessonStart(numberOfLesson) {
  return daySchedule[numberOfLesson][0];
}
module.exports = getTimeOfLessonStart;
