import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCards from "@/components/dashboard/StatsCard";
import RecentNotes from "@/components/dashboard/RecentNotes";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            <WelcomeSection />
            <StatsCards />
            <RecentNotes />
            <QuickActions />
        </div>
    );
}