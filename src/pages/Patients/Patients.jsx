import PatientsTable from "../../components/PatientsTable/PatientsTable";
import { useGetPatientsQuery } from "../../services/appApi";

function Patients() {
  const { currentData, isLoading } = useGetPatientsQuery();
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <PatientsTable data={currentData} isLoading={isLoading} />
    </div>
  );
}

export default Patients;
