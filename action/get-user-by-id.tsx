import prismadb from "@/lib/prismadb";
import getSession from "./get-session";

interface IParmas{
    authorId: string;
}

const getUserById = async (params: IParmas) => {
    try {
        const { authorId } = params;

        // const currentUser = await prismadb.user.findUnique({
        //     where: {
        //         email: session.user.email as string
        //     }
        // })

        // if (!currentUser) {
        //     console.log("current user is not found");

        //     return null
        // }

        // return currentUser;

    } catch (error) {
        console.log(error);
        return null

    }
}


// export default getCurrentUser;















