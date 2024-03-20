import { CosmosClient } from "@azure/cosmos";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const client = new CosmosClient({ endpoint: config.cosmosdbEndpoint, key: config.cosmosdbKey });
    const method = event.node.req.method;
    const itemId = event.context.params.id;

    const database = client.database("SWAStore");
    const container = database.container("Sales");

    if (method === "GET") {
        try {
            const { resource } = await container.item(itemId, itemId).read();
            setResponseStatus(event, 200);
            return resource;
        } catch (error) {
            setResponseStatus(event, 500);
            return `Error retrieving item from the database: ${error.message}`;
        }
    // Uncomment the following code to enable mutations
    // } else if (method === "PUT") { // Update item
    //     try {
    //         const updatedItem = await readBody(event);
    //         const { resource: replacedItem } = await container.item(itemId, itemId).replace(updatedItem);
    //         setResponseStatus(event, 200);
    //         return replacedItem;
    //     } catch (error) {
    //         setResponseStatus(event, 500);
    //         return `Error updating item in the database: ${error.message}`;
    //     }
    // } else if (method === "DELETE") { // Delete item
    //     try {
    //         await container.item(itemId, itemId).delete();
    //         setResponseStatus(event, 204);
    //     } catch (error) {
    //         setResponseStatus(event, 500);
    //         return `Error deleting item from the database: ${error.message}`;
    //     }
    } else {
        setResponseStatus(event, 405);
        return "Method Not Allowed";
    }
});