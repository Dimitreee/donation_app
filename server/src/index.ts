import "reflect-metadata";
import {createConnection} from "typeorm";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {AppRoutes} from "./routes";
import {CONNECTION_CONFIG} from "./db";

const port = process.env.PORT || 8080;

// @ts-ignore
createConnection(CONNECTION_CONFIG).then(async () => {
    const app = new Koa();
    const router = new Router();

    // @ts-ignore
    AppRoutes.forEach(route => router[route.method](route.path, route.action));

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port, () => {
        console.log(`Donation app is up and running on port ${port}`);
    });
}).catch(error => console.log("ORM connection error: ", error));
