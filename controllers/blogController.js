const Blog = require ('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog: result, title: 'Blog Details'});
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err);
        })
}

// Render the edit page with the existing blog content
const blog_edit_get = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/edit', { blog: result, title: 'Edit Blog' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: 'Blog not found' });
        });
}

// Handle the blog update after the form is submitted
const blog_edit_post = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { new: true })
        .then(result => {
            res.redirect(`/blogs/${id}`);  // Redirect to the updated blog's detail page
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_post
}