import { HttpExceptionUtil, ValidateUtil } from "@utils";
import { LoginSerializer } from "@serializers";
import i18n from "i18n";
import { AdminModel } from "@models";
import * as yup from "yup";


export default class LoginService {
  private static async emailPhonePasswordYup(body: any) {
    try {
      const schema = yup.object({
        user: yup.string().required(),
        password: yup.string().required(),
      });
      return await schema.validate(body);
    } catch (e: any) {
      throw new HttpExceptionUtil({ code: 400, error_code: e.message, data: e });
    }
  }

  static async emailPhonePassword(body: any) {
    const request = await this.emailPhonePasswordYup(body);
    const result = await AdminModel.admin.findFirst({
      where: {
        OR: [
          {
            email: request.user,
          },
          {
            phone: request.user,
          },
        ],
      },
    });
    if (!result) throw new HttpExceptionUtil({ code: 400, message: i18n.__("login.not_registered") });
    if (!ValidateUtil.bcryptCheck(request.password, result.password)) throw new HttpExceptionUtil({ code: 400, message: i18n.__("login.wrong_password") });
    return LoginSerializer.login(result);
  }
}
