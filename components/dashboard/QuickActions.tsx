
import Link from "next/link";
import {
    Plus,
    FileText,
    Heart,
    Settings,
    ArrowUpRight,
} from "lucide-react";

const actions = [
    {
        title: "Create New Note",
        description: "Write down a new idea",
        href: "/notes",
        icon: Plus,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        title: "Browse All Notes",
        description: "Manage your saved notes",
        href: "/notes",
        icon: FileText,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
    },
    {
        title: "Favorite Notes",
        description: "Access important notes",
        href: "/notes?filter=favorites",
        icon: Heart,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-600",
    },
    {
        title: "Account Settings",
        description: "Manage your preferences",
        href: "/profile",
        icon: Settings,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
    },
];

export default function QuickActions() {
    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Quick Actions
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Everything you need, just one click away.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
                        >
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconBg} ${action.iconColor}`}>
                                <Icon size={21} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-sm font-semibold text-gray-800 transition group-hover:text-blue-600">
                                    {action.title}
                                </h3>
                                <p className="mt-1 truncate text-xs text-gray-400">
                                    {action.description}
                                </p>
                            </div>

                            <ArrowUpRight
                                size={16}
                                className="shrink-0 text-gray-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                            />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
