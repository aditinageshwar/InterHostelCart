function ReportList({ reports, onVerify, onDelete }) 
{
  if(!Array.isArray(reports) || reports.length === 0) {
    return <p className="font-semibold text-gray-800 text-xl mt-10"> No report found!</p>;
  }

  return (
    <div className="space-y-4 mt-10">
      <p className="font-semibold text-gray-800 text-xl">Reported Items: </p>
      <ul>
        {reports.map((report) => (
          <li key={report.itemNO} className="grid grid-cols-6 items-center border-b py-3 bg-stone-200 shadow-lg mt-2 gap-4 px-4">
            <img className="col-span-1 w-full max-h-[100px] object-cover md:w-52" src={report.itemPhotoURL} alt={report.itemNO}/>
            <div className="col-span-2 flex flex-col">
              <p className="text-lg font-semibold text-gray-700 pl-10">{report.itemName}</p>
              <p className="text-sm text-gray-600 mt-1 pl-10">{report.itemDescription}</p>
            </div>
            <p className="col-span-1 text-lg font-medium text-gray-700 pl-2">MRP:  ₹{report.itemPrice}</p>
            <button onClick={() => onVerify(report.itemNO)} className="col-span-1 ml-16 w-2/3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition duration-200">
              Dismiss Report
            </button>
            <button onClick={() => onDelete(report.itemNO)} className="col-span-1 w-2/3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 focus:outline-none transition duration-200">
              Delete & Block
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportList;
  