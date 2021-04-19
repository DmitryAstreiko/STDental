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
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using STDentalLibrary.Implementation;
using STDentalLibrary.Models;
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
                //endpoints.MapGet("/", async context => { await context.Response.WriteAsync("Hello user!"); });

                endpoints.MapGet("/cs", async context =>
                {
                    var config = context.RequestServices.GetService<IConfiguration>();
                    await context.Response.WriteAsync(config.GetConnectionString("STDentalDB"));
                });
                
                #region Options

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

                endpoints.MapGet("/saveoptions", async context =>
                {
                    //docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to?pivots=dotnet-5-0//
                    var repository = context.RequestServices.GetService<IOptionRepository>();

                    var newOptions =
                        await JsonSerializer.DeserializeAsync<List<Option>>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (await repository.SaveOptionsAsync(newOptions)) await context.Response.WriteAsync("True");
                    else await context.Response.WriteAsync("False");

                    /*var newOptions = await JsonSerializer.DeserializeAsync<List<Option>>(new MemoryStream(Encoding.UTF8.GetBytes(stringJson)), null);

                    if (newOptions == null) return false;

                    var curOption = await context.Options.ToListAsync();

                    if (curOption == null) return false;

                    foreach (var row in curOption)
                    {
                        switch (row.Name)
                        {
                            case "FullNameOrganization":
                                row.Value = newOptions
                                    .Where(s => s.Name == "FullNameOrganization")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "NameOrganization":
                                row.Value = newOptions
                                    .Where(s => s.Name == "NameOrganization")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "UNP":
                                row.Value = newOptions
                                    .Where(s => s.Name == "UNP")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "LegalAddress":
                                row.Value = newOptions
                                    .Where(s => s.Name == "LegalAddress")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "HeadFIO":
                                row.Value = newOptions
                                    .Where(s => s.Name == "HeadFIO")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "HeadPost":
                                row.Value = newOptions
                                    .Where(s => s.Name == "HeadPost")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "AccountantGeneral":
                                row.Value = newOptions
                                    .Where(s => s.Name == "AccountantGeneral")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "BankName":
                                row.Value = newOptions
                                    .Where(s => s.Name == "BankName")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "BankAccount":
                                row.Value = newOptions
                                    .Where(s => s.Name == "BankAccount")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "BankAdress":
                                row.Value = newOptions
                                    .Where(s => s.Name == "BankAdress")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                            case "BankSWIFT":
                                row.Value = newOptions
                                    .Where(s => s.Name == "BankSWIFT")
                                    .Select(w => w.Value)
                                    .ToString()!;
                                break;
                        }
                    }*/

                });

                #endregion

                #region Staffs

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
                        await context.Response.WriteAsync(
                            $"Name = {staffInfo.Name}, post = {staffInfo.Post.Name}, role = {staffInfo.Role}, render = {staffInfo.RenderService}");

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

                endpoints.MapGet("/addstaff", async context =>
                {
                    var repository = context.RequestServices.GetService<IStaffRepository>();

                    var newStaff =
                        await JsonSerializer.DeserializeAsync<Staff>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddStaffAsync(newStaff);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/firestaff", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var staffId))
                    {
                        var repo = context.RequestServices.GetService<IStaffRepository>();

                        if (await repo.FireStaffAsync(staffId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updatestaff", async context =>
                {
                    var repository = context.RequestServices.GetService<IStaffRepository>();

                    var updStaff =
                        await JsonSerializer.DeserializeAsync<Staff>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);
                    
                    if (await repository.UpdateStaffAsync(updStaff)) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion
            });
        }
    }
}
