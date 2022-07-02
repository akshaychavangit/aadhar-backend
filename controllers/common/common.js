const mongoClient = require('../../db/mongodbConnection');
const { siteSettings } = require('../../db/mongodbConfiguration').mongoConfiguration.collections;
const  schemaValidator  = require('../../common/validator');
const  commonSchema  = require('../../models/common/commonSchema');
const  bcrypt = require('bcryptjs');
const  { userMaster } = require('../../db/mongodbConfiguration').mongoConfiguration.collections;
const moment = require('moment');
const mongodb = require('mongodb');
const { jwtEncrypt } = require('../../common/jwt');

const  { v4 : uuidv4 }  = require('uuid');
const CustomError = require('../../common/CustomError');



class Common {

    constructor(payload,params){
        this.payload = payload;
        this.params = params;
        this.db = mongoClient.getDb().db();
    }

    async getDomainSettings(){
        try {
            let settings = await this.db.collection(siteSettings).findOne({domain:this.payload.domain}, {projection:{ _id: 0}})
            return settings

        } catch (error) {
            throw error
        }
    }


    async register(){
        try {


            let validatedData = schemaValidator(this.payload.data,commonSchema.register);


            let emailExist = await this.userExist(validatedData.email)
            if(emailExist){
                throw new CustomError('Email already exist')
            }

            let currentDate = new Date();

            delete validatedData.cpassword
            let encryptPassword  = await bcrypt.hash(validatedData.password, await bcrypt.genSalt(Number(process.env.SALT_ROUNDS)))

            let data = {
                userId: uuidv4(),
                role:1,
                createdAt:currentDate,
                lastInteraction:currentDate,
                isDeleted:false,
                ...validatedData,
                password:encryptPassword,
            }
            
            let registerUser  = await this.db.collection(userMaster).insertOne(data);
            return "Registered Successfully"

        } catch (error) {
            throw error
        }
    }



    async userExist(email){
        try {
            let query = { email }
            let isEmailExist = await this.db.collection(userMaster).findOne(query)
            return isEmailExist
            
        } catch (error) {
            console.log(error)
            throw error
        }      

    }


    async userPhoneExist(phone){
        try {
            let query = { phone }
            let isPhoneExist = await this.db.collection(userMaster).findOne(query)
            return isPhoneExist
            
        } catch (error) {
            console.log(error)
            throw error
        }      

    }


    async login(){

        try {


            let validatedData = schemaValidator(this.payload.data,commonSchema.login);


            let userData = await this.userExist(validatedData.email)
            if(userData){

            let verifyLogin = await bcrypt.compare(validatedData.password, userData.password)
            delete userData.password;
            if(verifyLogin){
                    let tokenData = {
                        userId : userData.userId,
                        role:userData.role
                    }

                    let jwtToken = await jwtEncrypt(tokenData)

                return {jwtToken,userData}

            }else{
                throw new CustomError('Invalid credentials',400,'login')
            }

            }else{
                throw new CustomError('Invalid credentials',400,'login')
            }
            
        } catch (error) {
            console.log(error)
            throw error
        } 
    }


    async refreshToken(){

        try {

            let userData = await this.db.collection(userMaster).findOne({userId:this.payload.userId})
            if(userData){
                delete userData.password
                    let tokenData = {
                        userId : userData.userId,
                        role:userData.role
                    }

                    let jwtToken = await jwtEncrypt(tokenData)

                return {jwtToken,userData}

            }else{
                throw new CustomError('Invalid token',400,'login')
            }
            
        } catch (error) {
            console.log(error)
            throw error
        } 
    }



    
    async createAadhar(){
        try {


            let validatedData = schemaValidator(this.payload.data,commonSchema.createAadhar);


            let emailExist = await this.userExist(validatedData.email)
            if(emailExist){
                throw new CustomError('Email already exist')
            }

            let phoneExist = await this.userPhoneExist(validatedData.phone)
            if(phoneExist){
                throw new CustomError('Phone already exist')
            }

            let currentDate = new Date();

            delete validatedData.cpassword
            let encryptPassword  = await bcrypt.hash(validatedData.password, await bcrypt.genSalt(Number(process.env.SALT_ROUNDS)))

            let max = 999999999999
            let min = 100000000000
            let aadharNumber = Math.floor(
                Math.random() * (max - min + 1) + min
              ).toString()

            let data = {
                userId: uuidv4(),
                createdAt:currentDate,
                lastInteraction:currentDate,
                aadharNumber,
                isDeleted:false,
                ...validatedData,
                role:2,
                password:encryptPassword,
            }
            
            let registerUser  = await this.db.collection(userMaster).insertOne(data);
            return "Added Successfully"

        } catch (error) {
            throw error
        }
    }



}


module.exports = Common