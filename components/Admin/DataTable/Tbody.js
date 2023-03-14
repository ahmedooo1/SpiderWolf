import { useState } from 'react';
import UsersEntity from './Entity/Users';
import GamesEntity from './Entity/Games';

export default function Tbody(props) {

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {props.users ? (
                <UsersEntity users={props.users} />
            ) : props.games ? (
                <GamesEntity games={props.games} />
            ) : (
                <td className="py-3 px-6 whitespace-nowrap text-black">Unknown type</td>
            )
            }
        </tbody >
    );
}
