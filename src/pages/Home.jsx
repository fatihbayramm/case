import { useEffect, useState } from "react";
import { dummyJsonService } from "../service/dummyJsonService";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const response = dummyJsonService.getUsers();
    console.log(response);
  }, []);

  return (
    <div className="container">
      <h1>Users</h1>
    </div>
  );
}
