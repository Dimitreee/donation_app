const {
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

export const CONNECTION_CONFIG = {
    type: "mongodb",
    host: MONGO_HOSTNAME,
    port: MONGO_PORT,
    database: MONGO_DB,
    synchronize: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
    authSource: "admin",
    logging: false,
    entities: [
        "src/entity/*.ts"
    ],
};
