import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insérer une tâche dans la table "task"
  const newTask = await prisma.task.create({
    data: {
      text: "Faire les courses",
      dueDate: new Date('2025-03-10'),
      completed: false,
    },
  });

  console.log("Tâche ajoutée :", newTask);

  // Récupérer toutes les tâches
  const tasks = await prisma.task.findMany();
  console.log("Toutes les tâches :", tasks);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });