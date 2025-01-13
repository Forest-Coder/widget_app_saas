// Add feedback to the database
import { db } from "@/db";
import { feedbacks } from "@/db/schema";


export async function POST(req: Request) {
    //Validation
    const { data } = await req.json()
    if (data.p_project_id == null) {
        return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 });
    }
    if (data.p_user_name == null) {
        return new Response(JSON.stringify({ error: "No name given" }), { status: 400 });
    }
    if (data.p_user_email == null) {
        return new Response(JSON.stringify({ error: "No email given" }), { status: 400 });
    }
    if (data.p_message == null) {
        return new Response(JSON.stringify({ error: "No message given" }), { status: 400 });
    }
    if (data.p_rating == null) {
        return new Response(JSON.stringify({ error: "No rating given" }), { status: 400 });
    }

    try {
        await db.insert(feedbacks).values({
            projectId: data.p_project_id,
            userName: data.p_user_name,
            userEmail: data.p_user_email,
            message: data.p_message,
            rating: data.p_rating
        })
        return new Response(JSON.stringify({ message: "Feedback successfully added" }), { status: 200 });
    } catch (error) {
        console.error(error)
    }
    return new Response(JSON.stringify({ error: "Server-side error" }), { status: 500 });
}