import { useEffect, useState } from "react";
import "./gameStyling.css";


export const GameComponent = () => {
  const [games, setGames] = useState([]);

  const getGames = async () => {
    const response = await fetch("/api/games");
    const data = await response.json();
    setGames(data);
  };

  useEffect(() => {
    getGames();
  }, []);

  const sortGames = (e) => {
const id = e 
    



//sort rating
const sortedRating = [...games].sort((a, b) => b.rating - a.rating);
const sortedYear = [...games].sort((a, b) => b.release_year - a.release_year);
const sortedTitle = [...games].sort((a, b) => a.title.localeCompare(b.title));
const sortedGenre = [...games].sort((a, b) => a.genre.localeCompare(b.genre));
    


    if (id === "release_year") {
      setGames(sortedYear);
    } else if (id === "rating") {
      setGames(sortedRating);
    } else if (id === "title") {
      setGames(sortedTitle);
    }
    else if (id === "genre") {
      setGames(sortedGenre)
    }

  };

  const generateRows = () => {
    return games.map((game) => (
      <tr key={game.id}>
        <td>
          <a href={game.link} target="_blank" rel="noopener noreferrer">
            <button className="game-title-button">{game.title}</button>
          </a>
        </td>
        <td>{game.release_year}</td>
        <td>{game.rating}</td>
        <td>{game.genre}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="game-page-title">Game Page</h1>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>
                <button className="fancy-button"

                  onClick={() => sortGames("title")}
              >Title </button>

              </th>
              <th>
                <button className="fancy-button"
                
                  onClick={() => sortGames("release_year")}

                  > Year </button>
              </th>
              
              
              <th>
                <button
                  className="fancy-button"
                  onClick={() => sortGames("rating")}

                >Rating </button>
              </th>

              <th>

                <button className="fancy-button"
                  onClick={() => sortGames("genre")} >
Genre
                  </button>
  
                </th>

            </tr>
          </thead>
          <tbody>{generateRows()}</tbody>
        </table>
      </div>
    </div>
  );
};
