import React, { useState } from "react";
import Card from "../../../components/common/Card";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelCheckbox from "../../../components/common/SlidingLabelCheckbox";
import HeadingHeader from "../../../components/common/HeadingHeader";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";

const AddBooks = () => {
  const [bookData, setBookData] = useState({
    title: "",
    code: "",
    author: "",
    publisher: "",
    year: "",
    category: "",
    quantity: "",
    rack: "",
    price: "",
    supplier: "",
    replacementCost: "",
    subject: "",
    classes: [],
    tags: "",
    coverImage: "",
    language: "",
    condition: "",
    description: "",
  });

  const categories = ["Science", "Mathematics", "Literature", "History"];
const classes = [
  "Class A",
  "Class B",
  "Class C",
  "Class D",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4"];
  const conditions = ["New", "Good", "Average", "Damaged"];

  const handleChange = (field, value) => {
    setBookData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClassToggle = (cls) => {
    setBookData((prev) => ({
      ...prev,
      classes: prev.classes.includes(cls)
        ? prev.classes.filter((c) => c !== cls)
        : [...prev.classes, cls],
    }));
  };

  return (
    <>
      {/* Page heading with breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <HeadingHeader
          title="Add Books"
          items={[
            { label: "Library", path: "/library/books/add" },
            { label: "Books", path: "library/books" },
            { label: "Add Books", path: "library/books/add" },
          ]}
        />
        <button className="ml-3  bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer">
          Bulk Upload
        </button>
      </div>

      <div>
        <Card>
          {/* Book Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SlidingLabelInput
              label="Book Title"
              value={bookData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <SlidingLabelInput
              label="Book Code / ISBN"
              value={bookData.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
            <SlidingLabelInput
              label="Author"
              value={bookData.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
            <SlidingLabelInput
              label="Publisher"
              value={bookData.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
            />
            <SlidingLabelInput
              type="date"
              label="Year of Publication"
              value={bookData.year}
              onChange={(e) => handleChange("year", e.target.value)}
            />
            <SlidingLabelSelect
              label="Select Category"
              name={"category"}
              value={bookData.category}
              onChangeProp={(e) => handleChange("category", e.target.value)}
              options={categories.map((cat) => ({ label: cat, value: cat }))}
            />
            <SlidingLabelInput
              type="number"
              label="Quantity"
              value={bookData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
            <SlidingLabelInput
              label="Rack / Shelf No."
              value={bookData.rack}
              onChange={(e) => handleChange("rack", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Book Price per Copy"
              value={bookData.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <SlidingLabelInput
              label="Supplier/Vendor Name"
              value={bookData.supplier}
              onChange={(e) => handleChange("supplier", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Replacement Cost"
              value={bookData.replacementCost}
              onChange={(e) => handleChange("replacementCost", e.target.value)}
            />
            <SlidingLabelInput
              label="Subject"
              value={bookData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          </div>

          {/* Targeted Classes */}
          <BorderedFieldset
            legend={<span className="text-xs font-medium">Targeted Classes</span>}
            className="mt-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {classes.map((cls) => (
                <SlidingLabelCheckbox
                  key={cls}
                  label={cls}
                  checked={bookData.classes.includes(cls)}
                  onChange={() => handleClassToggle(cls)}
                />
              ))}
            </div>
          </BorderedFieldset>

          {/* Optional fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <SlidingLabelInput
              label="Tags/Keywords (Optional)"
              value={bookData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
            />
            <SlidingLabelInput
              type="file"
              label="Book Cover Image (Optional)"
              onChange={(e) => handleChange("coverImage", e.target.files[0])}
            />
            <SlidingLabelInput
              label="Language (Optional)"
              value={bookData.language}
              onChange={(e) => handleChange("language", e.target.value)}
            />
            <SlidingLabelSelect
              label="Select Condition (Optional)"
              name={"condition"}
              value={bookData.condition}
              onChangeProp={(e) => handleChange("condition", e.target.value)}
              options={conditions.map((cond) => ({ label: cond, value: cond }))}  

          />
          </div>

          {/* Book Description */}
          <div className="mt-4">
            <SlidingLabelInput
              label="Book Description"
              value={bookData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="text-right mt-6">
            <button
              onClick={() => console.log(bookData)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              Add Book
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddBooks;
