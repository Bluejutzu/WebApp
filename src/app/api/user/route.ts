import { db } from "@/db";

export async function POST(request: Request) {
    const req = await request.json();

    const dbUser = await db.users.findFirst({ where: { email: req.user.email } });
    if (!dbUser) {
        return db.users
            .create({
                data: {
                    email: req.user.email,
                    password: req.user.password,
                    username: req.user.username,
                    id: req.user.userId
                }
            })
            .then(v => {
                return new Response(
                    JSON.stringify({ message: "Created user successfully", email: v.email, error: false }),
                    { status: 201, headers: { "Content-Type": "application/json" } }
                );
            });
    } else {
        return new Response(
            JSON.stringify({
                message: "User exists already",
                email: dbUser.email,
                givenEmail: req.user.email,
                error: true
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
}
