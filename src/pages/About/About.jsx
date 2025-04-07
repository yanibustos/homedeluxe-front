import React from "react";
import { Link } from "react-router-dom";

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
    { iconClass: "fab fa-js-square", label: "JavaScript" },
    { iconClass: "fab fa-mongodb", label: "MongoDB" },
    { iconClass: "fab fa-node-js", label: "NodeJS" },
    { iconClass: "fab fa-react", label: "React" },
    { iconClass: "fab fa-reddit", label: "Redux" },
    { iconClass: "fas fa-database", label: "SQL" },
    { iconClass: "fab fa-trello", label: "Trello" },
    { iconClass: "fab fa-discord", label: "Discord" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Yanina Bustos",
      role: "Junior Full Stack Developer",
      github: "https://github.com/member1",
      linkedin: "https://linkedin.com/in/member1",
      image: "/img/avatar.png",
    },
    {
      id: 2,
      name: "Cristofer Fernandez",
      role: "Junior Full Stack Developer",
      github: "https://github.com/member2",
      linkedin: "https://linkedin.com/in/member2",
      image: "/img/avatar.png",
    },
    {
      id: 3,
      name: "Darlen Hornia",
      role: "Junior Full Stack Developer",
      github: "https://github.com/member3",
      linkedin: "https://linkedin.com/in/member3",
      image: "/img/avatar.png",
    },
    {
      id: 4,
      name: "Federico Vargas",
      role: "Junior Full Stack Developer",
      github: "https://github.com/member4",
      linkedin: "https://linkedin.com/in/member4",
      image: "/img/avatar.png",
    },
    {
      id: 5,
      name: "Ayhesa Hinds",
      role: "Junior Full Stack Developer",
      github: "https://github.com/member5",
      linkedin: "https://linkedin.com/in/member5",
      image: "/img/avatar.png",
    },
  ];

  return (
    <div className="about-container">
      <div className="about-section section1">
        <div className="d-flex justify-content-center align-items-start flex-column">
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

      <div className="technologies-section d-flex flex-wrap">
        <div className="section2 d-flex">
          <div className="section2-text w-50">
            <h2>Technologies & Tools</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aperiam architecto
              eius quo eaque blanditiis voluptatibus optio ab deserunt, assumenda ullam placeat
              exercitationem tempore officia tempora animi quos a est enim maxime error? Laborum
              magnam optio cupiditate voluptate deleniti harum.
            </p>
          </div>
          <div className="icons w-50">
            <div className="technologies-row d-flex flex-wrap">
              {techTools.map((item, index) => (
                <div className="tecnology-item col-3 text-center py-4" key={index}>
                  <i className={`${item.iconClass} tecnology-icon`}></i>
                  <p className="tecnology-name">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="section3">
          <div className="section3-text">
            <h2>Project Organization - MER</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto fuga id recusandae cum
              beatae voluptates vero, maxime enim exercitationem voluptatibus consectetur nostrum
              animi odio doloremque deleniti perspiciatis quibusdam. Porro, quidem.
            </p>
          </div>
          <div className="image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa78nY-4h33SCQ3VZyrD0ut1wS0ndvq9PqFA&s"
              alt="Admin Image"
              className="admin-image"
            />
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section4 text-center">
          <h2>Admin Dashboard</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi neque optio temporibus
            omnis.
          </p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa78nY-4h33SCQ3VZyrD0ut1wS0ndvq9PqFA&s"
            alt="Admin Image"
            className="admin-image"
          />
          <div className="content-wrapper">
            <div className="left-column">
              <p>To test our Admin dashboard, follow these steps:</p>
              <ol className="text-left">
                <li>
                  Visit our{" "}
                  <Link to="/login" className="login-link">
                    admin login page
                  </Link>
                </li>
                <li>
                  Use the email address <strong>"admin@admin.com"</strong> as username.
                </li>
                <li>
                  Input <strong>"123"</strong> as the password.
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
                  Use the email address <strong>"admin@admin.com"</strong> as username.
                </li>
                <li>
                  Input <strong>"123"</strong> as the password.
                </li>
                <li>Click on the login button or submit the form.</li>
              </ol>
            </div>
          </div>

          <p className="final-note">
            Now you can access the admin dashboard and test the application with the provided login
            data. Enjoy the testing!
          </p>
        </div>
      </div>

      <div className="members-section">
        <div className="section5 text-center">
          <h2>Our Team</h2>
          <div className="row justify-content-center">
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
