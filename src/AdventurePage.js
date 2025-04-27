import React, { useState } from "react";
import "./App.css";
import Welcome from './Welcome.jsx'; // Import the Welcome component

function AdventurePage({ scrollToSection }) {
  const [personality, setPersonality] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [suggestedCareers, setSuggestedCareers] = useState([]);

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
    <div className="story-container">
      {/* Story Sections */}
      <section className="story-section" id="section1">
        <div className="text-block">
          <h2>Mission Statement</h2>
          <p>
          "Our mission is to bridge the gap between education and industry by providing personalized, AI-driven career guidance to every learner.
          We aim to empower students and professionals with accurate, unbiased, and insightful career recommendations — helping them unlock their true potential and achieve lasting success."
          </p>
        </div>
        <div className="image-block">
          <img
            src="http://www.karencomfort.com/wp-content/uploads/2015/05/Career-success-and-Your-Personal-Mission-Statement-3-thumbnail.jpg"
            alt="Illustration of the Enchanted Forest"
            className="image-placeholder"
          />
        </div>
      </section>

      <section className="story-section" id="section2">
        <div className="text-block">
          <h2>How It Works</h2>
          <p>
          "Input your skills, education, and interests — our system predicts the best career path for you, personalized and accurate. Modify anytime until you find your perfect fit!"</p>
        </div>
        <div className="image-block">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.GtsC8K_q4J-CvqVwxZ8UZwHaCd&pid=Api&P=0&h=180"
            alt="Illustration of the mythical creature"
            className="image-placeholder"
          />
        </div>
      </section>

      <section className="story-section" id="section3">
        <div className="text-block">
          <h2>Testimonials or Success Stories</h2>
          <p>
            "A New Career Path with Confidence" - Sarah M.
            "I was completely lost when it came to choosing a career after graduating. I knew I wanted something in tech, but I wasn't sure where to start. Career Guidance helped me by first identifying my personality type, which made me realize I was more analytical and suited for a technical role. After completing the skills and interest tests, the platform suggested several career paths, including software development. I’ve now started an internship as a junior developer and couldn’t be happier!"
            Career Path: Junior Software Developer
            Key to Success: Personalized suggestions based on skills and personality tests.
          </p>
        </div>
        <div className="image-block">
          <img
            src="https://www.cheggindia.com/wp-content/uploads/2023/06/10-Stories-About-Success-to-Change-Your-Life-768x407.png"
            alt="Illustration of the final ritual"
            className="image-placeholder"
          />
        </div>
      </section>
    </div>
  );
}

function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // New state to track the current page

  // Scroll function to scroll to specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle the "Get Started" button click
  const handleGetStarted = () => {
    setShowWelcome(true); // Show the Welcome page on button click
    setCurrentPage('welcome'); // Update current page to 'welcome'
  };

  // Handle the "Home" button click
  const handleHomeClick = () => {
    setShowWelcome(false); // Show the home page
    setCurrentPage('home'); // Update current page to 'home'
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    alert("Your message has been sent successfully!");
  };

  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">Career.ly</div>
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>Home</a></li> 
            <li className="dropdown">
              <a href="#">Services ▼</a>
              <div className="dropdown-content">
                <a href="#career-prediction">Career Prediction</a>
                <a href="#courses">Courses</a>
                <a href="#knowledge-network">Knowledge Network</a>
              </div>
            </li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {currentPage === 'home' ? (
        <>
          <section id="home" className="hero">
            <div className="hero-content">
              <h1>Intelligent Career Counsellor</h1>
              <p className="pp">Discover yourself <br /> Take the test to find the perfect role for you after Graduation</p>
              <button className="get-started-yuvraj" onClick={handleGetStarted}>Get Started!</button>
            </div>
          </section>

          <section id="about">
            <h2 className="yuvraj">About Us</h2>
            <p className="yuvraj">Welcome to the Intelligent Career Counsellor System!
We have combined the power of Machine Learning and Deep Learning technologies such as Feedforward Neural Networks (FNN) and XGBoost to make career counseling smarter, faster, and unbiased.
Start your journey with us and discover your true career path today! 🚀</p>
            <AdventurePage scrollToSection={scrollToSection} />
          </section>
        </>
      ) : currentPage === 'welcome' ? (
        <Welcome /> // Show the Welcome page when 'welcome' is the current page
      ) : null}

      <section className="cont" id="contact" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'cream', padding: '40px 20px' }}>
        <div className="cont-form-container" style={{ width: '100%', maxWidth: '700px', backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
          <form id="contact-form" method="post" onSubmit={handleFormSubmit}>
            <div className="form-group" id="name-form" style={{ marginBottom: '25px' }}>
              <label htmlFor="name" style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#333', marginBottom: '8px', letterSpacing: '0.5px' }}>Your Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                style={{ width: '100%', padding: '14px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#f9f9f9', color: '#333', transition: 'border-color 0.3s ease, background-color 0.3s ease' }}
              />
            </div>

            <div className="form-group" id="email-form" style={{ marginBottom: '25px' }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#333', marginBottom: '8px', letterSpacing: '0.5px' }}>Your E-mail*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                style={{ width: '100%', padding: '14px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#f9f9f9', color: '#333', transition: 'border-color 0.3s ease, background-color 0.3s ease' }}
              />
            </div>

            <div className="form-group" id="message-form" style={{ marginBottom: '25px' }}>
              <label htmlFor="message" style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#333', marginBottom: '8px', letterSpacing: '0.5px' }}>Your Message*</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                required
                style={{ width: '100%', padding: '14px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#f9f9f9', color: '#333', transition: 'border-color 0.3s ease, background-color 0.3s ease' }}
              ></textarea>
            </div>

            <div className="form-group">
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
