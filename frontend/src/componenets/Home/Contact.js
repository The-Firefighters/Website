import React from "react";
import './Contact.css';
import almogImage from './images/almogIMG.jpeg';
import shakedImage from './images/shakedIMG.jpeg';
import yuvalImage from './images/yuvalIMG.jpeg';

const teamMembers = [
    {
        name: "Shaked Levi",
        image: shakedImage,
        description: "blabla",
        github: "https://github.com/20shaked20",
        linkedin: "https://www.linkedin.com/in/shaked-levi-lin/"
    },
    {
        name: "Almog David",
        image: almogImage,
        description: "blabla",
        github: "https://github.com/Almog-David",
        linkedin: "https://www.linkedin.com/in/almog-david/"
    },
    {
        name: "Yuval Bubnovsky",
        image: yuvalImage,
        description: "blabla",
        github: "https://github.com/YuvalBubnovsky",
        linkedin: "https://www.linkedin.com/in/yuvalbubnovsky/"
    },
];

function Contact() {
    return (
        <div className="contact">
            <h1>Contact Us</h1>
            
            <section className="about-us">
                <h2>Who We Are</h2>
                <p>We are a group of students who developed this project as our final university assignment. <br/>
                    Our team came together to explore and improve upon existing algorithms in the field of graphs algorithms.</p>
            </section>
            
            <section className="our-approach">
                <h2>Our Approach</h2>
                <p>In our project, we implemented a heuristic approach using local search to enhance the algorithm presented in [link to article]. Our method focuses on ....</p>
            </section>
            
            <section className="team-members">
                <h2>Our Team</h2>
                <div className="member-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="member-card">
                            <img src={member.image} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>{member.description}</p>
                            <div className="member-links">
                                <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="project-links">
                <h2>Project Resources</h2>
                <p>For more information about our project and to view our code, please visit our GitHub organization:</p>
                <a href="https://github.com/The-Firefighters" target="_blank" rel="noopener noreferrer">Project GitHub Repository</a>
            </section>
        </div>
    );
}

export default Contact;