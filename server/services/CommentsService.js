import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
    async getAll(query = {}) {
        let comments = await dbContext.Comments.find(query).populate(
            "creator",
            "name picture"
        );
        return comments;
    }
    async getCommentById(id) {
        let data = await dbContext.Comments.findOne({ _id: id }).populate(
            "creator",
            "name picture"
        );
        if (!data) {
            throw new BadRequest("Invalid Id");
        }
        return data;
    }
    async create(rawData) {
        let data = await dbContext.Comments.create(rawData);
        return data;
    }
    async edit(id, userEmail, update) {
        let data = await dbContext.Comments.findOneAndUpdate(
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
        let data = await dbContext.Comments.findOneAndDelete({
            _id: id,
            creatorEmail: userEmail,
        });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
    }
}

export const commentsService = new CommentsService();
