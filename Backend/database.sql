CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255) UNIQUE NOT NULL,
    contact_email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organizations(organization_id),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organizations(organization_id),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE fleet (
    vehicle_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organizations(organization_id),
    driver_id INT REFERENCES drivers(driver_id) ON DELETE SET NULL,
    vehicle_type VARCHAR(100) NOT NULL,
    chassis_number VARCHAR(100) UNIQUE NOT NULL,
    kilometers_driven DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(driver_id) ON DELETE CASCADE,
    start_location VARCHAR(255) NOT NULL,
    end_location VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    distance_km DECIMAL(10, 2) NOT NULL,
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE maintenance_records (
    record_id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES fleet(vehicle_id) ON DELETE CASCADE,
    driver_id INT REFERENCES drivers(driver_id) ON DELETE CASCADE,
    maintenance_date DATE NOT NULL,
    description TEXT NOT NULL,
    cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
