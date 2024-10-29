import UserAPI from "@/components/dashboard/UserAPI";
import { Users, init } from "@kinde/management-api-js";

export default async function Dashboard() {
    init();
    const { users } = await Users.getUsers();
    return (
        <div className="container flex items-start justify-between">
            <div className="card start-hero">
                <p className="text-body-2 start-hero-intro">Woohoo!</p>
                <p className="text-display-2">
                    Your authentication is all sorted.
                    <br />
                    Build the important stuff.
                </p>
            </div>
            <section className="next-steps-section">
                <h2 className="text-heading-1">Next steps for you</h2>
                <UserAPI />
            </section>

            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
    );
}
