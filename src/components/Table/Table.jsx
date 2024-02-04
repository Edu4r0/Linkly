import Action from "../Action.jsx";
import Status from "./Status.jsx";
import React from "react";
import Qr from "./Qr.jsx";
import "@/App.css";
import ShortLink from "./ShortLink.jsx";

function Table({ data, setData = null, classHead = false, loading = null }) {
  return (
    <div className="overflow-x-auto h-full">
      <table className="2xl:w-full xl:w-full ">
        <thead>
          <tr
            id="shortlink"
            className={`font-semibold ${
              classHead ? "bg-[#181E29]" : "bg-[#0D1117]"
            }`}
          >
            <th className={` py-6 ${classHead && "rounded-tl-[10px]"}`}>
              Short Link
            </th>
            <th className=" py-6 w-auto">Original Link</th>
            <th className="px-6 py-6">QR Code</th>
            <th className="py-6">Clicks</th>
            <th className="py-6">Status</th>
            <th className={`py-6 ${classHead && "rounded-tr-[10px]"}`}>Date</th>
            {!classHead && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="bg-[#101419] w-full transition-all">
                <td colSpan={7}></td>
              </tr>
              <tr
                id="shortlink"
                className={`${classHead ? "bg-[#181E2980]" : "bg-[#11161D]"}`}
              >
                <td className="2xl:px-4 2xl:py-4 ">
                  <ShortLink item={item} />
                </td>
                <td className="2xl:px-4 2xl:py-4 ">
                  <div className="flex w-[70%] m-auto gap-2 items-center justify-between">
                    <img
                      className="h-8 w-8"
                      src={`https://logo.clearbit.com/${item.icon}`}
                      alt={`Logo ${item.icon}`}
                    />
                    <a className="text-start">
                      {item.originalLink.length > 30
                        ? item.originalLink.slice(0, 30) + "..."
                        : item.originalLink}
                    </a>
                  </div>
                </td>
                <td>
                  <Qr item={item} />
                </td>
                <td className="2xl:px-4 2xl:py-4 text-center">{item.clicks}</td>
                <td
                  className={`px-4 flex items-center justify-between gap-[10px] py-4 ${
                    item.status ? "text-[#1EB036]" : "text-[#B0901E]"
                  }`}
                >
                  {item.status ? "Active" : "Inactive"}
                  <Status status={item.status} />
                </td>
                <td className="2xl:px-4 2xl:py-4">
                  {item.date || item.createAt}
                </td>
                {!classHead && (
                  <td className="px-4 py-4">
                    <Action data={data} setData={setData} item={item} />
                  </td>
                )}
              </tr>
              <tr>
                <td></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {data.length > 0 && (
        <div
          id="shortlink"
          class="flex justify-center items-end py-4  absolute bottom-0 w-full h-20 m-auto bg-gradient-to-b from-transparent from-10%  to-[#0b101b] backdrop-blur-[0.6px]"
        >
          <span>
            <a href="/dash" class="text-[#144EE3] text- underline">
              Register Now
            </a>
            to enjoy Unlimited History
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;
