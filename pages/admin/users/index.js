import Tbody from "@/components/Admin/DataTable/Tbody";
import Thead from "@/components/Admin/DataTable/Thead";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { PrismaClient } from "@prisma/client";

const columns = [{ id: 0, title: '' }, { id: 1, title: 'ID' }, { id: 2, title: 'Name' }, { id: 3, title: 'Email' }, { id: 4, title: 'Validate' } ,{ id: 5, title: 'Edit' }, { id: 6, title: 'Delete' },];

export default function users({ users }) {
    return (
        <AdminLayout>
            <div className="container mx-auto mt-20 px-60">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">


                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <Thead columns={columns} />
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
    const prisma = new PrismaClient()
    const data = await prisma.user.findMany()
    // const users = JSON.stringify(data)
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