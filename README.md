# HR Management System - Backend Integration Guide

## Overview

This is a comprehensive HR Management System built with Next.js 15, React 19, and TypeScript. The frontend is fully functional with mock data and is ready for backend integration. This guide provides backend developers with all the necessary information to integrate APIs and database functionality.

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── employee-management.tsx
│   ├── payroll-processing.tsx
│   ├── attendance-tracking.tsx
│   ├── recruitment-management.tsx
│   ├── performance-tracking.tsx
│   ├── document-management.tsx
│   ├── header.tsx
│   ├── sidebar.tsx
│   ├── notifications.tsx
│   └── global-search-results.tsx
├── hooks/                # Custom React hooks
│   ├── use-hr-data.tsx   # Main data management hook
│   └── use-notifications.tsx
├── lib/                  # Utility functions
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Backend API server (to be developed)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd hr-management-system

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📊 Current Features & Mock Data

### Implemented Modules
1. **Dashboard** - Overview statistics and charts
2. **Employee Management** - CRUD operations for employees
3. **Payroll Processing** - Salary calculations and payments
4. **Attendance Tracking** - Time tracking and leave management
5. **Recruitment Management** - Job postings and candidate tracking
6. **Performance Tracking** - Employee evaluations and reviews
7. **Document Management** - File uploads and document storage

### Mock Data Structure
All components currently use mock data. Here are the key data structures:

#### Employee Data
```typescript
interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  salary: number
  startDate: string
  status: 'active' | 'inactive'
  profilePhoto?: string
}
```

#### Payroll Data
```typescript
interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  baseSalary: number
  overtime: number
  deductions: number
  netPay: number
  payPeriod: string
  status: 'pending' | 'processed' | 'paid'
}
```

#### Attendance Data
```typescript
interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: 'present' | 'absent' | 'late' | 'half-day'
}
```

## 🔌 Backend Integration Points

### 1. API Endpoints Needed

#### Employee Management
```
GET    /api/employees              # Get all employees
POST   /api/employees              # Create new employee
GET    /api/employees/:id          # Get employee by ID
PUT    /api/employees/:id          # Update employee
DELETE /api/employees/:id          # Delete employee
POST   /api/employees/:id/photo    # Upload profile photo
```

#### Payroll Management
```
GET    /api/payroll               # Get payroll records
POST   /api/payroll               # Create payroll record
PUT    /api/payroll/:id           # Update payroll record
POST   /api/payroll/:id/process   # Process payroll
GET    /api/payroll/reports       # Generate payroll reports
```

#### Attendance Management
```
GET    /api/attendance            # Get attendance records
POST   /api/attendance            # Record attendance
PUT    /api/attendance/:id        # Update attendance
GET    /api/attendance/employee/:id # Get employee attendance
POST   /api/attendance/bulk       # Bulk attendance import
```

#### Recruitment Management
```
GET    /api/jobs                  # Get job postings
POST   /api/jobs                  # Create job posting
PUT    /api/jobs/:id              # Update job posting
GET    /api/applications          # Get applications
POST   /api/applications          # Submit application
PUT    /api/applications/:id      # Update application status
```

#### Performance Management
```
GET    /api/performance           # Get performance records
POST   /api/performance           # Create performance review
PUT    /api/performance/:id       # Update performance review
GET    /api/performance/employee/:id # Get employee performance
```

#### Document Management
```
GET    /api/documents             # Get documents
POST   /api/documents             # Upload document
DELETE /api/documents/:id         # Delete document
GET    /api/documents/:id/download # Download document
```

#### Notifications
```
GET    /api/notifications         # Get user notifications
POST   /api/notifications         # Create notification
PUT    /api/notifications/:id/read # Mark as read
DELETE /api/notifications/:id     # Delete notification
```

### 2. Data Hook Integration

The main data management is handled in `hooks/use-hr-data.tsx`. Replace mock data with API calls:

```typescript
// Current mock implementation
const [employees, setEmployees] = useState(mockEmployees)

// Replace with API integration
const [employees, setEmployees] = useState([])

useEffect(() => {
  fetchEmployees()
}, [])

const fetchEmployees = async () => {
  try {
    const response = await fetch('/api/employees')
    const data = await response.json()
    setEmployees(data)
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}
```

### 3. Authentication Integration

Add authentication middleware and protect routes:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add authentication logic
  const token = request.cookies.get('auth-token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}
```

## 🗄️ Database Schema Recommendations

### Core Tables

#### employees
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  department VARCHAR(100),
  position VARCHAR(100),
  salary DECIMAL(10,2),
  start_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  profile_photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### payroll_records
```sql
CREATE TABLE payroll_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  base_salary DECIMAL(10,2),
  overtime DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  net_pay DECIMAL(10,2),
  pay_period VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### attendance_records
```sql
CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  hours_worked DECIMAL(4,2),
  status VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hr_system"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# File Upload
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE="5242880" # 5MB

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# API Keys
JWT_SECRET="your-jwt-secret"
```

## 📝 API Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## 🔍 Search Implementation

The global search functionality expects this API structure:

```typescript
// GET /api/search?q=searchTerm
{
  "success": true,
  "data": {
    "employees": [...],
    "departments": [...],
    "positions": [...],
    "documents": [...]
  }
}
```

## 📊 Dashboard Analytics

Dashboard requires these analytics endpoints:

```typescript
// GET /api/analytics/dashboard
{
  "success": true,
  "data": {
    "totalEmployees": 150,
    "activeEmployees": 145,
    "pendingPayroll": 12,
    "pendingLeaves": 8,
    "monthlyHires": 5,
    "departmentDistribution": [...],
    "attendanceRate": 95.2,
    "payrollExpenses": 450000
  }
}
```

## 🚦 Testing

### API Testing
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Example API Test
```typescript
// __tests__/api/employees.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '../../pages/api/employees'

describe('/api/employees', () => {
  it('should return employees list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.any(Array)
      })
    )
  })
})
```

## 🔒 Security Considerations

1. **Input Validation**: Validate all inputs using Zod schemas
2. **Authentication**: Implement JWT-based authentication
3. **Authorization**: Role-based access control (Admin, HR, Employee)
4. **File Upload**: Validate file types and sizes
5. **SQL Injection**: Use parameterized queries
6. **Rate Limiting**: Implement API rate limiting
7. **CORS**: Configure appropriate CORS policies

## 📱 Mobile Responsiveness

The frontend is fully responsive. Ensure API responses work well with mobile interfaces.

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
- Set up production database
- Configure environment variables
- Set up file storage (AWS S3, etc.)
- Configure email service
- Set up monitoring and logging

## 📞 Support & Contact

For backend integration questions:
- Create issues in the repository
- Contact the frontend team for clarification
- Review component implementations for data requirements

## 🔄 Next Steps for Backend Team

1. **Set up database schema** using provided SQL
2. **Implement authentication system**
3. **Create API endpoints** following the specified structure
4. **Replace mock data** in `hooks/use-hr-data.tsx`
5. **Add error handling** and validation
6. **Implement file upload** functionality
7. **Set up email notifications**
8. **Add logging and monitoring**
9. **Write API tests**
10. **Deploy to staging environment**

---

**Note**: This frontend is production-ready and waiting for backend integration. All components are functional with mock data and can be easily connected to real APIs by updating the data hooks.