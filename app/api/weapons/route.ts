import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		const result = await db.query("SELECT * FROM weapons;");

		return NextResponse.json(result.rows);
	} catch (error) {
		console.error("Error fetching weapons:", error);

		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
};
