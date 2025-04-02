import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import TeamCard from "../../components/TeamCard/TeamCard";

const teamMembers = [
  {
    name: "Yanina Bustos",
    role: "Junior Full Stack Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbWumy8AHkD7mIdCNqSdq7_6BnvK838VJ9w&s",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Cristofer Fernandez",
    role: "Junior Full Stack Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsd6jEYWceiGnd-fmcfMQU81ME5zJj63buBw&s",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Darlen Hornia",
    role: "Junior Full Stack Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbWumy8AHkD7mIdCNqSdq7_6BnvK838VJ9w&s",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Federico Vargas",
    role: "Junior Full Stack Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsd6jEYWceiGnd-fmcfMQU81ME5zJj63buBw&s",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ayhesa Hinds",
    role: "Junior Full Stack Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbWumy8AHkD7mIdCNqSdq7_6BnvK838VJ9w&s",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
];

// InfoCard
const InfoCard = ({ icon, title, text }) => (
  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4 position-relative">
      <div className="icon-container">
        <span className="bi">{icon}</span>
      </div>
      <h5 className="card-title fw-bold mt-4">{title}</h5>
      <p className="card-text text-muted">{text}</p>
    </div>
  </div>
);

function About() {
  return (
    <div className="about-container ">
      <div className="about-text">
        <h1 className="fw-bold mb-3">About this Project</h1>
        <p className="mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod natus omnis officiis
          possimus consectetur est dolorem similique eaque tempora ab ipsum iste fugit aliquid et
          velit deserunt labore, delectus laudantium ad. Officia officiis modi veniam repudiandae,
          fugiat ratione aut nemo illo ab qui. Fugiat, magnam sunt? Asperiores pariatur laboriosam
          voluptates!
        </p>
      </div>

      <div className="container-fluid">
        <div className="info-cards row g-4">
          <InfoCard
            icon={<i className="bi bi-hourglass-split" style={{ fontSize: "22px" }}></i>}
            title="Duration"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quibusdam iusto perferendis ab, voluptatibus adipisci similique at nam iste. Dolores doloremque nulla nihil odio magni."
          />
          <InfoCard
            icon={<i className="bi bi-laptop" style={{ fontSize: "22px" }}></i>}
            title="Technology Used"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quibusdam iusto perferendis ab, voluptatibus adipisci similique at nam iste. Dolores doloremque nulla nihil odio magni."
          />
          <InfoCard
            icon={<i className="bi bi-pencil-square" style={{ fontSize: "22px" }}></i>}
            title="Task Division"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quibusdam iusto perferendis ab, voluptatibus adipisci similique at nam iste. Dolores doloremque nulla nihil odio magni."
          />
        </div>
      </div>

      <hr className="w-75 mx-auto my-5 border-2 border-dark opacity-90" />

      {/* Sección del equipo */}
      <div className="team-section mt-5">
        <h2 className="text-center fw-bold fs-1">Our Team</h2>
        <p className="mt-5 centered-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum maxime maiores, minima
          numquam aspernatur magnam placeat temporibus ad eaque quae vel quos cum mollitia aliquam,
          nam cupiditate harum ab qui.
        </p>
        <div className="card-columns mt-5">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
