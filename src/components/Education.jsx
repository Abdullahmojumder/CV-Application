import React from 'react';

function Education({ educations, handleChange }) {
  return (
    <div>
      {educations.map(edu => (
        <div key={edu.id} className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="school"
              value={edu.school}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="School Name"
              className="input-field w-full"
            />
            <input
              type="text"
              name="study"
              value={edu.study}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Title of Study"
              className="input-field w-full"
            />
            <input
              type="text"
              name="date"
              value={edu.date}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Date of Study (e.g., 2018-2022)"
              className="input-field w-full"
            />
            <input
              type="text"
              name="gpa"
              value={edu.gpa}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="GPA (e.g., 3.7/4.0)"
              className="input-field w-full"
            />
            <input
              type="text"
              name="coursework"
              value={edu.coursework}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Relevant Coursework"
              className="input-field w-full"
            />
            <textarea
              name="awards"
              value={edu.awards}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Awards/Honors"
              className="textarea-field w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education;