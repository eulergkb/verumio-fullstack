using System.ComponentModel.DataAnnotations;

namespace Verumio.API.Models;

public record CreateRectangleModel(
    double X,
    double Y,
    [Range(0,double.MaxValue)]double Width, 
    [Range(0,double.MaxValue)]double Height
);
