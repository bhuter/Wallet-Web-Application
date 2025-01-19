import { NextRequest, NextResponse } from "next/server";
import client from "../../utils/db";;

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { cat_name } = await req.json();

    // Input validation
    if (!cat_name) {
        return NextResponse.json({ message: "Category name is required." }, { status: 400 });
    }
    try {
      

        // Insert the new transaction into the database
        const inserttransactionSql = `
            INSERT INTO categories (cat_name, created_at)
            VALUES ($1, NOW()) RETURNING *
        `;
        const insertValues = [cat_name];
        const result = await client.query(inserttransactionSql, insertValues);

        return NextResponse.json({ 
            message: "Category added successfully!", 
            transaction: result.rows[0] 
        }, { status: 201 });
    } catch (error) {
        console.error("Error adding category:", error);
        return NextResponse.json({ 
            message: "Error: " + (error instanceof Error ? error.message : "Unknown error") 
        }, { status: 500 });
    }
}
