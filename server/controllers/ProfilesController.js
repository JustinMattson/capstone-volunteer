import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { queueService } from "../services/QueueService";
import { profilesService } from "../services/ProfilesService";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .get("/:id", this.getProfileById)
      .get("/:id/queue", this.getQueuesByVolunteerId)
      .put("/:id", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await profilesService.updateProfile(
        req.userInfo.email,
        req.body
      );
      // req.body.creatorId = req.user.sub;
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getProfileById(req, res, next) {
    try {
      let data = await profilesService.getProfileById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getQueuesByVolunteerId(req, res, next) {
    try {
      let data = await queueService.getQueuesByVolunteerId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
