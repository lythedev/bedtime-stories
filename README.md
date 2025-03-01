# Bedtime Story App

A beautiful Next.js application designed for parents to read bedtime stories to their children. Built with Next.js 14 and shadcn UI for a modern, responsive user experience.

## Features

- Browse a collection of engaging children's stories
- Filter stories by category and age range
- Read individual stories with a clean, distraction-free interface
- Save favorite stories for quick access
- Responsive design that works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: shadcn UI
- **Language**: TypeScript
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose (for containerized deployment)

### Installation and Running Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bedtime-story-app.git
cd bedtime-story-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Running with Docker

1. Build and start the Docker container:

```bash
docker-compose up -d
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

3. To stop the container:

```bash
docker-compose down
```

### Building the Docker Image Manually

```bash
# Build the Docker image
docker build -t bedtime-story-app .

# Run the container
docker run -p 3000:3000 bedtime-story-app
```

## Project Structure

- `app/` - Contains all the Next.js app router pages and layouts
- `components/` - Reusable UI components
- `public/` - Static assets like images
- `lib/` - Utility functions and shared code

## Expanding the App

Some ideas for future enhancements:

- Add user authentication to allow multiple profiles
- Implement a backend to store real story data
- Add a text-to-speech feature for reading stories aloud
- Create a "create your own story" feature for parents
- Implement a night mode for bedtime reading

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 