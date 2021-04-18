using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
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
            services.AddTransient<IStaffRepository, EFStaffRepository>();
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
                endpoints.MapGet("/", async context => { await context.Response.WriteAsync("Hello user!"); });

                endpoints.MapGet("/cs", async context =>
                {
                    var config = context.RequestServices.GetService<IConfiguration>();
                    await context.Response.WriteAsync(config.GetConnectionString("STDentalDB"));
                });

             /*   endpoints.MapGet("/options", async context =>
                {
                    await context.Response.WriteAsync("Start!");
                    var repository = context.RequestServices.GetService<IOptionRepository>();
                    await context.Response.WriteAsync(
                        String.Join("\n", (await repository.GetOptionsAsync()).Select(s => s.Name))
                    );
                    await context.Response.WriteAsync("End!");
                });
            */

                endpoints.MapGet("/options", async context =>
                {
                    var repository = context.RequestServices.GetService<IOptionRepository>();
                    var optionsList = (await repository.GetOptionsAsync()).ToList();

                    /*string json = string.Empty;
                    await using (var stream = new MemoryStream())
                    {
                        await JsonSerializer.SerializeAsync(stream, optionsList, optionsList.GetType());
                        stream.Position = 0;
                        using var reader = new StreamReader(stream);
                        json = await reader.ReadToEndAsync();
                    }*/

                    await context.Response.WriteAsync(JsonSerializer.Serialize(optionsList));
                });

                endpoints.MapGet("/staffs", async context =>
                {
                    var repository = context.RequestServices.GetService<IStaffRepository>();
                    var optionsList = (await repository.GetActualStaffsAsync()).ToList();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(optionsList, options));
                });

                endpoints.MapGet("/searchstaff", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var clientId))
                    {
                        var repo = context.RequestServices.GetService<IStaffRepository>();
                        await context.Response.WriteAsync($"Information for clientId = {clientId}.\n");
                        var staffInfo = await repo.GetStaffAsync(clientId);
                        await context.Response.WriteAsync($"Name = {staffInfo.Name}, post = {staffInfo.Post.Name}, role = {staffInfo.Role}, render = {staffInfo.RenderService}");

                        var options = new JsonSerializerOptions()
                        {
                            //MaxDepth = 0,
                            //IgnoreNullValues = true,
                            //IgnoreReadOnlyProperties = true,
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(staffInfo, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("Nothing information to view.");
                    }
                });

            });

          
        }
    }
}
