import DocumentationTabs from "@/components/DocumentationTabs";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Metadata } from "next";
import { FC } from "react";
import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
  title: "Rapid API | Documentation",
  description: "Free & open-source text Rapid API",
};

const Page: FC = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/rapid</Paragraph>
        <DocumentationTabs />
      </div>
    </div>
  );
};

export default Page;
