
import './App.css';
import './Login.css';
import { useState } from 'react';

function AdventurePage() {
  // === STATE ===
  const [personality, setPersonality] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [suggestedCareers, setSuggestedCareers] = useState([]);

  // === HANDLERS ===
  const handleSkillClick = (skill) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill]
    );
  };

  const handleInterestClick = (interest) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest) ? prevInterests.filter((i) => i !== interest) : [...prevInterests, interest]
    );
  };

  const suggestCareers = () => {
    let careers = [];

    if (personality === 'Introverted') {
      careers.push('Writer', 'Software Developer', 'Research Scientist');
    } else if (personality === 'Extroverted') {
      careers.push('Sales Manager', 'Marketing Specialist', 'Entrepreneur');
    }

    if (skills.includes('Creative')) {
      careers.push('Graphic Designer', 'Content Creator');
    }
    if (skills.includes('Analytical')) {
      careers.push('Data Analyst', 'Financial Analyst');
    }
    if (skills.includes('Leader')) {
      careers.push('Project Manager', 'Business Executive');
    }
    if (skills.includes('Problem Solver')) {
      careers.push('Engineer', 'Consultant');
    }

    if (interests.includes('Technology')) {
      careers.push('Software Engineer', 'Cybersecurity Specialist');
    }
    if (interests.includes('Arts')) {
      careers.push('Artist', 'Animator');
    }
    if (interests.includes('Healthcare')) {
      careers.push('Doctor', 'Nurse', 'Therapist');
    }
    if (interests.includes('Business')) {
      careers.push('Accountant', 'Business Analyst');
    }

    // Remove duplicates
    const uniqueCareers = [...new Set(careers)];

    setSuggestedCareers(uniqueCareers);
  };

  return (
    <>
      {/* Story Sections */}
      <div className="story-container">
        <section className="story-section" id="section1">
          <div className="text-block">
            <h2>The Beginning of the Adventure</h2>
            <p>
              In a distant kingdom, bordered by ancient oaks and morning mist, lay the Enchanted Forest.
              It was said that deep within its depths lay a millennial secret, guarded by ancient spirits.
            </p>
            <button className="next-section-btn">Continue the story</button>
          </div>
          <div className="image-block">
            <img
              src="https://raw.githubusercontent.com/mickaellherminez/img/main/codepen/january-week1/image-1.png"
              alt="Illustration of the Enchanted Forest"
              className="image-placeholder"
            />
          </div>
        </section>

        <section className="story-section" id="section2">
          <div className="text-block">
            <h2>The Mysterious Creature</h2>
            <p>
              As the trees thickened and the light grew scarce, a silhouette appeared. 
              It was said that this creature watched over the balance of the forest, protecting all living beings from a forgotten evil.
            </p>
            <button className="next-section-btn">Discover the next part</button>
          </div>
          <div className="image-block">
            <img
              src="https://raw.githubusercontent.com/mickaellherminez/img/main/codepen/january-week1/image-2.png"
              alt="Illustration of the mythical creature"
              className="image-placeholder"
            />
          </div>
        </section>

        <section className="story-section" id="section3">
          <div className="text-block">
            <h2>The Ultimate Challenge</h2>
            <p>
              Guided by unexpected courage, the adventurer prepared to break the curse that lay upon these lands.
              The fate of the Enchanted Forest now rested in their hands.
            </p>
          </div>
          <div className="image-block">
            <img
              src="https://raw.githubusercontent.com/mickaellherminez/img/main/codepen/january-week1/image-3.png"
              alt="Illustration of the final ritual"
              className="image-placeholder"
            />
          </div>
        </section>

        {/* Career Assessment Test Section */}
        <section className="career-test-section">
          <div className="text-block">
            <h2>✨ Career Assessment Test ✨</h2>
            <p>Find your path by discovering your personality, skills, and interests!</p>

            {/* Personality Test */}
            <div className="test-section">
              <h3>Personality Test</h3>
              <p>Are you more Introverted or Extroverted?</p>
              <div className="button-group">
                <button
                  className={`test-btn ${personality === 'Introverted' ? 'selected' : ''}`}
                  onClick={() => setPersonality('Introverted')}
                >
                  Introverted (I)
                </button>
                <button
                  className={`test-btn ${personality === 'Extroverted' ? 'selected' : ''}`}
                  onClick={() => setPersonality('Extroverted')}
                >
                  Extroverted (E)
                </button>
              </div>
            </div>

            {/* Skills Assessment */}
            <div className="test-section">
              <h3>Skills Assessment</h3>
              <p>Which skills describe you best? (Select multiple)</p>
              <div className="button-group">
                {['Creative', 'Analytical', 'Leader', 'Problem Solver'].map((skill) => (
                  <button
                    key={skill}
                    className={`test-btn ${skills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Survey */}
            <div className="test-section">
              <h3>Interests Survey</h3>
              <p>What fields are you passionate about? (Select multiple)</p>
              <div className="button-group">
                {['Technology', 'Arts', 'Healthcare', 'Business'].map((interest) => (
                  <button
                    key={interest}
                    className={`test-btn ${interests.includes(interest) ? 'selected' : ''}`}
                    onClick={() => handleInterestClick(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggest Careers Button */}
            <div className="suggest-careers">
              <button className="next-section-btn" onClick={suggestCareers}>
                Suggest Careers Based on My Answers
              </button>
            </div>

            {/* Show Suggested Careers */}
            {suggestedCareers.length > 0 && (
              <div className="career-results">
                <h3>Suggested Careers:</h3>
                <ul>
                  {suggestedCareers.map((career) => (
                    <li key={career}>{career}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      <div className="modal-overlay">
        <img className="modal-image" src="" alt="Image en grand" />
        <div className="modal-close">
          <span>×</span>
        </div>
      </div>
    </>
  );
}

export default AdventurePage;
