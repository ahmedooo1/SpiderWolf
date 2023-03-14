import { Switch } from '@headlessui/react'

export default function GamesEntity({ games }) {
    return (
        <>
            {games.map((game) => (
                <tr key={game.id}>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center h-5">
                            <input
                                id={`checkbox-${game.id}`}
                                type="checkbox"
                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`checkbox-${game.id}`} className="sr-only">
                                Checkbox
                            </label>
                        </div>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{(game.id).slice(0, 5) + '...'}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{game.title}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{game.developer}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{game.editor}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{game.releaseDate}</td>


                    <td className="py-3 px-6 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-green-500 hover:text-green-700">
                            Edit
                        </a>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-red-500 hover:text-red-700">
                            Delete
                        </a>
                    </td>
                </tr>
            ))}
        </>
    )
}
