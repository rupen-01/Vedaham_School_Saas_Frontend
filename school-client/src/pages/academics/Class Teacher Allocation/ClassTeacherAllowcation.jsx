// // import React, { useState } from "react";
// // import HeadingHeader from "../../../components/common/HeadingHeader";
// // import Card from "../../../components/common/Card";
// // import SlidingLabelSelect from "../../../components/common/SlidingSelect";
// // import BorderedFieldset from "../../../components/common/BorderedFieldset";
// // import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
// // import BackButton from "../../../components/common/BackButton";

// // const ClassTeacherAllocation = () => {
// //   const [UserData, setUserData] = useState({
// //     teacher: "",
// //     coTeacher: "",
// //     status: "",
// //     classes: [{ class: "", section: "" }],
// //   });

// //   // ✅ Config objects for options
// //   const teachers = [
// //     "Mr. Amit Sharma",
// //     "Mrs. Priya Verma",
// //     "Mr. Rakesh Kumar",
// //     "Ms. Neha Singh",
// //     "Mr. Anil Mehta",
// //     "Mrs. Sunita Yadav",
// //     "Mr. Rajesh Patel",
// //   ];

// //   const coTeachers = [
// //     "Mr. Rajesh Patel",
// //     "Mr. Deepak Joshi",
// //     "Ms. Kavita Nair",
// //     "Mr. Manoj Choudhary",
// //     "Mrs. Pooja Desai",
// //     "Mr. Vikram Sethi",
// //     "Ms. Anjali Rao",
// //     "Mr. Karan Malhotra",
// //     "Mrs. Ritu Sharma",
// //   ];

// //   const classes = ["Class A", "Class B", "Class C", "Class D"];
// //   const sections = ["A", "B", "C", "D", "E"];

// //   const handleChange = (field, value) => {
// //     setUserData((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleClassChange = (index, field, value) => {
// //     const updatedClasses = [...UserData.classes];
// //     updatedClasses[index][field] = value;
// //     setUserData((prev) => ({ ...prev, classes: updatedClasses }));
// //   };

// //   const addClass = () => {
// //     setUserData((prev) => ({
// //       ...prev,
// //       classes: [...prev.classes, { class: "", section: "" }],
// //     }));
// //   };

// //   const removeClass = (index) => {
// //     const updatedClasses = UserData.classes.filter((_, i) => i !== index);
// //     setUserData((prev) => ({ ...prev, classes: updatedClasses }));
// //   };

// //   return (
// //     <>
// //       <div className="flex items-center justify-between mb-4">
// //         <HeadingHeader
// //           title="Class Teacher Allocation"
// //           items={[
// //             { label: "Academics", path: "/" },
// //             { label: "Class Teacher Allocation", path: "/academics/class-teacher-allocation" },
// //           ]}
// //         />
// //         <BackButton back="/academics/class-teacher-allocation" />
// //       </div>

// //       <div className="flex flex-col gap-4">
// //         <Card>
// //           {/* Teacher and Co-Teacher */}
// //           <BorderedFieldset legend="Class Teacher Allocation Form">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <SlidingLabelSelect
// //                 label="Select Teacher"
// // //                 value={UserData.teacher}
// // //                 onChange={(e) => handleChange("teacher", e.target.value)}
// // //               >
// // //                 <option value="">Select</option>
// // //                 {teachers.map((teacher, index) => (
// // //                   <option key={index}>{teacher}</option>
// // //                 ))}
// // //               </SlidingLabelSelect>

// // //               <SlidingLabelSelect
// // //                 label="Select Co Teacher"
// // //                 value={UserData.coTeacher}
// // //                 onChange={(e) => handleChange("coTeacher", e.target.value)}
// // //               >
// // //                 <option value="">Select</option>
// // //                 {coTeachers.map((coTeacher, index) => (
// // //                   <option key={index}>{coTeacher}</option>
// // //                 ))}
// // //               </SlidingLabelSelect>
// // //             </div>
// // //           </BorderedFieldset>

// // //           {/* Class Allocations */}
// // //           <BorderedFieldset legend="Select Class and Section">
// // //             {UserData.classes.map((item, index) => (
// // //               <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
// // //                 <SlidingLabelSelect
// // //                   label="Class"
// // //                   value={item.class}
// // //                   onChange={(e) => handleClassChange(index, "class", e.target.value)}
// // //                 >
// // //                   <option value="">Select</option>
// // //                   {classes.map((cls, i) => (
// // //                     <option key={i}>{cls}</option>
// // //                   ))}
// // //                 </SlidingLabelSelect>

// // //                 <div className="flex gap-2 items-center">
// // //                   <SlidingLabelSelect
// // //                     label="Section"
// // //                     value={item.section}
// // //                     onChange={(e) => handleClassChange(index, "section", e.target.value)}
// // //                   >
// // //                     <option value="">Select</option>
// // //                     {sections.map((sec, i) => (
// // //                       <option key={i}>{sec}</option>
// // //                     ))}
// // //                   </SlidingLabelSelect>

// // //                   {UserData.classes.length > 1 && (
// // //                     <button
// // //                       onClick={() => removeClass(index)}
// // //                       className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
// // //                     >
// // //                       <span className="cursor-pointer text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
// // //                         ✕
// // //                       </span>
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </BorderedFieldset>

// // //           {/* Add Class Button */}
// // //           <div className="mt-4 mb-4 text-right">
// // //             <button
// // //               onClick={addClass}
// // //               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
// // //             >
// // //               Add Class
// // //             </button>
// // //           </div>

// // //           {/* Status */}
// // //           <BorderedFieldset legend="Status">
// // //             <SlidingLabelRadio
// // //               name="status"
// // //               value={UserData.status}
// // //               onChange={(e) => handleChange("status", e.target.value)}
// // //               options={["Active", "Inactive"]}
// // //             />
// // //           </BorderedFieldset>
// // //         </Card>

// // //         {/* Final Submit */}
// // //         <div className="text-right">
// // //           <button
// // //             onClick={() => console.log(UserData)}
// // //             className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
// // //           >
// // //             Class Allocate
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default ClassTeacherAllocation;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // import HeadingHeader from "../../../components/common/HeadingHeader";
// // import Card from "../../../components/common/Card";
// // import SlidingLabelSelect from "../../../components/common/SlidingSelect";
// // import BorderedFieldset from "../../../components/common/BorderedFieldset";
// // import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
// // import BackButton from "../../../components/common/BackButton";

// // const ClassTeacherAllocation = () => {
// //   const [UserData, setUserData] = useState({
// //     teacher: "",
// //     coTeacher: "",
// //     status: "",
// //     classes: [{ class: "", section: "" }],
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);

// //   // Dropdown data states
// //   const [teachers, setTeachers] = useState([]);
// //   const [coTeachers, setCoTeachers] = useState([]);
// //   const [classes, setClasses] = useState([]);
// //   const [sections, setSections] = useState([]);

// //   const [dataLoading, setDataLoading] = useState(true);
// //   const [dataError, setDataError] = useState(null);

// //   useEffect(() => {
// //     const fetchDropdownData = async () => {
// //       setDataLoading(true);
// //       setDataError(null);
// //       try {
// //         const [teachersRes, coTeachersRes, classesRes, sectionsRes] = await Promise.all([
// //           axios.get("http://localhost:5000/teachers"),
// //           axios.get("http://localhost:5000/co-teachers"),
// //           axios.get("http://localhost:5000/classes"),
// //           axios.get("http://localhost:5000/sections"),
// //         ]);

// //         console.log("Teachers API response:", teachersRes.data);
// //         console.log("CoTeachers API response:", coTeachersRes.data);
// //         console.log("Classes API response:", classesRes.data);
// //         console.log("Sections API response:", sectionsRes.data);

// //         // Adjust these lines if your API structure differs:
// //         // e.g. if your API returns { success: true, data: [...] }, use `.data.data`
// //         setTeachers(Array.isArray(teachersRes.data) ? teachersRes.data : teachersRes.data.data);
// //         setCoTeachers(Array.isArray(coTeachersRes.data) ? coTeachersRes.data : coTeachersRes.data.data);
// //         setClasses(Array.isArray(classesRes.data) ? classesRes.data : classesRes.data.data);
// //         setSections(Array.isArray(sectionsRes.data) ? sectionsRes.data : sectionsRes.data.data);

// //       } catch (err) {
// //         setDataError("Failed to load dropdown data. Please refresh.");
// //       } finally {
// //         setDataLoading(false);
// //       }
// //     };

// //     fetchDropdownData();
// //   }, []);

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);

// //     try {
// //       await axios.post("http://localhost:5000/class-teacher-allocate", UserData);

// //       setSuccess("Class teacher allocation successful!");
// //       setUserData({
// //         teacher: "",
// //         coTeacher: "",
// //         status: "",
// //         classes: [{ class: "", section: "" }],
// //       });
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to allocate class teacher. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (field, value) => {
// //     setUserData((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleClassChange = (index, field, value) => {
// //     const updatedClasses = [...UserData.classes];
// //     updatedClasses[index][field] = value;
// //     setUserData((prev) => ({ ...prev, classes: updatedClasses }));
// //   };

// //   const addClass = () => {
// //     setUserData((prev) => ({
// //       ...prev,
// //       classes: [...prev.classes, { class: "", section: "" }],
// //     }));
// //   };

// //   const removeClass = (index) => {
// //     const updatedClasses = UserData.classes.filter((_, i) => i !== index);
// //     setUserData((prev) => ({ ...prev, classes: updatedClasses }));
// //   };

// //   const isSubmitDisabled =
// //     loading ||
// //     dataLoading ||
// //     !UserData.teacher ||
// //     !UserData.status ||
// //     UserData.classes.some((c) => !c.class || !c.section);

// //   if (dataLoading) {
// //     return <p>Loading dropdown data...</p>;
// //   }

// //   if (dataError) {
// //     return <p className="text-red-600">{dataError}</p>;
// //   }

// //   return (
// //     <>
// //       <div className="flex items-center justify-between mb-4">
// //         <HeadingHeader
// //           title="Class Teacher Allocation"
// //           items={[
// //             { label: "Academics", path: "/" },
// //             { label: "Class Teacher Allocation", path: "/academics/class-teacher-allocation" },
// //           ]}
// //         />
// //         <BackButton back="/academics/class-teacher-allocation" />
// //       </div>

// //       <div className="flex flex-col gap-4">
// //         <Card>
// //           {/* Teacher and Co-Teacher */}
// //           <BorderedFieldset legend="Class Teacher Allocation Form">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <SlidingLabelSelect
// //                 label="Select Teacher"
// //                 value={UserData.teacher}
// //                 onChange={(e) => handleChange("teacher", e.target.value)}
// //               >
// //                 <option value="">Select</option>
// //                 {teachers.map((teacher) => (
// //                   <option key={teacher.id} value={teacher.id}>
// //                     {teacher.name}
// //                   </option>
// //                 ))}
// //               </SlidingLabelSelect>

// //               <SlidingLabelSelect
// //                 label="Select Co Teacher"
// //                 value={UserData.coTeacher}
// //                 onChange={(e) => handleChange("coTeacher", e.target.value)}
// //               >
// //                 <option value="">Select</option>
// //                 {coTeachers.map((coTeacher) => (
// //                   <option key={coTeacher.id} value={coTeacher.id}>
// //                     {coTeacher.name}
// //                   </option>
// //                 ))}
// //               </SlidingLabelSelect>
// //             </div>
// //           </BorderedFieldset>

// //           {/* Class Allocations */}
// //           <BorderedFieldset legend="Select Class and Section">
// //             {UserData.classes.map((item, index) => (
// //               <div
// //                 key={index}
// //                 className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end"
// //               >
// //                 <SlidingLabelSelect
// //                   label="Class"
// //                   value={item.class}
// //                   onChange={(e) => handleClassChange(index, "class", e.target.value)}
// //                 >
// //                   <option value="">Select</option>
// //                   {classes.map((cls) => (
// //                     <option key={cls.id} value={cls.id}>
// //                       {cls.name}
// //                     </option>
// //                   ))}
// //                 </SlidingLabelSelect>

// //                 <div className="flex gap-2 items-center">
// //                   <SlidingLabelSelect
// //                     label="Section"
// //                     value={item.section}
// //                     onChange={(e) => handleClassChange(index, "section", e.target.value)}
// //                   >
// //                     <option value="">Select</option>
// //                     {sections.map((sec) => (
// //                       <option key={sec.id} value={sec.id}>
// //                         {sec.name}
// //                       </option>
// //                     ))}
// //                   </SlidingLabelSelect>

// //                   {UserData.classes.length > 1 && (
// //                     <button
// //                       onClick={() => removeClass(index)}
// //                       aria-label="Remove class allocation"
// //                       title="Remove class"
// //                       className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
// //                     >
// //                       <span className="text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
// //                         ✕
// //                       </span>
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </BorderedFieldset>

// //           {/* Add Class Button */}
// //           <div className="mt-4 mb-4 text-right">
// //             <button
// //               onClick={addClass}
// //               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
// //             >
// //               Add Class
// //             </button>
// //           </div>

// //           {/* Status */}
// //           <BorderedFieldset legend="Status">
// //             <SlidingLabelRadio
// //               name="status"
// //               value={UserData.status}
// //               onChange={(e) => handleChange("status", e.target.value)}
// //               options={["Active", "Inactive"]}
// //             />
// //           </BorderedFieldset>
// //         </Card>

// //         {/* Submit Button */}
// //         <div className="text-right">
// //           <button
// //             onClick={handleSubmit}
// //             disabled={isSubmitDisabled}
// //             className={`px-6 py-2 rounded-lg cursor-pointer text-white ${
// //               isSubmitDisabled ? "bg-gray-400" : "bg-indigo-600 hover:bg-blue-700"
// //             }`}
// //           >
// //             {loading ? "Submitting..." : "Class Allocate"}
// //           </button>
// //         </div>

// //         {/* Success / Error Message */}
// //         {success && (
// //           <p className="text-green-600 mt-2 font-semibold">{success}</p>
// //         )}
// //         {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
// //       </div>
// //     </>
// //   );
// // };

// // export default ClassTeacherAllocation;
// import React, { useState } from "react";
// import HeadingHeader from "../../../components/common/HeadingHeader";
// import Card from "../../../components/common/Card";
// import SlidingLabelSelect from "../../../components/common/SlidingSelect";
// import BorderedFieldset from "../../../components/common/BorderedFieldset";
// import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
// import BackButton from "../../../components/common/BackButton";
// import { useQuery, useMutation } from "@tanstack/react-query";

// // ✅ API functions
// const fetchTeachers = async () => {
//   const res = await fetch("http://localhost:5000/api/teachers");
//   if (!res.ok) throw new Error("Failed to fetch teachers");
//   return res.json();
// };

// const fetchCoTeachers = async () => {
//   const res = await fetch("http://localhost:5000/api/co-teachers");
//   if (!res.ok) throw new Error("Failed to fetch co-teachers");
//   return res.json();
// };

// const fetchClasses = async () => {
//   const res = await fetch("http://localhost:5000/api/classes");
//   if (!res.ok) throw new Error("Failed to fetch classes");
//   return res.json();
// };

// const fetchSections = async () => {
//   const res = await fetch("http://localhost:5000/api/sections");
//   if (!res.ok) throw new Error("Failed to fetch sections");
//   return res.json();
// };

// const allocateClassTeacher = async (data) => {
//   const res = await fetch("http://localhost:5000/api/class-teacher-allocation", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   if (!res.ok) throw new Error(result.message || "Failed to allocate");
//   return result;
// };

// const ClassTeacherAllocation = () => {
//   const [UserData, setUserData] = useState({
//     teacher: "",
//     coTeacher: "",
//     status: "",
//     classes: [{ class: "", section: "" }],
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Queries
//   // const { data: teacherList = [], isLoading: loadingTeachers } = useQuery(["teachers"], fetchTeachers);
//   const { data: coTeacherList = [], isLoading: loadingCoTeachers } = useQuery(["coTeachers"], fetchCoTeachers);
//   const { data: classList = [], isLoading: loadingClasses } = useQuery(["classes"], fetchClasses);
//   const { data: sectionList = [], isLoading: loadingSections } = useQuery(["sections"], fetchSections);
// const { data: teacherList = [], isLoading: loadingTeachers } = useQuery(["teachers"], fetchTeachers);

//   // ✅ Mutation
//   const mutation = useMutation({
//     mutationFn: allocateClassTeacher,
//     onSuccess: () => {
//       alert("Class Teacher Allocated Successfully!");
//       setUserData({
//         teacher: "",
//         coTeacher: "",
//         status: "",
//         classes: [{ class: "", section: "" }],
//       });
//     },
//     onError: (err) => {
//       alert(err.message);
//     },
//   });

//   const handleChange = (field, value) => {
//     setUserData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleClassChange = (index, field, value) => {
//     const updatedClasses = [...UserData.classes];
//     updatedClasses[index][field] = value;
//     setUserData((prev) => ({ ...prev, classes: updatedClasses }));
//   };

//   const addClass = () => {
//     setUserData((prev) => ({
//       ...prev,
//       classes: [...prev.classes, { class: "", section: "" }],
//     }));
//   };

//   const removeClass = (index) => {
//     const updatedClasses = UserData.classes.filter((_, i) => i !== index);
//     setUserData((prev) => ({ ...prev, classes: updatedClasses }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!UserData.teacher) newErrors.teacher = "Teacher is required";
//     if (!UserData.coTeacher) newErrors.coTeacher = "Co-teacher is required";
//     if (!UserData.status) newErrors.status = "Status is required";
//     UserData.classes.forEach((cls, idx) => {
//       if (!cls.class) newErrors[`class_${idx}`] = "Class is required";
//       if (!cls.section) newErrors[`section_${idx}`] = "Section is required";
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;
//     mutation.mutate(UserData);
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <HeadingHeader
//           title="Class Teacher Allocation"
//           items={[
//             { label: "Academics", path: "/" },
//             { label: "Class Teacher Allocation", path: "/academics/class-teacher-allocation" },
//           ]}
//         />
//         <BackButton back="/academics/class-teacher-allocation" />
//       </div>

//       <div className="flex flex-col gap-4">
//         <Card>
//           <BorderedFieldset legend="Class Teacher Allocation Form">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <SlidingLabelSelect
//                   label="Select Teacher"
//                   value={UserData.teacher}
//                   onChange={(e) => handleChange("teacher", e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   {teacherList.map((t, i) => (
//                     <option key={i} value={t.id}>{t.name}</option>
//                   ))}
//                 </SlidingLabelSelect>
//                 {errors.teacher && <p className="text-red-500 text-xs">{errors.teacher}</p>}
//               </div>

//               <div>
//                 <SlidingLabelSelect
//                   label="Select Co Teacher"
//                   value={UserData.coTeacher}
//                   onChange={(e) => handleChange("coTeacher", e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   {coTeacherList.map((ct, i) => (
//                     <option key={i} value={ct.id}>{ct.name}</option>
//                   ))}
//                 </SlidingLabelSelect>
//                 {errors.coTeacher && <p className="text-red-500 text-xs">{errors.coTeacher}</p>}
//               </div>
//             </div>
//           </BorderedFieldset>

//           <BorderedFieldset legend="Select Class and Section">
//             {UserData.classes.map((item, index) => (
//               <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
//                 <div>
//                   <SlidingLabelSelect
//                     label="Class"
//                     value={item.class}
//                     onChange={(e) => handleClassChange(index, "class", e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     {classList.map((cls, i) => (
//                       <option key={i} value={cls.id}>{cls.name}</option>
//                     ))}
//                   </SlidingLabelSelect>
//                   {errors[`class_${index}`] && <p className="text-red-500 text-xs">{errors[`class_${index}`]}</p>}
//                 </div>

//                 {/* <div className="flex gap-2 items-center">
//                   <div>
//                     <SlidingLabelSelect
//                       label="Section"
//                       value={item.section}
//                       onChange={(e) => handleClassChange(index, "section", e.target.value)}
//                     >
//                       <option value="">Select</option>
//                       {sectionList.map((sec, i) => (
//                         <option key={i} value={sec.id}>{sec.name}</option>
//                       ))}
//                     </SlidingLabelSelect>
//                     {errors[`section_${index}`] && <p className="text-red-500 text-xs">{errors[`section_${index}`]}</p>}
//                   </div>

//                   {UserData.classes.length > 1 && (
//                     <button
//                       onClick={() => removeClass(index)}
//                       className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
//                     >
//                       <span className="cursor-pointer text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
//                         ✕
//                       </span>
//                     </button>
//                   )}
//                 </div> */}
//                    <div className="flex gap-2 items-center">
//                   <SlidingLabelSelect
//                     label="Section"
//                     value={item.section}
//                     onChange={(e) => handleClassChange(index, "section", e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     {sections.map((sec) => (
//                       <option key={sec.id} value={sec.id}>
//                         {sec.name}
//                       </option>
//                     ))}
//                   </SlidingLabelSelect>

//                   {UserData.classes.length > 1 && (
//                     <button
//                       onClick={() => removeClass(index)}
//                       aria-label="Remove class allocation"
//                       title="Remove class"
//                       className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
//                     >
//                       <span className="text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
//                         ✕
//                       </span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </BorderedFieldset>

//           <div className="mt-4 mb-4 text-right">
//             <button
//               onClick={addClass}
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
//             >
//               Add Class
//             </button>
//           </div>

//           <BorderedFieldset legend="Status">
//             <SlidingLabelRadio
//               name="status"
//               value={UserData.status}
//               onChange={(e) => handleChange("status", e.target.value)}
//               options={["Active", "Inactive"]}
//             />
//             {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
//           </BorderedFieldset>
//         </Card>

//         <div className="text-right">
//           <button
//             onClick={handleSubmit}
//             disabled={mutation.isLoading}
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50"
//           >
//             {mutation.isLoading ? "Allocating..." : "Class Allocate"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClassTeacherAllocation;
import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
import BackButton from "../../../components/common/BackButton";
import { useQuery, useMutation } from "@tanstack/react-query";

// ✅ API functions
const fetchTeachers = async () => {
  const res = await fetch("http://localhost:5000/api/teachers");
  if (!res.ok) throw new Error("Failed to fetch teachers");
  return res.json();
};

const fetchCoTeachers = async () => {
  const res = await fetch("http://localhost:5000/api/co-teachers");
  if (!res.ok) throw new Error("Failed to fetch co-teachers");
  return res.json();
};

const fetchClasses = async () => {
  const res = await fetch("http://localhost:5000/api/classes");
  if (!res.ok) throw new Error("Failed to fetch classes");
  return res.json();
};

const fetchSections = async () => {
  const res = await fetch("http://localhost:5000/api/sections");
  if (!res.ok) throw new Error("Failed to fetch sections");
  return res.json();
};

const allocateClassTeacher = async (data) => {
  const res = await fetch("http://localhost:5000/api/class-teacher-allocation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to allocate");
  return result;
};

const ClassTeacherAllocation = () => {
  const [UserData, setUserData] = useState({
    teacher: "",
    coTeacher: "",
    status: "",
    classes: [{ class: "", section: "" }],
  });

  const [errors, setErrors] = useState({});

  // ✅ Queries (v5 object syntax)
  const { data: teacherList = [], isLoading: loadingTeachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const { data: coTeacherList = [], isLoading: loadingCoTeachers } = useQuery({
    queryKey: ["coTeachers"],
    queryFn: fetchCoTeachers,
  });

  const { data: classList = [], isLoading: loadingClasses } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });

  const { data: sectionList = [], isLoading: loadingSections } = useQuery({
    queryKey: ["sections"],
    queryFn: fetchSections,
  });

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: allocateClassTeacher,
    onSuccess: () => {
      alert("Class Teacher Allocated Successfully!");
      setUserData({
        teacher: "",
        coTeacher: "",
        status: "",
        classes: [{ class: "", section: "" }],
      });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClassChange = (index, field, value) => {
    const updatedClasses = [...UserData.classes];
    updatedClasses[index][field] = value;
    setUserData((prev) => ({ ...prev, classes: updatedClasses }));
  };

  const addClass = () => {
    setUserData((prev) => ({
      ...prev,
      classes: [...prev.classes, { class: "", section: "" }],
    }));
  };

  const removeClass = (index) => {
    const updatedClasses = UserData.classes.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, classes: updatedClasses }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!UserData.teacher) newErrors.teacher = "Teacher is required";
    if (!UserData.coTeacher) newErrors.coTeacher = "Co-teacher is required";
    if (!UserData.status) newErrors.status = "Status is required";
    UserData.classes.forEach((cls, idx) => {
      if (!cls.class) newErrors[`class_${idx}`] = "Class is required";
      if (!cls.section) newErrors[`section_${idx}`] = "Section is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    mutation.mutate(UserData);
  };

  return (
  <>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
    <HeadingHeader
      title="Class Teacher Allocation"
      items={[
        { label: "Academics", path: "/" },
        { label: "Class Teacher Allocation", path: "/academics/class-teacher-allocation" },
      ]}
    />
    <div className="flex justify-end">
      <BackButton back="/academics/class-teacher-allocation" />
    </div>
  </div>


      <div className="flex flex-col gap-4">
        <Card>
          <BorderedFieldset legend="Class Teacher Allocation Form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SlidingLabelSelect
                  label="Select Teacher"
                  name={"teacher"}
                  value={UserData.teacher}
                  onChangeProp={(e) => handleChange("teacher", e.target.value)}
              options={teacherList.map((t) => t.name)}
                />
                 
                {errors.teacher && <p className="text-red-500 text-xs">{errors.teacher}</p>}
              </div>

              <div>
                <SlidingLabelSelect
                  label="Select Co Teacher"
                  name={"coTeacher"}
                  value={UserData.coTeacher}
                  onChangeProp={(e) => handleChange("coTeacher", e.target.value)}
                options={coTeacherList.map((ct) => ct.name)}
                  />
                {errors.coTeacher && <p className="text-red-500 text-xs">{errors.coTeacher}</p>}
              </div>
            </div>
          </BorderedFieldset>

          <BorderedFieldset legend="Select Class and Section">
            {UserData.classes.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
                <div>
                  <SlidingLabelSelect
                    label="Class"
                    name={`class_${index}`}
                    value={item.class}
                    onChangeProp={(e) => handleClassChange(index, "class", e.target.value)}
                    options={classList.map((cls) => cls.name)}
                  />
                    
                  {errors[`class_${index}`] && <p className="text-red-500 text-xs">{errors[`class_${index}`]}</p>}
                </div>

                <div className="flex gap-2 items-center">
                  <SlidingLabelSelect
                    label="Section"
                    name={`section_${index}`}
                    value={item.section}
                    onChange={(e) => handleClassChange(index, "section", e.target.value)}
                    options={sectionList.map((sec) => sec.name)}
                  />
                   

                  {UserData.classes.length > 1 && (
                    <button
                      onClick={() => removeClass(index)}
                      aria-label="Remove class allocation"
                      title="Remove class"
                      className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
                    >
                      <span className="text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
                        ✕
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </BorderedFieldset>

          <div className="mt-4 mb-4 text-right">
            <button
              onClick={addClass}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add Class
            </button>
          </div>

          <BorderedFieldset legend="Status">
            <SlidingLabelRadio
              name="status"
              value={UserData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={["Active", "Inactive"]}
            />
            {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
          </BorderedFieldset>
        </Card>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={mutation.isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50"
          >
            {mutation.isLoading ? "Allocating..." : "Class Allocate"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassTeacherAllocation;
