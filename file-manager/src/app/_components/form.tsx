"use client";
import { upload } from "@/app/actions";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/app/constants";
import { formatFileSize } from "@/app/utils";
import { useState } from "react";

export const Form = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpload = async (formData: FormData) => {
    const result = await upload(formData);
    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-[#282a36] mb-8 border border-[#44475a]">
      <form action={handleUpload}>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-[#44475a] rounded-lg p-6 bg-[#1e1f29]">
            <input
              name="file"
              type="file"
              accept={Object.keys(ALLOWED_TYPES).join(",")}
              className="text-[#f8f8f2] file:p-2 file:rounded-lg file:border-0 file:bg-[#bd93f9] hover:file:bg-[#ff79c6]"
            />
            <p className="mt-2 text-[#6272a4]">
              Max file size: {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>
          {errorMessage && <p className="text-[#ff5555]">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-[#bd93f9] rounded-lg hover:bg-[#ff79c6]"
          >
            Upload File
          </button>
        </div>
      </form>
    </div>
  );
};
