"use strict";
import dotenv from "dotenv";
import "module-alias/register";
import "moment/locale/id";
import "yup-phone";
import "./configs/redis";
dotenv.config();

import { routingConfig } from "@configs";
import { AuthorizationMiddleware } from "@middlewares";
import bodyParser from "body-parser";
import cros from "cors";
import express from "express";
import i18n from "i18n";
import morganBody from "morgan-body";

const app = express();
const PORT = process.env.PORT_BACKOFFICE_SERVICE || 9000;

app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(cros());
app.use((req, res, next) => {
  i18n.setLocale(req.headers["accept-language"] || i18n.getLocale());
  next();
});
morganBody(app, { timezone: "Asia/Jakarta", logAllReqHeader: true });

app.use(AuthorizationMiddleware.token);
app.use(routingConfig);
app.use(AuthorizationMiddleware.handleSendError);
app.use(AuthorizationMiddleware.handleErrorGlobal);
app.listen(PORT, () => console.info("🔵 Server node running on PORT " + PORT));

export default app;
