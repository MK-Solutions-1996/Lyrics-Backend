import React from "react";
import { NavigationBar } from "../../components/NavigationBar";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import {
  ButtonContainer,
  TopicContainer,
  InputContainer,
  TextAreaContainer
} from "../../components/Customs";

function updateSong(song) {
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Update Song</TopicContainer>
          </div>
          <div className="direction">
            <div className="form-group center">
              <InputContainer
                type="text"
                className="form-control"
                id="title_name_sinhala"
                name="title_name_sinhala"
                placeholder="Title Name (Sinhala)"
              ></InputContainer>
            </div>
            <div className="form-group center">
              <InputContainer
                type="text"
                className="form-control"
                id="title_name_singlish"
                name="title_name_singlish"
                placeholder="Title Name (Singlish)"
              ></InputContainer>
            </div>
          </div>
          <div className="direction">
            <div className="form-group center">
              <Dropdown
                className="dropdown"
                //   value={artist}
                //   options={artists}
                ariaLabel="Test"
                //   onChange={e => setArtist(e.value)}
                placeholder="Choose Artist Id"
                optionLabel="label"
                style={{
                  width: "20vw",
                  height: "2rem",
                  borderRadius: "0.4rem",
                  margin: "0.3rem"
                }}
              />
            </div>
            <div className="form-group center">
              <MultiSelect
                className="dropdown"
                //   value={category}
                //   options={categories}
                //   onChange={e => setCategory(e.value)}
                style={{
                  width: "20vw",
                  height: "2rem",
                  borderRadius: "0.4rem",
                  margin: "0.3rem"
                }}
                filter={true}
                filterPlaceholder="Search"
                placeholder="Choose Categories"
              />
            </div>
          </div>
          <div className="form-group center">
            <InputContainer
              type="number"
              className="form-control"
              id="no_of_likes"
              name="no_of_likes"
              placeholder="No of Likes"
            ></InputContainer>
          </div>
          <div className="center">
            <div className="form-group">
              <TextAreaContainer
                rows="5"
                className="form-control"
                id="song_body"
                name="song_body"
                placeholder="Song"
                // onChange={e => setSong(e.target.value)}
              ></TextAreaContainer>
            </div>
          </div>
          <div className="center">
            <ButtonContainer>Update Song</ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default updateSong;
