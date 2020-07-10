import express from "express";
import BaseController from "../utils/BaseController";
import { jobsService } from "../services/JobsService";
import auth0Provider from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import socketService from "../services/SocketService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getCommentById)
      .delete("/:id", this.delete)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .put("/:id", this.edit)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await commentsService.getAll(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getCommentById(req, res, next) {
    try {
      let data = await commentsService.getCommentById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      req.body.profileId = req.userInfo.id;
      let data = await commentsService.create(req.body);
      socketService.messageRoom("jobId", "newComment", data);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await commentsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      socketService.messageRoom("jobId", "newEdit", data);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await commentsService.delete(req.params.id);
      socketService.messageRoom("jobId", "deleteComment", data);
      if (data) {
        res.send("Successfully deleted");
      }
    } catch (error) {
      next(error);
    }
  }
}
