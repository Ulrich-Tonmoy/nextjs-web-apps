import Header from "@/components/landing-page/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default HomeLayout;
