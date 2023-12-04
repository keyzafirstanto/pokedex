import { ResponseConstant } from "@constants";
import { RegisterService } from "@services";
import { Request, Response, NextFunction } from "express";

export default class RegisterController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await RegisterService.register(req.body) }, res);
    } catch (e) {
      next(e);
    }
  }
}
