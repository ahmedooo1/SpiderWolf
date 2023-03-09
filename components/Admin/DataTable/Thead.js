export default function Thead({ columns }) {

    return (
        <>
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
}
