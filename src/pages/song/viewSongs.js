import React from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";
import { ButtonContainer } from "../../components/Customs";

function viewSongs() {
  return (
    <div>
      <div className="background">
        <NavigationBar />
        <div className="center">
          <div className="card">
            <Link to="/addSong">
              <ButtonContainer>Add Song</ButtonContainer>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default viewSongs;
