import { ResponseConstant } from "@constants";
import { MonsterService } from "@services";
import { NextFunction, Request, Response } from "express";

export default class MonsterController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.index(req) }, res);
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.create(req) }, res);
    } catch (e) {
      next(e);
    }
  }

  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.find(req) }, res);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.update(req) }, res);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.delete(req) }, res);
    } catch (e) {
      next(e);
    }
  }

  static async detail(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.detail(req) }, res);
    } catch (e) {
      next(e);
    }
  }

  static async catch(req: Request, res: Response, next: NextFunction) {
    try {
      ResponseConstant.success({ data: await MonsterService.catch(req) }, res);
    } catch (e) {
      next(e);
    }
  }
}
