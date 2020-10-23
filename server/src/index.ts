import "reflect-metadata";
import {createConnection} from "typeorm";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {CONNECTION_CONFIG} from "./db";
import {DonationSaveAction} from "./controller/DonationSaveAction";

const port = process.env.PORT || 8080;

// @ts-ignore
createConnection(CONNECTION_CONFIG).then(async () => {
    const app = new Koa();
    const router = new Router();

    router.post("/donate/", DonationSaveAction);

    app.use(bodyParser());
    app.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'POST');
        await next();
    });
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port, () => {
        console.log(`Donation app is up and running on port ${port}`);
    });
}).catch(error => console.log("ORM connection error: ", error));
