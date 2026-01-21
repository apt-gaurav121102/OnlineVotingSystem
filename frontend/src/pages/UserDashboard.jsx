import React, { useEffect, useState } from 'react';

import { Button, Card, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import API from '../../api';

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(user?.hasVoted || false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await API.get('/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const vote = async (id) => {
    if (!window.confirm('Confirm vote for this candidate?')) return;
    try {
      await API.post('/user/vote', { candidateId: id });
      alert('Vote recorded');
      setHasVoted(true);
      // update local user -> mark voted locally
      const localUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (localUser) { localUser.hasVoted = true; localStorage.setItem('user', JSON.stringify(localUser)); }
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || 'Vote failed');
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <h3>User Dashboard</h3>
      <p>Welcome, {user.name} — {hasVoted ? 'You have voted' : 'You have not voted yet'}</p>
      <Row>
        {candidates.map(c => (
          <Col key={c._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{c.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-info">{c.party}</Card.Subtitle>
                <Card.Text>{c.manifesto}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  {/* <div>Votes: {c.voteCount}</div> */}
                  <Button disabled={hasVoted} onClick={() => vote(c._id)}>Vote</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
