import Sidebar from "@/components/Admin/Sidebar/Sidebar";


const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};


export default AdminLayout;