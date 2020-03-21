import React from "react";
import { NavigationBar } from "../../components/NavigationBar";
import {
  ButtonContainer,
  TopicContainer,
  InputContainer
} from "../../components/Customs";

function updateArtist(artist) {
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Update Artist</TopicContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="text"
              className="form-control"
              id="artist_name_sinhala"
              name="artist_name_sinhala"
              placeholder="Artist Name (Sinhala)"
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="text"
              className="form-control"
              id="artist_name_singlish"
              name="artist_name_singlish"
              placeholder="Artist Name (Singlish)"
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="text"
              className="form-control"
              id="period"
              name="period"
              placeholder="Period"
            ></InputContainer>
          </div>
          <div className="center">
            <ButtonContainer>Update Artist</ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default updateArtist;
