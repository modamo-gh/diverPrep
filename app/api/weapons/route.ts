import * as dotenv from "dotenv";
import { NextResponse } from "next/server";
import { Client } from "pg";

dotenv.config();

const client = new Client({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
	port: Number(process.env.PGPORT)
});

export const GET = async () => {
	try {
		await client.connect();

		const result = await client.query("SELECT * FROM weapons;");

		await client.end();

		return NextResponse.json(result.rows);
	} catch (error) {
		console.error("Error fetching weapons:", error);

		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
};
