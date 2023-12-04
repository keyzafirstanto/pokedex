import { HttpExceptionUtil } from "@utils";
import { NextFunction, Request, Response } from "express";
import { ValidateUtil } from "@utils";
import { ResponseConstant } from "@constants";

export interface AuthorizationTypeTokenDto {
  id: string;
  email: string;
  phone: string;
  exp: number;
  iat: number;
}

export default class AuthorizationMiddleware {
  static async token(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = req.headers.authorization;
      if (!authToken) throw new HttpExceptionUtil({ code: 401, message: "Invalid Token" });
      const type = authToken.split(" ")[0].toLowerCase();
      const token = authToken.split(" ")[1];
      
      if (type === "basic") {
        const tokenBasic = process.env.TOKEN_BASIC;
        if (tokenBasic !== token) throw new HttpExceptionUtil({ code: 401, message: "Token Unauthorized" });
        next();
      } else if (type === "bearer") {
        const decoded = ValidateUtil.jwtDecrypt(token) as AuthorizationTypeTokenDto;
        req.cookies = decoded;
        next();
      } else {
        throw new HttpExceptionUtil({ code: 401, message: "Invalid Type Token" });
      }
    } catch (e: any) {
      e.code = 401;
      next(e);
    }
  }

  static handleSendError(req: Request, res: Response, next: NextFunction) {
    const error = new HttpExceptionUtil({ code: 404, message: "Not Found" });
    next(error);
  }

  static handleErrorGlobal(error: HttpExceptionUtil | any, req: Request, res: Response, next: NextFunction) {
    ResponseConstant.error(
      {
        code: error.code,
        message: error.message,
        error_code: error.error_code,
        data: error.data,
      },
      res
    );
    res.end();
  }
}
