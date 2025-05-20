import { useEffect, useState } from "react";
import { Container, Table, Pagination, PaginationItem, PaginationLink, Button, Row, Col } from "reactstrap";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../utils/routes";
import { routes } from "../utils/routes";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

//TODO: Silme işlemi daha sonra eklenecek
//TODO: HEADER fixed olacak.
export default function List() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Kullanıcılar yüklenirken hata oluştu:", error);
      }
    };
    fetchUsers();
  }, []);

  // Sayfalama için kullanıcıları böl
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (e, userId) => {
    e.stopPropagation(); // Satır tıklamasını engelle
    navigate(generatePath(routes.DETAIL, { id: userId }));
  };

  const handleDelete = (e, userId) => {
    e.stopPropagation(); // Satır tıklamasını engelle
    // Silme işlemi daha sonra eklenecek
    console.log("Silme işlemi:", userId);
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col md={8} className="mb-3 mb-md-0">
          <h2 className="mb-2">Kullanıcı Listesi</h2>
          <p className="text-muted mb-0">Detay sayfasına gitmek, düzenlemek için satırın üzerine tıklayınız.</p>
        </Col>
        <Col md={4} className="text-md-end">
          <Button color="primary" className="w-100 w-md-auto" onClick={() => navigate(generatePath(routes.NEW_USER))}>
            <FaPlus className="me-2" />
            Yeni Kullanıcı Ekle
          </Button>
        </Col>
      </Row>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Yaş</th>
            <th>Email</th>
            <th>Cinsiyet</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(generatePath(routes.DETAIL, { id: user.id }))}
              style={{ cursor: "pointer" }}
            >
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.gender == "male" ? "Erkek" : "Kadın"}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={(e) => handleEdit(e, user.id)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={(e) => handleDelete(e, user.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Sayfalama */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index + 1} active={currentPage === index + 1}>
              <PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        </Pagination>
      </div>
    </Container>
  );
}
