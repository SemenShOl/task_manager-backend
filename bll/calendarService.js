const calendarRepository = require("./../repositories/calendarRepository");

const calendarService = {
  async getDays(from, to) {
    return await calendarRepository.getDays(from, to);
  },
  async getTasks(deadline) {
    return await calendarRepository.getTasksbyDeadline(deadline);
  },
  async createTask(task) {
    return await calendarRepository.createTask(task);
  },
  async changeTask(id, task) {
    return await calendarRepository.changeTask(id, task);
  },

  async removeTask(id, deadline) {
    await calendarRepository.removeTask(id);
    const tasksWithoutRemoved = await calendarRepository.getTasksbyDeadline(
      deadline
    );
    return tasksWithoutRemoved;
  },

  async toggleTask(id) {
    return await calendarRepository.toggleTask(id);
  },
};

module.exports = calendarService;
