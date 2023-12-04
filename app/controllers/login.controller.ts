import { Request, Response, NextFunction } from "express";
import { ResponseConstant } from "@constants";
import { LoginService } from "@services";

export default class LoginController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await LoginService.emailPhonePassword(req.body) }, res);
    } catch (e) {
      next(e);
    }
  }
}
