import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Récupérer toutes les tâches
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Erreur lors de la récupération des tâches" },
        { status: 500 }
      );
    } else {
      console.error("Une erreur inconnue est survenue");
    }
  }
}

// Post : Ajouter une tâche

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTask = await prisma.task.create({
      data: {
        text: body.text,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        completed: false,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erreur :", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Erreur inconnue" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { error: "L'ID de la tâche est requis" },
        { status: 400 }
      );
    }
    const updatedTask = await prisma.task.update({
      where: { id: body.id },
      data: {
        text: body.text,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        completed: body.completed,
      },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erreur :", error.message);
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour de la tâche" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Erreur inconnue" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "ID de la tâche manquant" },
        { status: 400 }
      );
    }

    const deletedTask = await prisma.task.delete({
      where: { id: body.id },
    });

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la tâche" },
      { status: 500 }
    );
  }
}
