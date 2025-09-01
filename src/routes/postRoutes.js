const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /api/posts/all:
 *   get:
 *     summary: Lista todos os posts do usuário autenticado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/all", auth, postController.getAll);

/**
 * @swagger
 * /api/posts/get/{id}:
 *   get:
 *     summary: Busca um post por ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: string
 *           example: 10
 *     responses:
 *       200:
 *         description: Post retornado com sucesso
 *       400:
 *         description: Post não encontrado ou não pertence ao usuário
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/get/:id", auth, postController.getById);

/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meu primeiro post"
 *               text:
 *                 type: string
 *                 example: "Este é o conteúdo do post."
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/create", auth, postController.create);

/**
 * @swagger
 * /api/posts/update/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do post a ser atualizado
 *         schema:
 *           type: string
 *           example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título atualizado"
 *               text:
 *                 type: string
 *                 example: "Conteúdo atualizado"
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Erro de validação ou post não pertence ao usuário
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/update/:id", auth, postController.update);

/**
 * @swagger
 * /api/posts/delete/{id}:
 *   delete:
 *     summary: Remove um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do post a ser removido
 *         schema:
 *           type: string
 *           example: 7
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       400:
 *         description: Erro de validação ou post não pertence ao usuário
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/delete/:id", auth, postController.delete);


module.exports = router;
