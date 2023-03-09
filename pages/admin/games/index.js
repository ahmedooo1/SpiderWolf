import Tbody from "@/components/Admin/DataTable/Tbody";
import Thead from "@/components/Admin/DataTable/Thead";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { PrismaClient } from "@prisma/client";

export default function index() {
    return (
        <AdminLayout>
            <div className="container mx-auto mt-20 px-60">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    )
}
