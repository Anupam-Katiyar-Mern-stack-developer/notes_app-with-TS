import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCards from "@/components/dashboard/StatsCard";
import RecentNotes from "@/components/dashboard/RecentNotes";
import QuickActions from "@/components/dashboard/QuickActions";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await requireUser();
    console.log(user);
    if (!user) {
        redirect("/login")
    }
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            <WelcomeSection name={user.name}/>
            <StatsCards />
            <RecentNotes />
            <QuickActions />
        </div>
    );
}