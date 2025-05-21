import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Définition des types pour les filtres et le tri des tâches
type TaskFilters = {
  completed?: boolean;
  dueDate?: { equals: Date };
  createdAt?: { equals: Date };
};

type TaskOrderBy = {
  completed?: "asc" | "desc";
  dueDate?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}[];

// Handler pour la méthode GET - Récupération des tâches
export async function GET(request: NextRequest) {
  try {
    // Extraction des paramètres de requête depuis l'URL
    const { searchParams } = new URL(request.url);

    // Récupération des paramètres individuels
    const completed = searchParams.get("completed");
    const dueDate = searchParams.get("dueDate");
    const createdAt = searchParams.get("createdAt");
    const sortBy = searchParams.get("sortBy");

    // Initialisation des objets pour les filtres et le tri
    const filters: TaskFilters = {};
    const orderBy: TaskOrderBy = [];

    // Construction des filtres en fonction des paramètres reçus
    if (completed) {
      filters.completed = completed === "true"; // Conversion string -> boolean
    }

    if (dueDate) {
      filters.dueDate = {
        equals: new Date(dueDate), // Conversion string -> Date
      };
    }

    if (createdAt) {
      filters.createdAt = {
        equals: new Date(createdAt), // Conversion string -> Date
      };
    }

    // Configuration du tri
    if (sortBy === "dueDate") {
      orderBy.push({ dueDate: "asc" }); // Tri par date d'échéance croissante
    } else if (sortBy === "createdAt") {
      orderBy.push({ createdAt: "asc" }); // Tri par date de création croissante
    }

    // Tri par défaut par statut de complétion
    orderBy.push({ completed: "asc" });

    // Récupération des tâches depuis la base de données avec Prisma
    const tasks = await prisma.task.findMany({
      where: filters, // Application des filtres
      orderBy, // Application du tri
    });

    // Retour des tâches en JSON
    return NextResponse.json(tasks);
  } catch (error) {
    // Gestion des erreurs
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

// Handler pour la méthode POST - Création d'une nouvelle tâche
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Récupération du corps de la requête

    // Création de la tâche dans la base de données
    const newTask = await prisma.task.create({
      data: {
        text: body.text, // Texte de la tâche
        dueDate: body.dueDate ? new Date(body.dueDate) : null, // Date d'échéance optionnelle
        completed: false, // Par défaut, une nouvelle tâche n'est pas complétée
      },
    });

    // Retour de la nouvelle tâche avec statut 201 (Created)
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    // Gestion des erreurs
    if (error instanceof Error) {
      console.error("Erreur :", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Erreur inconnue" }, { status: 500 });
  }
}

// Handler pour la méthode PUT - Mise à jour d'une tâche existante
export async function PUT(req: Request) {
  try {
    const body = await req.json(); // Récupération du corps de la requête

    // Vérification de la présence de l'ID
    if (!body.id) {
      return NextResponse.json(
        { error: "L'ID de la tâche est requis" },
        { status: 400 }
      );
    }

    // Mise à jour de la tâche dans la base de données
    const updatedTask = await prisma.task.update({
      where: { id: body.id }, // Identification de la tâche à mettre à jour
      data: {
        text: body.text, // Nouveau texte
        dueDate: body.dueDate ? new Date(body.dueDate) : null, // Nouvelle date d'échéance
        completed: body.completed, // Nouveau statut de complétion
      },
    });

    // Retour de la tâche mise à jour
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    // Gestion des erreurs
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

// Handler pour la méthode DELETE - Suppression d'une tâche
export async function DELETE(req: Request) {
  try {
    const body = await req.json(); // Récupération du corps de la requête

    // Vérification de la présence de l'ID
    if (!body.id) {
      return NextResponse.json(
        { error: "ID de la tâche manquant" },
        { status: 400 }
      );
    }

    // Suppression de la tâche dans la base de données
    const deletedTask = await prisma.task.delete({
      where: { id: body.id }, // Identification de la tâche à supprimer
    });

    // Retour de la tâche supprimée
    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la tâche" },
      { status: 500 }
    );
  }
}
