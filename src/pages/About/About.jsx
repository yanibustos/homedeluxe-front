import React from "react";
import { Link } from "react-router-dom";

import SupabaseIcon from "../../components/commons/SupabaseIcon/SupabaseIcon";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./About.css";

const About = () => {
  const techTools = [
    { iconClass: "fab fa-bootstrap", label: "Bootstrap" },
    { iconClass: "fab fa-css3-alt", label: "CSS3" },
    { iconClass: "fab fa-figma", label: "Figma" },
    { iconClass: "fab fa-github", label: "GitHub" },
    { iconClass: null, label: "Supabase", isCustomIcon: true },
    { iconClass: "fas fa-database", label: "SQL" },
    { iconClass: "fab fa-react", label: "React" },
    { iconClass: "fab fa-node-js", label: "NodeJS" },
    { iconClass: "fab fa-reddit", label: "Redux" },
    { iconClass: "fab fa-js-square", label: "JavaScript" },
    { iconClass: "fab fa-trello", label: "Trello" },
    { iconClass: "fab fa-discord", label: "Discord" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Yanina Bustos",
      role: " Full Stack Developer Jr.",
      github: "https://github.com/yanibustos",
      linkedin: "https://www.linkedin.com/in/yanina-bustos",
      image: "/img/YaninaProfile.png",
    },
    {
      id: 2,
      name: "Cristofer Fernandez",
      role: " Full Stack Developer Jr.",
      github: "https://github.com/CristoferFO",
      linkedin: "https://www.linkedin.com/in/cristofer-fernandez-72a838243/",
      image: "/img/CristoferProfile.png",
    },
    {
      id: 3,
      name: "Darlen Hornia",
      role: " Full Stack Developer Jr.",
      github: "https://github.com/dhornia",
      linkedin: "https://www.linkedin.com/in/darlen-hornia-webdev",
      image: "/img/DarlenProfile.png",
    },
    {
      id: 4,
      name: "Federico Vargas",
      role: " Full Stack Developer Jr.",
      github: "https://github.com/FedeVargas21",
      linkedin: "https://www.linkedin.com/in/federico-vargas-b60b28261/",
      image: "/img/FedericoProfile.png",
    },
    {
      id: 5,
      name: "Ayhesa Hinds",
      role: " Full Stack Developer Jr.",
      github: "https://github.com/ayhesahinds",
      linkedin: "https://www.linkedin.com/in/ayhesa-clementine-hinds-shappiro-05771b97/",
      image: "/img/AyhesaProfile.png",
    },
  ];

  return (
    <div className="about-container">
      <div className="about-section section1">
        <div className="container d-flex justify-content-center align-items-start flex-column">
          <div className="text-center">
            <h1>About This Project</h1>
            <p>
              This e-commerce website is a project developed by students from the Coding Bootcamp at
              Hack Academy. The Bootcamp is an intensive, hands-on 3-month, full-time educational
              program where students invest over 600 hours learning about Node.js, Express,
              React.js, SQL, MongoDB, and Git. Throughout the program, students work on real-world
              projects, enhancing their technical skills and preparing for careers in software
              development.
            </p>
          </div>
        </div>
      </div>

      <div className="section2 d-flex">
        <div className="container row">
          <div className="col-md-6 section2-text">
            <h2>Technologies & Tools</h2>
            <p>
              Throughout the bootcamp, we explored various backend and frontend technologies while
              gaining practical experience with databases and development tools.
            </p>
            <br></br>
            <p>
              To ensure an organized and efficient workflow, we used Trello for task management and
              GitHub for collaboration across three defined sprints. Discord served as our main
              communication channel, helping us coordinate effectively as a team.
            </p>
            <p>
              These tools played a key role in enhancing our productivity and maintaining a
              structured development process.
            </p>
          </div>
          <div className="col-md-6 icons">
            <div className="technologies-row d-flex flex-wrap">
              {techTools.map((item, index) => (
                <div className="tecnology-item col-3 text-center py-4" key={index}>
                  {item.isCustomIcon ? (
                    <SupabaseIcon className="tecnology-icon" />
                  ) : (
                    <i className={`${item.iconClass} tecnology-icon`}></i>
                  )}
                  <p className="tecnology-name">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="section3 container">
          <div className="section3-text">
            <h2>Project Organization - MER</h2>
            <p>
              Before beginning development, we focused on structuring the backend of the
              application. We identified the main features and created a Model Entity Relationship
              (MER) diagram to visualize the connections between key entities: Users, Products,
              Orders, Styles, and Admins. This planning step helped us ensure a more organized and
              efficient development process.
            </p>
          </div>
          <div className="image">
            <img src="/img/MER Image.png" alt="Admin Image" className="admin-image" />
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section4 text-center">
          <div className="container">
            <h2>Admin Dashboard</h2>
            <p className="mx-auto text-center w-75 w-md-50">
              This e-commerce platform features an intuitive admin dashboard that allows users to
              manage products, categories, and customers by adding, editing, or deleting items.
              Additionally, administrators can track order statuses and make any necessary updates
              or adjustments.
            </p>
            <img src="/img/dashboardImage.png" alt="Admin Image" className="admin-image pt-3" />

            <div className="content-wrapper">
              <div className="left-column">
                <p>To test our Admin dashboard, follow these steps:</p>
                <ol className="text-left">
                  <li>
                    Visit our{" "}
                    <Link to="http://localhost:5174/admin/login" className="login-link">
                      admin login page
                    </Link>
                  </li>
                  <li>
                    Use the email address <strong>"admin@homedeluxe.com"</strong> as username.
                  </li>
                  <li>
                    Input <strong>"password123"</strong> as the password.
                  </li>
                  <li>Click on the login button or submit the form.</li>
                </ol>
              </div>

              <div className="right-column">
                <p>To test the application as a user, follow these steps:</p>
                <ol className="text-left">
                  <li>
                    Visit our{" "}
                    <Link to="/login" className="login-link">
                      login page
                    </Link>
                  </li>
                  <li>
                    Use the email address <strong>"userprueba@gmail.com"</strong> as username.
                  </li>
                  <li>
                    Input <strong>"password123"</strong> as the password.
                  </li>
                  <li>Click on the login button or submit the form.</li>
                </ol>
              </div>
            </div>

            <p className="final-note pt-4">
              Now you can access the admin dashboard and test the application with the provided
              login data. Enjoy the testing!
            </p>
          </div>
        </div>
      </div>

      <div className="members-section">
        <div className="section5 text-center">
          <h2>Our Team</h2>
          <div className="container row justify-content-center">
            {teamMembers.map((member) => (
              <div className="col-md-auto" key={member.id}>
                <div className="team-member">
                  <img src={member.image} alt={member.name} className="team-photo" />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <div>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-github"></i>
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
