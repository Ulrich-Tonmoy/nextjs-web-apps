import { getActiveProductsWithPrice } from "@/lib/supabase/queries";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  return (
    <main className="flex overflow-hidden h-screen">
      {children}
    </main>
  );
};

export default DashboardLayout;
