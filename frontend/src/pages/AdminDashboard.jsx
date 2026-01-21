import { useEffect, useState } from "react";
import API from "../../api";
import { Button, Table, Modal, Form } from "react-bootstrap";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", party: "", manifesto: "" });

  const fetchList = async () => {
    try {
      const res = await API.get("/candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", party: "", manifesto: "" });
    setShow(true);
  };
  const openEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, party: c.party, manifesto: c.manifesto });
    setShow(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await API.put(`/candidates/${editing._id}`, form);
      } else {
        await API.post("/candidates", form);
      }
      setShow(false);
      fetchList();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete candidate?")) return;
    try {
      await API.delete(`/candidates/${id}`);
      fetchList();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <Button className="mb-3" onClick={openCreate}>
        Create Candidate
      </Button>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.party}</td>
              <td>{c.voteCount}</td>
              <td>
                <Button size="sm" onClick={() => openEdit(c)}>
                  Edit
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => remove(c._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit" : "Create"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Party</Form.Label>
              <Form.Select
                value={form.party}
                onChange={(e) => setForm({ ...form, party: e.target.value })}
              >
                <option value="">Select Party</option>
                <option value="BJP">BJP</option>
                <option value="BSP">BSP</option>
                <option value="Congress">Congress</option>
                <option value="ShivSena">Shiv Sena</option>
                <option value="MNS">MNS</option>
                <option value="CPI">CPI</option>
                <option value="INC">INC</option>
                <option value="NCP">NCP</option>
                <option value="Others">Others</option>
              </Form.Select>
              {/* If "Others" selected, show input box */}
              {form.party === "Others" && (
                <Form.Control
                  type="text"
                  placeholder="Enter party name"
                  className="mt-2"
                  value={form.customParty || ""}
                  onChange={(e) =>
                    setForm({ ...form, customParty: e.target.value })
                  }
                />
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Manifesto</Form.Label>
              <Form.Control
                as="textarea"
                value={form.manifesto}
                onChange={(e) =>
                  setForm({ ...form, manifesto: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button onClick={save}>{editing ? "Save" : "Create"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
