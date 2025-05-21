# List-Up

<img src="https://github.com/David-Chazoule/BodyMeasure/raw/master/src/preview/bodymesure1.PNG" style="width:400px; height:auto;" >  <img src="https://github.com/David-Chazoule/BodyMeasure/raw/master/src/preview/bodymesure2.PNG" alt="Body Measure Screenshot 2" style="width:400px; height:auto;">
<img src="https://github.com/David-Chazoule/BodyMeasure/raw/master/src/preview/bodymesure3.PNG" alt="Body Measure Screenshot 3" style="width:400px; height:auto;">  <img src="https://github.com/David-Chazoule/BodyMeasure/raw/master/src/preview/bodymesure4.PNG" alt="Body Measure Screenshot 4" style="width:400px; height:auto;">



# List-up – Task Manager App

List-up is a full-featured task management web application that allows you to create, edit, delete, and validate tasks. It also provides advanced filtering and sorting options to help you stay organized and focused.


## Technologies Used

The application has been developed using:
- **Next.js**
- **Prisma** (for backend and database)
- **Sass**


## Installation and Execution

To set up and run the application locally, follow these steps:

1. **Install dependencies:**
```bash
npm install
```
2. **Initialize the database:**
```bash
npx prisma generate
npx prisma migrate dev
```
3. **Start the application:**
```bash
npm run dev
```


## Project Structure
Here's an overview of the project structure:

**prisma/:** *Prisma schema and database logic.*

**App/:** *Main pages and routes (Next.js).*

**components/:** *Reusable UI components.*

**styles/:** *Sass files for styling.*


##Features

1. **Add new tasks**

2. **Edit and delete tasks**

3. **Mark tasks as completed**

4. **Filter tasks by status:**

- Completed

- Not completed

5. **Sort tasks by:**

- Creation date

- Due date


