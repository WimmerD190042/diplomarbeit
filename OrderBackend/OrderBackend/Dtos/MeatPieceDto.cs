namespace OrderBackend.Dtos
{
    public class MeatPieceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public double PricePerKg { get; set; }

        //public List<MeatPiecePartDto> Parts { get; set; }   
    }
}
