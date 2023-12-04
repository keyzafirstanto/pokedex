import { RegisterController, LoginController, MonsterController  } from "@controllers";
import express from "express";
const app = express.Router();

const routes = () => {
  const LoginRoutes = () => {
    const routes = express.Router();
    routes.post("/", LoginController.index);
    return routes;
  };

  const RegisterRoutes = () => {
    const routes = express.Router();
    routes.post("/", RegisterController.index);
    return routes;
  };

  const MonsterRoutes = () => {
    const routes = express.Router();
    routes.get("/get_all", MonsterController.index);
    routes.post("/create", MonsterController.create);
    routes.get("/detail", MonsterController.find);
    routes.put("/update", MonsterController.update);
    routes.delete("/delete", MonsterController.delete);
    
    return routes;
  };

  app.use("/login", LoginRoutes());
  app.use("/register", RegisterRoutes());
  app.use("/monster", MonsterRoutes());
  return app;
};

app.use("/pokedex", routes());

export default app;
