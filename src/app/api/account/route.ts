import { Account } from "@/app/models/Account";

export async function GET() {
    const accounts = await Account.find()
    return new Response(JSON.stringify(accounts), {status: 200})
}