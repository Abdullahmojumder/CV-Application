import React from 'react';

function Experience({ experience, handleChange, removeExperience }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <input
          type="text"
          name="title"
          value={experience.title}
          onChange={handleChange}
          placeholder="Title/Position"
          className="input-field w-full"
        />
        <input
          type="text"
          name="workplace"
          value={experience.workplace}
          onChange={handleChange}
          placeholder="Workplace"
          className="input-field w-full"
        />
        <input
          type="text"
          name="startingYear"
          value={experience.startingYear}
          onChange={handleChange}
          placeholder="Starting Year"
          className="input-field w-full"
        />
        <label>
          On-going:
          <input
            type="checkbox"
            name="onGoing"
            checked={experience.onGoing}
            onChange={(e) => handleChange({ target: { name: 'onGoing', value: e.target.checked } })}
            className="ml-2"
          />
        </label>
        <input
          type="text"
          name="endingYear"
          value={experience.endingYear}
          onChange={handleChange}
          placeholder="Ending Year"
          className="input-field w-full"
          disabled={experience.onGoing}
        />
        <textarea
          name="duties"
          value={experience.duties}
          onChange={handleChange}
          placeholder="Job Duties"
          className="textarea-field w-full"
        />
      </div>
      {experience.id > 1 && (
        <div className="flex items-end justify-end">
          <button onClick={removeExperience} className="button bg-red-500 text-white">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default Experience;