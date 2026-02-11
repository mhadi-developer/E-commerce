import jwt from "jsonwebtoken"

// checking cookie carrying/ consisting valid token;
export const isAuthenticated = async (req, res, next) => {
    
   const token = req.cookies["jwt-Token"];
    console.log("***************", token);
    
    if (!token) {
        return res.status(401).json({message: 'You are not authenticated '})
    }
    else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("***************decoded", decoded);
        
        req.user = decoded; // authenticated user information saved in global var (req) to use further
        
        next();


    //   // verify a token symmetric
    //   jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    //     console.log(decoded.foo); // bar
        //   });
        

    }
}
// in express function (first obj = request , second object = response , third = next() function)