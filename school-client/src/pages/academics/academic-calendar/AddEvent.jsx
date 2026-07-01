import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import SlidingLabelSelect from '../../../components/common/SlidingSelect';
import BorderedFieldset from '../../../components/common/BorderedFieldset';
import SlidingLabelInput from '../../../components/common/SlidingLabelInput';
import SlidingLabelTextarea from '../../../components/common/SlidingLabelTextarea';
import HeadingHeader from '../../../components/common/HeadingHeader';
import SlidingLabelCheckbox from '../../../components/common/SlidingLabelCheckbox';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: '',
    isWorkingDay: true,
    startDate: '',
    endDate: '',
    attachment: null,
    applicableTo: 'class',
    selectedClasses: [],
    description: '',
  });

  const eventTypeOptions = ['Holiday', 'Exam', 'Activity', 'Meeting'];
  const classes = [
    'Class A','Class A','Class A','Class A','Class A','Class A',
    'Class B','Class B','Class B','Class B','Class B','Class B'
  ];

  const handleChange = (field, value) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClassToggle = (cls) => {
    setEventData((prev) => {
      const isSelected = prev.selectedClasses.includes(cls);
      return {
        ...prev,
        selectedClasses: isSelected
          ? prev.selectedClasses.filter((c) => c !== cls)
          : [...prev.selectedClasses, cls],
      };
    });
  };

  const handleSave = () => {
    if (!eventData.eventName || !eventData.startDate) {
      alert("Event Name and Start Date are required!");
      return;
    }

    try {
      // read old events
      const stored = localStorage.getItem("ev_calendar_events_v1");
      const events = stored ? JSON.parse(stored) : [];

      // prepare new event object
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
      };

      // save back to storage
      localStorage.setItem(
        "ev_calendar_events_v1",
        JSON.stringify([...events, newEvent])
      );

      alert("Event saved successfully ✅");
      navigate("/academics/academic-calendar/view"); // redirect back to calendar page
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Something went wrong while saving the event.");
    }
  };

  return (
    <>
      <HeadingHeader
        title="Add Event"
        items={[
          { label: 'Academic', path: '/academic' },
          { label: 'Academic Calendar', path: '/academic/academic-calendar' },
          { label: 'Add Event', path: '/academic/academic-calendar/add' },
        ]}
      />

      <div className="flex flex-col gap-4">
        <Card>
          <BorderedFieldset legend="Event Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SlidingLabelInput
                label="Event Name"
                value={eventData.eventName}
                onChange={(e) => handleChange('eventName', e.target.value)}
                className="w-full"
              />

              <SlidingLabelSelect
                label="Event Type"
                name="eventType"
                value={eventData.eventType}
                onChangeProp={(e) => handleChange('eventType', e.target.value)}
                options={eventTypeOptions.map((type) => ({ label: type, value: type }))}
                className="w-full"
              />

              <ToggleSwitch
                label="Is Working Day"
                checked={eventData.isWorkingDay}
                onChange={(val) => handleChange("isWorkingDay", val)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <SlidingLabelInput
                type="date"
                label="Start Date"
                value={eventData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="w-full"
              />

              <SlidingLabelInput
                type="date"
                label="End Date"
                value={eventData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full"
              />

              <SlidingLabelInput 
                type="file"
                label="Attachment (Optional)"
                onChange={(e) => handleChange('attachment', e.target.files[0])}
                className="w-full"
              />
            </div>
          </BorderedFieldset>

          {/* Applicable To */}
          <BorderedFieldset legend="Applicable To">
            <div className="flex flex-wrap gap-4 mb-4">
              {['all', 'class', 'stream', 'role', 'group'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="applicableTo"
                    value={option}
                    checked={eventData.applicableTo === option}
                    onChange={() => handleChange('applicableTo', option)}
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>

            {eventData.applicableTo === 'class' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {classes.map((cls, index) => (
                  <SlidingLabelCheckbox
                    key={index}
                    label={cls}
                    checked={eventData.selectedClasses.includes(cls)}
                    onChange={() => handleClassToggle(cls)}
                  />
                ))}
              </div>
            )}
          </BorderedFieldset>

          {/* Description */}
          <SlidingLabelTextarea
            label="Description (Optional)"
            placeholder="Enter Event Details"
            value={eventData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-4 w-full"
          />

          {/* Submit */}
          <div className="text-right mt-6">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add Event
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddEvent;
