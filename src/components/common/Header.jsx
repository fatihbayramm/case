import { useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" className="shadow-sm" fixed="top">
      <NavbarBrand tag={Link} to="/" className="text-primary fw-bold">
        UserManager
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
    </Navbar>
  );
}
