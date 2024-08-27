

// exports.loginRoute=(req,res)=>{
//     res.render("login",(err,html)=>{
//        if(err){
//           console.log(err);
//        }
//        res.send(html)
//     })
// } 

// exports.registerRoute=(req,res)=>{
//     res.render("register",(err,html)=>{
//        if(err){
//           console.log(err);
//        }
//        res.send(html)
//     })
// } 

// exports.homeRoute=(req,res)=>{
//     res.render("home",(err,html)=>{
//        if(err){
//           console.log(err);
//        }
//        res.send(html)
//     })
// } 


// Login Route
exports.loginRoute = (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render("login", { message, error }, (err, html) => {
        if (err) {
            console.log(err);
        }
        res.send(html);
    });
};

// Register Route
exports.registerRoute = (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render("register", { message, error }, (err, html) => {
        if (err) {
            console.log(err);
        }
        res.send(html);
    });
};

// Home Route
exports.homeRoute = (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render("home", { message, error }, (err, html) => {
        if (err) {
            console.log(err);
        }
        res.send(html);
    });
};
