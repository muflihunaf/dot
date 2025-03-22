# Dot Hiring Application

A NestJS-based hiring application that helps manage the hiring process efficiently.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muflihunaf/dot
cd dot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=dot_hiring
CACHE_TTL=5
CACHE_MAX=100
PORT=3000
```

5. Create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE dot_hiring;
```

## Running the Application

### Development Mode
```bash
npm run start:dev
# or
yarn start:dev
```

### Production Mode
```bash
# Build the application
npm run build
# or
yarn build

# Start the application
npm run start:prod
# or
yarn start:prod
```

The application will be available at `http://localhost:3000`

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
`http://localhost:3000/api/docs`

## Code Documentation

### Project Structure

```
src/
├── api/            # API module containing controllers and services
│   ├── dto/        # Data Transfer Objects
│   ├── entities/   # Database entities
│   ├── api.controller.ts
│   ├── api.service.ts
│   └── api.module.ts
├── main.ts         # Application entry point
└── app.module.ts   # Root application module
```

### Core Components

#### 1. API Module (`src/api/`)
The API module handles all HTTP requests and business logic.

##### Entities
- `Post` (`src/api/entities/post.entity.ts`)
  ```typescript
  @Entity()
  export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    userId: number;
  }
  ```

##### DTOs (Data Transfer Objects)
- `CreatePostDto` (`src/api/dto/create-post.dto.ts`)
  - Used for creating new posts
  - Contains validation rules for post creation

- `UpdatePostDto` (`src/api/dto/update-post.dto.ts`)
  - Used for updating existing posts
  - Contains validation rules for post updates

##### Services
- `ApiService` (`src/api/api.service.ts`)
  - Handles business logic for posts
  - Implements CRUD operations:
    - `getPosts()`: Retrieve all posts
    - `getPost(id)`: Get a single post by ID
    - `createPost(post)`: Create a new post
    - `updatePost(id, post)`: Update an existing post
    - `deletePost(id)`: Delete a post

##### Controllers
- `ApiController` (`src/api/api.controller.ts`)
  - Handles HTTP requests
  - Routes:
    - GET `/posts`: Get all posts
    - GET `/posts/:id`: Get a single post
    - POST `/posts`: Create a new post
    - PUT `/posts/:id`: Update a post
    - DELETE `/posts/:id`: Delete a post

### Database Integration

The application uses TypeORM for database operations with PostgreSQL. The database configuration is managed through environment variables in the `.env` file.

### API Integration

The application integrates with an external API (JSONPlaceholder) for post data. The integration is handled in the `ApiService` class, which:
1. Makes HTTP requests to the external API
2. Stores the data in the local database
3. Handles error cases and provides appropriate responses

### Error Handling

The application implements comprehensive error handling:
- HTTP exceptions for API errors
- Database operation error handling
- Input validation errors
- Custom error messages and status codes

## Testing

Run the test suite:
```bash
# Unit tests
npm run test
# or
yarn test

# e2e tests
npm run test:e2e
# or
yarn test:e2e
```

## Available Scripts

- `npm run build` - Build the application
- `npm run start:dev` - Start the application in development mode
- `npm run start:prod` - Start the application in production mode
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint the code
- `npm run format` - Format the code using Prettier
