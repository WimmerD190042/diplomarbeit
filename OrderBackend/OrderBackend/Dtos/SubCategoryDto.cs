namespace OrderBackend.Dtos
{
    public class SubCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MeatPieceDto> MeatPieces { get; set; }
    }
}
