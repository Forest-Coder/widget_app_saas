// Add feedback to the database
import { db } from "@/db";
import { feedbacks } from "@/db/schema";


export async function POST(req: Request) {
    //Validation
    const response = await req.json()
    const { p_project_id, p_user_name, p_user_email, p_message, p_rating } = response
    console.log(response)
    if (p_project_id == null) {
        return new Response(JSON.stringify({ data: { error: "Bad Request" } }), { status: 400 });
    }
    if (p_user_name == null) {
        return new Response(JSON.stringify({ data: { error: "No name given" } }), { status: 400 });
    }
    if (p_user_email == null) {
        return new Response(JSON.stringify({ data: { error: "No email given" } }), { status: 400 });
    }
    if (p_message == null) {
        return new Response(JSON.stringify({ data: { error: "No message given" } }), { status: 400 });
    }
    if (p_rating == null) {
        return new Response(JSON.stringify({ data: { error: "No rating given" } }), { status: 400 });
    }

    try {
        await db.insert(feedbacks).values({
            projectId: p_project_id,
            userName: p_user_name,
            userEmail: p_user_email,
            message: p_message,
            rating: p_rating
        })
        return new Response(JSON.stringify({ data: { returnedData: "Feedback successfully added" } }), { status: 200 });
    } catch (error) {
        console.error(error)
    }
    return new Response(JSON.stringify({ data: { error: "Server-side error" } }), { status: 500 });
}