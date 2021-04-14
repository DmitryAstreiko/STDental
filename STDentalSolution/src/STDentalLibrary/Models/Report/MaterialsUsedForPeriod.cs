namespace STDentalLibrary.Models.Report
{
    public class MaterialsUsedForPeriod
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Unit { get; set; }

        public decimal Price { get; set; }

        public decimal Spent { get; set; }

        public decimal Cost { get; set; }
    }
}