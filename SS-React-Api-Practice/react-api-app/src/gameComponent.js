import { useEffect, useState } from "react";
import "./gameStyling.css";
import Button from "./Button_component";
export const GameComponent = () => {
  const [games, setGames] = useState([]);
  const [id, setID] = useState("");
  const getGames = async () => {
    const response = await fetch("/api/games");
    const data = await response.json();

    setGames(data);
  };

  useEffect(() => {
    getGames();
  }, []);

  const sortGames = (e) => {
    // I think that when the function is called after the click, then it sets the target and then executes after the second click
    setID(e.target.id);
    console.log(id)

    //we use the spread operator to spread the object of games into the array

    //I did this so that instead of having different variables, it dynamially changes based on what the user clicks
    const sortedGames = [...games].sort((a, b) => b.rating - a.rating);
    const sortedYear = [...games].sort(
      (a, b) => b.release_year - a.release_year
    );
    const sortedTitle = [...games].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    if (id === "release_year") {
      setGames(sortedYear);
    } else if (id === "rating") {
      setGames(sortedGames);
    } else if (id === "title") {
      setGames(sortedTitle);
    }
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
              <th>
                <Button
                  id={"title"}
                  onClick={(e) => sortGames(e)}
                  text={"Title"}
                />
              </th>

              {/* the funcion doesnt work untill the second click because of the function activating and the state variable. */}
              <th>

                <Button
                  id="release_year"
                  text="Release Year"
                  onClick={(e) => sortGames(e)}
                />
              </th>
              <th>

                <Button
                  text="Rating"
                  id="rating"
                  onClick={(e) => sortGames(e)}
                />
              </th>
              <th>

                <Button text="Genre" id="genre" onClick={console.log(id)} />
                {/* The idea is that we set the state variable of the id to be equal to the value parameter and then we get rid of what is inside the state varialbe  */}
              </th>
            </tr>
          </thead>
          <tbody>{generateRows()}</tbody>
        </table>
      </div>
    </div>
  );
};
