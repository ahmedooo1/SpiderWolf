import { useState } from 'react';
import UsersEntity from './Entity/Users';
import GamesEntity from './Entity/Games';
import GenresEntity from './Entity/Genre';

export default function Tbody(props) {
    console.log(props.genres)

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {props.users ? (
                <UsersEntity users={props.users} />
            ) : props.games ? (
                <GamesEntity games={props.games} />
            ) : props.genres ? (
                <GenresEntity genres={props.genres} />
            ) : (
                <td className="py-3 px-6 whitespace-nowrap text-black">Unknown type</td>
            )
            }
        </tbody >
    );
}
