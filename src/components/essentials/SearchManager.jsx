import React, { useEffect, useState } from "react";
import TableRow from "../partials/admin/service-table-row/TableRow";
import PriceTableRow from "../partials/admin/price-table-row/PriceTableRow";
import WarrantyViewCard from "../partials/admin/WarrantyViewCard";

// Service Search Manager
export function ServiceSearchManager({ searchQuery, data }) {
  const [temp, setTemp] = useState([]);
  const [no, setNo] = useState(true);

  useEffect(() => {
    var search = searchQuery.toLowerCase();
    if (search) {
      var filter = data.filter(
        (ser) =>
          ser.ID.toString().includes(search) ||
          ser.cName.toLowerCase().includes(search) ||
          ser.itemName.toLowerCase().includes(search)
      );
      if (filter.length < 1) {
        setNo(true);
      }
      setNo(false);
      setTemp(filter);
    } else {
      setNo(true);
      setTemp([]);
    }
  }, [searchQuery, data]);

  return no ? (
    <div className="text-center">Result will shown here...</div>
  ) : temp?.length < 1 ? (
    <div className="text-center text-red-500">No result to show...</div>
  ) : (
    <div className="flex flex-col pb-2">
      <div className="max-h-[340px] pr-1 search-manager-scroll overflow-y-scroll">
        <table className="w-full">
          <thead>
            <tr className="text-gray-100 bg-teal-700 pl-4 rounded gap-4">
              <td>Id</td>
              <td>Customer</td>
              <td>Item</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {temp?.map((d) => (
              <TableRow key={d.ID} values={d} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider mt-4"></div>
      <div className="mt-2 text-center">
        Showing results: {"[ "}
        <span className="text-teal-500">{temp?.length}</span>
        {" ]"}
      </div>
    </div>
  );
}

// Price List Search Manager
export function PriceListSearchManager({ searchQuery, data }) {
  const [temp, setTemp] = useState([]);
  const [no, setNo] = useState(true);

  useEffect(() => {
    var search = searchQuery.toLowerCase();
    if (search) {
      var filter = data.filter(
        (p) =>
          p.ID.toString().includes(search) ||
          p.productId.toString().includes(search) ||
          p.product.toLowerCase().includes(search)
      );
      if (filter.length < 1) {
        setNo(true);
      }
      setNo(false);
      setTemp(filter);
    } else {
      setNo(true);
      setTemp([]);
    }
  }, [searchQuery, data]);

  return no ? (
    <div className="text-center">Result will shown here...</div>
  ) : temp?.length < 1 ? (
    <div className="text-center text-red-500">No result to show...</div>
  ) : (
    <div className="text-center">
      <div className="flex flex-col gap-2 pr-1 mt-8 max-h-[340px] search-manager-scroll overflow-y-scroll">
        <div className="grid grid-cols-5 font-semibold text-lg tracking-wider bg-slate-700 text-slate-200 py-2 rounded">
          <div>Id</div>
          <div>Product Id</div>
          <div>RLP</div>
          <div>MRP</div>
          <div>Actions</div>
        </div>

        {temp?.map((pl) => (
          <PriceTableRow key={pl.ID} values={pl} />
        ))}
      </div>
      <div className="divider mt-4"></div>
      <div className="mt-2 text-center">
        Showing results: {"[ "}
        <span className="text-teal-500">{temp?.length}</span>
        {" ]"}
      </div>
    </div>
  );
}

// Warranty Cards Search Manager
export function WarrantyCardSearchManager({ searchQuery, data }) {
  const [temp, setTemp] = useState([]);
  const [no, setNo] = useState(true);

  useEffect(() => {
    var search = searchQuery.toLowerCase();
    if (search) {
      var filter = data.filter(
        (p) =>
          p.ID.toString().includes(search) ||
          p.cMobile.toString().includes(search) ||
          p.itemName.toLowerCase().includes(search) ||
          p.cName.toLowerCase().includes(search)
      );
      if (filter.length < 1) {
        setNo(true);
      }
      setNo(false);
      setTemp(filter);
    } else {
      setNo(true);
      setTemp([]);
    }
  }, [searchQuery, data]);

  return no ? (
    <div className="text-center">Result will shown here...</div>
  ) : temp?.length < 1 ? (
    <div className="text-center text-red-500">No result to show...</div>
  ) : (
    <div className="text-center">
      <div className="flex flex-col gap-2 mt-8 pr-1 max-h-[340px] search-manager-scroll overflow-y-scroll">
        <div className="w-full flex flex-col gap-3 pb-2 text-slate-300">
          {temp?.map((d) => (
            <WarrantyViewCard key={d.ID} values={d} />
          ))}
        </div>
      </div>
      <div className="divider mt-4"></div>
      <div className="mt-2 text-center">
        Showing results: {"[ "}
        <span className="text-teal-500">{temp?.length}</span>
        {" ]"}
      </div>
    </div>
  );
}
