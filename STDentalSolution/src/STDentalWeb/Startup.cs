using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
            services.AddTransient<IServiceRepository, EFServiceRepository>();
            services.AddTransient<ITalonRepository, EFTalonRepository>();
            services.AddTransient<IGroupNameServiceRepository, EFGroupNameServiceRepository>();
            services.AddTransient<IReceptionRepository, EFReceptionRepository>();
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

                endpoints.MapGet("/services", async context =>
                {
                    var repository = context.RequestServices.GetService<IServiceRepository>();
                    var serviceList = await repository.GetActualServicesAsync();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(serviceList, options));
                });

                endpoints.MapGet("/service", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        var repository = context.RequestServices.GetService<IServiceRepository>();
                        var serviceList = await repository.GetServiceAsync(serviceId);

                        var options = new JsonSerializerOptions()
                        {
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(serviceList, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/servicesmaterials", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        var repository = context.RequestServices.GetService<IServiceRepository>();
                        var serviceList = await repository.GetServiceMaterialsAsync(serviceId);

                        var options = new JsonSerializerOptions()
                        {
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(serviceList, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/servicecost", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        var repository = context.RequestServices.GetService<IServiceRepository>();
                        var serviceCost = await repository.GetServiceCalculation(serviceId);

                        var options = new JsonSerializerOptions()
                        {
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(serviceCost, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/allservices", async context =>
                {
                    var repository = context.RequestServices.GetService<IServiceRepository>();
                    var serviceList = await repository.GetServicesAsync();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(serviceList, options));
                });

                endpoints.MapGet("/addservice", async context =>
                {
                    var repository = context.RequestServices.GetService<IServiceRepository>();

                    var newService =
                        await JsonSerializer.DeserializeAsync<Service>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddServiceAsync(newService);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/delservice", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        var repo = context.RequestServices.GetService<IServiceRepository>();

                        if (await repo.DeleteServiceAsync(serviceId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updaservice", async context =>
                {
                    var repository = context.RequestServices.GetService<IServiceRepository>();

                    var updService =
                        await JsonSerializer.DeserializeAsync<Service>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        if (await repository.UpdateServiceAsync(serviceId, updService)) await context.Response.WriteAsync($"True");
                        else await context.Response.WriteAsync("False");
                    } ;
                });

                #endregion

                #region Talons

                /*endpoints.MapGet("/talons", async context =>
                {
                    var repository = context.RequestServices.GetService<ITalonRepository>();
                    var talonList = await repository.GetTalonsAsync();

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(talonList, options));
                });*/

                endpoints.MapGet("/talon", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var talonId))
                    {
                        var repository = context.RequestServices.GetService<ITalonRepository>();
                        var talonList = await repository.GetTalonAsync(talonId);

                        var options = new JsonSerializerOptions()
                        {
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(talonList, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/addtalon", async context =>
                {
                    var repository = context.RequestServices.GetService<ITalonRepository>();

                    var newTalon =
                        await JsonSerializer.DeserializeAsync<Talon>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddTalonAsync(newTalon);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });
                
                endpoints.MapGet("/deltalon", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        var repo = context.RequestServices.GetService<ITalonRepository>();
                        
                        if (await repo.DeleteTalonAsync(serviceId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updtalon", async context =>
                {
                    var repository = context.RequestServices.GetService<ITalonRepository>();

                    var updTalon =
                        await JsonSerializer.DeserializeAsync<Talon>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (await repository.UpdateTalonAsync(updTalon)) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion

                #region Payments

                endpoints.MapGet("/addpayment", async context =>
                {
                    var repository = context.RequestServices.GetService<ITalonRepository>();

                    var newPayment =
                        await JsonSerializer.DeserializeAsync<Payment>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddPaymentAsync(newPayment);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                #endregion

                #region GroupName

                endpoints.MapGet("/groups", async context =>
                {
                    var repository = context.RequestServices.GetService<IGroupNameServiceRepository>();
                    var groupList = await repository.GetGroupAsync();
                    
                    await context.Response.WriteAsync(JsonSerializer.Serialize(groupList, null));
                });

                endpoints.MapGet("/groupservices", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var groupId))
                    {
                        var repository = context.RequestServices.GetService<IGroupNameServiceRepository>();
                        var groupList = await repository.GetGroupServicesAsync(groupId);

                        var options = new JsonSerializerOptions()
                        {
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(groupList, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/addgroup", async context =>
                {
                    var repository = context.RequestServices.GetService<IGroupNameServiceRepository>();

                    var newGroup =
                        await JsonSerializer.DeserializeAsync<GroupNameService>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddGroupAsync(newGroup);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/delgroup", async context =>
                {
                    if (int.TryParse(context.Request.Query["id"], out var groupId))
                    {
                        var repo = context.RequestServices.GetService<IGroupNameServiceRepository>();

                        if (await repo.DelGroupAsync(groupId)) await context.Response.WriteAsync("True");
                        else await context.Response.WriteAsync("False");
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
                });

                endpoints.MapGet("/updgroup", async context =>
                {
                    var repository = context.RequestServices.GetService<IGroupNameServiceRepository>();

                    var newGroup =
                        await JsonSerializer.DeserializeAsync<GroupNameService>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (await repository.UpdateGroupAsync(newGroup)) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion

                #region Receptions

                endpoints.MapGet("/receptions1", async context =>
                {
                    if(DateTime.TryParse(context.Request.Query["startdate"], out var startdate)) await context.Response.WriteAsync("False");

                    if (DateTime.TryParse(context.Request.Query["enddate"], out var enddate)) await context.Response.WriteAsync("False");

                    var repository = context.RequestServices.GetService<IReceptionRepository>();
                    var receptionList = await repository.GetReceptionsAsync(startdate, enddate);

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(receptionList, options));
                });

                endpoints.MapGet("/receptions2", async context =>
                {
                    if (DateTime.TryParse(context.Request.Query["startdate"], out var startdate)) await context.Response.WriteAsync("False");

                    if (DateTime.TryParse(context.Request.Query["enddate"], out var enddate)) await context.Response.WriteAsync("False");

                    if (int.TryParse(context.Request.Query["staffid"], out var staffid)) await context.Response.WriteAsync("False");

                    var repository = context.RequestServices.GetService<IReceptionRepository>();
                    var receptionList = await repository.GetReceptionsAsync(startdate, enddate, staffid);

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(receptionList, options));
                });

                endpoints.MapGet("/receptions3", async context =>
                {
                    if (DateTime.TryParse(context.Request.Query["startdate"], out var startdate)) await context.Response.WriteAsync("False");

                    if (DateTime.TryParse(context.Request.Query["enddate"], out var enddate)) await context.Response.WriteAsync("False");

                    if (int.TryParse(context.Request.Query["status"], out var staffid)) await context.Response.WriteAsync("False");
                    
                    var repository = context.RequestServices.GetService<IReceptionRepository>();
                    var receptionList = await repository.GetReceptionsAsync(startdate, enddate, staffid);

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(receptionList, options));
                });

                endpoints.MapGet("/receptions4", async context =>
                {
                    if (DateTime.TryParse(context.Request.Query["visitdate"], out var visitdate)) await context.Response.WriteAsync("False");

                    var repository = context.RequestServices.GetService<IReceptionRepository>();
                    var receptionList = await repository.GetReceptionsAsync(visitdate);

                    var options = new JsonSerializerOptions()
                    {
                        ReferenceHandler = ReferenceHandler.Preserve
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(receptionList, options));
                });

                endpoints.MapGet("/addreception", async context =>
                {
                    var repository = context.RequestServices.GetService<IReceptionRepository>();

                    var newReception =
                        await JsonSerializer.DeserializeAsync<Reception>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    var resAdd = await repository.AddReceptionAsync(newReception);
                    if (resAdd != 0) await context.Response.WriteAsync($"{resAdd}");
                    else await context.Response.WriteAsync("0");
                });

                endpoints.MapGet("/updreception", async context =>
                {
                    var repository = context.RequestServices.GetService<IReceptionRepository>();

                    var newReception =
                        await JsonSerializer.DeserializeAsync<Reception>(
                            new MemoryStream(Encoding.UTF8.GetBytes(context.Request.Query["data"])), null);

                    if (await repository.UpdReceptionAsync(newReception)) await context.Response.WriteAsync($"True");
                    else await context.Response.WriteAsync("False");
                });

                #endregion

            });
        }
    }
}
