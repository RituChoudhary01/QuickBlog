import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Check if all required fields are present
    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Read the image file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs'
    });

    // Generate optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' }, // Auto compression
        { format: 'webp' },  // Convert to modern format
        { width: '1280' }    // Width resizing
      ]
    });

    const image = optimizedImageUrl;

    // Save blog to database
    await Blog.create({ title, subTitle, description, category, image, isPublished });

    return res.status(201).json({ success: true, message: 'Blog created successfully' });

  } catch (error) {
    console.error('Add Blog Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async(req, res)=>{
  try{
    const blogs = await Blog.find({isPublished: true})
    res.json({success:true, blogs})
  }catch(error){
    res.json({success:false, message: error.message})
  }
}

export const getBlogById = async(req, res)=>{
  try{
    const {blogId} = req.params;
    const blog = await Blog.findById(blogId)
    if(!blog){
      return  res.json({success:false, message: "Blog not found"})
    }
    res.json({success:true, blog})
  }catch(error){
    res.json({success:false, message: error.message})
  }
}

export const deleteBlogsById = async(req, res)=>{
  try{
    const {id} = req.body;
    await Blog.findByIdAndDelete(id);

    // Delete all comments associated with the blog
    await Comment.deleteMany({blog:id});
    
    res.json({success:true, message: 'Blog deleted successfully'})
  }catch(error){
    res.json({success:false, message: error.message})
  }
}

export const togglePublish = async(req , res)=>{
  try{
    const {id} = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({success:true, message:'Blog Status updated'})
  }catch(error){
    res.json({success:false, message: error.message})
  }
} 

export const addComment  = async (req, res)=>{
    try {
      const { blogId, name, content } = req.body;
  
      // Check required fields
      if (!blogId || !name || !content) {
        return res.json({ success: false, message: 'All fields are required' });
      }
  
      await Comment.create({ blog: blogId, name, content });
  
      res.json({ success: true, message: 'Comment added for review' });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  // try{
  //   const {blog, name, content} = req.body;
  //   await Comment.create({blog,name,content});
  //   res.json({success:true, message:'Comment added for review'})
  // }catch(error){
  //   res.json({success:false, message: error.message})
  // }
}

export const getBlogComments = async(req , res)=>{
  try{
    const {blogId} = req.body;
    const comments = await Comment.find({blog:blogId, isApproved:true}).sort({createdAt:-1});
    res.json({success:true, comments})
  }catch(error){
    res.json({success:false, message: error.message})
  }
}

export const generateContent = async(req, res)=>{
  try{
    const {prompt} = req.body;
    const content = await main(prompt+ 'Generate a blog content for this topic in simple text format')
    res.json({success:true, content})
  } catch(error){
    res.json({success:false, message:error.message})
  }
}

