import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import api from "../utils/api";
import classnames from "classnames";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isEditing, setIsEditing] = useState(false);

  // Tarih formatını düzenleme fonksiyonu
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Tarih string'ini parçalara ayır
    const [year, month, day] = dateString.split("-").map((num) => num.padStart(2, "0"));

    // YYYY-MM-DD formatında döndür
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        console.log(response.data);
        // Tarihi formatla
        const formattedUser = {
          ...response.data,
          birthDate: formatDate(response.data.birthDate),
        };
        setUser(formattedUser);
      } catch (error) {
        console.error("Kullanıcı bilgileri yüklenirken hata oluştu:", error);
      }
    };
    fetchUser();
  }, [id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, user);
      setIsEditing(false);
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
    }
  };

  if (!user) return <div>Yükleniyor...</div>;

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Kullanıcı Detayları</h2>
            <div>
              <Button
                color={isEditing ? "success" : "primary"}
                className="me-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "İptal" : "Düzenle"}
              </Button>
              {isEditing && (
                <Button color="success" onClick={handleSubmit}>
                  Kaydet
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Card>
        <CardBody>
          <Row>
            <Col md={3} className="mb-4 mb-md-0">
              <div className="text-center">
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
                <h4 className="mb-1">{`${user.firstName} ${user.lastName}`}</h4>
                <p className="text-muted mb-0">{user.company.title}</p>
              </div>
            </Col>
            <Col md={9}>
              <Nav tabs className="mb-4">
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink className={classnames({ active: activeTab === "1" })} onClick={() => toggleTab("1")}>
                    Kişisel Bilgiler
                  </NavLink>
                </NavItem>
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => toggleTab("2")}>
                    İletişim Bilgileri
                  </NavLink>
                </NavItem>
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink className={classnames({ active: activeTab === "3" })} onClick={() => toggleTab("3")}>
                    Şirket Bilgileri
                  </NavLink>
                </NavItem>
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink className={classnames({ active: activeTab === "4" })} onClick={() => toggleTab("4")}>
                    Banka Bilgileri
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Ad</Label>
                          <Input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Soyad</Label>
                          <Input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Yaş</Label>
                          <Input
                            type="number"
                            name="age"
                            value={user.age}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Doğum Tarihi</Label>
                          <Input
                            type="date"
                            name="birthDate"
                            value={user.birthDate}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Cinsiyet</Label>
                          <Input
                            type="select"
                            name="gender"
                            value={user.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Göz Rengi</Label>
                          <Input
                            type="text"
                            name="eyeColor"
                            value={user.eyeColor}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Kullanıcı Adı</Label>
                          <Input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Kan Grubu</Label>
                          <Input
                            type="text"
                            name="bloodGroup"
                            value={user.bloodGroup}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Boy</Label>
                          <Input
                            type="number"
                            name="height"
                            value={user.height}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Kilo</Label>
                          <Input
                            type="number"
                            name="weight"
                            value={user.weight}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Üniversite</Label>
                          <Input
                            type="text"
                            name="university"
                            value={user.university}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>

                <TabPane tabId="2">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Telefon</Label>
                          <Input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Adres</Label>
                          <Input
                            type="text"
                            name="address.address"
                            value={user.address.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Şehir</Label>
                          <Input
                            type="text"
                            name="address.city"
                            value={user.address.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Eyalet</Label>
                          <Input
                            type="text"
                            name="address.state"
                            value={user.address.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Eyalet Kodu</Label>
                          <Input
                            type="text"
                            name="address.stateCode"
                            value={user.address.stateCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Ülke</Label>
                          <Input
                            type="text"
                            name="address.country"
                            value={user.address.country}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Posta Kodu</Label>
                          <Input
                            type="text"
                            name="address.postalCode"
                            value={user.address.postalCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>

                <TabPane tabId="3">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Şirket</Label>
                          <Input
                            type="text"
                            name="company.name"
                            value={user.company.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Departman</Label>
                          <Input
                            type="text"
                            name="company.department"
                            value={user.company.department}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Pozisyon</Label>
                          <Input
                            type="text"
                            name="company.title"
                            value={user.company.title}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Şirket Adresi</Label>
                          <Input
                            type="text"
                            name="company.address.address"
                            value={user.company.address.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Şirket Şehri</Label>
                          <Input
                            type="text"
                            name="company.address.city"
                            value={user.company.address.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Şirket Ülkesi</Label>
                          <Input
                            type="text"
                            name="company.address.country"
                            value={user.company.address.country}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Posta Kodu</Label>
                          <Input
                            type="text"
                            name="company.address.postalCode"
                            value={user.company.address.postalCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Eyalet</Label>
                          <Input
                            type="text"
                            name="company.address.state"
                            value={user.company.address.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Eyalet Kodu</Label>
                          <Input
                            type="text"
                            name="company.address.stateCode"
                            value={user.company.address.stateCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tabId="4">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Kart Tarihi</Label>
                          <Input
                            type="text"
                            name="bank.cardExpire"
                            value={user.bank.cardExpire}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Kart Numarası</Label>
                          <Input
                            type="text"
                            name="bank.cardNumber"
                            value={user.bank.cardNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Kart Tipi</Label>
                          <Input
                            type="text"
                            name="bank.cardType"
                            value={user.bank.cardType}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Para Birimi</Label>
                          <Input
                            type="text"
                            name="bank.currency"
                            value={user.bank.currency}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>IBAN</Label>
                          <Input
                            type="text"
                            name="bank.iban"
                            value={user.bank.iban}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}
