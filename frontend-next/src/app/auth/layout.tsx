import MobileMenu from "@/components/nav/mobileMenu";

const Layout = ({ children }: any) => {
  return (
    <main>
      <MobileMenu />
      <div className="pt-16 mt-2 bg-[#64748B]">
        {/* Content with top padding to avoid overlapping with the fixed header */}
        {children}
      </div>
    </main>
  );
};

export default Layout;
