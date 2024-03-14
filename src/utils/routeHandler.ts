/**
 * This is a HOF that takes a function that creates a resource and returns a route handler.
 * We pass into into the route handler the request and response objects that we get from express,
 * specifically the req and res objects within the async fn that we pass to the route handler.
 *
 * So the workflow is as follows:
 * route -> route handler -> callback -> controller -> model -> db => response;
 */
function createRouteHandler(createResource) {
  return async (req, res) => {
    const result = await createResource(req, res);

    if (!res.headersSent) {
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    }
  };
}

export default createRouteHandler;
