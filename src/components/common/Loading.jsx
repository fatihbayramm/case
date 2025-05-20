import { Container } from "reactstrap";

export const Loading = () => {
  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
        <h4>Yükleniyor...</h4>
      </div>
    </Container>
  );
};
