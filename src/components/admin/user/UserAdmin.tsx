import AdminMain from "../AdminMain";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FaFileExport } from "react-icons/fa";
import UserTable from "./components/UserTable";

export default function UserAdmin() {
  return (
    <AdminMain>
      <Card>
        <CardContent className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Customer Information
          </CardTitle>
          <div className="flex gap-2">
            <button className="items-center flex justify-center py-1 px-3 hover:underline gap-1">
              <FaFileExport />
              Export
            </button>
          </div>
        </CardContent>
      </Card>
      <UserTable />
    </AdminMain>
  );
}
