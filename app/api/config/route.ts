import { NextResponse } from "next/server";
import client from "../utils/db"; // Adjust the path according to your file structure

export async function GET() {
  try {
    const budgetsResult = await client.query(`
      SELECT id, amount, created_at, expiry_date
      FROM budgets
      WHERE now() BETWEEN created_at::timestamp AND expiry_date::timestamp;
    `);
    

    const budgets = budgetsResult.rows;

    for (const budget of budgets) {
      const { id: budgetId, amounts: budgetAmount, created_at: budgetStart, expiry_date: budgetEnd } = budget;

      // Fetch the total cashout for the current budget period
      const transactionsResult = await client.query(
        `
        SELECT COALESCE(SUM(CAST(amount AS INTEGER)), 0) AS total_cashout
        FROM transactions
        WHERE created_at >= $1 AND created_at <= $2 AND tr_type='cash-out';
        `,
        [budgetStart, budgetEnd]
      );

      const totalCashout = transactionsResult.rows[0]?.total_cashout || 0;

      // If the total cashout exceeds or equals the budget amount
      if (totalCashout >= budgetAmount) {
        const message = `Budget exceeded: Your total cashout of ${totalCashout} has reached or exceeded your budget of ${budgetAmount}.`;

        // Insert a notification
        await client.query(
          `
          INSERT INTO notification (details, created_at, status)
          VALUES ($1, now(), 'unread');
          `,
          [message]
        );
      }
    }

    return NextResponse.json({ message: "Notifications processed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing notifications:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
