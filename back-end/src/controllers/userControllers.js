const {models} = require('../models/init-models')
const bcrypt = require('bcrypt')

const findAllUser = async(req, res) =>{
    try {
        const data = await models.users.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send('Data Tidak Ditemukan\n' +  error)
    }
}

const registerUser = async(req,res) => {
    const userExist = await models.users.findOne({
        where :{
            username : req.body.username
        }
    })
    
    const salt = await bcrypt.genSalt(10);
    const passwordHashing = await bcrypt.hash(req.body.password, salt)
    try {
        if(userExist){
            res.send('Username Sudah Ada')
        }
        else{
            await models.users.create({
                username : req.body.username,
                password : passwordHashing
            })
            res.status(201).send('Used Didaftarkan')
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
}

const updateUser = async (req, res) =>{
   const userExist = await models.users.findOne({
    where : {
        id : req.params.id
    }
   })
    try {
        if(!userExist){
            res.send('Username Tidak Ada')
        }else{
            await models.users.update({
                username : req.body.username,
            },{
                where : {
                    user_id : req.params.id
                }
            })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteUser = async(req, res) =>{
    try {
        await models.users.destroy({
            where : {
                user_id : req.params.id
            }
        })
        res.status(200).send('User Deleted')
    } catch (error) {
        res.status(400).send(error.message)        
    }
}

module.exports = {
    findAllUser,
    registerUser,
    updateUser,
    deleteUser
}