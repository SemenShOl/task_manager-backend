// const calendarRepository = require("./../repositories/calendarRepository");

// const calendarService = {
//   async getDays(from, to) {
//     return await calendarRepository.getDays(from, to);
//   },
//   async getTasks(deadline, userID) {
//     return await calendarRepository.getTasksbyDeadline(deadline, userID);
//   },
//   async createTask(task) {
//     await calendarRepository.createTask(task);
//     const tasksWithAdded = await calendarRepository.getTasksbyDeadline(
//       task.deadline
//     );
//     return tasksWithAdded;
//   },
//   async changeTask(id, task) {
//     return await calendarRepository.changeTask(id, task);
//   },

//   async removeTask(id) {
//     return await calendarRepository.removeTask(id);
//   },

//   async toggleTask(id) {
//     return await calendarRepository.toggleTask(id);
//   },
// };

// module.exports = calendarService;
