import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import SlidingLabelSelect from '../../../components/common/SlidingSelect';
import BorderedFieldset from '../../../components/common/BorderedFieldset';
import SlidingLabelInput from '../../../components/common/SlidingLabelInput';
import SlidingLabelTextarea from '../../../components/common/SlidingLabelTextarea';
import HeadingHeader from '../../../components/common/HeadingHeader';

const AddLessonPlan = () => {
  const [lessonPlan, setLessonPlan] = useState({
    teacher: '',
    class: '',
    section: [],
    subject: '',
    chapters: [
      {
        chapter: '',
        startDate: '',
        endDate: '',
        topics: [
          { topic: '', topicDate: '', method: '', teachingAids: '', resources: null },
        ],
        objective: '',
      },
    ],
    note: '',
  });

  const data = {
    classes: ['12', '11', '10', '9', '8'],
    sectionsByClass: {
      '12': ['A', 'B'],
      '11': ['A', 'B', 'C'],
      '10': ['A', 'B', 'C', 'D'],
      '9': ['A', 'B'],
      '8': ['A', 'B', 'C'],
    },
    subjects: ['Mathematics', 'Physics', 'Computer Science', 'History'],
    teachers: ['Raj Malhotra', 'Meenu Shah', 'Ananya Sharma'],
  };

  const handleChange = (field, value) => {
    setLessonPlan((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'class' && { section: [] }),
    }));
  };

  const handleChapterChange = (index, field, value) => {
    const updated = [...lessonPlan.chapters];
    updated[index][field] = value;
    setLessonPlan({ ...lessonPlan, chapters: updated });
  };

  const handleTopicChange = (cIndex, tIndex, field, value) => {
    const updated = [...lessonPlan.chapters];
    updated[cIndex].topics[tIndex][field] = value;
    setLessonPlan({ ...lessonPlan, chapters: updated });
  };

  const addChapter = () => {
    setLessonPlan((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          chapter: '',
          startDate: '',
          endDate: '',
          topics: [{ topic: '', topicDate: '', method: '', teachingAids: '', resources: null }],
          objective: '',
        },
      ],
    }));
  };

  const removeChapter = (index) => {
    setLessonPlan({ ...lessonPlan, chapters: lessonPlan.chapters.filter((_, i) => i !== index) });
  };

  const addTopic = (cIndex) => {
    const updated = [...lessonPlan.chapters];
    updated[cIndex].topics.push({
      topic: '',
      topicDate: '',
      method: '',
      teachingAids: '',
      resources: null,
    });
    setLessonPlan({ ...lessonPlan, chapters: updated });
  };

  const removeTopic = (cIndex, tIndex) => {
    const updated = [...lessonPlan.chapters];
    updated[cIndex].topics = updated[cIndex].topics.filter((_, i) => i !== tIndex);
    setLessonPlan({ ...lessonPlan, chapters: updated });
  };

  return (
    <>
      <HeadingHeader
        title="Add Lesson Plan"
        items={[
          { label: 'Academic', path: '/academic' },
          { label: 'Lesson Planning', path: '/academic/lesson-planning' },
          { label: 'Add Lesson Plan', path: '/academic/lesson-planning/add' },
        ]}
      />

      <div className="flex flex-col gap-4 w-full px-4 md:px-6 lg:px-8">
        <Card>
          {/* Lesson Plan Basic Details */}
          <BorderedFieldset legend="Lesson Plan Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SlidingLabelSelect
                label=" Select Teacher"
                name="teacher"
                value={lessonPlan.teacher}
                onChangeProp={(e) => handleChange('teacher', e.target.value)}
                options={data.teachers.map((t) => ({ label: t, value: t }))}
              />
              <SlidingLabelSelect
                label="Select Class"
                name="class"
                value={lessonPlan.class}
                onChangeProp={(e) => handleChange('class', e.target.value)}
                options={data.classes.map((cls) => ({ label: cls, value: cls }))}
              />
              <SlidingLabelSelect
                label="Select Section"
                name="section"
                value={lessonPlan.section}
                multiple
                onChangeProp={(e) => handleChange('section', e.target.value)}
                options={
                  lessonPlan.class
                    ? data.sectionsByClass[lessonPlan.class].map((sec) => ({ label: sec, value: sec }))
                    : []
                }
              />
              <SlidingLabelSelect
                label="Select Subject"
                name="subject"
                value={lessonPlan.subject}
                onChangeProp={(e) => handleChange('subject', e.target.value)}
                options={data.subjects.map((s) => ({ label: s, value: s }))}
              />
            </div>
          </BorderedFieldset>

          {/* Chapter List */}
          {lessonPlan.chapters.map((chapter, cIndex) => (
            <BorderedFieldset key={cIndex} legend="Chapter List">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SlidingLabelInput
                  label="Chapter"
                  value={chapter.chapter}
                  onChange={(e) => handleChapterChange(cIndex, 'chapter', e.target.value)}
                />
                <SlidingLabelInput
                  type="date"
                  label="Start Date"
                  value={chapter.startDate}
                  onChange={(e) => handleChapterChange(cIndex, 'startDate', e.target.value)}
                />
                <SlidingLabelInput
                  type="date"
                  label="End Date"
                  value={chapter.endDate}
                  onChange={(e) => handleChapterChange(cIndex, 'endDate', e.target.value)}
                />
              </div>

              {/* Topics */}
              {chapter.topics.map((topic, tIndex) => (
                <BorderedFieldset key={tIndex} legend="Topic List">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SlidingLabelInput
                      label="Topic"
                      value={topic.topic}
                      onChange={(e) => handleTopicChange(cIndex, tIndex, 'topic', e.target.value)}
                    />
                    <SlidingLabelInput
                      type="date"
                      label="Topic Date"
                      value={topic.topicDate}
                      onChange={(e) => handleTopicChange(cIndex, tIndex, 'topicDate', e.target.value)}
                    />
                    <SlidingLabelInput
                      label="Method (Optional)"
                      placeholder="Ex: Group discussion, quiz"
                      value={topic.method}
                      onChange={(e) => handleTopicChange(cIndex, tIndex, 'method', e.target.value)}
                    />
                    <SlidingLabelInput
                      label="Teaching Aids"
                      value={topic.teachingAids}
                      onChange={(e) => handleTopicChange(cIndex, tIndex, 'teachingAids', e.target.value)}
                    />
                    <SlidingLabelInput
                      type="file"
                      label="Attach Resources"
                      className="file:opacity-0 file:w-0 file:h-0"
                      onChange={(e) =>
                        handleTopicChange(cIndex, tIndex, 'resources', e.target.files[0])
                      }
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-red-500 text-sm border border-red-500 px-4 py-2 rounded-lg hover:bg-red-100 cursor-pointer"
                      onClick={() => removeTopic(cIndex, tIndex)}
                    >
                      Remove Topic
                    </button>
                  </div>
                </BorderedFieldset>
              ))}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => addTopic(cIndex)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer mb-3"
                >
                  Add Topic
                </button>
              </div>

              <SlidingLabelTextarea
                label="Chapter Objective"
                placeholder="Enter Objectives for Chapter"
                value={chapter.objective}
                onChange={(e) => handleChapterChange(cIndex, 'objective', e.target.value)}
                className="mt-4"
              />

              <div className="mt-4 flex justify-end">
                <button
                  className="text-red-500 text-sm border border-red-500 px-4 py-2 rounded-lg hover:bg-red-100 cursor-pointer"
                  onClick={() => removeChapter(cIndex)}
                >
                  Remove Chapter
                </button>
              </div>
            </BorderedFieldset>
          ))}

          <div className="mt-4 flex justify-end">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer mb-3"
              onClick={addChapter}
            >
              Add Chapter
            </button>
          </div>

          <SlidingLabelTextarea
            label="Note (Optional)"
            placeholder="Enter Note"
            value={lessonPlan.note}
            onChange={(e) => handleChange('note', e.target.value)}
            className="mt-4"
          />

          {/* Submit */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => console.log(lessonPlan)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add Plan
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddLessonPlan;
