// import {postGetAllAction} from "./controller/PostGetAllAction";
// import {postGetByIdAction} from "./controller/PostGetByIdAction";

import {Context} from "koa";

/**
 * All application routes.
 */
export const AppRoutes = [
    // {
    //     path: "/posts",
    //     method: "get",
    //     action: postGetAllAction
    // },
    // {
    //     path: "/posts/:id",
    //     method: "get",
    //     action: postGetByIdAction
    // },
    {
        path: "/",
        method: "get",
        action: (ctx:Context) => {
            ctx.body = "Hello World"
        }
    }
];
