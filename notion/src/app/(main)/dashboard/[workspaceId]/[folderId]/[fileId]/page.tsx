export const dynamic = "force-dynamic";

import QuillEditor from "@/components/global/quill-editor";
import { getFileDetails } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

const File = async ({ params }: { params: { fileId: string } }) => {
  const { data, error } = await getFileDetails(params.fileId);
  if (error || !data.length) redirect("/dashboard");

  return (
    <div className="relative ">
      <QuillEditor dirType="file" fileId={params.fileId} dirDetails={data[0] || {}} />
    </div>
  );
};

export default File;
