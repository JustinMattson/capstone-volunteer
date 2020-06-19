import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class JobsService {
  async getAll(query = {}) {
    let jobs = await dbContext.Jobs.find(query).populate(
      "creator",
      "name picture"
    );
    return jobs;
  }
  async getJobById(id) {
    let data = await dbContext.Jobs.findOne({ _id: id }).populate(
      "creator",
      // "name picture requesterRatings"
    );
    if (!data) {
      throw new BadRequest("Invalid Id");
    }

    return data;
  }
  async create(rawData) {
    let data = await dbContext.Jobs.create(rawData);
    return data;
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Jobs.findOneAndUpdate(
      {
        _id: id,
        creatorEmail: userEmail,
      },
      update,
      {
        new: true,
      }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async delete(id, userEmail) {
    let data = await dbContext.Jobs.findOneAndDelete({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
}

export const jobsService = new JobsService();
