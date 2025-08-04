function ItemList({ items }) {
  return (
    <div className="mt-10">
      <p className="font-semibold text-gray-800 text-xl"> ItemList: </p>
      {items.map((item)=>(
        <div className="flex shadow-lg mx-auto mt-4 bg-stone-200">
          <img className="w-full max-h-[150px] object-cover md:w-52 p-2" src={item.itemPhotoURL} alt={item.itemNO}/>
          <div className="px-4">
            <h1 className="text-lg font-semibold text-gray-800 mt-2"> {item.itemName} </h1>
            <p className="text-gray-500"> {item.itemDescription} </p>
            <p className="font-semibold text-rose-600 mt-2"> MRP: ₹{item.itemPrice} </p>
            <p className="text-gray-500"> <strong className="text-gray-600">Listed on: </strong>{item.listingDate.slice(0, 10)} </p>
            <p className="text-gray-500"> <strong className="text-gray-600">Visited by: </strong>{item.itemVisit} </p>
          </div> 
        </div>
      ))}  
    </div>
  );
}

export default ItemList;