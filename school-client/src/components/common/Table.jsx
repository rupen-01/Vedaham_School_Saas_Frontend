import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useColorContext } from "../../context/context";

// Helper function to format date in dd/mm/yy format
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of year

  return `${day}/${month}/${year}`;
};

// Helper function to safely get nested values
const getNestedValue = (obj, path) => {
  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  // Parse path supporting array indices like data[0].user.name
  const pathSegments = path
    .replace(/\[(\d+)\]/g, '.$1') // convert [0] to .0
    .split('.');

  let value = pathSegments.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : "-";
  }, obj);

  // Format if it's a date
  if (path.toLowerCase().includes("date") && isValidDate(value)) {
    return formatDate(value); // Use ddmmyy format for all screen sizes
  }

  // Clamp long text to 3 lines max (or shorter on mobile)
  const clampText = (text, maxLength = 150) => {
    if (window.innerWidth < 800) {
      maxLength = 60;
    }
    if (typeof text === "string" && text.length > maxLength) {
      return text.slice(0, maxLength).trim() + "…";
    }
    return text;
  };

  if (Array.isArray(value)) {
    return value.length > 0 ? clampText(value.join(", ")) : "--";
  }

  return clampText(value || "-");
};



export default function Table({
  headers = [],
  dataKeys = [],
  Data = [],
  hiddenActions = [],
  onEdit,
  onDelete,
  onView,
  isLoading = false,
  extraColumns = [],
  paginationshow = true,
  extraMethods = {},
  Search = false,
  SerachWidth = "full",
  Searchholder = "Search...",
  CheckboxShow = false,
  Searchvalue,
  SearchChange,
  SearchButtonClick,
  onClear,
  children,
  extraContent,
  nextLine = false,
  Export,
  ExportFunction = () => { },
  filters = true,
  ImageKey = false,
  ImageContainerShow = true,
  hasStatus = false,
  rowPage = 5,
  selectedRows = [],
  setSelectedRows = () => { },
  PDFExport,
  PDFExportFunction = () => { },
  isRadio = false,
  // Add new props for server-side pagination
  totalItems = 0,
  page = 1,
  onPageChange = () => { },
  onRowsPerPageChange = () => { },
  AuthRole,
  Role,
  customActions = [],
}) {
  const { color } = useColorContext();
  const [isOpen, setActiveRow] = useState(false);

  // Row per page settings 
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowPage);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(dataKeys);

  const updateVisibleKeys = () => {
    const width = window.innerWidth;
    const hasStatusCol = !!hasStatus;
    const allKeys = hasStatusCol ? [...dataKeys] : dataKeys;
    const totalHeaderLength = headers.length + (hasStatusCol ? 1 : 0);

    if (width < 600) {
      // First 2 and last 2
      const firstTwo = allKeys.slice(0, 2);
      const lastTwo = allKeys.slice(-3);
      setVisibleKeys([...firstTwo, ...lastTwo]);
    } else if (width < 800) {
      if (headers.length === 4) {
        setVisibleKeys(allKeys); // Show all
      } else {
        const temp = [...allKeys];
        temp.splice(1, 2); // Remove second
        setVisibleKeys(temp);
      }
    } else if (width < 990 && totalHeaderLength === 6) {
      const temp = [...allKeys];
      temp.splice(2, 1); // Remove middle
      setVisibleKeys(temp);
    } else {
      setVisibleKeys(allKeys);
    }
  };

  useEffect(() => {
    updateVisibleKeys();
    window.addEventListener("resize", updateVisibleKeys);
    return () => window.removeEventListener("resize", updateVisibleKeys);
  }, [headers, dataKeys, hasStatus]);

  // Create full key-label map
  const allKeys = hasStatus ? [...dataKeys] : dataKeys;
  const allHeaders = hasStatus ? [...headers] : headers;

  // Filter headers based on visibleKeys
  const visibleHeaders = visibleKeys.map((key) => {
    const index = allKeys.indexOf(key);
    return allHeaders[index];
  });

  const handleRowsChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Start from page 1 when changing rows per page
    setDropdownOpen(false);
  };

  const totalPages = Math.ceil(Data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentRows = Data.slice(indexOfFirstRow, indexOfLastRow);
  const currentRows = Array.isArray(Data) ? Data.slice(indexOfFirstRow, indexOfLastRow) : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (Data.length <= rowsPerPage) {
      setCurrentPage(1);
    }
  }, [Data])

  // State for checkboxes
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // // Handle selecting/deselecting rows
  // const handleRowSelect = (id) => {
  //   let updatedSelection = selectedRows.includes(id)
  //     ? selectedRows.filter((rowId) => rowId !== id)
  //     : [...selectedRows, id];

  //   setSelectedRows(updatedSelection);
  //   setSelectAll(updatedSelection.length === currentRows.length);
  // };

  // // Handle select all rows
  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(currentRows.map((row) => row._id));
  //   }
  //   setSelectAll(!selectAll);
  // };

  const handleSelectAll = () => {
    if (isRadio) {
      // For radio button behavior, select all is not applicable
      return;
    }
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(Data.map((row) => row._id));
    }
    setSelectAll(!selectAll);
  };
  const handleRowSelect = (id) => {
    if (isRadio) {
      // For radio button behavior, only allow one selection
      setSelectedRows([id]);
    } else {
      // For checkbox behavior, allow multiple selections
      let updatedSelection = selectedRows.includes(id)
        ? selectedRows.filter((rowId) => rowId !== id)
        : [...selectedRows, id];
      setSelectedRows(updatedSelection);
      setSelectAll(updatedSelection.length === Data.length);
    }
  };
  useEffect(() => {
    setSelectAll(selectedRows.length === Data.length && Data.length > 0);
  }, [selectedRows, Data]);



  //status settings 
  // Status badge styles
  const statusStyles = {
    // General Order Status
    Pending: "text-yellow-700 bg-yellow-100",
    Suspended: "text-yellow-700 bg-yellow-100",
    Printed: "text-[#10B981] bg-[#D1FAE5]",
    "In-Process": "text-indigo-700 bg-indigo-100",
    Completed: "text-green-700 bg-green-100",
    completed: "text-green-700 bg-green-100",
    Cancelled: "text-red-700 bg-red-100",
    Refunded: "text-gray-700 bg-gray-100",
    New: "bg-green-100 text-green-800",
    "Follow-up": "bg-yellow-100 text-yellow-800",
    Converted: "bg-blue-100 text-blue-800",
    "Not Interested": "bg-red-100 text-red-800",

    // Processing Status
    Processing: "text-blue-700 bg-blue-100",

    // Payment Status
    Paid: "text-green-700 bg-green-100",
    Unpaid: "text-red-700 bg-red-100",
    "Out of date": "text-yellow-700 bg-yellow-100",
    Progress: "text-blue-700 bg-blue-100",
    Partial: "text-orange-700 bg-orange-100",

    // User Account Type
    Individual: "text-gray-700 bg-gray-100",
    Business: "text-blue-700 bg-blue-100",
    VIP: "text-yellow-700 bg-yellow-100",

    // Data Types
    boolean: "text-purple-700 bg-purple-100",
    string: "text-blue-700 bg-blue-100",
    checklist: "text-green-700 bg-green-100",
    option: "text-orange-700 bg-orange-100",

    // New Statuses
    Active: "text-green-700 bg-green-100",
    Banned: "text-red-700 bg-red-100",
    "Needs Changes": "text-orange-700 bg-orange-100",
    Approved: "text-green-700 bg-green-200",

    "low-stock": "text-orange-700 bg-orange-100",
    "out-of-stock": "text-red-700 bg-red-100",
    "in-stock": "text-green-700 bg-green-100",
  };



  return (
    <div className="bg-white border border-gray-200 text-[#1C252E] shadow-md rounded-xl overflow-x-scroll  transition-shadow" style={{ scrollbarWidth: "none", scrollbarstyle: "none" }}>
      {filters && filters}
      <div className="flex items-center">
        {Search && (
          <div className=" mb-5 px-3 sm:px-5 pt-3 sm:pt-5">
            <div
              className="group relative flex items-center h-[44px] sm:h-[44px] rounded-xl border border-gray-200 
                 bg-white/60 backdrop-blur-md transition-all duration-300 overflow-hidden 
                 w-full max-w-full"
            >
              {/* Search Icon */}
              <div className="flex items-center justify-center px-2 sm:px-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                >
                  <path
                    fill="currentColor"
                    d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
                  />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder={Searchholder}
                value={Searchvalue}
                onChange={(e) => SearchChange(e)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    SearchButtonClick && Searchvalue && SearchButtonClick(Searchvalue);
                  }
                }}
                className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 border-none focus:outline-none 
                   px-1 sm:px-2  text-xs sm:text-sm min-w-lg" // <-- min-w-0 avoids shrinking issues
              />

              {/* Clear Button */}
              {Searchvalue && (
                <button
                  onClick={() => onClear && onClear()}
                  className="text-gray-400 hover:text-gray-600 px-1 sm:px-2 flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}

              {/* Search Button */}
              <button
                onClick={() =>
                  SearchButtonClick && Searchvalue && SearchButtonClick(Searchvalue)
                }
                className="hidden sm:flex text-white px-3 sm:px-6 h-[32px] sm:h-[36px] mr-1 sm:mr-2 rounded-lg sm:rounded-xl 
                   text-xs sm:text-sm font-medium items-center justify-center 
                   transition-colors duration-200 cursor-pointer flex-shrink-0"
                style={{ background: color }}
              >
                Search
              </button>
            </div>
          </div>
        )}


        {children && children}
      </div>
      {/* Export, PDF, children, etc. */}
      <div className={(extraContent || Export || PDFExport) && "h-22 py-5 px-5 flex gap-3 items-center flex-wrap"}>

        {Export && ExportFunction && (
          <button
            type="button"
            onClick={ExportFunction}
            title="Export"
            className={`flex items-center cursor-pointer justify-center rounded-lg border border-gray-100 hover:bg-gray-200 transition-all text-gray-900 font-semibold text-sm px-4 py-3.5`}
          >
            <span className="md:mr-2"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={{ userSelect: 'none', display: 'block', flexShrink: 0, transition: 'fill 0.3s cubic-bezier(0.4, 0, 0.2, 1)', fill: 'rgb(28, 37, 46)', fontSize: '18px', width: '20px', height: '20px', boxSizing: 'border-box' }}>
              <path fill="currentColor" fill-rule="evenodd" d="M8.845 7.905a.75.75 0 0 0 1.06 0l1.72-1.72v8.19a.75.75 0 0 0 1.5 0v-8.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06" clip-rule="evenodd" style={{ boxSizing: 'border-box' }}></path>
              <path fill="currentColor" d="M12.375 20.375a8 8 0 0 0 8-8h-3.75c-.943 0-1.414 0-1.707.293c-.293.293-.293.764-.293 1.707a2.25 2.25 0 0 1-4.5 0c0-.943 0-1.414-.293-1.707c-.293-.293-.764-.293-1.707-.293h-3.75a8 8 0 0 0 8 8" style={{ boxSizing: 'border-box' }}></path>
            </svg></span>
            <span className="md:block hidden">Export</span>
          </button>
        )}
        {PDFExport && PDFExportFunction && (
          <button
            type="button"
            onClick={PDFExportFunction}
            title="Export PDF"
            className={`flex items-center cursor-pointer justify-center rounded-lg border border-gray-100 hover:bg-gray-200 transition-all text-gray-900 font-semibold text-sm px-4 py-3.5`}
          >
            <span className="md:mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
            </span>
            <span className="md:block hidden">Export PDF</span>
          </button>
        )}
        {extraContent}
      </div>
      {nextLine && nextLine}
      {isLoading ? (
        <div className="bg-white w-full text-[#1C252E] shadow-sm rounded-xl overflow-hidden transition-shadow">
          <div className="overflow-x-auto xl:w-full w-[96dvw] sm:w-[93dvw] md:w-[95dvw] lg:w-[82dvw]">
            <table className="w-full border-collapse">
              <thead className="bg-[#f3f4f6]">
                <tr className="text-[#1c252ee1] align-middle outline-none mt-2 sm:mt-0">
                  <th className="p-4 text-[14px] py-2.5 text-left font-semibold text-[#637381]">
                    <div className="h-4 w-8 bg-gray-200 animate-pulse rounded" />
                  </th>
                  {CheckboxShow && (
                    <th className="border-gray-100 border-b-[0.8px]">
                      <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-xl ml-5" />
                    </th>
                  )}
                  {visibleHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="p-[19px] px-2 py-2.5 capitalize text-nowrap text-xs md:text-[14px] text-left font-medium text-gray-800 border-b-[0.8px] border-gray-100"
                    >
                      <div className="h-4 bg-gray-200 animate-pulse rounded px-2" />
                    </th>
                  ))}
                  {extraColumns.map((column, index) => (
                    <th
                      key={`extra-${index}`}
                      className="p-[19px] py-2.5 text-nowrap text-xs md:text-[14px] text-left font-semibold text-gray-800 border-b-[0.8px] border-gray-100"
                    >
                      <div className="h-4 bg-gray-200 animate-pulse rounded" />
                    </th>
                  ))}
                  {hasStatus && (
                    <th className="p-2 text-xs md:text-[14px] text-left font-semibold text-gray-800">
                      <div className="h-4 w-12 bg-gray-200 animate-pulse rounded px-2" />
                    </th>
                  )}
                  {(!hiddenActions.includes("View") ||
                    !hiddenActions.includes("Edit") ||
                    !hiddenActions.includes("Delete")) && (
                      <th className="text-center p-[19px] text-sm md:text-[14px] font-semibold text-gray-800 border-b-[0.8px] border-gray-100">
                        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mx-auto" />
                      </th>
                    )}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="text-gray-500 align-middle bg-white hover:bg-gray-50 transition-colors duration-200">
                    <td className="p-4 py-2 text-xs md:text-[12.25px] font-semibold text-left border-b-[0.8px] border-gray-300 border-dashed capitalize">
                      <div className="h-4 w-6 bg-gray-200 animate-pulse rounded" />
                    </td>
                    {CheckboxShow && (
                      <td className="border-gray-300 border-dashed border-b-[0.8px]">
                        <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-xl ml-5" />
                      </td>
                    )}
                    {visibleKeys.map((key, colIndex) => (
                      <td
                        key={colIndex}
                        className="p-4 py-2 text-[12.25px] md:text-[12.25px] leading-[19.25px] text-start tracking-normal text-[#1c252e] bg-white border-b-[0.8px] border-gray-300 border-dashed capitalize"
                      >
                        <div className={`h-4 bg-gray-200 animate-pulse rounded ${colIndex % 3 === 0 ? 'w-20' : colIndex % 3 === 1 ? 'w-32' : 'w-16'}`} />
                      </td>
                    ))}
                    {extraColumns.map((_, colIndex) => (
                      <td
                        key={`extra-${colIndex}`}
                        className="p-4 border-gray-300 border-dashed border-b-[0.8px]"
                      >
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                      </td>
                    ))}
                    {hasStatus && (
                      <td className="px-4 py-2 bg-white border-b-[0.8px] border-gray-300 border-dashed capitalize">
                        <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-lg" />
                      </td>
                    )}
                    {(!hiddenActions.includes("View") ||
                      !hiddenActions.includes("Edit") ||
                      !hiddenActions.includes("Delete")) && (
                        <td className="p-4 py-2 text-xs md:text-[15px] font-medium text-center border-b border-gray-200">
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-6 w-12 bg-gray-200 animate-pulse rounded" />
                          </div>
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Loading Pagination */}
          {paginationshow && (
            <div className="flex items-center justify-end py-4 gap-1 px-3">
              <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full mx-2" />
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto xl:w-full w-[96dvw] sm:w-[93dvw] md:w-[95dvw] lg:w-[82dvw]">
          <table className="w-full border-collapse overflow-scroll">
            <thead className="bg-[#f3f4f6]">
              <tr className="text-[#1c252ee1] align-middle outline-none mt-2 sm:mt-0">
                <th className="p-4 text-[14px] py-2.5 text-left font-semibold text-[#637381]">
                  S.No.
                </th>

                {CheckboxShow && (
                  <th className="border-gray-100 border-b-[0.8px]">
                    {!isRadio && (
                      <label className="block pl-5">
                        <input
                          type="checkbox"
                          className="cursor-pointer checked:bg-amber-600 block h-4 w-4 rounded-xl border-2 border-gray-400"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </label>
                    )}
                  </th>
                )}

                {visibleHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="p-[19px] px-2 py-2.5 capitalize text-nowrap text-xs md:text-[14px] text-left font-medium text-gray-800 border-b-[0.8px] border-gray-100"
                  >
                    <span className="px-2 border-l-[1.8px] border-gray-300">{header}</span>
                  </th>
                ))}

                {extraColumns.map((column, index) => (
                  <th
                    key={`extra-${index}`}
                    className="p-[19px] py-2.5 text-nowrap text-xs md:text-[14px] text-left font-semibold text-gray-800 border-b-[0.8px] border-gray-100"
                  >
                    {column}
                  </th>
                ))}

                {hasStatus && (
                  <th className="p-2 text-xs md:text-[14px] text-left font-semibold text-gray-800">
                    <span className="border-l-[1.8px] px-2 border-gray-200">Status</span>
                  </th>
                )}

                {(!hiddenActions.includes("View") ||
                  !hiddenActions.includes("Edit") ||
                  !hiddenActions.includes("Delete")) && (
                    <th className="text-center p-[19px] text-sm md:text-[14px] font-semibold text-gray-800 border-b-[0.8px] border-gray-100">
                      Actions
                    </th>
                  )}
              </tr>
            </thead>

            <tbody>
              {Data.length < 1 ? (
                <tr>
                  <td
                    colSpan={
                      headers.length +
                      (hiddenActions.length < 3 ? 1 : 0) +
                      extraColumns.length +
                      2
                    }
                  >
                    <div className="flex flex-col items-center justify-center flex-grow h-[357.778px] px-6 py-20 rounded-2xl bg-gray-200/10 border border-gray-300/20">
                      <img
                        alt="Empty content"
                        src="https://assets.minimals.cc/public/assets/icons/empty/ic-content.svg"
                        className="w-full max-w-[150px] align-middle"
                      />
                      <h6 className="mt-2 text-lg font-semibold text-gray-400 text-center">
                        No data available....
                      </h6>
                    </div>
                  </td>
                </tr>
              ) : (
                currentRows.map((row, rowIndex) => (
                  <tr
                    key={row._id || rowIndex}
                    className="text-gray-500 align-middle bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-4 py-2 text-xs md:text-[12.25px] font-semibold text-left border-b-[0.8px] border-gray-300 border-dashed capitalize">
                      {rowIndex + 1}
                    </td>

                    {CheckboxShow && (
                      <td className="border-gray-300 border-dashed border-b-[0.8px]">
                        <label className="block pl-5">
                          <input
                            type={isRadio ? "radio" : "checkbox"}
                            className="cursor-pointer block h-4 w-4 rounded-xl border-2 border-gray-400"
                            checked={selectedRows.includes(row._id)}
                            onChange={() => handleRowSelect(row._id)}
                          />
                        </label>
                      </td>
                    )}

                    {visibleKeys.map((key, colIndex) =>
                      colIndex === 0 ? (
                        <td
                          key={colIndex}
                          className="p-4 py-2 text-nowrap text-[12.25px] text-gray-900 md:text-[12.25px] leading-[19.25px] text-start tracking-normal bg-white border-b-[0.8px] border-gray-300 border-dashed capitalize"
                        >
                          <div className="flex items-center gap-2">
                            {ImageContainerShow && (
                              <ImageContainer imageSrc={row[ImageKey]} name={getNestedValue(row, key)} />
                            )}
                            {getNestedValue(row, key)}
                          </div>
                        </td>
                      ) : visibleKeys.includes(key) ? (
                        <td
                          key={colIndex}
                          className="p-4 py-2 text-[12.25px] md:text-[12.25px] leading-[19.25px] text-start tracking-normal text-[#1c252e] bg-white border-b-[0.8px] border-gray-300 border-dashed capitalize"
                        >
                          {getNestedValue(row, key)}
                        </td>
                      ) : null
                    )}

                    {extraColumns.map((column, colIndex) => (
                      <td
                        key={`extra-${colIndex}`}
                        className="p-4 border-gray-300 border-dashed border-b-[0.8px]"
                      >
                        {extraMethods[column] ? extraMethods[column](row) : "-"}
                      </td>
                    ))}

                    {row[hasStatus] && (
                      <td className="px-4 py-2 bg-white border-b-[0.8px] border-gray-300 border-dashed capitalize">
                        <span
                          className={`px-3 py-1.5 text-[11px] md:text-[11px] text-nowrap font-semibold rounded-lg ${statusStyles[row[hasStatus]] || "bg-gray-200 text-gray-700"
                            }`}
                        >
                          {row[hasStatus]}
                        </span>
                      </td>
                    )}

                    {(!hiddenActions.includes("View") ||
                      !hiddenActions.includes("Edit") ||
                      !hiddenActions.includes("Delete")) && (
                        <td className="p-4 py-2 text-xs md:text-[15px] font-medium text-center border-b border-gray-200">
                          <div className="flex items-center justify-center gap-2">
                            {customActions &&
                              customActions.map(
                                (action, index) =>
                                  action.show &&
                                  action.show(row) && (
                                    <button
                                      key={index}
                                      onClick={() => action.onClick(row)}
                                      className={`cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-lg text-white ${action.className || "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    >
                                      {action.label}
                                    </button>
                                  )
                              )}

                            <div className="relative inline-block text-left">
                              <button
                                className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                                onClick={(e) => {
                                  setAnchorEl(e.currentTarget);
                                  setActiveRow(isOpen === rowIndex ? null : rowIndex);
                                }}
                              >
                                <Icon
                                  icon="mdi:dots-vertical"
                                  className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
                                />
                              </button>

                              {isOpen === rowIndex && (
                                <div
                                  onMouseLeave={() => setActiveRow(false)}
                                  style={{
                                    position: "fixed",
                                    top: (anchorEl?.getBoundingClientRect().top || 0) + 40,
                                    left: (anchorEl?.getBoundingClientRect().left || 0) - 90,
                                    zIndex: 9999,
                                  }}
                                  className="max-w-[90vw] max-h-[60vh] overflow-y-auto overflow-x-hidden px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                                >
                                  {!hiddenActions.includes("View") && (
                                    <button
                                      onClick={() => {
                                        onView(row);
                                        setActiveRow(null);
                                      }}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 transition"
                                    >
                                      <Icon
                                        icon="lsicon:view-filled"
                                        className="w-4 h-4 md:w-5 md:h-5 text-blue-500"
                                      />
                                      View
                                    </button>
                                  )}
                                  {!hiddenActions.includes("Edit") && (
                                    <button
                                      onClick={() => {
                                        onEdit(row);
                                        setActiveRow(null);
                                      }}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 transition"
                                    >
                                      <Icon
                                        icon="line-md:edit-twotone"
                                        className="w-4 h-4 md:w-5 md:h-5 text-yellow-500"
                                      />
                                      Edit
                                    </button>
                                  )}
                                  {!hiddenActions.includes("Delete") && (
                                    <button
                                      onClick={() => {
                                        onDelete(row);
                                        setActiveRow(null);
                                      }}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm md:text-base text-red-500 hover:bg-gray-100 transition"
                                    >
                                      <Icon
                                        icon="fluent:delete-32-filled"
                                        className="w-4 h-4 md:w-5 md:h-5 text-red-500"
                                      />
                                      Delete
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      )}</div>
  )
}

const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
let colorIndex = 0; // Global index to track sequence

const getNextColor = () => {
  const color = colors[colorIndex];  // Get color from array
  colorIndex = (colorIndex + 1) % colors.length;  // Loop back if index exceeds length
  return color;
};

const ImageContainer = ({ imageSrc, name }) => {
  const fallbackLetter = name ? name.charAt(0).toUpperCase() : "A";
  const sequentialBgColor = getNextColor(); // Get next color in sequence

  return (
    <div className="lg:w-10 w-8 h-8 lg:h-10 flex items-center justify-center overflow-hidden rounded-full">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-10 object-top object-cover text-transparent"
        />
      ) : (
        <div className={`lg:w-10 w-8 h-8 lg:h-10 flex items-center justify-center text-white text-lg font-semibold rounded-full ${sequentialBgColor}`}>
          {fallbackLetter}
        </div>
      )}
    </div>
  );
};

