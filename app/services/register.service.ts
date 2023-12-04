import { AdminModel } from "@models";
import { RegisterSerializer } from "@serializers";
import { HttpExceptionUtil, ValidateUtil } from "@utils";
import i18n from "i18n";
import * as yup from "yup";

export default class RegisterService {
  private static async registerYup(body: any) {
    try {
      const schema = yup.object({
        name: yup.string().required("RegisterService#001"),
        phone: yup.string().required("RegisterService#002"),
        email: yup.string().required("RegisterService#003").email("RegisterService#003"),
        password: yup.string().required("RegisterService#004"),
        token_notification: yup.string().optional(),
      });
      return await schema.validate(body);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }
  static async register(body: any) {
    const request = await this.registerYup(body);
    const result = await AdminModel.findOne({
      where: {
        OR: [{ email: request.email }, { phone: request.phone }],
      },
    });
    if (result) throw new HttpExceptionUtil({ code: 400, message: i18n.__("register.already_registered") });
    const data = await AdminModel.create({
      data: {
        ...body,
        password: await ValidateUtil.bcryptEnkripsi(request.password),
        access_menu: [{ key: "/dashboard" }],
      },
    });
    return RegisterSerializer.register(data);
  }
}
