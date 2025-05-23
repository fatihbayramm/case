import { useEffect, useState } from "react";
import { Container, Table, Pagination, PaginationItem, PaginationLink, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../utils/routes";
import { routes } from "../../utils/routes";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Loading } from "../../components/common/Loading";
import { dummyJsonService } from "../../service/dummyJsonService";

export default function List() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await dummyJsonService.getUsers();
        const apiUsers = response.data.users;
        const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
        setUsers([...apiUsers, ...localUsers]);
      } catch (error) {
        console.error("Kullanıcılar yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) => !user.isDeleted);
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (e, userId) => {
    e.stopPropagation();
    navigate(generatePath(routes.DETAIL, { id: userId }));
  };

  const handleDelete = async (e, userId) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await dummyJsonService.deleteUser(userId);
      const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
      const updatedLocalUsers = localUsers.filter((user) => user.id !== userId);
      localStorage.setItem("localUsers", JSON.stringify(updatedLocalUsers));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Kullanıcı silinirken hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
