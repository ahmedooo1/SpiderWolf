import client from "@/lib/prismadb";

export default function Collections({ games }) {
    return (
        <div className="flex flex-wrap justify-center ">
            {games.map((game) => (
                <div className="max-w-md w-full rounded-md shadow-lg m-4" key={game.id}>
                    <img className="w-full h-64 object-cover rounded-t-md" src={`uploads/${game.images[0].source}`} alt={game.title} />
                    <div className="px-4 py-2 bg-white rounded-b-md">
                        <h2 className="text-gray-700 text-lg font-semibold mb-2">{game.title}</h2>
                        <p className="text-gray-700 mb-4">{game.description}</p>
                        <div className="flex justify-between text-gray-700 text-sm">
                            <span>Developer: {game.developer}</span>
                            <span>Editor: {game.editor}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const gameData = await client.game.findMany({
        include: {
            images: true,
            genre: true
        }
    });

    client.$disconnect()
    const games = gameData.map((game) => {
        const images = game.images.map((image) => ({
            ...image,
            createdAt: image.createdAt.toISOString(),
            updatedAt: image.updatedAt.toISOString()
        }));

        return {
            ...game,
            createdAt: game.createdAt.toISOString(),
            updatedAt: game.updatedAt.toISOString(),
            images
        };
    });

    return {
        props: {
            games
        },
        revalidate: 60
    };
}
