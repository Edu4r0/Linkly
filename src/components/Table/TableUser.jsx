import { useState, useEffect, useMemo } from "react";
import Table from "@/components/Table/Table";
import ListCheck from "@/components/icons/ListCheck";
import Filter from "@/components/icons/Filter";
import columns from "@/data/columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TableUser({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });

  useEffect(() => {
    async function setDataApi() {
      try {
        const response = await fetch(
          `api/user/${session?.user?.name}`
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    setDataApi();
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valueA = a[sorted.sorted];
      const valueB = b[sorted.sorted];

      if (typeof valueA == "string" && typeof valueB == "string") {
        if (sorted.reversed) {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }
      if (sorted.reversed) {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }, [data, sorted.sorted, sorted.reversed]);

  const handleFilter = (property) => {
    setSorted({ sorted: property, reversed: !sorted.reversed });
  };

  return (
    <section className="max-w-[1411px] m-auto mt-[27px] text-[#C9CED6]">
      <div className="flex justify-between">
        <span className="font-bold">History ({Object.keys(data).length})</span>
        <div className="flex gap-4 ">
          <button className="bg-[#181E29] hover:bg-[#181e29bb] border border-[#353C4A] px-6 h-[44px] rounded-3xl flex items-center gap-[10px]">
            <ListCheck />
            <span>Bulk Edit</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#181E29] hover:bg-[#181e29bb] border border-[#353C4A] px-6 h-[44px] rounded-3xl flex items-center gap-[10px]">
                <Filter />
                <span> {`Sort ${sorted.sorted && ` - ${sorted.sorted}`}`}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#181E29] border border-[#353C4A]">
              {columns.map((column, index) => (
                <DropdownMenuItem
                  onClick={() => handleFilter(column)}
                  key={index}
                >
                  {column}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {sorted.sorted && (
            <button
              className="bg-[#181E29] hover:bg-[#181e29bb] border border-[#353C4A] px-6 h-[44px] rounded-3xl flex items-center"
              onClick={() => handleFilter("")}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="mt-[28px]">
        
          <Table data={sortedData} loading={loading} setData={setData} />
      </div>
    </section>
  );
}
