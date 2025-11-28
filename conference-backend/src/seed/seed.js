// src/seed/seed.js
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import Employee from "../models/Employee.js";
import Task from "../models/Task.js";

const firstNames = [
  "Aisha","Noah","Priya","Ravi","Sneha","John","Emily","David","Arjun","Sara",
  "Karan","Maya","Sanjay","Nina","Rohan","Isha","Ankit","Vikas","Meera","Liam",
  "Olivia","Ethan","Aarav","Vivaan","Diya","Kabir","Aditya","Simran","Harsh"
];

const lastNames = [
  "Kumar","Patel","Singh","Sharma","Verma","Mehta","Gupta","Iyer","Nair",
  "Fernandes","Williams","Brown","Johnson","Davis","Mishra","Kapoor","Gill"
];

const roles = [
  "Frontend Engineer","Backend Engineer","Fullstack Engineer","QA Engineer",
  "DevOps Engineer","Data Scientist","ML Engineer","Data Analyst",
  "Product Manager","UI/UX Designer","Cloud Engineer"
];

const departments = [
  "Engineering","Data","QA","Product","Design","Cloud","Platform","DevOps"
];

const taskTitles = [
  "Build authentication module","Improve dashboard UI","Create analytics endpoint",
  "Optimize database queries","Fix login bug","Write unit tests",
  "Implement caching layer","Add CI/CD pipeline","Refactor user service",
  "Design notification system","Integrate API gateway","Add dark mode",
  "Implement search feature","Fix responsive layout","Add file upload support"
];

const statuses = ["pending","in-progress","done"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateFuture() {
  return new Date(Date.now() + Math.floor(Math.random()*30)*24*3600*1000);
}

function randomDatePast() {
  return new Date(Date.now() - Math.floor(Math.random()*30)*24*3600*1000);
}

function generateEmail(name) {
  return `${name.toLowerCase().replace(" ",".")}${Math.floor(Math.random()*999)}@example.com`;
}

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  await connectDB(mongoUri);

  console.log("Clearing employees & tasks...");
  await Employee.deleteMany({});
  await Task.deleteMany({});

  // ----------------------
  // GENERATE ~200 EMPLOYEES
  // ----------------------
  const employeeDocs = [];
  for (let i = 0; i < 200; i++) {
    const fn = randomItem(firstNames);
    const ln = randomItem(lastNames);
    const fullName = `${fn} ${ln}`;
    employeeDocs.push({
      name: fullName,
      email: generateEmail(fullName),
      role: randomItem(roles),
      department: randomItem(departments)
    });
  }

  const employees = await Employee.create(employeeDocs);
  console.log("Employees created:", employees.length);

  // ----------------------
  // GENERATE ~400 TASKS
  // ----------------------
  const taskDocs = [];
  for (let i = 0; i < 400; i++) {
    taskDocs.push({
      title: randomItem(taskTitles),
      description: "Auto-generated task for development testing",
      status: randomItem(statuses),
      assignedTo: employees[Math.floor(Math.random() * employees.length)]._id,
      dueDate: Math.random() > 0.3 ? randomDateFuture() : randomDatePast()
    });
  }

  const tasks = await Task.create(taskDocs);
  console.log("Tasks created:", tasks.length);

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
