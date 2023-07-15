import prismadb from "@/lib/prismadb";
import getSession from "./get-session";




const getCurrentUser = async () => {
    try {
        
        const session = await getSession();

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            console.log("current user is not found");

            return null
        }

        return currentUser;

    } catch (error) {
        console.log(error);
        return null
        
    }
}


export default getCurrentUser;















