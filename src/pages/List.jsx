import { useEffect, useState } from "react";
import { Container, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { get } from "../utils/api";
import { Link } from "react-router-dom";

export default function List() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/users");
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

  return (
    <Container className="py-4">
      <h2 className="mb-4">Kullanıcı Listesi</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Yaş</th>
            <th>Email</th>
            <th>Cinsiyet</th>
            <th>Detay</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.gender == "male" ? "Erkek" : "Kadın"}</td>
              <td>
                <Link to={`/user/${user.id}`} className="btn btn-sm btn-primary">
                  Detay
                </Link>
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
