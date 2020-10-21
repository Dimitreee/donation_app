import {Context} from "koa";
import {DonationSaveAction} from "./controller/DonationSaveAction";

export const AppRoutes = [
    {
        path: "/donate",
        method: "post",
        action: DonationSaveAction
    },
    {
        path: "/",
        method: "get",
        action: (ctx:Context) => {
            ctx.body = "Hello World";
        }
    }
];
