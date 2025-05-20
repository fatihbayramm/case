import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" className="shadow-sm">
      <NavbarBrand tag={Link} to="/" className="text-primary fw-bold">
        UserManager
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/" className="text-dark">
              Ana Sayfa
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/users" className="text-dark">
              Kullanıcılar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/roles" className="text-dark">
              Roller
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="text-dark">
              Admin
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/profile">
                Profil
              </DropdownItem>
              <DropdownItem tag={Link} to="/settings">
                Ayarlar
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Çıkış Yap</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
