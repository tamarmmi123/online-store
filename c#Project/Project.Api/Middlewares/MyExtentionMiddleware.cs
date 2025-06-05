namespace Project.Api.Middlewares
{
    public static class MyExtentionMiddleware
    {
        public static IApplicationBuilder UseMyMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ValidateProduct>();
        }
    }
}
