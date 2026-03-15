// signup a new user

export const signup = async (req, res) => {
    const { email, fullName, password, bio } = req.body;

    try{
if( !email || !fullName || !password || !bio ) {
            return res.status(400).json({ success: false,message: "Missing Details" });
        }
    }catch(error){

    }
}