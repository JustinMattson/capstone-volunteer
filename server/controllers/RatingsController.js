import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { jobsService } from "../services/JobsService";

export class RatingsController extends BaseController {
  constructor() {
    super("api/rating");
    this.router
      .put("/jobRating", this.jobRating)
      .put("/volunteerRating", this.volunteerRating)
  }
  async jobRating(req, res, next) {
    try {
      await profilesService.updateUserJR(req.body)
      await jobsService.updateJobRating(req.body)
      res.send("Successfully updated")
    } catch (error) {
      next(error)
    }
  }
  async volunteerRating(req, res, next) {
    try {
      await profilesService.updateUserVR(req.body)
      await jobsService.updateVolunteerRating(req.body)
      res.send("Successfully updated")
    } catch (error) {
      next(error)
    }
  }
}
