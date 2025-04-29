

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
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => {
        const updatedList = checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value);
        return { ...prev, [name]: updatedList };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      Interests: formData.Interests.join(', '),
      Skills: formData.Skills.join(', ')
    };

    setSubmittedData(payload); // For local display
    console.log('Submitted Data:', payload);

    fetch('https://career-backend-1-o507.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.career) {
          localStorage.setItem('recommendedCareer', data.career);
          window.location.href = '/result';
        } else {
          alert(`Error: ${data.error || 'Unexpected error'}`);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Submission Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Career Recommendation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="Name" value={formData.Name} onChange={handleChange} required style={styles.input} />

        <label>Gender</label>
        <select name="Gender" value={formData.Gender} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select --</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label>UG Course</label>
        <select name="UG_Course" value={formData.UG_Course} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select --</option>
          <option>BCA</option>
          <option>B.Tech</option>
          <option>B.Sc</option>
          <option>BA</option>
          <option>B.Com</option>
        </select>

        <label>UG Specialization</label>
        <select name="UG_Specialization" value={formData.UG_Specialization} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select --</option>
          <option>Computer Science</option>
          <option>Electronics</option>
          <option>Physics</option>
          <option>Mathematics</option>
        </select>

        <label>Interests</label>
        <div style={styles.checkboxGroup}>
          {['AI/ML', 'Web Dev', 'Cybersecurity', 'Cloud', 'Mobile Apps'].map(interest => (
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
        <div style={styles.checkboxGroup}>
          {['Python', 'SQL', 'Java', 'HTML/CSS', 'React', 'TensorFlow'].map(skill => (
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
          name="CGPA"
          value={formData.CGPA}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.01"
          required
          style={styles.input}
        />

        <label>Did you do certifications?</label>
        <div style={styles.radioGroup}>
          <label><input type="radio" name="Has_Certification" value="Yes" checked={formData.Has_Certification === 'Yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="Has_Certification" value="No" checked={formData.Has_Certification === 'No'} onChange={handleChange} /> No</label>
        </div>

        <label>Certification Title</label>
        <input type="text" name="Certification_Title" value={formData.Certification_Title} onChange={handleChange} style={styles.input} />

        <label>Are you working?</label>
        <div style={styles.radioGroup}>
          <label><input type="radio" name="Is_Working" value="Yes" checked={formData.Is_Working === 'Yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="Is_Working" value="No" checked={formData.Is_Working === 'No'} onChange={handleChange} /> No</label>
        </div>

        <label>Job Title</label>
        <input type="text" name="Job_Title" value={formData.Job_Title} onChange={handleChange} style={styles.input} />

        <label>Have you done Masters?</label>
        <div style={styles.radioGroup}>
          <label><input type="radio" name="Has_Masters" value="Yes" checked={formData.Has_Masters === 'Yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="Has_Masters" value="No" checked={formData.Has_Masters === 'No'} onChange={handleChange} /> No</label>
        </div>

        <label>Master's Field</label>
        <input type="text" name="Masters_Field" value={formData.Masters_Field} onChange={handleChange} style={styles.input} />

        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? 'Analyzing...' : 'Submit & Get Career'}
        </button>
      </form>
{/* 
      {loading && <p style={styles.loader}>🔍 Analyzing your inputs...</p>} */}

      {submittedData && (
        <div style={styles.submittedData}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '750px',
    margin: 'auto',
    background: '#000',
    color: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', sans-serif"
  },
  input: {
    width: '60%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px'
  },
  checkboxGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '12px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  radioGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px'
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
    marginTop: '20px'
  },
  loader: {
    textAlign: 'center',
    marginTop: '20px'
  },
  submittedData: {
    marginTop: '20px',
    background: '#f7f7f7',
    padding: '10px',
    borderRadius: '8px',
    color: '#000'
  }
};

export default Welcome;
