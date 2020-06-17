import express from "express";
import BaseController from "../utils/BaseController";
import { jobsService } from "../services/JobsService";
import auth0Provider from "@bcwdev/auth0provider";
import { CommentService } from "../services/CommentsService";

export class JobsController extends BaseController {
  constructor() {
    super("api/Jobs");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getJobById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .put("/:id", this.edit)
      .post("", this.create)
      .delete("/:id", this.delete);
  }
  async getAll(req, res, next) {
    try {
      let data = await jobsService.getAll(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getJobById(req, res, next) {
    try {
      let data = await jobsService.getJobById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByJobId(req, res, next) {
    try {
      let data = await CommentService.getCommentsByJobId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await jobsService.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await jobsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await jobsService.delete(req.params.id, req.userInfo.email);
      if (data) {
        res.send("Successfully deleted");
      }
    } catch (error) {
      next(error);
    }
  }
}
