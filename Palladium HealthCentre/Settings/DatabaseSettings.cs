namespace Palladium.HealthCentre.Settings
{
    public class DatabaseSettings
    {
    /// <summary>
    /// Gets or sets the default connection settings
    /// </summary>
    public string DefaultConnection { get; set; }

    /// <summary>
    /// Gets or sets a timeout for db queries
    /// </summary>
    public int Timeout { get; set; }
}
}
