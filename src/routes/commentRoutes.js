const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /comments/create:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Ótimo post!"
 *               post_id:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 */

router.post("/create", auth, commentController.create);

/**
 * @swagger
 * /comments/update/{id}:
 *   put:
 *     summary: Atualiza um comentário existente
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do comentário a ser atualizado
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Comentário atualizado."
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Erro de validação (ex.: usuário não autorizado a atualizar este comentário)
 *       500:
 *         description: Erro interno do servidor
 */

router.put("/update/:id", auth, commentController.update);


module.exports = router;
