import { CosmosClient } from "@azure/cosmos";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const client = new CosmosClient({ endpoint: config.cosmosdbEndpoint, key: config.cosmosdbKey });
    const method = event.node.req.method;

    const database = client.database("SWAStore");
    const container = database.container("Sales");

    if(method === "GET") {
        try {
            const { resources } = await container.items.readAll().fetchAll();
            return resources;
        } catch (error) {
            setResponseStatus(event, 500);
            return `Error retrieving items from the database: ${error.message}`;
        }
    // Uncomment the following code to enable mutations
    // } else if (method === "POST") { // Create new item
    //     try {
    //         const newItem = await readBody(event);
    //         console.log(newItem);
    //         const { resource: createdItem } = await container.items.create(newItem);
    //         setResponseStatus(event, 201);
    //         return createdItem;
    //     } catch (error) {
    //         setResponseStatus(event, 500);
    //         return `Error creating item in the database: ${error.message}`;
    //     }
    } else {
        setResponseStatus(event, 405);
        return "Method Not Allowed";
    }
});