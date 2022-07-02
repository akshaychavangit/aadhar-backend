let mongoConfiguration = {
    dbUrl : process.env.DBURL,
    collections:{
        siteSettings:'siteSettings',
        userMaster:'userMaster'
    }
}



module.exports = {
    mongoConfiguration
}