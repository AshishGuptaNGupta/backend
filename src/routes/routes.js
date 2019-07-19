
const BlogController= require('../controller/blog_controller');
const AuthorController=require('../controller/author_controller');
const CommentController=require('../controller/comment_controller');
const DraftController=require('../controller/draft_controller');
const app=require("../app");
const authMiddleware=require('../services/passport');


module.exports=(app)=>{
    app.post('/blog/create',authMiddleware.requireAuth, BlogController.create);
    app.put('/blog/edit/:id',authMiddleware.requireAuth,BlogController.edit);
    app.get('/blog/get/:id',BlogController.getBlog);
    app.delete('/blog/delete/:id',authMiddleware.requireAuth,BlogController.delete);
    app.post("/",BlogController.getFeatured);
    app.get("/",function(req,res,next){res.send("hello")});
    app.post("/authorblogs/:id",BlogController.getAuthorBlogs);

    // app.post('/author/create',AuthorController.create);
    app.put('/author/edit/:id',authMiddleware.requireAuth,AuthorController.edit);
    app.get('/author/get/:id',AuthorController.getUser);
    app.delete('/author/delete/:id',authMiddleware.requireAuth,AuthorController.delete);
    app.get("/search/blog",BlogController.searchBlog);



    app.post('/comment/create/:id',authMiddleware.requireAuth,CommentController.create);
    app.delete('/comment/delete',authMiddleware.requireAuth,CommentController.delete);
    app.put('/comment/edit/:id',authMiddleware.requireAuth,CommentController.edit);

    
    app.post('/draft/create',authMiddleware.requireAuth,DraftController.create);
    app.delete('/draft/delete/:id',authMiddleware.requireAuth,DraftController.delete);
    app.put('/draft/edit/:id',authMiddleware.requireAuth,DraftController.edit);
    app.post('/authordrafts/:id',authMiddleware.requireAuth,DraftController.getAll);
    app.get('/draft/:id',authMiddleware.requireAuth,DraftController.get);
    
    

  
}