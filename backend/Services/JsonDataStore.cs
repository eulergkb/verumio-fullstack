using System.Text.Json;
using Verumio.API.Models;

namespace Verumio.API.Services;

public class JsonDataStore (IWebHostEnvironment hostEnvironment) : IDataStore
{
    private readonly string DatabaseFileName = "database.json";

    protected string GetSourcePath(string fileName)
    {
        return Path.Join(hostEnvironment.ContentRootPath, "Sources", fileName);
    }

    public async ValueTask<Rectangle> GetAsync()
    {
        var content = await File.ReadAllTextAsync(GetSourcePath(DatabaseFileName));
        return JsonSerializer.Deserialize<Rectangle>(content);
    }

    public async ValueTask<Rectangle> SaveAsync(CreateRectangleModel model)
    {
        var content = JsonSerializer.Serialize(model);
        await File.WriteAllTextAsync(GetSourcePath(DatabaseFileName), content);
        return JsonSerializer.Deserialize<Rectangle>(content);
    }
}
