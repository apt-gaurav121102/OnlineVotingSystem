import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import '../FormStyle.css';

export default function About() {
  const admins = [
    { name: 'Soma Vasudev', role: 'System Administrator', email: 'soma.vasudev.cmaug25@gmail.com' },
    { name: 'Anirudha Shinde', role: 'Database Manager', email: 'anirudha.shinde.cmaug25@gmail.com' },
    { name: 'Gaurav Apte', role: 'Security Analyst', email: 'gaurav.apte.cmaug25@gmail.com' },
  ];

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-start"
      style={{ paddingTop: '10vh' }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={7}>
          <Card className="dashboard-box text-light shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: '#00e0ff', textShadow: '0 0 10px rgba(0,255,255,0.8)' }}>
                About Our Voting System
              </h3>
              <p className="text-center" style={{ color: '#cceeff' }}>
                Welcome to the <strong>Online Voting System</strong> — a secure, transparent, and modern digital election platform.
                Our system ensures every vote counts, with end-to-end encryption, real-time counting, and strict authentication.
              </p>
              <p className="text-center" style={{ color: '#cceeff' }}>
                Built using the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js), our mission is to make
                voting simpler, faster, and tamper-proof for everyone.
              </p>

              <hr style={{ borderColor: 'rgba(0,255,255,0.3)' }} />

              <h5 className="text-center mb-4" style={{ color: '#00ccff', textShadow: '0 0 6px rgba(0,255,255,0.5)' }}>
                Administrator Information
              </h5>

              <Row className="justify-content-center">
                {admins.map((admin, index) => (
                  <Col md={4} key={index} className="mb-3">
                    <div
                      className="p-3 text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        boxShadow: '0 0 15px rgba(0,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,255,255,0.2)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(0,255,255,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.15)';
                      }}
                    >
                      <h6 style={{ color: '#00e0ff', fontWeight: 600 }}>{admin.name}</h6>
                      <p className="mb-1" style={{ color: '#b3e5fc' }}>{admin.role}</p>
                      <small style={{ color: '#80deea' }}>{admin.email}</small>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
