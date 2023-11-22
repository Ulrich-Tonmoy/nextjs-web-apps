export const dynamic = "force-dynamic";

import { getWorkspaceDetails } from '@/lib/supabase/queries';
import { redirect } from "next/navigation";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const { data, error } = await getWorkspaceDetails(params.workspaceId);
  if (error || !data.length) redirect('/dashboard');
  return (
    <div className="relative">
    </div>
  );
};

export default Workspace;
