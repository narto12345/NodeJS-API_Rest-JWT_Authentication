import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import { analyzeSchema } from "../helpers/analyze-schema.js";
import { UserRepository } from "../repositories/user-repository.js";

const userRepository = new UserRepository();

const SECRET = "secreto_deberia_ir_en_una_variable_de_entorno";

const app = express();

// configuration Express
app.use(express.json());
app.use(cookieParser());

/**
 * MIDDLEWARE:
 * This middleware allows you to manage when the user sends a json with incorrect syntax.
 */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(200)
      .send({ status: 400, message: "Hay un error de sintaxis en el json" }); // Bad request
  }
  next();
});

/**
 * Session start
 */
app.post("/login", async (request, response) => {
  const resquestBody = request.body;
  const analyzedRequest = await analyzeSchema(resquestBody, 0);

  if (!analyzedRequest.success) {
    response.json({
      message: "Error de validación",
      cause: analyzedRequest.error.errors,
    });
    return;
  }

  const suppliedUser = analyzedRequest.data;
  const userFound = await userRepository.findUser(suppliedUser.username);

  if (!userFound) {
    response.json({
      message: "Error, el usuario no existe",
    });
    return;
  }

  const isValid = await bcrypt.compare(
    suppliedUser.password,
    userFound.password
  );

  if (!isValid) {
    response.json({
      message: "Error, contraseña incorrecta",
    });
    return;
  }

  const token = jwt.sign({ user: userFound.username }, SECRET, {
    expiresIn: "1h",
  });

  response
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    })
    .json({
      message: "Te has logeado :D",
    });
});

/**
 * User registration
 */
app.post("/register", async (request, response) => {
  const resquestBody = request.body;
  const analyzedRequest = await analyzeSchema(resquestBody, 0);

  if (!analyzedRequest.success) {
    response.json({
      message: "Error de validación",
      cause: analyzedRequest.error.errors,
    });
    return;
  }

  // Create user
  const userResponse = await userRepository.create(analyzedRequest.data);
  response.json(userResponse);
});

/**
 * Logout session
 */
app.post("/logout", (request, response) => {
  response.clearCookie("token").json({
    message: "Sesión cerrada",
  });
});

/**
 *
 */
app.get("/protected", async (request, response) => {
  // Validate Token
  const userToken = request.cookies.token;

  if (!userToken) {
    return response.json({
      message: "Acceso denegado",
      cause: "Token no encontrado",
    });
  }

  try {
    const data = jwt.verify(userToken, SECRET);
    console.log(`Usuario protected: ${data.user}`);
  } catch (error) {
    response.json({ message: "Acceso denegado", cause: "Token inválido" });
    return;
  }

  const objects = await userRepository.getAll();

  if (!objects.length) {
    response.json({ message: "No existen recursos" });
    return;
  }

  response.json(objects);
});

/**
 * MIDDLEWARE:
 * This middleware intercepts undefined endpoints
 */
app.use((req, res, next) => {
  res.status(200).json({ message: "La página que busca no existe" });
});

export { app };
