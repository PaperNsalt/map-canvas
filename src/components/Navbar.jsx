import { Link } from "react-router-dom";

function Navbar(){
  return(
    <>
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/editor">Editor</Link> |
      <Link to="/gallery">Gallery</Link> |
      <Link to="/about">About</Link> |
    </nav>
    </>
  );
}

export default Navbar;