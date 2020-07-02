import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
   const params = {
      TableName: process.env.tableName,
      Key: {
         userId: event.requestContext.identity.cognitoIdentityId,
         noteId: event.pathParameters.id
      }
   };

   const result = await dynamoDB.get(params);
   if(!result.item) {
      throw new Error("Item não encontrando.");
   }

   return result.item;
});