
import { FileText, Heart, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Notes",
    value: "24",
    subtitle: "All your saved notes",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: "+12%",
  },
  {
    title: "Favorites",
    value: "08",
    subtitle: "Your important notes",
    icon: Heart,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    trend: "+2",
  },
  {
    title: "Recent Notes",
    value: "12",
    subtitle: "Updated this week",
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: "This week",
  },
];

export default function StatsCards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                <Icon size={22} />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
              <p className="text-xs text-gray-400">{stat.subtitle}</p>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                <TrendingUp size={13} />
                {stat.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
