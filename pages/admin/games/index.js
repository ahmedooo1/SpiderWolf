import Tbody from "@/components/Admin/DataTable/Tbody";
import Thead from "@/components/Admin/DataTable/Thead";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { PrismaClient } from "@prisma/client";
import { gameColumns } from "@/utils/fielsEntity";
import client from "@/lib/prismadb";


export default function users({ games }) {
    return (
        <AdminLayout>
            <div className="container mx-auto mt-20 px-60">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <Thead columns={gameColumns} />
                                    <Tbody games={games} />
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

    const data = await client.game.findMany()

    const games = data.map(game => ({
        ...game,
        releaseDate: game.releaseDate.toString(),
        createdAt: game.createdAt.toString(),
        updatedAt: game.updatedAt.toString(),
    }))

    client.$disconnect
    return {
        props: { games },
        revalidate: 10,
    };
};