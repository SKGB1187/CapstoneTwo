import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    // Password constraints
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return new Response(
        JSON.stringify({
          error:
            "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
        }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists." }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
