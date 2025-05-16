import React, { useState } from 'react';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import './styles/App.css';

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    bio: ''
  });
  const [educations, setEducations] = useState([{ id: 1, school: '', study: '', date: '', gpa: '', coursework: '', awards: '' }]);
  const [experiences, setExperiences] = useState([{ id: 1, title: '', workplace: '', startingYear: '', onGoing: false, endingYear: '', duties: '' }]);
  const [skills, setSkills] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleGeneralInfoChange = (e) => {
    setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (id, e) => {
    const newEducations = educations.map(edu =>
      edu.id === id ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setEducations(newEducations);
  };

  const handleExperienceChange = (id, e) => {
    const newExperiences = experiences.map(exp =>
      exp.id === id ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: experiences.length + 1, title: '', workplace: '', startingYear: '', onGoing: false, endingYear: '', duties: '' }]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleSkillChange = (e) => {
    setSkills(e.target.value.split(',').map(skill => skill.trim()));
  };

  const handleSubmit = () => {
    setSubmittedData({
      generalInfo,
      educations,
      experiences,
      skills
    });
  };

  const handleDownload = () => {
    if (!submittedData) {
      alert('Please submit the form to download your CV.');
      return;
    }
    const cvContent = `
      ${submittedData.generalInfo.name}
      ${submittedData.generalInfo.email} | ${submittedData.generalInfo.phone}
      ${submittedData.generalInfo.address} | ${submittedData.generalInfo.linkedin}
      ${submittedData.generalInfo.bio}

      WORK EXPERIENCE
      ${submittedData.experiences.map(exp => `
        ${exp.title} - ${exp.workplace}
        ${exp.startingYear} - ${exp.onGoing ? 'Present' : exp.endingYear}
        ${exp.duties}
      `).join('\n')}

      EDUCATION
      ${submittedData.educations.map(edu => `
        ${edu.school} - ${edu.study}
        ${edu.date} | GPA: ${edu.gpa}
        ${edu.coursework} | ${edu.awards}
      `).join('\n')}

      SKILLS
      ${submittedData.skills.join(', ')}
    `;
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.txt';
    a.click();
  };

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold mb-6 text-center">CV Builder</h1>
      <div className="flex">
        {/* Left Column - Input Forms */}
        <div className="column p-6 bg-gray-100">
          <div className="section">
            <h2 className="section-title">General Information</h2>
            <GeneralInfo formData={generalInfo} handleChange={handleGeneralInfoChange} />
          </div>
          <div className="section">
            <h2 className="section-title">Education</h2>
            <Education
              educations={educations}
              handleChange={handleEducationChange}
            />
          </div>
          <div className="section">
            <h2 className="section-title">Work Experience</h2>
            {experiences.map(exp => (
              <Experience
                key={exp.id}
                experience={exp}
                handleChange={(e) => handleExperienceChange(exp.id, e)}
                removeExperience={() => removeExperience(exp.id)}
              />
            ))}
            <button onClick={addExperience} className="button add-button mt-4">
              Add
            </button>
          </div>
          <div className="section">
            <h2 className="section-title">Skills</h2>
            <textarea
              value={skills.join(', ')}
              onChange={handleSkillChange}
              placeholder="Enter skills (comma-separated)"
              className="input-field w-full"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={handleSubmit} className="button submit-button">
              Submit
            </button>
          </div>
        </div>

        {/* Right Column - CV Preview */}
        <div className="column p-6 bg-white">
          {submittedData ? (
            <div className="cv-preview">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A3C34' }}>
                {submittedData.generalInfo.name}
              </h2>
              <p className="mb-2">
                {submittedData.generalInfo.email} | {submittedData.generalInfo.phone}
              </p>
              <p className="mb-2">
                {submittedData.generalInfo.address} |{' '}
                <a href={submittedData.generalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  {submittedData.generalInfo.linkedin}
                </a>
              </p>
              <p className="mb-4">{submittedData.generalInfo.bio}</p>
              <hr className="my-2" />
              <h3 className="text-lg font-semibold mb-2">WORK EXPERIENCE</h3>
              {submittedData.experiences.map(exp => (
                <div key={exp.id} className="mb-4">
                  <p className="font-medium">{exp.title} - {exp.workplace}</p>
                  <p>{exp.startingYear} - {exp.onGoing ? 'Present' : exp.endingYear}</p>
                  <p>{exp.duties}</p>
                </div>
              ))}
              <hr className="my-2" />
              <h3 className="text-lg font-semibold mb-2">EDUCATION</h3>
              {submittedData.educations.map(edu => (
                <div key={edu.id} className="mb-4">
                  <p className="font-medium">{edu.school} - {edu.study}</p>
                  <p>{edu.date} | GPA: {edu.gpa}</p>
                  <p>{edu.coursework} | {edu.awards}</p>
                </div>
              ))}
              <hr className="my-2" />
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <p>{submittedData.skills.length ? submittedData.skills.join(', ') : 'No skills added'}</p>
            </div>
          ) : (
            <div className="cv-preview">
              <p>Fill out the form and click Submit to see your CV preview here.</p>
            </div>
          )}
          <button onClick={handleDownload} className="button download-button fixed bottom-4 right-4">
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;