import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then(({ data }) => {
      setProjects(data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: `Novo repositório ${Date.now().toString()}`,
        owner: "Mateus Bezerra",
        techs: ["React", "Node.js"],
      })
      .then(({ data: project }) => {
        setProjects([...projects, project]);
      });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
