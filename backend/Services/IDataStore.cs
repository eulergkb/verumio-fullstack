using Verumio.API.Models;

namespace Verumio.API.Services;

public interface IDataStore
{
    ValueTask<Rectangle> GetAsync();

    ValueTask<Rectangle> SaveAsync(CreateRectangleModel model);
}
