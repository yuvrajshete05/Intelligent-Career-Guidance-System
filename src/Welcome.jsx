

import React, { useState } from 'react';

const Welcome = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Gender: '',
    UG_Course: '',
    UG_Specialization: '',
    Interests: [],
    Skills: [],
    CGPA: '',
    Has_Certification: '',
    Certification_Title: '',
    Is_Working: '',
    Job_Title: '',
    Has_Masters: '',
    Masters_Field: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => {
        const updatedValues = checked
          ? [...prevState[name], value]
          : prevState[name].filter(item => item !== value);
        return { ...prevState, [name]: updatedValues };
      });
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = {
      ...formData,
      Interests: formData.Interests.join(', '),
      Skills: formData.Skills.join(', ')
    };

    fetch('https://career-backend-1-o507.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.career) {
          localStorage.setItem('recommendedCareer', data.career);
          window.location.href = '/result'; // Adjust path as needed
        } else {
          alert(`Error: ${data.error || 'Unexpected error'}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        // alert('❌ Failed to connect to the backend.');
        console.error(error);
      });
  };

  return (
    <div className="container" style={styles.container}>
      <h2>Career Recommendation Form</h2>
      <form id="careerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label>Gender</label>
        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>UG Course</label>
        <select
          name="UG_Course"
          value={formData.UG_Course}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">-- Select --</option>
          <option value="BCA">BCA</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.Sc">B.Sc</option>
          <option value="BA">BA</option>
          <option value="B.Com">B.Com</option>
        </select>

        <label>UG Specialization</label>
        <select
          name="UG_Specialization"
          value={formData.UG_Specialization}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">-- Select --</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electronics">Electronics</option>
          <option value="Physics">Physics</option>
          <option value="Mathematics">Mathematics</option>
        </select>

        <label>Interests</label>
        <div className="checkbox-group" style={styles.checkboxGroup}>
          {['AI/ML', 'Web Dev', 'Cybersecurity', 'Cloud', 'Mobile Apps'].map((interest) => (
            <label key={interest} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="Interests"
                value={interest}
                checked={formData.Interests.includes(interest)}
                onChange={handleChange}
              /> {interest}
            </label>
          ))}
        </div>

        <label>Skills</label>
        <div className="checkbox-group" style={styles.checkboxGroup}>
          {['Python', 'SQL', 'Java', 'HTML/CSS', 'React', 'TensorFlow'].map((skill) => (
            <label key={skill} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="Skills"
                value={skill}
                checked={formData.Skills.includes(skill)}
                onChange={handleChange}
              /> {skill}
            </label>
          ))}
        </div>

        <label>CGPA (0–10)</label>
        <input
          type="number"
          step="0.01"
          name="CGPA"
          value={formData.CGPA}
          onChange={handleChange}
          min="0"
          max="10"
          required
          style={styles.input}
        />

        <label>Did you do certifications?</label>
        <div className="radio-group" style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="Has_Certification"
              value="Yes"
              checked={formData.Has_Certification === 'Yes'}
              onChange={handleChange}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="Has_Certification"
              value="No"
              checked={formData.Has_Certification === 'No'}
              onChange={handleChange}
            /> No
          </label>
        </div>

        <label>Certification Titles</label>
        <input
          type="text"
          name="Certification_Title"
          value={formData.Certification_Title}
          onChange={handleChange}
          placeholder="E.g. Python for Data Science"
          style={styles.input}
        />

        <label>Are you working?</label>
        <div className="radio-group" style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="Is_Working"
              value="Yes"
              checked={formData.Is_Working === 'Yes'}
              onChange={handleChange}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="Is_Working"
              value="No"
              checked={formData.Is_Working === 'No'}
              onChange={handleChange}
            /> No
          </label>
        </div>

        <label>If yes, Job Title</label>
        <input
          type="text"
          name="Job_Title"
          value={formData.Job_Title}
          onChange={handleChange}
          placeholder="E.g. Software Engineer"
          style={styles.input}
        />

        <label>Have you done Masters?</label>
        <div className="radio-group" style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="Has_Masters"
              value="Yes"
              checked={formData.Has_Masters === 'Yes'}
              onChange={handleChange}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="Has_Masters"
              value="No"
              checked={formData.Has_Masters === 'No'}
              onChange={handleChange}
            /> No
          </label>
        </div>

        <label>If yes, Master's Field</label>
        <input
          type="text"
          name="Masters_Field"
          value={formData.Masters_Field}
          onChange={handleChange}
          placeholder="E.g. Masters in Data Science"
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? 'Analyzing...' : 'Submit & Get Career'}
        </button>
      </form>

      {loading && (
        <div id="loader" style={styles.loader}>
          <p>🔍 Analyzing your inputs...</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '750px',
    margin: 'auto',
    background: 'black',
    padding: '35px',
    borderRadius: '16px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  input: {
    width: '50%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  checkboxGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  checkboxLabel: {
    fontWeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  radioGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  },
  loader: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Welcome;
