import { Container, Row, Col } from "reactstrap";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-muted">© {currentYear} UserManager. Tüm hakları saklıdır.</p>
          </Col>

          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-muted text-decoration-none">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-muted text-decoration-none">
                Kullanım Şartları
              </a>
              <a href="#" className="text-muted text-decoration-none">
                İletişim
              </a>
            </div>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-muted">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-muted">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-muted">
                <FaTwitter size={20} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
