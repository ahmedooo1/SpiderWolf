import Tbody from "@/components/Admin/DataTable/Tbody";
import Thead from "@/components/Admin/DataTable/Thead";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { gameColumns } from "@/utils/fielsEntity";
import client from "@/lib/prismadb";
import React, { useState } from 'react';

const PAGE_SIZE = 10;

export default function GamesPage({ games }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(games.length / PAGE_SIZE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentGames = games.slice(startIndex, endIndex);

    return (
        <AdminLayout>
            <div className="container mx-auto mt-20 px-6">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <Thead columns={gameColumns} />
                                    <Tbody games={currentGames} />
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center my-6">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`mx-1 px-4 py-2 rounded-lg border ${currentPage === page ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <p className="text-gray-500">
                            Showing {startIndex + 1}-{Math.min(endIndex, games.length)} of {games.length} games
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export const getStaticProps = async ({ params }) => {
    const page = params?.page ?? 1;
    const skip = (page - 1) * PAGE_SIZE;
    const data = await client.game.findMany({
        skip,
        take: PAGE_SIZE,
    });

    client.$disconnect();

    const games = data.map((game) => ({
        ...game,
        releaseDate: game.releaseDate.toString(),
        createdAt: game.createdAt.toString(),
        updatedAt: game.updatedAt.toString(),
    }));
    return {
        props: { games },
        revalidate: 10,
    };
};
