import { Switch } from '@headlessui/react'

export default function UsersEntity({ users }) {
    return (
        <>
            {users.map((user) => (
                <tr key={user.id}>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center h-5">
                            <input
                                id={`checkbox-${user.id}`}
                                type="checkbox"
                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`checkbox-${user.id}`} className="sr-only">
                                Checkbox
                            </label>
                        </div>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{(user.id).slice(0, 5) + '...'}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{user.pseudo}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{user.email}</td>
                    <td className="py-3 px-6 whitespace-nowrap">
                        <Switch
                            checked={user.isActivated}
                            onChange={(value) => console.log(value)}
                            className={`${user.isActivated ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${user.isActivated ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </td>
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
