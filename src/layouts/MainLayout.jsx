import Navbar from "../components/features/Navbar";

export default function MainLayout({ children, hideNavbar = false }) {
  return (
    <>
      {/* Chỉ hiển thị Navbar nếu hideNavbar là false */}
      {!hideNavbar && <Navbar />}
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </>
  );
}