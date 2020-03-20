import React from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";
import { ButtonContainer } from "../../components/Customs";

function viewArtists() {
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <Link to="/addArtist">
            <ButtonContainer>Add Artist</ButtonContainer>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default viewArtists;
