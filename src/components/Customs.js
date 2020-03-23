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

export const DeleteIconButtonContainer = styled.button`
  color: var(--mainRed);
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const EditIconButtonContainer = styled.button`
  color: var(--mainYellow);
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const ViewIconButtonContainer = styled.button`
  color: var(--mainBlue);
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  &:hover {
    color: var(--mainBlack) !important;
  }
`;

export const TopicContainer = styled.label`
  text-align: center;
  font-size: 2.1rem;
  font-weight: bolder;
  color: var(--mainBlack);
  margin: 0.5rem;
`;

export const SubTopicContainer = styled.label`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bolder;
  color: var(--mainGrey);
  margin: 0.5rem;
`;

export const InputContainer = styled.input`
  width: 20vw;
  margin: 0.3rem;
  padding: 0.2rem;
  height: 2rem;
  border-radius: 0.3rem;
`;

export const LongLabelContainer = styled.label`
  font-size: 1rem;
  margin: 0.1rem;
  padding: 0.1rem;
  height: auto;
  width: auto;
  color: var(--mainBlack);
`;

export const TextAreaContainer = styled.textarea`
  font-size: 1rem;
  height: auto;
  width: 20vw;
  margin: 0.1rem;
  padding: 0.1rem;
  color: var(--mainBlack);
`;

export const ImageContainer = styled.img`
  width: 10vw;
  height: 20vh;
`;
