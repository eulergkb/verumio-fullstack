using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Verumio.API.Models;
using Verumio.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IDataStore, JsonDataStore>();
builder.Services.AddCors(cors =>
{
    cors.AddDefaultPolicy(b => b.AllowAnyHeader().AllowAnyOrigin());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/rectangle", async Task<Results<Ok<Rectangle>, ValidationProblem>> (IDataStore dataStore, [FromBody] CreateRectangleModel model) =>
{
    //  Validate rectangle (simulation)
    await Task.Run(() => Thread.Sleep(TimeSpan.FromSeconds(10)));

    if (model.Width > model.Height)
        return TypedResults.ValidationProblem(
            new Dictionary<string, string[]>
            {
                { nameof(Rectangle.Width) , [ "Width cannot be greater than height" ] }
            }
        );

    var rectangle = await dataStore.SaveAsync(model);

    return TypedResults.Ok(rectangle);

}).WithName("CreateRectangle").ProducesValidationProblem();


app.MapGet("/rectangle", async Task<Ok<Rectangle>> (IDataStore dataStore) =>
{
    var rectangle = await dataStore.GetAsync();
    return TypedResults.Ok(rectangle);

}).WithName("GetRectangle");

app.UseCors();

app.Run();
