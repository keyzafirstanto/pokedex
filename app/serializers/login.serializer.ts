import { DefaultConstant } from "@constants";
import { Admin } from "@prisma/client";
import { ValidateUtil } from "@utils";
import moment from "moment";
export default class LoginSerializer {
  static async login(data: Admin) {
    const expToken = moment().add(30, "days").valueOf();
    const token = await ValidateUtil.jwtGenerate({
      id: data.id,
      email: data.email,
      phone: data.phone,
      role: data.role,
      exp: expToken,
    });
    return {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      photo: DefaultConstant.profileImage,
      token: token,
      role: data.role,
      exp: expToken,
    };
  }
}
