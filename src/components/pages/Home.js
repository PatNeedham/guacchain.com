import React from 'react';
import guacIMG from './guac.jpg';

const rotate = keyframes`
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
`;

const styledImg = styled.img`
  position: absolute;
  animation: ${rotate} infinite 5s linear;
`

const App = () => (
  <div>
    <p>Guac Chain</p>
    <p>Freshly made guacamole, on the blockchain...</p>
    <img id="guac" src={guacIMG} height={282} width={300} alt="guac" />
  </div>
);

export default App;
