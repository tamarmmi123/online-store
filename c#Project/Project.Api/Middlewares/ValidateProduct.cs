using Project.Core;

namespace Project.Api.Middlewares
{
    public class ValidateProduct
    {
        private readonly RequestDelegate _next;

        public ValidateProduct(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Method != HttpMethods.Post)
            {
                await _next(context);
                return;
            }

            try
            {
                if (context.Request.HasFormContentType)
                {
                    var categoryId = context.Request.Form["categoryId"];
                    Console.WriteLine("categoryId: " + categoryId);

                    // TODO: Replace with actual validation logic (e.g., database lookup)
                    if (string.IsNullOrWhiteSpace(categoryId) || categoryId != "validCategoryId")
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsync("Invalid category Id.");
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Middleware exception: {ex.Message}");
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsync("An error occurred while processing the request.");
                return;
            }

            await _next(context);
        }
    }
}







//using Microsoft.AspNetCore.Http.HttpResults;

//namespace Project.Api.Middlewares
//{
//    public class ValidateProduct
//    {
//        private readonly RequestDelegate next;

//        public ValidateProduct(RequestDelegate _next)
//        {
//            next = _next;
//        }

//        public async Task InvokeAsync(HttpContext context)
//        {
//            if (context.Request.Method != HttpMethods.Post)
//            {
//                await next(context);
//                return;
//            }
//            try
//            {
//                // Ensure the request content type supports form data
//                if (context.Request.HasFormContentType)
//                {
//                    var categoryCode = context.Request.Form["categoryCode"];
//                    Console.WriteLine("categoryCode: " + categoryCode);

//                    // Validate the category code
//                    if (categoryCode != "validCaategoryCode")
//                    {
//                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
//                        await context.Response.WriteAsync("Invalid category code.");
//                        return;
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                // Log the exception (optional)
//                Console.WriteLine($"Middleware exception: {ex.Message}");
//                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
//                await context.Response.WriteAsync("An error occurred while processing the request.");
//                return;
//            }

//            // Continue to the next middleware if no issues
//            await next(context);
//        }

//    }
//}
