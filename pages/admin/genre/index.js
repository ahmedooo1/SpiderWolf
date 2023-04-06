import client from '@/lib/prismadb';
import Tbody from "@/components/Admin/DataTable/Tbody";
import Thead from "@/components/Admin/DataTable/Thead";
import AdminLayout from '@/layouts/admin/AdminLayout';
import { genreColumns } from '@/utils/fielsEntity';

export default function index({genres}) {
  return (
    <AdminLayout>
      <div className="container mx-auto mt-20 px-60">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <Thead columns={genreColumns} />
                  <Tbody genres={genres} />
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
  const genres = await client.genre.findMany()

  client.$disconnect
  return {
    props: { genres },
    revalidate: 10,
  };
};
