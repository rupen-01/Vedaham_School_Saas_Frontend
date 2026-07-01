// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ViewCalendar() {
// // Navigation
//   const navigate = useNavigate();
  
//   // Date state for calendar view
//   const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
//   const [selectedDate, setSelectedDate] = useState(formatISODate(new Date()));

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEvent, setEditingEvent] = useState(null);

//   // Form state for add/edit
//   const emptyForm = { title: "", description: "", date: selectedDate, color: "#2563eb" };
//   const [form, setForm] = useState(emptyForm);

//   // Events: array of { id, date (YYYY-MM-DD), title, description, color }
//   const [events, setEvents] = useState(() => {
//     try {
//       const raw = localStorage.getItem("ev_calendar_events_v1");
//       return raw ? JSON.parse(raw) : [];
//     } catch (e) {
//       return [];
//     }
//   });

//   // Persist events
//   useEffect(() => {
//     localStorage.setItem("ev_calendar_events_v1", JSON.stringify(events));
//   }, [events]);

//   // When selectedDate changes, sync form
//   useEffect(() => {
//     setForm(f => ({ ...f, date: selectedDate }));
//   }, [selectedDate]);

//   // Derived month matrix
//   const monthMatrix = useMemo(() => buildMonthMatrix(cursor), [cursor]);
//   const monthLabel = useMemo(() => formatMonthLabel(cursor), [cursor]);

//   // Events grouped by date for quick lookup
//   const eventsByDate = useMemo(() => {
//     const map = {};
//     for (const e of events) {
//       (map[e.date] ||= []).push(e);
//     }
//     return map;
//   }, [events]);

//   // Handlers
//   function go(deltaMonths) {
//     setCursor(d => addMonths(d, deltaMonths));
//   }

//   function openAddModal(dateISO) {
//     setSelectedDate(dateISO);
//     setEditingEvent(null);
//     setForm({ ...emptyForm, date: dateISO });
//     setIsModalOpen(true);
//   }

//   function openEditModal(event) {
//     setEditingEvent(event);
//     setForm({ title: event.title, description: event.description || "", date: event.date, color: event.color || "#2563eb" });
//     setIsModalOpen(true);
//   }

//   function handleSave(e) {
//     e.preventDefault();
//     if (!form.title || !form.date) return;

//     if (editingEvent) {
//       setEvents(prev => prev.map(ev => (ev.id === editingEvent.id ? { ...ev, ...form } : ev)));
//     } else {
//       const newEvent = { id: Date.now().toString(), ...form };
//       setEvents(prev => [...prev, newEvent]);
//     }
//     setIsModalOpen(false);
//   }

//   function handleDelete(id) {
//     if (!confirm("Delete this event?")) return;
//     setEvents(prev => prev.filter(e => e.id !== id));
//   }

//   function handleDayClick(d) {
//     const iso = formatISODate(d);
//     setSelectedDate(iso);
//     openAddModal(iso);
//   }

//   function handleToday() {
//     const today = new Date();
//     setCursor(startOfMonth(today));
//     setSelectedDate(formatISODate(today));
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
//         {/* Calendar panel */}
//         <div className="lg:col-span-3 bg-white rounded-2xl shadow-md overflow-hidden">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <button
//                 onClick={() => go(-1)}
//                 className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                 title="Previous month"
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
//               </button>

//               <div className="text-base md:text-lg font-semibold">{monthLabel}</div>

//               <button
//                 onClick={() => go(1)}
//                 className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                 title="Next month"
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
//               </button>
//             </div>

//             <div className="flex items-center gap-2">
//               <button onClick={handleToday} className="px-3 py-1.5 bg-gray-50 rounded-md text-sm hover:bg-gray-100 cursor-pointer">Today</button>
//               {/* <button onClick={() => openAddModal(selectedDate)} className="px-3 py-1.5 bg-gray-200 text-black  rounded-md text-sm hover:brightness-105 cursor-pointer">Add Event</button>
//              */}
          
//   <button 
//     onClick={() => navigate("/academics/academic-calendar/add", { state: { date: selectedDate } })}
//     className="px-3 py-1.5 bg-gray-200 text-black rounded-md text-sm hover:brightness-105 cursor-pointer"
//   >
//     Add Event
//   </button>
//             </div>
//           </div>

//           {/* Weekday labels */}
//           <div className="grid grid-cols-7 text-[11px] sm:text-xs md:text-sm text-gray-500 px-3 md:px-5 py-2 md:py-3 border-b">
//             {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
//               <div key={d} className="text-center">{d}</div>
//             ))}
//           </div>

//           {/* Days grid */}
//           <div className="p-3 md:p-5">
//             <div className="grid grid-cols-7 gap-1 sm:gap-2">
//               {monthMatrix.map(({ date, inMonth }, idx) => {
//                 const iso = formatISODate(date);
//                 const isToday = iso === formatISODate(new Date());
//                 const dayEvents = eventsByDate[iso] || [];

//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => { setSelectedDate(iso); }}
//                     onDoubleClick={() => handleDayClick(date)}
//                     className={`relative text-left p-2 sm:p-3 h-20 sm:h-24 md:h-24  rounded-lg transition-shadow border cursor-pointer ${inMonth ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-50 text-gray-400'} ${isToday ? 'ring-2 ring-indigo-200' : ''}`}
//                     aria-label={`Day ${iso}`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className={`text-xs sm:text-sm font-medium ${inMonth ? 'text-gray-900' : 'text-gray-400'}`}>{date.getDate()}</div>
//                       {dayEvents.length > 0 && <div className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">{dayEvents.length}+</div>}
//                     </div>

//                     {/* events preview */}
//                     <div className="mt-2 sm:mt-3 flex flex-col gap-1">
//                       {dayEvents.slice(0,3).map(ev => (
//                         <div key={ev.id} className="flex items-center justify-between gap-1 sm:gap-2">
//                           <span className="truncate text-[10px] sm:text-xs font-medium cursor-pointer" title={ev.title} style={{ maxWidth: '95%' }}>
//                             <span className="inline-block mr-1 sm:mr-2 w-2 h-2 rounded-full" style={{ backgroundColor: ev.color }} />
//                             {ev.title}
//                           </span>
//                           <button onClick={(e) => { e.stopPropagation(); openEditModal(ev); }} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
//                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
//                           </button>
//                         </div>
//                       ))}

//                       {dayEvents.length > 3 && (
//                         <div className="text-[10px] sm:text-xs text-gray-500">+{dayEvents.length - 3} more</div>
//                       )}
//                     </div>

//                     {selectedDate === iso && <div className="absolute -inset-px rounded-lg border-2 border-indigo-100 pointer-events-none"></div>}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <aside className="bg-white rounded-2xl shadow-md p-3 sm:p-4">
//           <div className="flex items-center justify-between mb-3">
//             <div>
//               <div className="text-xs sm:text-sm text-gray-500">Selected</div>
//               <div className="text-sm sm:text-md font-semibold">{selectedDate}</div>
//             </div>
//             <button onClick={() => openAddModal(selectedDate)} className="px-2 sm:px-3 py-1 bg-indigo-600 text-white rounded-md text-xs sm:text-sm cursor-pointer">New</button>
//           </div>

//           <div className="space-y-2 sm:space-y-3">
//             {(eventsByDate[selectedDate] || []).length === 0 ? (
//               <div className="text-xs sm:text-sm text-gray-500">No events for this day. Double-click a day to quickly add.</div>
//             ) : (
//               (eventsByDate[selectedDate] || []).map(ev => (
//                 <div key={ev.id} className="p-2 border rounded-lg flex items-start justify-between gap-2 sm:gap-3">
//                   <div>
//                     <div className="font-medium text-sm">{ev.title}</div>
//                     <div className="text-xs sm:text-sm text-gray-500">{ev.description}</div>
//                   </div>
//                   <div className="flex flex-col items-end gap-1 sm:gap-2">
//                     <div className="text-[10px] sm:text-xs text-gray-500">{ev.date}</div>
//                     <div className="flex gap-2">
//                       <button onClick={() => openEditModal(ev)} className="text-xs sm:text-sm text-indigo-600 cursor-pointer">Edit</button>
//                       <button onClick={() => handleDelete(ev.id)} className="text-xs sm:text-sm text-red-500 cursor-pointer">Delete</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <hr className="my-3 sm:my-4" />

//           <div>
//             <div className="text-sm font-semibold mb-2">Upcoming</div>
//             <div className="space-y-2 max-h-48 sm:max-h-64 overflow-auto">
//               {events
//                 .slice()
//           .sort((a, b) => {
//   const nameA = a?.eventName || "";
//   const nameB = b?.eventName || "";
//   return nameA.localeCompare(nameB);
// })

//                 .slice(0,8)
//                 .map(ev => (
//                   <div key={ev.id} className="flex items-center gap-2 sm:gap-3 p-2 rounded-md hover:bg-gray-50">
//                     <div className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full" style={{ backgroundColor: ev.color }} />
//                     <div className="flex-1 text-xs sm:text-sm">
//                       <div className="font-medium truncate">{ev.title}</div>
//                       <div className="text-[10px] sm:text-xs text-gray-500">{ev.date}</div>
//                     </div>
//                     <button onClick={() => { setSelectedDate(ev.date); openEditModal(ev); }} className="text-[10px] sm:text-xs text-indigo-600 cursor-pointer">Open</button>
//                   </div>
//                 ))}
//               {events.length === 0 && <div className="text-xs sm:text-sm text-gray-500">No events yet. Add one to get started.</div>}
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <form onSubmit={handleSave} className="p-3 sm:p-4 w-full max-w-sm sm:max-w-xl">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <h3 className="text-base sm:text-lg font-semibold">{editingEvent ? 'Edit event' : 'Add event'}</h3>
//               <div className="text-xs sm:text-sm text-gray-500">Date: {form.date}</div>
//             </div>

//             <div className="space-y-2 sm:space-y-3">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium mb-1">Title</label>
//                 <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-sm" placeholder="Meeting, Birthday..." />
//               </div>

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium mb-1">Description</label>
//                 <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-sm" placeholder="Notes or location" />
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium mb-1">Date</label>
//                   <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-sm" />
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium mb-1">Color</label>
//                   <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className="w-10 sm:w-12 h-8 sm:h-10 p-0 border rounded-md cursor-pointer" />
//                 </div>
//               </div>

//               <div className="flex items-center justify-end gap-2 mt-3 sm:mt-4">
//                 {editingEvent && <button type="button" onClick={() => { handleDelete(editingEvent.id); setIsModalOpen(false); }} className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-red-500 cursor-pointer">Delete</button>}
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm cursor-pointer">Cancel</button>
//                 <button type="submit" className="px-3 sm:px-4 py-1.5 bg-indigo-600 text-white rounded-md text-xs sm:text-sm cursor-pointer">Save</button>
//               </div>
//             </div>
//           </form>
//         </Modal>
//       )}
//     </div>
//   );
// }

// // -----------------------
// // Small Modal helper
// function Modal({ children, onClose }) {
//   useEffect(() => {
//     function onKey(e) { if (e.key === 'Escape') onClose(); }
//     document.addEventListener('keydown', onKey);
//     return () => document.removeEventListener('keydown', onKey);
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-0">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
//       <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all max-h-[90vh] w-full max-w-sm sm:max-w-xl">
//         {children}
//       </div>
//     </div>
//   );
// }

// // -----------------------
// // Date helpers (no external libs)
// function startOfMonth(d) {
//   return new Date(d.getFullYear(), d.getMonth(), 1);
// }
// function addMonths(d, n) {
//   return new Date(d.getFullYear(), d.getMonth() + n, 1);
// }
// function formatMonthLabel(d) {
//   return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
// }
// function formatISODate(d) {
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${y}-${m}-${day}`;
// }
// function buildMonthMatrix(viewDate) {
//   const start = startOfMonth(viewDate);
//   const startDay = start.getDay();
//   const firstCell = new Date(start);
//   firstCell.setDate(firstCell.getDate() - startDay);
//   const cells = [];
//   for (let i = 0; i < 42; i++) {
//     const d = new Date(firstCell);
//     d.setDate(firstCell.getDate() + i);
//     cells.push({ date: d, inMonth: d.getMonth() === viewDate.getMonth() });
//   }
//   return cells;
// }
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewCalendar() {
  // Navigation
  const navigate = useNavigate();

  // Date state for calendar view
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(formatISODate(new Date()));

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form state
  const emptyForm = {
    eventName: "",
    description: "",
    date: selectedDate,
    endDate: selectedDate,
    eventType: "Activity",
    isWorkingDay: true,
    color: "#2563eb",
    applicableTo: "all",
    selectedClasses: [],
  };
  const [form, setForm] = useState(emptyForm);

  // Events
  const [events, setEvents] = useState(() => {
    try {
      const raw = localStorage.getItem("ev_calendar_events_v1");
      const parsed = raw ? JSON.parse(raw) : [];
      return parsed.map(e => ({
        id: e.id,
        eventName: e.eventName || e.title || "Untitled",
        description: e.description || "",
        date: e.startDate || e.date,
        endDate: e.endDate || null,
        eventType: e.eventType || "Activity",
        isWorkingDay: e.isWorkingDay ?? true,
        color: e.color || "#2563eb",
        applicableTo: e.applicableTo || "all",
        selectedClasses: e.selectedClasses || []
      }));
    } catch (e) {
      return [];
    }
  });

  // Persist events
  useEffect(() => {
    localStorage.setItem("ev_calendar_events_v1", JSON.stringify(events));
  }, [events]);

  // Sync form when selectedDate changes
  useEffect(() => {
    setForm(f => ({ ...f, date: selectedDate }));
  }, [selectedDate]);

  // Derived month matrix
  const monthMatrix = useMemo(() => buildMonthMatrix(cursor), [cursor]);
  const monthLabel = useMemo(() => formatMonthLabel(cursor), [cursor]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map = {};
    for (const e of events) {
      (map[e.date] ||= []).push(e);
    }
    return map;
  }, [events]);

  // Handlers
  function go(deltaMonths) {
    setCursor(d => addMonths(d, deltaMonths));
  }

  function openAddModal(dateISO) {
    setSelectedDate(dateISO);
    setEditingEvent(null);
    setForm({ ...emptyForm, date: dateISO, endDate: dateISO });
    setIsModalOpen(true);
  }

  function openEditModal(event) {
    setEditingEvent(event);
    setForm({
      eventName: event.eventName,
      description: event.description || "",
      date: event.date,
      endDate: event.endDate || event.date,
      eventType: event.eventType || "Activity",
      isWorkingDay: event.isWorkingDay ?? true,
      color: event.color || "#2563eb",
      applicableTo: event.applicableTo || "all",
      selectedClasses: event.selectedClasses || [],
    });
    setIsModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!form.eventName || !form.date) return;

    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      eventName: form.eventName,
      description: form.description,
      startDate: form.date,
      endDate: form.endDate,
      date: form.date,
      eventType: form.eventType,
      isWorkingDay: form.isWorkingDay,
      color: form.color,
      applicableTo: form.applicableTo,
      selectedClasses: form.selectedClasses,
    };

    if (editingEvent) {
      setEvents(prev => prev.map(ev => (ev.id === editingEvent.id ? newEvent : ev)));
    } else {
      setEvents(prev => [...prev, newEvent]);
    }
    setIsModalOpen(false);
  }

  function handleDelete(id) {
    if (!confirm("Delete this event?")) return;
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  function handleDayClick(d) {
    const iso = formatISODate(d);
    setSelectedDate(iso);
    openAddModal(iso);
  }

  function handleToday() {
    const today = new Date();
    setCursor(startOfMonth(today));
    setSelectedDate(formatISODate(today));
  }

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Calendar panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => go(-1)}
                className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                title="Previous month"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="text-base md:text-lg font-semibold">{monthLabel}</div>
              <button
                onClick={() => go(1)}
                className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                title="Next month"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleToday} className="px-3 py-1.5 bg-gray-50 rounded-md text-sm hover:bg-gray-100 cursor-pointer">Today</button>
              <button 
                onClick={() => navigate("/academics/academic-calendar/add", { state: { date: selectedDate } })}
                className="px-3 py-1.5 bg-gray-200 text-black rounded-md text-sm hover:brightness-105 cursor-pointer"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-[11px] sm:text-xs md:text-sm text-gray-500 px-3 md:px-5 py-2 border-b">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="p-3 md:p-5">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {monthMatrix.map(({ date, inMonth }, idx) => {
                const iso = formatISODate(date);
                const isToday = iso === formatISODate(new Date());
                const dayEvents = eventsByDate[iso] || [];

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(iso)}
                    onDoubleClick={() => handleDayClick(date)}
                    className={`relative text-left p-2 sm:p-3 h-20 sm:h-24 rounded-lg border cursor-pointer ${inMonth ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-50 text-gray-400'} ${isToday ? 'ring-2 ring-indigo-200' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`text-xs sm:text-sm font-medium ${inMonth ? 'text-gray-900' : 'text-gray-400'}`}>{date.getDate()}</div>
                      {dayEvents.length > 0 && <div className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">{dayEvents.length}+</div>}
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                      {dayEvents.slice(0,3).map(ev => (
                        <div key={ev.id} className="flex items-center justify-between gap-2">
                          <span className="truncate text-[10px] sm:text-xs font-medium" title={ev.eventName}>
                            <span className="inline-block mr-2 w-2 h-2 rounded-full" style={{ backgroundColor: ev.color }} />
                            {ev.eventName}
                          </span>
                          <button onClick={(e) => { e.stopPropagation(); openEditModal(ev); }} className="text-gray-400 hover:text-gray-600 p-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4"><path d="M12 20h9"/><path d="M16.5 3.5l3 3L7 19l-4 1 1-4z"/></svg>
                          </button>
                        </div>
                      ))}
                      {dayEvents.length > 3 && <div className="text-[10px] sm:text-xs text-gray-500">+{dayEvents.length - 3} more</div>}
                    </div>

                    {selectedDate === iso && <div className="absolute -inset-px rounded-lg border-2 border-indigo-100 pointer-events-none"></div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow-md p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-gray-500">Selected</div>
              <div className="text-sm font-semibold">{selectedDate}</div>
            </div>
            <button onClick={() => openAddModal(selectedDate)} className="px-2 py-1 bg-indigo-600 text-white rounded-md text-xs">New</button>
          </div>

          <div className="space-y-2">
            {(eventsByDate[selectedDate] || []).length === 0 ? (
              <div className="text-xs text-gray-500">No events. Double-click a day to add.</div>
            ) : (
              (eventsByDate[selectedDate] || []).map(ev => (
                <div key={ev.id} className="p-2 border rounded-lg flex justify-between">
                  <div>
                    <div className="font-medium text-sm">{ev.eventName}</div>
                    <div className="text-xs text-gray-500">{ev.description}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-[10px] text-gray-500">{ev.date}</div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(ev)} className="text-xs text-indigo-600">Edit</button>
                      <button onClick={() => handleDelete(ev.id)} className="text-xs text-red-500">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <hr className="my-3" />

          <div>
            <div className="text-sm font-semibold mb-2">Upcoming</div>
            <div className="space-y-2 max-h-64 overflow-auto">
              {events
                .slice()
                .sort((a, b) => (a.eventName || "").localeCompare(b.eventName || ""))
                .slice(0,8)
                .map(ev => (
                  <div key={ev.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                    <div className="w-2 h-6 rounded-full" style={{ backgroundColor: ev.color }} />
                    <div className="flex-1 text-xs">
                      <div className="font-medium truncate">{ev.eventName}</div>
                      <div className="text-[10px] text-gray-500">{ev.date}</div>
                    </div>
                    <button onClick={() => { setSelectedDate(ev.date); openEditModal(ev); }} className="text-[10px] text-indigo-600">Open</button>
                  </div>
                ))}
              {events.length === 0 && <div className="text-xs text-gray-500">No events yet.</div>}
            </div>
          </div>
        </aside>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSave} className="p-4 w-full max-w-xl">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingEvent ? 'Edit Event' : 'Add Event'}</h3>
              <div className="text-xs text-gray-500">Date: {form.date}</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input required value={form.eventName} onChange={e => setForm(f => ({ ...f, eventName: e.target.value }))} className="w-full px-3 py-2 border rounded-md text-sm" placeholder="Meeting, Holiday..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 border rounded-md text-sm" placeholder="Notes or location" />
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="px-3 py-2 border rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className="w-12 h-10 border rounded-md cursor-pointer" />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                {editingEvent && <button type="button" onClick={() => { handleDelete(editingEvent.id); setIsModalOpen(false); }} className="px-3 py-1 text-sm text-red-500">Delete</button>}
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1 border rounded-md text-sm">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white rounded-md text-sm">Save</button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// -----------------------
// Small Modal helper
function Modal({ children, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-lg overflow-auto max-h-[90vh] w-full max-w-xl">
        {children}
      </div>
    </div>
  );
}

// -----------------------
// Date helpers
function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function formatMonthLabel(d) {
  return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}
function formatISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function buildMonthMatrix(viewDate) {
  const start = startOfMonth(viewDate);
  const startDay = start.getDay();
  const firstCell = new Date(start);
  firstCell.setDate(firstCell.getDate() - startDay);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(firstCell);
    d.setDate(firstCell.getDate() + i);
    cells.push({ date: d, inMonth: d.getMonth() === viewDate.getMonth() });
  }
  return cells;
}
