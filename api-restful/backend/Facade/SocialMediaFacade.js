// SocialMediaFacade.js

class SocialMediaFacade {
    constructor(userController, registerController, loginController, postController, commentController, likeController, profileController, editProfileController) {
        this.userController = userController;
        this.registerController = registerController;
        this.loginController = loginController;
        this.postController = postController;
        this.commentController = commentController;
        this.likeController = likeController;
        this.profileController = profileController;
        this.editProfileController = editProfileController;
    }

    // Métodos para Usuários
    registerUser(req, res) {
        return this.registerController.register(req, res);
    }

    loginUser(req, res) {
        return this.loginController.login(req, res);
    }

    getAllUsers(req, res) {
        return this.userController.getAll(req, res);
    }

    getUserById(req, res) {
        return this.userController.get(req, res);
    }

    deleteUser(req, res) {
        return this.userController.delete(req, res);
    }

    updateUser(req, res) {
        return this.userController.update(req, res);
    }

    // Métodos para Postagens
    createPost(req, res) {
        return this.postController.create(req, res);
    }

    getAllPosts(req, res) {
        return this.postController.getAll(req, res);
    }

    getPostById(req, res) {
        return this.postController.get(req, res);
    }

    deletePost(req, res) {
        return this.postController.delete(req, res);
    }

    updatePost(req, res) {
        return this.postController.update(req, res);
    }

    // Métodos para Curtidas
    likePost(req, res) {
        return this.likeController.like(req, res);
    }

    // Métodos para Comentários
    commentOnPost(req, res) {
        return this.postController.addComment(req, res);
    }

    deleteComment(req, res) {
        return this.postController.deleteComment(req, res);
    }

    getCommentsForPost(req, res) {
        return this.commentController.getAll(req, res);
    }

    // Métodos para Perfil de Usuário
    getUserProfile(req, res) {
        return this.profileController.getProfile(req, res);
    }

    editUserProfile(req, res) {
        return this.editProfileController.edit(req, res);
    }
}

export default SocialMediaFacade;
