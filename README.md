# Fleet Management System 🚛

A comprehensive fleet management platform with role-based access control, real-time tracking, and data analytics for efficient fleet operations.

## 🚀 Overview

This Fleet Management System is designed to streamline fleet operations for transportation companies. It provides administrators and drivers with dedicated interfaces to manage vehicles, track performance, log maintenance, and monitor fuel consumption efficiently.

## ✨ Key Features

### Admin Features
- **Fleet Dashboard** - Comprehensive overview of all fleet operations
- **Vehicle Management** - Add, edit, and monitor vehicle information
- **Driver Management** - Manage driver profiles and assignments
- **Maintenance Scheduling** - Track and schedule vehicle maintenance
- **Fuel Management** - Monitor fuel consumption and costs
- **Analytics & Reports** - Data-driven insights for fleet optimization

### Driver Features
- **Driver Dashboard** - Personal dashboard for assigned vehicles
- **Trip Logging** - Record trip details and mileage
- **Maintenance Alerts** - Receive vehicle maintenance notifications
- **Fuel Recording** - Log fuel purchases and consumption
- **Vehicle Status Updates** - Report vehicle issues and status

### System Features
- **Role-Based Access Control** - Secure admin and driver roles
- **Real-Time Data** - Live fleet tracking and updates
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Data Security** - JWT authentication and secure API endpoints

## 🛠️ Technologies Used

### Frontend
- **React.js** - Modern UI library for interactive interfaces
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Responsive styling and animations
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast web application framework
- **PostgreSQL** - Robust relational database
- **JWT** - Secure authentication tokens

### Additional Tools
- **bcrypt** - Password hashing and security
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemon** - Development server auto-restart

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager
- Git for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/codedeprived/fleet-management-v1.git
cd fleet-management-v1
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to your `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/fleet_management
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fleet_management
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb fleet_management

# Run database migrations (if available)
npm run migrate

# Seed initial data (if available)
npm run seed
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory (new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to frontend `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Fleet Management System
```

### 5. Start the Applications
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend application (from frontend directory, new terminal)
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🗄️ Database Schema

### Users Table
```sql
{
  id: SERIAL PRIMARY KEY,
  name: VARCHAR(255),
  email: VARCHAR(255) UNIQUE,
  password: VARCHAR(255),
  role: VARCHAR(50), -- 'admin' or 'driver'
  phone: VARCHAR(20),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

### Vehicles Table
```sql
{
  id: SERIAL PRIMARY KEY,
  vehicle_number: VARCHAR(50) UNIQUE,
  make: VARCHAR(100),
  model: VARCHAR(100),
  year: INTEGER,
  vin: VARCHAR(100),
  status: VARCHAR(50), -- 'active', 'maintenance', 'inactive'
  assigned_driver_id: INTEGER REFERENCES users(id),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

### Driver Logs Table
```sql
{
  id: SERIAL PRIMARY KEY,
  driver_id: INTEGER REFERENCES users(id),
  vehicle_id: INTEGER REFERENCES vehicles(id),
  start_time: TIMESTAMP,
  end_time: TIMESTAMP,
  start_mileage: INTEGER,
  end_mileage: INTEGER,
  trip_purpose: TEXT,
  created_at: TIMESTAMP
}
```

### Maintenance Records Table
```sql
{
  id: SERIAL PRIMARY KEY,
  vehicle_id: INTEGER REFERENCES vehicles(id),
  maintenance_type: VARCHAR(100),
  description: TEXT,
  cost: DECIMAL(10,2),
  service_date: DATE,
  next_service_date: DATE,
  created_at: TIMESTAMP
}
```

### Fuel Records Table
```sql
{
  id: SERIAL PRIMARY KEY,
  vehicle_id: INTEGER REFERENCES vehicles(id),
  driver_id: INTEGER REFERENCES users(id),
  fuel_amount: DECIMAL(8,2),
  cost_per_unit: DECIMAL(6,2),
  total_cost: DECIMAL(10,2),
  odometer_reading: INTEGER,
  fuel_date: DATE,
  created_at: TIMESTAMP
}
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Fleet Management
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Add new vehicle (Admin)
- `PUT /api/vehicles/:id` - Update vehicle (Admin)
- `DELETE /api/vehicles/:id` - Delete vehicle (Admin)

### Driver Logs
- `GET /api/logs` - Get driver logs
- `GET /api/logs/:id` - Get specific log
- `POST /api/logs` - Create new log entry
- `PUT /api/logs/:id` - Update log entry

### Maintenance
- `GET /api/maintenance` - Get maintenance records
- `POST /api/maintenance` - Add maintenance record
- `PUT /api/maintenance/:id` - Update maintenance record
- `GET /api/maintenance/upcoming` - Get upcoming maintenance

### Fuel Management
- `GET /api/fuel` - Get fuel records
- `POST /api/fuel` - Add fuel record
- `GET /api/fuel/analytics` - Get fuel analytics

## 🔐 Authentication & Authorization

### Role-Based Access Control
- **Admin Role**: Full system access including user management, fleet oversight, and analytics
- **Driver Role**: Limited access to personal logs, assigned vehicles, and trip recording

### JWT Token Structure
```javascript
{
  userId: number,
  email: string,
  role: 'admin' | 'driver',
  iat: number,
  exp: number
}
```

## 📊 Dashboard Features

### Admin Dashboard
- Fleet overview statistics
- Vehicle status distribution
- Maintenance schedules
- Fuel consumption analytics
- Driver performance metrics
- Cost analysis charts

### Driver Dashboard
- Assigned vehicle information
- Personal trip history
- Upcoming maintenance alerts
- Fuel log entries
- Performance statistics

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access**: Controlled access based on user roles
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests


## 🔮 Future Enhancements

- [ ] Real-time GPS tracking integration
- [ ] Mobile app for drivers
- [ ] Automated maintenance scheduling
- [ ] Advanced analytics and reporting
- [ ] Integration with fuel card systems
- [ ] Document management system
- [ ] Push notifications for alerts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the powerful frontend framework
- Node.js and Express.js for the robust backend solution
- PostgreSQL for reliable data management
- JWT for secure authentication

## 📞 Support & Contact

For questions, suggestions, or support:

- **Email**: vishalsharma2212003@gmail.com
- **GitHub**: [codedeprived](https://github.com/codedeprived)
- **Issues**: [Project Issues](https://github.com/codedeprived/fleet-management-v1/issues)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Drive Smart, Manage Better! 🚛**

*Made with ❤️ by [Vishal Sharma and Manmohan Singh ](https://github.com/codedeprived)*
