import express from 'express'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { isAuth, isAdmin, generetaToken } from '../utils.js';
const userRouter = express.Router() 
userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );

  userRouter.get(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
  
  userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

  userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.isAdmin) {
          res.status(400).send({ message: 'Can Not Delete Admin User' });
          return;
        }
        await user.remove();
        res.send({ message: 'User Deleted' });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

userRouter.post(
    '/signin',
    expressAsyncHandler(async(req,res)=>{
        const user = await User.findOne({email: req.body.email})
if (user){
   if(bcrypt.compareSync(req.body.password, user.password)){
res.send({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin: user.isAdmin,
    token: generetaToken(user)
})
return
   } 
}
res.status(401).send({message: 'invalid email or password'})
    })
)
userRouter.post(
    '/signup',
    expressAsyncHandler(async (req,res)=>{
    const newUser = new User ({
       name: req.body.name,
       email: req.body.email,
       password: bcrypt.hashSync(req.body.password) 
    })
    const user = await newUser.save()
    res.send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin: user.isAdmin,
        token: generetaToken(user)
    })
}))
export default userRouter