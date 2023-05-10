// Why we have this file or What is the work of this file 

//  that Nexus can hot reload and create a bunch of new Prisma client instances 
//and then stuff just stops to work because um it's simply breaking stuff because 
//too many instances are active so this prevents it by saving it in the global based 
//variable which is not affected by hot reload all right








import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV != 'production') globalThis.prisma = client; // Here i am delcaring it to run when the node is not in the production mode


export default client;







// Chat GPT explains


// These lines of code are used to create and export a Prisma client instance that can be used to interact with a database.

//     First, the code imports the PrismaClient class from the @prisma/client package. This class is a generated client that provides a set of methods to interact with a database defined in a Prisma schema.

// Next, the code declares a global variable named prisma and assigns it a type of PrismaClient | undefined.This allows the prisma variable to be accessed from anywhere in the application, and ensures that it is initialized with a PrismaClient instance or undefined.

// The code then creates a new PrismaClient instance and assigns it to a variable named client.If a prisma instance already exists in the global scope(i.e.it has already been initialized), then the client variable is set to the existing prisma instance.

//     Finally, the code checks the value of NODE_ENV to determine if the application is running in production mode.If NODE_ENV is not set to 'production', then the client instance is assigned to the global prisma variable.This allows the prisma instance to be reused across multiple requests, which can help improve performance by reducing the number of database connections that need to be established.

// The export default client statement exports the client instance, so that it can be imported and used in other parts of the application.