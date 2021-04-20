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
            services.AddTransient<IPatientRepository, EFPatientRepository>();
            services.AddTransient<IUnitRepository, EFUnitRepository>();
            services.AddTransient<IMaterialRepository, EFMaterialRepository>();
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
                    var staffList = (await repository.GetActualStaffsAsync()).ToList();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };
                    await context.Response.WriteAsync(JsonSerializer.Serialize(staffList, options));
                });

                endpoints.MapGet("/searchstaff", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var clientId))
                    {
                        var repo = context.RequestServices.GetService<IStaffRepository>();
                        var staffInfo = await repo.GetStaffAsync(clientId);

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
                        await context.Response.WriteAsync("False");
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

                #region Patients

                endpoints.MapGet("/patients", async context =>
                {
                    var repository = context.RequestServices.GetService<IPatientRepository>();
                    var patientList = await repository.GetPatientsAsync();

                    await context.Response.WriteAsync(JsonSerializer.Serialize(patientList, null));
                });

                endpoints.MapGet("/searchpatient", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var patientId))
                    {
                        var repo = context.RequestServices.GetService<IPatientRepository>();
                        var patientInfo = await repo.GetPatientAsync(patientId);

                        await context.Response.WriteAsync(JsonSerializer.Serialize(patientInfo, null));
                    }
                    else
                    {
                        await context.Response.WriteAsync("null");
                    }
                });

                endpoints.MapGet("/addpatient", async context =>
                {
                    var repository = context.RequestServices.GetService<IPatientRepository>();

                    var newPatient =
                        await JsonSerializer.DeserializeAsync<Patient>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddPatientAsync(newPatient);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/delpatient", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var patientId))
                    {
                        var repo = context.RequestServices.GetService<IPatientRepository>();

                        if (await repo.DeletePatientAsync(patientId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updatepatient", async context =>
                {
                    var repository = context.RequestServices.GetService<IPatientRepository>();

                    var updPatient =
                        await JsonSerializer.DeserializeAsync<Patient>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (await repository.UpdatePatientAsync(updPatient)) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion

                #region Unit

                endpoints.MapGet("/units", async context =>
                {
                    var repository = context.RequestServices.GetService<IUnitRepository>();
                    var unitList = await repository.GetUnitsAsync();

                    await context.Response.WriteAsync(JsonSerializer.Serialize(unitList, null));
                });
                
                endpoints.MapGet("/addunit", async context =>
                {
                    var repository = context.RequestServices.GetService<IUnitRepository>();

                    var newUnit =
                        await JsonSerializer.DeserializeAsync<Unit>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddUnitAsync(newUnit);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/delunit", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var unitId))
                    {
                        var repo = context.RequestServices.GetService<IUnitRepository>();

                        if (await repo.DeleteUnitAsync(unitId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updateunit", async context =>
                {
                    var repository = context.RequestServices.GetService<IUnitRepository>();

                    var updUnit =
                        await JsonSerializer.DeserializeAsync<Unit>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (await repository.UpdateUnitAsync(updUnit)) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion

                #region Materials

                endpoints.MapGet("/materials", async context =>
                {
                    var repository = context.RequestServices.GetService<IMaterialRepository>();
                    var materialList = await repository.GetActualMaterialsAsync();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(materialList, options));
                });

                endpoints.MapGet("/allmaterials", async context =>
                {
                    var repository = context.RequestServices.GetService<IMaterialRepository>();
                    var materialList = await repository.GetAllMaterialsAsync();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(materialList, options));
                });

                endpoints.MapGet("/addmaterial", async context =>
                {
                    var repository = context.RequestServices.GetService<IMaterialRepository>();

                    var newMaterial =
                        await JsonSerializer.DeserializeAsync<Material>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddMaterialAsync(newMaterial);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/delmaterial", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var materialId))
                    {
                        var repo = context.RequestServices.GetService<IMaterialRepository>();

                        if (await repo.DeleteMaterialAsync(materialId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updatematerial", async context =>
                {
                    var repository = context.RequestServices.GetService<IMaterialRepository>();

                    var updMaterial =
                        await JsonSerializer.DeserializeAsync<Material>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if ((await repository.UpdateMaterialAsync(updMaterial)) == 1) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion

                #region Services



                #endregion

                #region Talons



                #endregion

                #region Payments



                #endregion

                #region GroupName



                #endregion

                #region Receptions

                

                #endregion

            });
        }
    }
}
