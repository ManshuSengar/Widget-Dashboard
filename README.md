# Widget Dashboard - Interview POC

A single-page dashboard application built with Next.js and NestJS that allows users to drag & drop widgets and persist their configurations.

## 🚀 Features

- **Mock Authentication**: Simple login system with token-based auth
- **Drag & Drop**: Reorder widgets with intuitive drag and drop
- **Widget Settings**: Configure individual widget properties
- **Persistent Storage**: JSON file-based storage (no database)
- **Two Widget Types**:
  - Text Widget: Customizable content, font size, and color
  - Counter Widget: Interactive counter with configurable step and label

## 🏗️ Architecture

### Backend (NestJS)
- **Controllers**: Handle HTTP requests
- **Services**: Business logic layer
- **Storage Service**: JSON file-based persistence
- **DTOs**: Request/response validation

### Frontend (Next.js)
- **Context API**: Global state management
- **Component-based**: Reusable widget components
- **API Service**: Centralized HTTP client
- **Plain CSS**: BEM methodology for styling

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd widget-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend server will start on `http://localhost:4000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on `http://localhost:3000`

## 🔑 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Login with any email and password (mock authentication)
3. Drag widgets to reorder them
4. Click the ⚙️ icon on any widget to configure its settings
5. Changes are automatically saved and persist after page refresh

## 📁 Project Structure

```
widget-dashboard/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── dto/
│   │   ├── widgets/
│   │   │   ├── widgets.controller.ts
│   │   │   ├── widgets.service.ts
│   │   │   └── dto/
│   │   ├── storage/
│   │   │   └── storage.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── data/ (auto-generated)
│   │   ├── users.json
│   │   └── widgets.json
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx
    │   │   ├── layout.tsx
    │   │   └── globals.css
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   ├── Login/
    │   │   ├── SettingsPanel/
    │   │   └── widgets/
    │   ├── context/
    │   │   └── DashboardContext.tsx
    │   ├── services/
    │   │   └── api.ts
    │   └── types/
    │       └── index.ts
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - Mock authentication
  ```json
  Request: { "email": "user@example.com", "password": "any" }
  Response: { "success": true, "token": "...", "user": {...} }
  ```

### Widgets
- `GET /widgets` - Fetch user's widgets
  ```json
  Response: { "success": true, "widgets": [...] }
  ```

- `PUT /widgets` - Update widgets layout/settings
  ```json
  Request: { "widgets": [...] }
  Response: { "success": true, "widgets": [...] }
  ```

## 🎨 Design Decisions

1. **No Database**: Using JSON files for persistence as per requirements
2. **Plain CSS**: Custom CSS with BEM methodology for clean, maintainable styles
3. **Context API**: Lightweight state management without additional dependencies
4. **Component Separation**: Clear separation between presentational and container components
5. **Type Safety**: TypeScript for both frontend and backend
6. **Auto-save**: Changes are saved automatically on drag/drop and settings update

## 🧪 Testing the Application

1. **Login Flow**:
   - Use any email/password combination
   - Token is stored in localStorage

2. **Widget Management**:
   - Drag widgets to reorder
   - Click settings icon to modify properties
   - Refresh page to verify persistence

3. **Multiple Users**:
   - Logout and login with different email
   - Each user has separate widget configurations

## 📝 Notes

- Mock authentication accepts any credentials
- Data persists in `backend/data/` directory
- Each user's widgets are stored separately
- Changes auto-save on interaction
- Logout clears localStorage

## 🚦 Development Time

Estimated completion time: 7-8 hours

## 👨‍💻 Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: NestJS, TypeScript
- **Styling**: Plain CSS (no frameworks)
- **State Management**: React Context API
- **Storage**: JSON files
- **HTTP Client**: Fetch API

## 🔧 Troubleshooting

If you encounter CORS issues:
- Ensure backend is running on port 4000
- Ensure frontend is running on port 3000
- Check that CORS is enabled in backend main.ts

If data doesn't persist:
- Check that `backend/data/` directory exists
- Verify file permissions
- Check backend console for errors


