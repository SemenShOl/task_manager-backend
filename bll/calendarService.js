// import { calendarRepository } from "../repositories/calendarRepository";
const calendarRepository = require("./../repositories/calendarRepository");

const calendarService = {
  async getDays(month, year) {
    return await calendarRepository.getDays(month, year);
  },
  async getTasks(date) {
    return await calendarRepository.getTasks(deadline);
  },
  async createTask(task) {
    return await calendarRepository.createTask(task);
  },
  async changeTask(id, task) {
    return await calendarRepository.changeTask(id, task);
  },

  async removeTask(id) {
    return await calendarRepository.removeTask(id);
  },

  async toggleTask(id) {
    return await calendarRepository.toggleTask(id);
  },
};

module.exports = calendarRepository;
