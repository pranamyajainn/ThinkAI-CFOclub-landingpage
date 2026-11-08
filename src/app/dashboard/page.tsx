import type { Metadata } from "next";
import { hasDashboardAccess } from "@/lib/dashboardAuth";
import { loadDashboardData } from "@/lib/dashboardData";
import { MissingAdminCredentialsError } from "@/lib/firebaseAdmin";
import PasscodeGate from "@/components/dashboard/PasscodeGate";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Team Dashboard — CFO AI Hub",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  if (!(await hasDashboardAccess())) {
    return <PasscodeGate />;
  }

  const result = await loadDashboardData().then(
    (data) => ({ data, error: null as unknown }),
    (error: unknown) => ({ data: null, error })
  );

  if (result.data) {
    return <Dashboard data={result.data} />;
  }

  console.error("[Dashboard] Failed to load data:", result.error);
  const missingKey = result.error instanceof MissingAdminCredentialsError;
  return (
    <main className="min-h-screen bg-surface-subtle flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(26,26,46,0.04)] p-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-primary">Could not load the data</h1>
        <p className="mt-3 text-sm text-text-muted leading-6">
          {missingKey
            ? "The dashboard is not connected to the database yet. The site owner needs to add the Firebase service account key."
            : "The database did not respond. Please refresh the page in a minute."}
        </p>
      </div>
    </main>
  );
}
