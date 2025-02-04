import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		const result = await db.query("SELECT * FROM enemies;");

		return NextResponse.json(result.rows);
	} catch (error) {
		console.error("Error fetching enemies:", error);

		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
};
