import styled from "styled-components";

export const NavigationBarDivContainer = styled.div`
  .navbar {
    background-color: var(--mainRed);
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: var(--mainBlack);
    font-size: 1.2rem;
    margin: 0.2rem 0.5rem 0.2rem 0;
    font-weight: bold;
    &:hover {
      color: white;
    }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: var(--mainBlack);
    &:hover {
      color: white;
    }
  }
`;

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: bold;
  background: transparent;
  border: 0.05rem solid var(--mainBlack); /*From App.css*/
  border-color: var(--mainBlack);
  border-radius: 0.5rem;
  color: var(--mainBlack) !important;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--mainBlack) !important;
    color: var(--mainRed) !important;
  }
  &:focus {
    outline: none;
  }
`;

export const SubButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: bold;
  background: transparent;
  border: 0.05rem solid var(--mainGrey); /*From App.css*/
  border-color: var(--mainGrey);
  border-radius: 0.5rem;
  color: var(--mainGrey) !important;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0rem 0.5rem 0.5rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--mainGrey) !important;
    color: var(--mainRed) !important;
  }
  &:focus {
    outline: none;
  }
`;

export const DeleteIconContainer = styled.i`
  color: var(--mainRed);
  padding: 0.1rem 0.2rem;
  cursor: pointer;
  margin: 0.01rem 0.02rem;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const EditIconContainer = styled.i`
  color: var(--mainYellow);
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.01rem 0.5rem 0.01rem 0;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const ViewIconContainer = styled.i`
  color: var(--mainBlue);
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.01rem 0.5rem 0.01rem 0;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const RefreshIconContainer = styled.i`
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.01rem 0.5rem 0.01rem 0;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const SpanContainer = styled.span`
            vertical-align: middle,
            margin: 0.2rem,
            font-size: 0.5rem
            font-family: "Abhaya Libre", serif;
`;

export const TopicContainer = styled.label`
  text-align: center;
  font-size: 2.1rem;
  font-weight: bolder;
  color: var(--mainBlack);
  margin: 0.2rem;
`;

export const SubTopicContainer = styled.label`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bolder;
  color: var(--mainGrey);
  margin: 0.5rem;
`;

export const InputContainer = styled.input`
  font-size: 0.8rem;
  width: 20vw;
  margin: 0 0.3rem 0rem 0.3rem;
  padding: 0.2rem;
  height: 1.7rem;
  border-radius: 0.3rem;
  font-family: "Abhaya Libre", serif;
`;

export const RadioButtonContainer = styled.input`
  width: 1rem;
  margin: 0.1rem 0.3rem;
  padding: 0.1rem;
  height: 1rem;
`;

export const LongLabelContainer = styled.label`
  font-size: 0.8rem;
  margin: 0.1rem;
  padding: 0.1rem;
  height: auto;
  width: auto;
  color: var(--mainBlack);
  font-family: "Abhaya Libre", serif;
`;

export const TextAreaContainer = styled.textarea`
  font-size: 0.8rem;
  font-family: "Abhaya Libre", serif;
  height: auto;
  width: 20vw;
  margin: 0 0.3rem 0rem 0.3rem;
  padding: 0.1rem;
  color: var(--mainBlack);
`;

export const ImageContainer = styled.img`
  width: 10vw;
  height: 20vh;
  margin: 0.5rem;
`;

export const SpinnerContainer = styled.div`
  height: 1.5rem;
  width: 1.5rem;
`;

export const MultiSelectContainer = {
  width: "20vw",
  height: "2rem",
  borderRadius: "0.4rem",
  margin: "0 0.3rem 0rem 0.3rem",
  fontSize: "0.8rem",
  fontFamily: "serif"
};

export const MessageContainer = {
  fontSize: "0.6rem",
  margin: "0.1rem"
};
