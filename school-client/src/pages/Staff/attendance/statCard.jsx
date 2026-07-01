// import { Icon } from "@iconify/react";

// const statData = [
//   {
//     title: "Total Present",
//     value: "08",
//     icon: "mdi:account-check-outline",
//     color: "bg-green-500",
//     border: "border-green-500",
//   },
//   {
//     title: "Total Absent",
//     value: "04",
//     icon: "mdi:account-remove-outline",
//     color: "bg-red-500",
//     border: "border-red-500",
//   },
//   {
//     title: "Total Staff",
//     value: "12",
//     icon: "mdi:account-group-outline",
//     color: "bg-blue-500",
//     border: "border-blue-500",
//   },
// ];

// const StatCard = ({ title, value, icon, color, border }) => (
//   <div
//     className={`flex  items-center bg-white justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 ${border} border`}
//   >
//    <div>
//      <p className="text-sm text-gray-600 text-center">{title}</p>
//     <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
   
//     </div>
//      <div className={`p-3 rounded-md shadow text-3xl mb-2 ${color}`}>
//       <Icon icon={icon} className="text-white" />
//     </div>
//   </div>
// );

// export default function AttendanceStatCards({ present, absent, total }) {
//   // Optional: dynamically update values from props
//   const updatedStats = statData.map((stat) => {
//     if (stat.title === "Total Present") return { ...stat, value: present };
//     if (stat.title === "Total Absent") return { ...stat, value: absent };
//     if (stat.title === "Total Staff") return { ...stat, value: total };
//     return stat;
//   });

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//       {updatedStats.map((item, index) => (
//         <StatCard key={index} {...item} />
//       ))}
//     </div>
//   );
// }
import { Icon } from "@iconify/react";

const statData = [
  {
    title: "Total Present",
    value: "08",
    icon: "mdi:account-check-outline",
    gradient: "bg-gradient-to-r from-green-400 to-green-600",
    glow: "shadow-green-300",
  },
  {
    title: "Total Absent",
    value: "04",
    icon: "mdi:account-remove-outline",
    gradient: "bg-gradient-to-r from-red-400 to-red-600",
    glow: "shadow-red-300",
  },
  {
    title: "Total Staff",
    value: "12",
    icon: "mdi:account-group-outline",
    gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
    glow: "shadow-blue-300",
  },
];

const StatCard = ({ title, value, icon, gradient, glow }) => (
  <div
    className={`relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-5`}
  >
    {/* Subtle pattern background */}
    <div className="absolute inset-0 opacity-5 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png')]"></div>

    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-800">{value}</h3>
      </div>
      <div
        className={`p-4 rounded-full ${gradient} ${glow} shadow-lg text-white flex items-center justify-center transform transition-transform duration-300 hover:scale-110`}
      >
        <Icon icon={icon} className="text-3xl" />
      </div>
    </div>
  </div>
);

export default function AttendanceStatCards({ present, absent, total }) {
  const updatedStats = statData.map((stat) => {
    if (stat.title === "Total Present") return { ...stat, value: present };
    if (stat.title === "Total Absent") return { ...stat, value: absent };
    if (stat.title === "Total Staff") return { ...stat, value: total };
    return stat;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
      {updatedStats.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
}
