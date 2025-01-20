const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chatbot.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT)`);

  // Insert sample data
  const stmt = db.prepare("INSERT INTO responses (question, answer) VALUES (?, ?)");

  const data = [
    ['Hi', 'Hi! How can I help you?'],
    ['Hello', 'Hi! How can I help you?'],
    ['Who created you?', 'I was developed by a talented developer named Tushar Kumar.'],
    ['How can I contact the developer?', 'You can contact Tushar Kumar via Email: itstusharkumar15@gmail.com, Phone: +91 8194846705, LinkedIn: www.linkedin.com/in/tus4ar-kumar-, GitHub: github.com/ProjectTusharKumar.'],
    ['What is your name?', 'I am your friendly chatbot!'],
    ['What can you do?', 'I can answer your questions, provide information, and assist you with various tasks.'],
    ['Tell me a joke.', 'Why did the computer go to the doctor? It had a virus!'],
    ['What is AI?', 'AI, or Artificial Intelligence, is the simulation of human intelligence by machines.'],
    ['What is machine learning?', 'Machine learning is a subset of AI that enables computers to learn from data.'],
    ['How do I learn coding?', 'Practice daily, contribute to open-source projects, and build real-world applications.'],
    ['What is Git?', 'Git is a version control system to track changes in your code.'],
    ['What is GitHub?', 'GitHub is a platform for version control and collaboration using Git.'],
    ['What is React?', 'React is a popular JavaScript library for building user interfaces.'],
    ['What is Node.js?', 'Node.js is a JavaScript runtime for building server-side applications.'],
    ['What is SQL?', 'SQL stands for Structured Query Language, used to interact with databases.'],
    ['What is open-source?', 'Open-source refers to software with source code that anyone can inspect, modify, and enhance.'],
    ['What is HTML?', 'HTML stands for HyperText Markup Language, used to structure web pages.'],
    ['What is CSS?', 'CSS stands for Cascading Style Sheets, used to style HTML content.'],
    ['What is JavaScript?', 'JavaScript is a versatile programming language for web development.'],
    ['What is MongoDB?', 'MongoDB is a NoSQL database for storing JSON-like documents.'],
    ['What is Tailwind CSS?', 'Tailwind CSS is a utility-first CSS framework for designing user interfaces.'],
    ['How do I debug code?', 'Use tools like Chrome DevTools or VS Code’s built-in debugger.'],
    ['What is deployment?', 'Deployment is the process of making an application available for use.'],
    ['What is JWT?', 'JWT (JSON Web Token) is a secure way to authenticate users.'],
    ['What is Vercel?', 'Vercel is a platform for hosting frontend projects, especially React and Next.js.']
    // Add more data here if needed
  ];

  // Insert each question and answer into the database
  data.forEach(([question, answer]) => {
    stmt.run(question, answer);
  });

  stmt.finalize();
});

db.close(() => {
  console.log("Data insertion complete!");
});
