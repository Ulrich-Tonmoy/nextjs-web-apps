"use client";

import { supabase } from "@/lib/supabase";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const FileUpload = ({ onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  const onDelete = async () => {
    const img = value.split("file/")[1] ?? "";
    const { data, error } = await supabase.storage.from("file").remove([img]);
    onChange("");
  };

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onDelete()}
          className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value.split("file/").pop()}
        </a>
        <button
          onClick={() => onDelete()}
          className="absolute p-1 text-white rounded-full shadow-sm bg-rose-500 -top-2 -right-2"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const handleFileUpload = async (file: any) => {
    const { data, error } = await supabase.storage
      .from("file")
      .upload(uuidv4() + file.name, file, {
        cacheControl: "3600",
        upsert: false,
      });
    onChange(
      "https://gxofqswgvpwamruhdboy.supabase.co/storage/v1/object/public/file/" +
        data?.path,
    );
  };

  return (
    <Dropzone onDrop={(acceptedFiles) => handleFileUpload(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
        <div className="max-w-xl">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or &nbsp;
                  <span className="text-blue-600 underline">browse</span>
                </span>
              </div>
            </span>
          </label>
        </div>
      )}
    </Dropzone>
  );
};
