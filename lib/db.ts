import * as dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

declare global {
    /* eslint-disable no-var */
	var _pgClient: Client | undefined;
    /* eslint-disable no-var */
}

const client =
	global._pgClient ||
	 new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT)
    });

if(!global._pgClient){
    client.connect();
    global._pgClient = client;
}

export default client;