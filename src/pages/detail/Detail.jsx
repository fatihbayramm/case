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
import { dummyJsonService } from "../../service/dummyJsonService";
import classnames from "classnames";
import { Loading } from "../../components/common/Loading";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    birthDate: "",
    gender: "",
    eyeColor: "",
    username: "",
    bloodGroup: "",
    height: "",
    weight: "",
    university: "",
    phone: "",
    email: "",
    address: {
      address: "",
      city: "",
      state: "",
      stateCode: "",
      country: "",
      postalCode: "",
    },
    company: {
      name: "",
      department: "",
      title: "",
      address: {
        address: "",
        city: "",
        state: "",
        stateCode: "",
        country: "",
        postalCode: "",
      },
    },
    bank: {
      cardExpire: "",
      cardNumber: "",
      cardType: "",
      currency: "",
      iban: "",
    },
    image: "",
  });
  const [activeTab, setActiveTab] = useState("1");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-").map((num) => num.padStart(2, "0"));
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!id) {
      setFormData({
        id: Date.now(),
        firstName: "",
        lastName: "",
        age: "",
        birthDate: "",
        gender: "",
        eyeColor: "",
        username: "",
        bloodGroup: "",
        height: "",
        weight: "",
        university: "",
        phone: "",
        email: "",
        address: {
          address: "",
          city: "",
          state: "",
          stateCode: "",
          country: "",
          postalCode: "",
        },
        company: {
          name: "",
          department: "",
          title: "",
          address: {
            address: "",
            city: "",
            state: "",
            stateCode: "",
            country: "",
            postalCode: "",
          },
        },
        bank: {
          cardExpire: "",
          cardNumber: "",
          cardType: "",
          currency: "",
          iban: "",
        },
        image: "",
      });
      setIsEditing(true);
      return;
    }
    const fetchUser = async () => {
      try {
        const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
        const localUser = localUsers.find((u) => String(u.id) === String(id));
        if (localUser) {
          setFormData(localUser);
          setIsLoading(false);
        }
        setIsLoading(true);
        const response = await dummyJsonService.getUser(id);
        const formattedUser = {
          ...formData,
          ...response.data,
          birthDate: formatDate(response.data.birthDate),
        };
        setFormData(formattedUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Kullanıcı bilgileri yüklenirken hata oluştu:", error);
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, [id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child, subchild] = name.split(".");
      setFormData((prev) => {
        if (subchild) {
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: {
                ...prev[parent][child],
                [subchild]: value,
              },
            },
          };
        } else {
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value,
            },
          };
        }
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (id) {
        await dummyJsonService.updateUser(id, formData);
      } else {
        const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
        const maxId = localUsers.length > 0 ? Math.max(...localUsers.map((u) => Number(u.id) || 0)) : 5400;
        const newUser = { ...formData, id: maxId + 1 };
        await dummyJsonService.createUser(newUser);
        navigate("/");
      }
      setIsEditing(false);
      const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
      localUsers.push(formData);
      localStorage.setItem("localUsers", JSON.stringify(localUsers));
    } catch (error) {
      console.error("Kullanıcı güncellenirken/eklenirken hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!formData) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          Kullanıcı bilgileri yüklenemedi. Lütfen daha sonra tekrar deneyin.
        </div>
      </Container>
    );
  }

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
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                  />
                )}
                <h4 className="mb-1">{`${formData.firstName} ${formData.lastName}`}</h4>
                <p className="text-muted mb-0">{formData.company.title}</p>
              </div>
            </Col>
            <Col md={9}>
              <Nav tabs className="mb-4 scrollable-tabs">
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
                            value={formData.firstName}
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
                            value={formData.lastName}
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
                            value={formData.age}
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
                            value={formData.birthDate}
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
                            value={formData.gender}
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
                            value={formData.eyeColor}
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
                            value={formData.username}
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
                            value={formData.bloodGroup}
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
                            value={formData.height}
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
                            value={formData.weight}
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
                            value={formData.university}
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
                            value={formData.phone}
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
                            value={formData.email}
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
                            value={formData.address.address}
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
                            value={formData.address.city}
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
                            value={formData.address.state}
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
                            value={formData.address.stateCode}
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
                            value={formData.address.country}
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
                            value={formData.address.postalCode}
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
                            value={formData.company.name}
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
                            value={formData.company.department}
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
                            value={formData.company.title}
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
                            value={formData.company.address.address}
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
                            value={formData.company.address.city}
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
                            value={formData.company.address.country}
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
                            value={formData.company.address.postalCode}
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
                            value={formData.company.address.state}
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
                            value={formData.company.address.stateCode}
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
                            value={formData.bank.cardExpire}
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
                            value={formData.bank.cardNumber}
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
                            value={formData.bank.cardType}
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
                            value={formData.bank.currency}
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
                            value={formData.bank.iban}
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
