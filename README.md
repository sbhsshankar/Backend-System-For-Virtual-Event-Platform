# ** Backend System for a Virtual Event Platform ** 

Developed a backend system for a virtual event management platform focusing on user registration, event scheduling, and participant management, all managed through in-memory data structures.

---

#### 1. User Management
* Register users - Admin & Member
* Login users 
* Secure passwords using bcrypt
* Use JWT for session management

#### 2. Event Management
* Admin event permissions - Create, Update, Delete, View
* Events includes - Title, date, time, description, list of members

#### 3. Member management
* Users can register for events as members

#### 4. Notifications
* On successful user registration, send an email

---

### Tech Stack
* Web Framework - Express.js
* Password Hashing - bcrypt
* Authentication - JWT
* Email Sending - Nodemailer
* In-memory data storage - Arrays/Objects

---

### API Endpoints
* Register User - POST/register
* Login User - POST/login
* Create Event - POST/events
* Update Event - PUT/events/:id
* Delete Event - DELETE/events/:id
* Get All Events - GET/events
* Register for Event - POST/events/:id/register

--- 

### Role System
* Admin - Can manage CRUD operation for events
* Member - Can register for events

---

### 


