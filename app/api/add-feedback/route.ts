// Add feedback to the database
import { db } from "@/db";
import { feedbacks } from "@/db/schema";


export async function POST(req: Request) {
    //Validation
    // console.log(req.get('host'))
    // TODO Check origin and project-id 
    console.log(req.headers.get("origin"))
    const data = await req.json()
    if (data.projectId == null) {
        return new Response(JSON.stringify({ data: { error: "Bad Request. projectId is empty " } }), { status: 400 });
    }
    if (data.userName == null) {
        return new Response(JSON.stringify({ data: { error: "No name given" } }), { status: 400 });
    }
    if (data.userEmail == null) {
        return new Response(JSON.stringify({ data: { error: "No email given" } }), { status: 400 });
    }
    if (data.message == null) {
        return new Response(JSON.stringify({ data: { error: "No message given" } }), { status: 400 });
    }
    if (data.rating == null) {
        return new Response(JSON.stringify({ data: { error: "No rating given" } }), { status: 400 });
    }

    try {
        await db.insert(feedbacks).values({...data})
        return new Response(JSON.stringify({ data: { returnedData: "Feedback successfully added" } }), { status: 200 });
    } catch (error) {
        console.error(error)
    }
    
    return new Response(JSON.stringify({ data: { error: "Server-side error" } }), { status: 500 });
}