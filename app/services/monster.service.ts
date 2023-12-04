import { DefaultConstant } from "@constants";
import { NotificationLib } from "@lib";
import { AdminModel, MonsterModel } from "@models";
import { AdminRole } from "@prisma/client";
import { MonsterSerializer } from "@serializers";
import { GeneratedUtil, HttpExceptionUtil, ValidateUtil } from "@utils";
import { Request } from "express";
import i18n from "i18n";
import * as yup from "yup";

const admin = AdminModel.admin;
const monster = MonsterModel.monster
export default class MonsterService {
  private static async indexYup(query: any) {
    try {
      const schema = yup.object({
        page: yup.number().optional().default(1),
        limit: yup.number().optional().default(10),
        search: yup.string().optional(),
        type: yup.string().optional(),
        order_name: yup.string().optional(),
        order_by_id: yup.string().optional(),
      });
      return await schema.validate(query);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }
  static async index(req: Request) {
    const request = await this.indexYup(req.query);
    const skip = (request.page - 1) * request.limit;

    let where = {};
    if (request.search) {
      where = {
        where: {
          name: {
            contains: request.search,
          },
        },
      };
    }else if (request.type) {
      let type = request.type.includes(' ') ? request.type.split(' ') : new Array(request.type)
      where = {
        where: {
          type: {
            hasEvery: type,
          },
      },
      }
    }else if (request.search && request.type) {
      let type = request.type.includes(' ') ? request.type.split(' ') : new Array(request.type)
      where = {
        where: {
          OR: [
            {
              name: {
                contains: request.search,
              },
            },
            {
              type: {
                hasEvery: type,
              },
            },
            
          ],
        },
      };
    }
    const ordering_name = request.order_name || "asc"
    const ordering_id = request.order_by_id || "asc"
    const result = await monster.findMany({ ...where, take: request.limit, skip, orderBy: [{ name: ordering_name }, { created_at: ordering_id } ]});
    const meta = DefaultConstant.metadata(request, 10);
    return MonsterSerializer.index(result, meta);
  }

  private static async createYup(body: any) {
    try {
      const schema = yup.object({
        user_id: yup.string().required(),
        name: yup.string().required(),
        type: yup.array().required(),
        description: yup.string().required(),
        picture: yup.string().required(),
        height: yup.string().required(),
        weight: yup.string().required(),
        health: yup.number().integer().required(),
        attack: yup.number().integer().required(),
        speed: yup.number().integer().required(),
      });
      return await schema.validate(body);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }
  static async create(req: Request) {
    const request = await this.createYup(req.body);
    const check_current_user = await admin.findFirst({ where: { id: request.user_id } });
    if (check_current_user.role != "ADMIN") throw new HttpExceptionUtil({ code: 400, message: i18n.__("admin.not_allowed_to_create_monster") });

    const data = await monster.create({
      data: {
        name: request.name,
        type: request.type,
        description: request.description,
        picture: request.picture,
        height: request.height,
        weight: request.weight,
        health: request.health,
        attack: request.attack,
        speed: request.speed,
      },
    });
    return MonsterSerializer.create(data);
  }

  private static async findYup(query: any) {
    try {
      const schema = yup.object({
        id: yup.string().required(),
      });
      return await schema.validate(query);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }
  static async find(req: Request) {
    const request = await this.findYup(req.query);
    const result = await monster.findFirst({ where: { id: request.id } });
    if (!result) throw new HttpExceptionUtil({ code: 400, message: i18n.__("admin.monster_not_found") });
    return MonsterSerializer.create(result);
  }

  private static async updateYup(body: any) {
    try {
      const schema = yup.object({
        user_id: yup.string().required(),
        id: yup.string().required(),
        name: yup.string().optional(),
        type: yup.array().optional(),
        description: yup.string().optional(),
        picture: yup.string().optional(),
        height: yup.string().optional(),
        weight: yup.string().optional(),
        health: yup.number().integer().optional(),
        attack: yup.number().integer().optional(),
        speed: yup.number().integer().optional(),
      });
      return await schema.validate(body);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }
  static async update(req: Request) {
    const request = await this.updateYup(req.body);
    const check_current_status = await admin.findFirst({ where: { id: request.user_id } });
    if (check_current_status.role != "ADMIN") throw new HttpExceptionUtil({ code: 400, message: i18n.__("admin.not_allowed_to_update_monster") });

    const data = await monster.update({
      where: { id: request.id },
      data: {
        name: request.name,
        type: request.type,
        description: request.description,
        picture: request.picture,
        height: request.height,
        weight: request.weight,
        health: request.health,
        attack: request.attack,
        speed: request.speed,
      },
    });
    return MonsterSerializer.update(data);
  }

  private static async deleteYup(body: any) {
    try {
      const schema = yup.object({
        id: yup.string().required(),
        user_id: yup.string().required(),
      });
      return await schema.validate(body);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }
  static async delete(req: Request) {
    const request = await this.deleteYup(req.body);
    const check_current_status = await admin.findFirst({ where: { id: request.user_id } });
    if (check_current_status.role != "ADMIN") throw new HttpExceptionUtil({ code: 400, message: i18n.__("admin.not_allowed_to_delete_monster") });
    const result = await monster.delete({ where: { id: request.id } });
    if (!result) throw new HttpExceptionUtil({ code: 400, message: i18n.__("admin.not_found") });
    return MonsterSerializer.delete(result);
  }

  
}
