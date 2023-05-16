import Tbody from "@/components/Admin/DataTable/Tbody";
import Thead from "@/components/Admin/DataTable/Thead";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { PrismaClient } from "@prisma/client";
import { userColumns } from "@/utils/fielsEntity";
import client from "@/lib/prismadb";


export default function users({ users }) {
    return (
        <AdminLayout>
            <div className="container mx-auto mt-20 px-60">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <Thead columns={userColumns} />
                                    <Tbody users={users} />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    )
}

export const getStaticProps = async () => {
    const data = await client.user.findMany()

    const users = data.map(user => ({
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toString(),
    }))

    return {
        props: { users },
        revalidate: 10,
    };
};