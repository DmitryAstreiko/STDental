using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using STDentalLibrary.Implementation;
using STDentalLibrary.Repositories;

namespace STDentalWeb
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IOptionRepository, EFOptionRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello user!");
                });

                endpoints.MapGet("/cs", async context =>
                {
                    var config = context.RequestServices.GetService<IConfiguration>();
                    await context.Response.WriteAsync(config.GetConnectionString("STDentalDB"));
                });

                endpoints.MapGet("/options", async context =>
                {
                    await context.Response.WriteAsync("Start!");
                    var repository = context.RequestServices.GetService<IOptionRepository>();
                    await context.Response.WriteAsync(
                        String.Join("\n", (await repository.GetOptionsAsync()).Select(s => s.Name))
                    );
                    await context.Response.WriteAsync("End!");
                });

                endpoints.MapGet("/json", async context =>
                {
                    var repository = context.RequestServices.GetService<IOptionRepository>();
                    await context.Response.WriteAsync(await repository.GetOptionsJsonAsync());
                });

            });

          
        }
    }
}
