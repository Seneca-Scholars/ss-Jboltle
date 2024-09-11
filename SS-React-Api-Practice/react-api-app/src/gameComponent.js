import { useEffect, useState } from "react";
import "./gameStyling.css";

export const GameComponent = () => {
  const [games, setGames] = useState([]);
  const [className, setClassName] = useState(' ')
  const getGames = async () => {
    const response = await fetch("/api/games");
    const data = await response.json();

    setGames(data);
  };

  
  useEffect(() => {
    getGames();
  }, []);

  const sortGames = (e) => {

 //we use the spread operator to spread the object of games into the array

setClassName(e.target.id)
console.log(e.target.id) //I did this so that instead of having different variables, it dynamially changes based on what the user clicks
const sortedGames = [...games].sort((a, b) => b.rating - a.rating);
const sortedYear = [...games].sort((a, b) => b.release_year - a.release_year);
const sortedTitle = [...games].sort((a, b) => a.title.localeCompare(b.title));

if (className === "release_year") {

  setGames(sortedYear)
  
}
else if (className === "rating") 
{
  setGames(sortedGames)
}

else if (className === "title")
{setGames(sortedTitle)}


};



  
  
  const generateRows = () => {
    return games.map((game) => (
      <tr key={game.id}>
        <td>
          <a href={game.link} target="_blank">
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
              <th id="title" onClick={(e) => sortGames(e)}>Title</th>
              <th id="release_year" onClick={(e) => sortGames(e)}>Release Year</th>
              <th id="rating" onClick={(e) => sortGames(e)}>Rating</th>
              <th id="genre" onClick={(e) => sortGames(e) }>Genre</th>
            </tr>
          </thead>  
          <tbody>{generateRows()}</tbody>
        </table>
      </div>
    </div>
  );
};
