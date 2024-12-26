# Chat Application with DDD Microservices
## Project Overview
The Chat Application with DDD Microservices is a scalable and modular real-time chat platform. Built using Domain-Driven Design (DDD) principles, this application is divided into distinct microservices, each handling a specific domain, such as user management, chat messaging, and notifications. The project demonstrates best practices in modern software architecture, event-driven communication, and cloud-ready deployment.

## Features
	User Management: Secure user authentication and profile handling.
	Real-Time Messaging: Private and group chat functionality using WebSocket.
	Group Management: Create, update, and manage group chats and memberships.
	Notifications: Receive email or push notifications for missed messages.
	Scalability: Modular microservices architecture for easy scaling.

## Technologies Used
### Backend
	Languages & Frameworks:
Node.js (Express.js)
Python (optional for specific services like notifications)
	Real-Time Communication: WebSocket (Socket.IO)
	Message Queue: RabbitMQ and kafka for inter-service communication.
### Database
Relational: PostgreSQL for structured data (User and Group services).
NoSQL: MongoDB for unstructured data (Chat service).
### Deployment
Containerization: Docker, Docker Compose.
Orchestration: Kubernetes (optional for scaling).
Cloud Hosting: AWS/Heroku.
### Frontend (Optional Future Extension)
React.js or Vue.js for the user interface.
## Microservices Architecture
This application is structured as independent microservices:

### 1. User Service
Manages user authentication and profiles.
Provides RESTful APIs for user-related operations.
Database: PostgreSQL.
### 2. Chat Service
Handles message storage and real-time communication.
Integrates WebSocket for live updates.
Database: MongoDB.
### 3. Group Service
Manages group creation, updates, and memberships.
Provides APIs to fetch group details.
Database: PostgreSQL.
### 4. Notification Service
Sends email or push notifications for new messages or alerts.
Integrates with third-party services like Twilio or SendGrid.
### 5. Gateway Service
Acts as a central API gateway for all client requests.
Routes requests to appropriate microservices.
## Communication
Inter-service communication is event-driven using RabbitMQ/kafka.
## Setup Instructions
### Prerequisites
#### 1. Install Node.js.
#### 2. Install Docker.
#### 3. Install RabbitMQ.
#### 4. (Optional) Install PostgreSQL and MongoDB.
### Clone Repository
bash

git clone https://github.com/amh21-Ha/Chat-Application_DDD-microservice.git
cd Chat-Application_DDD-microservice

### Build and Run with Docker
1. Navigate to the project root.
2. Build and start all services using Docker Compose:
	bash
	docker-compose up --build
3. Access the application via:
	Frontend: http://localhost:3000 (if implemented)
	Backend: http://localhost:8000
### Run Locally
	Start individual services:
	bash
	cd user-service
	npm install
	npm start
## API Endpoints
### User Service
	POST /users/register: Register a new user.
	POST /users/login: Login and receive a JWT.
	GET /users/profile: Fetch user profile.
###Chat Service
	POST /chats/send: Send a message.
	GET /chats/history: Retrieve chat history.
### Group Service
	POST /groups/create: Create a new group.
	GET /groups/:id: Fetch group details.
### Development Report
	Coming Soon
### Challenges
Managing eventual consistency between services.
Debugging inter-service communication in a distributed setup.
### Lessons Learned
Importance of designing bounded contexts in DDD.
Effective use of event-driven patterns to decouple services.
### Next Steps
Add advanced analytics for user engagement and message patterns.
Extend notification service to include push notifications.
Build a frontend interface using React.js.
## License


### Contact
Author: Amha Haileslassie
Email: amha.ha07@gmail.com
GitHub: amh21-Ha
