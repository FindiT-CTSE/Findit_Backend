import { Request, Response, NextFunction } from "express";
import { rankMatches, Post } from "../services/matchingEngine";

const mockPosts: Post[] = [
  {
    id: "found-001",
    type: "FOUND",
    category: "Laptop",
    location: "Library",
    date: "2026-03-16T09:00:00.000Z",
    description: "Black Dell laptop found near main library entrance",
    imageUrl: null,
    status: "OPEN",
    userId: "user-22",
  },
  {
    id: "found-002",
    type: "FOUND",
    category: "Phone",
    location: "Cafeteria",
    date: "2026-03-16T12:00:00.000Z",
    description: "Samsung phone found on cafeteria table",
    imageUrl: null,
    status: "OPEN",
    userId: "user-33",
  },
  {
    id: "lost-003",
    type: "LOST",
    category: "Bag",
    location: "Lab 2",
    date: "2026-03-15T10:30:00.000Z",
    description: "Blue backpack with notebooks",
    imageUrl: null,
    status: "OPEN",
    userId: "user-44",
  },
];

function isValidPost(post: any): post is Post {
  return (
    post &&
    typeof post.id === "string" &&
    (post.type === "LOST" || post.type === "FOUND") &&
    typeof post.category === "string" &&
    typeof post.location === "string" &&
    typeof post.date === "string" &&
    typeof post.description === "string"
  );
}

export async function matchPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { post } = req.body;

    if (!isValidPost(post)) {
      return res.status(400).json({ message: "Invalid post payload" });
    }

    const oppositeType = post.type === "LOST" ? "FOUND" : "LOST";
    const candidates = mockPosts.filter(
      (p) => p.type === oppositeType && p.status === "OPEN"
    );

    const matches = rankMatches(post, candidates);

    return res.status(200).json({
      count: matches.length,
      matches,
    });
  } catch (error) {
    next(error);
  }
}