import { useState } from 'react';
import UsersEntity from './Entity/Users';

export default function Tbody(props) {
    const { users } = props;

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {props.users ? (
                <UsersEntity users={users} />
            ) : (
                <td className="py-3 px-6 whitespace-nowrap text-black">Unknown type</td>
            )
            }
        </tbody>
    );
}
